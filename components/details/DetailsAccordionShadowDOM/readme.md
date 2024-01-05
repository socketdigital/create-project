# Details Accordion Shadow DOM

Implements the [exclusive accordion](https://open-ui.org/components/accordion.explainer/) pattern with detail elements.

- Details Accordion - details elements in light DOM
- Details Accordion Shadow DOM - details element in shadow DOM

## Basic Usage

```html
<details-accordion-shadow-dom>
  <template shadowrootmode="open">
    <link rel="stylesheet" href="details-accordion-shadow-dom.css" />
    <details>
      <summary>Summary 1</summary>
      Details content 1.
    </details>
    <details>
      <summary>Summary 2</summary>
      Details content 2.
    </details>
    <details>
      <summary>Summary 3</summary>
      Details content 3.
    </details>
  </template>
</details-accordion-shadow-dom>
```
