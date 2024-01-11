import { defineConfig } from "vite";

import viteHTMLComponentsImportPlugin from "./components/imports/viteHTMLComponentsImportPlugin/viteHTMLComponentsImportPlugin";

export default defineConfig({
  plugins: [viteHTMLComponentsImportPlugin()],
});
