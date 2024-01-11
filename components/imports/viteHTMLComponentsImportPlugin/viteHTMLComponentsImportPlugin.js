import * as fs from "fs";
import path from "path";

// function getHTMLImportSrcMatches(html) {
//   const regex = /<import-html\s+source="([^"]*)"[^>]*>/g;
//   let match;
//   const matches = [];

//   while ((match = regex.exec(html)) !== null) {
//     matches.push({
//       src: match[1],
//       index: match.index,
//     });
//   }

//   return matches;
// }

// function loadHTMLfilesAndReplaceHTMLImportElements(
//   newHTML,
//   srcMatches,
//   rootPath
// ) {
//   let replacedHTML = newHTML;

//   srcMatches.forEach((match) => {
//     const HTMLImportTag = `<import-html source="${match.src}"></import-html>`;
//     const filePath = path.join(rootPath, match.src.substr(1));
//     const htmlFileContents = fs.readFileSync(filePath);
//     if (htmlFileContents) {
//       replacedHTML = replacedHTML.replace(HTMLImportTag, htmlFileContents);
//     }
//   });

//   return replacedHTML;
// }

function getHTMLImportSrcMatches(html) {
  const regex = /<import-html\s+source="([^"]*)"[^>]*>/g;
  let match;
  const matches = [];
  while ((match = regex.exec(html)) !== null) {
    matches.push({ match: match[0], src: match[1] });
  }
  return matches;
}

function removeAttributeFromHTMLTag(html, attribute) {
  const regex = new RegExp(`(<html[^>]*)(\\s${attribute}(="")?)([^>]*>)`, "gi");
  return html.replace(regex, (match, p1, p2, p3, p4) => `${p1}${p4}`);
}

function loadHTMLfilesAndReplaceHTMLImportElements(html, rootPath) {
  const srcMatches = getHTMLImportSrcMatches(html);
  for (const { match, src } of srcMatches) {
    const filePath = path.join(rootPath, src);
    const fileContent = fs.readFileSync(filePath, "utf8");
    html = html.replace(match, fileContent);
  }
  return html;
}

export default function viteHTMLComponentsImportPlugin() {
  let config;
  return {
    name: "viteHTMLComponentsImportPlugin",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    order: "pre",
    transformIndexHtml(html) {
      let newHTML = html;

      let replacedHTML = loadHTMLfilesAndReplaceHTMLImportElements(
        newHTML,
        config.root
      );

      const reallyReplacedHTML = removeAttributeFromHTMLTag(
        replacedHTML,
        "data-hidden-until-imports-imported"
      );

      return reallyReplacedHTML;
    },
  };
}
