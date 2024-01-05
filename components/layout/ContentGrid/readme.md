# Section Grid

## Basic Usage

```html
<content-grid>
  <template shadowrootmode="open">
    <link rel="stylesheet" href="content-grid.css" />
    <section>
      <slot></slot>
    </section>
  </template>
  <content-area data-color-scheme="dark">
    <header style="grid-column: wide-width">
      <h2>Heading area</h2>
      <p>A wide-width width paragraph.</p>
    </header>
  </content-area>
</content-grid>
```
