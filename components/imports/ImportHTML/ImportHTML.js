import Imports from "../imports-class.js";

export class ImportHTML extends HTMLElement {
  static observedAttributes = ["source"];

  constructor() {
    super();
  }

  async connectedCallback() {
    console.log("async connectedCallback ImportHTML");
    this.fetchImportPromise = new Promise(
      this.fetchHTMLFromSrcAttribute.bind(this)
    );
    await Imports.fetchImport(this.fetchImportPromise, this);
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    let fetchImportPromise;

    if (name === "source") {
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

    if (!this.hasAttribute("source")) {
      return resolve(true);
    }

    try {
      const response = await fetch(this.getAttribute("source"));
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      html = await response.text();
    } catch (error) {
      this.innerHTML = "";
      this.setAttribute("data-status", "import failed");
      console.log("could not load", this.getAttribute("source"));

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
