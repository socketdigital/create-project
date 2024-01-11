import Imports from "/components/imports/imports-class.js";

import { unified } from "https://esm.sh/unified@11?bundle";
import remarkParse from "https://esm.sh/remark-parse@11?bundle";
import remarkRehype from "https://esm.sh/remark-rehype@11?bundle";
import rehypeStringify from "https://esm.sh/rehype-stringify@10?bundle";
import remarkFrontmatter from "https://esm.sh/remark-frontmatter@5?bundle";
import remarkStringify from "https://esm.sh/remark-stringify@11?bundle";
import { matter } from "https://esm.sh/vfile-matter@5?bundle";
import remarkGfm from "https://esm.sh/remark-gfm@4?bundle";

export class ImportMarkdown extends HTMLElement {
  static observedAttributes = ["source"];

  constructor() {
    super();
  }

  async connectedCallback() {
    this.fetchImportPromise = new Promise(
      this.fetchMarkdownFromSrcAttribute.bind(this)
    );
    await Imports.fetchImport(this.fetchImportPromise, this);
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    let fetchImportPromise;

    if (name === "source") {
      if (oldValue !== null) {
        fetchImportPromise = new Promise(
          this.fetchMarkdownFromSrcAttribute.bind(this)
        );

        await Promise.allSettled([fetchImportPromise]);
      }
    }
  }

  async fetchMarkdownFromSrcAttribute(resolve, reject) {
    let html = "";
    let markdown = "";
    let frontMatter = {};

    if (!this.hasAttribute("source")) {
      return resolve(true);
    }

    try {
      const response = await fetch(this.getAttribute("source"));
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      markdown = await response.text();
      html = await ImportMarkdown.markdown2HTML(markdown);
      frontMatter = await ImportMarkdown.parseFrontMatter(markdown);
    } catch (error) {
      console.log(error);
      this.innerHTML = "";
      this.setAttribute("data-status", "import failed");
      return reject(error);
    }

    var parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html", {
      includeShadowRoots: true,
    });

    if (typeof Prism != "undefined") {
      Prism.highlightAllUnder(doc);
    }

    if (this.hasAttribute("data-replace")) {
      this.replaceWith(...doc.body.children);
    } else {
      this.replaceChildren(...doc.body.children);
    }
    this.setAttribute("data-status", "imported");

    return resolve(true);
  }

  static async markdown2HTML(markdown) {
    let html = "";
    try {
      const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeStringify, { allowDangerousHtml: true })
        .use(remarkFrontmatter)
        .process(markdown);
      html = String(result);
    } catch (error) {
      console.log(error);
    }
    return html;
  }

  static async parseFrontMatter(markdown) {
    let frontMatter = {};
    try {
      const result = await unified()
        .use(remarkParse)
        .use(remarkStringify)
        .use(remarkFrontmatter)
        .use(function () {
          return function (tree, file) {
            matter(file);
          };
        })
        .process(markdown);

      frontMatter = result.data.matter;
    } catch (error) {
      console.log(error);
    }

    return frontMatter;
  }
}
