# Imports

```html
<import-html source="sample.html"></import-html>
<import-markdown source="sample.md"></import-markdown>
```

Uses [remark](https://remark.js.org/) and [prism.js](https://prismjs.com/).

## Replace or Insert loaded content

To replace completely the import custom element when loaded, use the data-replace attribute:

```html
<import-html source="sample.html" data-replace></import-html>
<import-markdown source="sample.md" data-replace></import-markdown>
```

If you don't use the data-replace attribute, after the initial load you can load a new import by changing the src attribute to another file.

If no src attribute is provided, no attempt to import will be made, and the import element will remain in the DOM even if it has a data-replace attribute.

## Hiding Flash of Unstyled Content

To avoid a flash of unstyled content before the import elements have loaded:

- Put the attribute "data-hidden-until-loaded" on the HTML element
- Put the attribute "data-visible-when-loaded" on the LAST <import-html> or <import-markdown> on the page.
- Include CSS to hide before loaded.

The import fetch calls will then be chained into an array of promises, and when they are all complete, the "data-hidden-until-loaded" attribute will be removed automatically from the HTML element.

```html
<html lang="en" data-hidden-until-imports-imported>
  ...
  <body>
    <import-html source="html/sample-with-code-blocks.html"></import-html>
    <import-html
      source="html/sample-with-web-component.html"
      data-visible-when-imported
    ></import-html>
  </body>
</html>
```

```markup
<head>
   <style>
      html[data-hidden-until-imports-imported] {
        visibility: hidden;
      }
    </style>
<head>
```

## HTML in Markdown

HTML in markdown is supported. You can include declarative web components and other HTML in the markdown.

## Prism.js Styling of Code Blocks

Include prism.css and prism.js as shown in example index.html files.

If you are styling HTML tags in a code block in an HTML import, the Prism "[Unescaped Markup](https://prismjs.com/plugins/unescaped-markup/)" plugin will be used, which requires special handling of HTML tags. For example, you can use the script tag:

```html
<script type="text/plain" class="language-markup">
  <p>Example</p>
</script>
```

If you are including code blocks with HTML tags in a markdown file, remark will automatically handle escaping the HTML tags.
