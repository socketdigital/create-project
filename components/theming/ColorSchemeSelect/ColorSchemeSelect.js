import Components from "../../utilities/Components/components-class.js";

export class ColorSchemeSelect extends HTMLElement {
  static initalColorScheme;

  constructor() {
    super();
    Components.attachShadow(this);
    this._initSelect();
  }

  _initSelect() {
    this.select = this.shadow.querySelector("select");

    if (!this.select) {
      return;
    }

    const colorScheme =
      document.documentElement.getAttribute("data-color-scheme");

    if (colorScheme) {
      this.select.value = colorScheme;
    }

    this.select.addEventListener("change", (e) => {
      this._selectChange(e);
    });
  }

  _selectChange(e) {
    const colorScheme = e.target.value;
    document.documentElement.setAttribute("data-color-scheme", colorScheme);
    ColorSchemeSelect.setColorSchemeToLocalStorage(colorScheme);
  }

  static setColorSchemeToLocalStorage(colorScheme) {
    if (colorScheme === "auto") {
      localStorage.removeItem("colorscheme");
      return;
    }
    localStorage.setItem("colorscheme", colorScheme);
  }
}
