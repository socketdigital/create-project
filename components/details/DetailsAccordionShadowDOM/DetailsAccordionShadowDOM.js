import Components from "../../utilities/Components/components-class.js";

export class DetailsAccordionShadowDOM extends HTMLElement {
  constructor() {
    super();
    Components.attachShadow(this);
    this._initAccordion();
  }

  _initAccordion() {
    this.detailsElements = this.shadow.querySelectorAll("details");

    this.summaryElements = this.shadow.querySelectorAll("summary");
    this.summaryElements.forEach((element) => {
      element.addEventListener("click", (event) => {
        this._handleSummaryClick(event);
      });
    });
  }

  _handleSummaryClick(event) {
    event.preventDefault();

    const parentDetailsElement = event.target.parentElement;
    parentDetailsElement.toggleAttribute("open");

    this.detailsElements.forEach((detailsElement) => {
      if (detailsElement !== parentDetailsElement) {
        detailsElement.removeAttribute("open");
      }
    });
  }
}
