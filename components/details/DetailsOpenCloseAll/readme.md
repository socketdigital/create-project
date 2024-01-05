# Details Open Close All

Detail elements that can be all opened or all closed with a single click

## Basic Usage

```html
<details-open-close-all>
  <template shadowrootmode="open">
    <link rel="stylesheet" href="details-open-close-all.css" />
    <button aria-labelledby="open-all" title="Open all">
      <span id="open-all">Open all</span>
    </button>
    <button aria-labelledby="close-all" title="Close all">
      <span id="close-all">Close all</span>
    </button>
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
</details-open-close-all>
```
