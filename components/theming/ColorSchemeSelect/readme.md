# Color Scheme Select

Select "data-color-scheme" attribute on the document's HTML element. Stores color scheme to key "colorscheme" in local storage.

## Basic Usage

```html
<color-scheme-select>
  <template shadowrootmode="open">
    <link rel="stylesheet" href="color-scheme-select.css" />
    <label for="color-scheme-select">Color scheme:</label>
    <select name="colorScheme" id="color-scheme-select">
      <option value="auto">Auto (system preference)</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="custom">Custom colors</option>
    </select>
  </template>
</color-scheme-select>
```

## Initializing document data-color-scheme from local storage

Load the simple script "set-color-scheme-from-local-storage.js" as early as possible.

```html
<head>
  <script src="../set-color-scheme-from-local-storage.js"></script>
</head>
```

Do not load as a module, as this would load later and cause a "Flash of Unstyled Content".

set-color-scheme-from-local-storage.js:

```javascript
function setColorSchemeFromLocalStorage() {
  const colorScheme = localStorage.getItem("colorscheme");
  if (colorScheme) {
    document.documentElement.setAttribute("data-color-scheme", colorScheme);
  }
}
setColorSchemeFromLocalStorage();
```
