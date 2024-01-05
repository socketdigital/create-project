import Components from "../../utilities/Components/components-class.js";

export class FontSchemeSelect extends HTMLElement {
  static initalColorScheme;

  constructor() {
    super();
    Components.attachShadow(this);
    this._initSelect();
    console.log("FontSchemeSelect");
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
    const fontScheme = e.target.value;
    console.log(fontScheme);

    const fontSchemeValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue(fontScheme);

    console.log(fontSchemeValue);

    const fontFamilyValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--font-family");
    console.log(fontFamilyValue);

    document.documentElement.style.setProperty(
      "--font-family",
      fontSchemeValue
    );

    // document.body.style.fontFamily = fontSchemeValue;

    // document.documentElement.setAttribute("data-color-scheme", colorScheme);
    // ColorSchemeSelect.setColorSchemeToLocalStorage(colorScheme);
  }

  // static setColorSchemeToLocalStorage(colorScheme) {
  //   if (colorScheme === "auto") {
  //     localStorage.removeItem("colorscheme");
  //     return;
  //   }
  //   localStorage.setItem("colorscheme", colorScheme);
  // }
}
