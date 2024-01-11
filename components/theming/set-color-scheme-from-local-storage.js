(function setColorSchemeFromLocalStorage() {
  const colorScheme = localStorage.getItem("colorscheme");
  if (colorScheme) {
    document.documentElement.setAttribute("data-color-scheme", colorScheme);
  }
})();
