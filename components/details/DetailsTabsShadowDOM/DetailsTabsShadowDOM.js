import Components from "../../utilities/Components/components-class.js";

export class DetailsTabsShadowDOM extends HTMLElement {
  constructor() {
    super();
    Components.attachShadow(this);
    this._initAccordion();
  }

  _initAccordion() {
    this.detailsElements = this.shadow.querySelectorAll("details");

    this.detailsElements.forEach((element) => {
      const summaryElement = element.querySelector("summary");
      if (summaryElement) {
        summaryElement.addEventListener("click", (event) => {
          this._handleSummaryClick(event);
        });
      }
    });
  }

  _handleSummaryClick(event) {
    event.preventDefault();

    const parentDetailsElement = event.target.parentElement;

    parentDetailsElement.setAttribute("open", "");

    this.detailsElements.forEach((detailsElement) => {
      if (detailsElement !== parentDetailsElement) {
        detailsElement.removeAttribute("open");
      }
    });
  }
}
