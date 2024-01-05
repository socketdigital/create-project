import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  input: "src/index.js",
  output: {
    file: "index.js",
    format: "es",
  },
  plugins: [nodeResolve(), commonjs()],
});
