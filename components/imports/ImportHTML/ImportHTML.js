import Imports from "../imports-class.js";

export class ImportHTML extends HTMLElement {
  static observedAttributes = ["src"];

  constructor() {
    super();
  }

  async connectedCallback() {
    console.log("ImportHTML");
    this.fetchImportPromise = new Promise(
      this.fetchHTMLFromSrcAttribute.bind(this)
    );
    await Imports.fetchImport(this.fetchImportPromise, this);
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    let fetchImportPromise;

    if (name === "src") {
      if (oldValue !== null) {
        fetchImportPromise = new Promise(
          this.fetchHTMLFromSrcAttribute.bind(this)
        );

        await Promise.allSettled([fetchImportPromise]);
      }
    }
  }

  async fetchHTMLFromSrcAttribute(resolve, reject) {
    let html = "";

    if (!this.hasAttribute("src")) {
      return resolve(true);
    }

    try {
      const response = await fetch(this.getAttribute("src"));
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      html = await response.text();
    } catch (error) {
      this.innerHTML = "";
      this.setAttribute("data-status", "import failed");
      return reject(error);
    }

    var parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html", {
      includeShadowRoots: true,
    });

    if (typeof Prism != "undefined") {
      console.log("PRISM");
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
}
