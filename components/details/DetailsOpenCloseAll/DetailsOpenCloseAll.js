import Components from "../../utilities/Components/components-class.js";

export class DetailsOpenCloseAll extends HTMLElement {
  constructor() {
    super();
    Components.attachShadow(this);
    this._initDetailsElements();
    this._initOpenAllButton();
    this._initCloseAllButton();
  }

  _initDetailsElements() {
    this.detailsElements = this.querySelectorAll("details");
  }

  _initOpenAllButton() {
    this.openAllButton = this.shadow.querySelector(
      "button[aria-labelledby='open-all']"
    );

    if (!this.openAllButton) {
      return;
    }

    this.openAllButton.addEventListener("click", (event) => {
      this._handleOpenAllClick(event);
    });
  }

  _handleOpenAllClick(event) {
    this.detailsElements.forEach((detailsElement) => {
      detailsElement.setAttribute("open", "");
    });
  }

  _initCloseAllButton() {
    this.closeAllButton = this.shadow.querySelector(
      "button[aria-labelledby='close-all']"
    );

    if (!this.closeAllButton) {
      return;
    }

    this.closeAllButton.addEventListener("click", (event) => {
      this._handleCloseAllClick(event);
    });
  }

  _handleCloseAllClick(event) {
    this.detailsElements.forEach((detailsElement) => {
      detailsElement.removeAttribute("open");
    });
  }
}
