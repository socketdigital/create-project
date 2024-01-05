export default class Components {
  static attachShadow(that) {
    that.shadow = that.attachInternals().shadowRoot;

    if (that.shadow) {
      return;
    }

    that.shadow = that.attachShadow({ mode: "open" });
    const template = that.shadow.host.querySelector("template");
    if (template) {
      that.shadow.appendChild(template.content);
      template.remove();
    }
  }
}
