# Details Accordion

Implements the [exclusive accordion](https://open-ui.org/components/accordion.explainer/) pattern with detail elements. At most only one of the detail elements will open at the same time.

Out of the box, [detail elements are not exclusive accordions](https://daverupert.com/2019/12/why-details-is-not-an-accordion/), because multiple can be open at the same time. But [grouped detail elements with ARIA naming](https://adrianroselli.com/2023/08/progressively-enhanced-html-accordion.html) can be used to implement the exclusive accordion pattern.

- Details Accordion - details elements in light DOM
- Details Accordion Shadow DOM - details element in shadow DOM

## Basic Usage

```html
<details-accordion>
  <template shadowrootmode="open">
    <link rel="stylesheet" href="details-accordion.css" />
    <slot></slot>
  </template>
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
</details-accordion>
```

## Nested Accordions

Accords can be nested:

```html
<details-accordion>
  <template shadowrootmode="open">
    <link rel="stylesheet" href="details-accordion.css" />
    <slot></slot>
  </template>
  <details>
    <summary>Summary no children</summary>
    Details content no children.
  </details>
  <details>
    <summary>Summary with children</summary>
    <details-accordion accordion>
      <template shadowrootmode="open">
        <link rel="stylesheet" href="details-accordion.css" />
        <slot></slot>
      </template>
      <details>
        <summary>Nested summary 1</summary>
        Nested details content 1.
      </details>
      <details>
        <summary>Nested summary 2</summary>
        Nested details content 2.
      </details>
    </details-accordion>
  </details>
</details-accordion>
```

## Styling

The CSS file assets/css/css-imports/base.css includes the fix for styling detail summary element pointers and nested block elements in summary as described in
[Two Issues Styling the Details Element and How to Solve Them](https://css-tricks.com/two-issues-styling-the-details-element-and-how-to-solve-them/) by Greg Gibson. These CSS fixes are implemented at the DOM level rather than inside the details-accordion template, because ::slotted only reaches the top level elements in the light DOM.
