import postcssimport from "postcss-import";
import cssnano from "cssnano";

export default {
  plugins: [postcssimport({}), cssnano({ preset: "default" })],
};
