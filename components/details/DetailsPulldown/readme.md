# Details Pulldown

A pulldown using the details element, no Javascript required.

## Default Usage

```html
<details-pulldown>
  <template shadowrootmode="open">
    <link rel="stylesheet" href="details-pulldown.css" />
    <details>
      <summary>Pull down default</summary>
      <div class="pull-down">Pull down text.</div>
    </details>
  </template>
</details-pulldown>
```

## data-position Attribute

- default: left
- left
- right

## Styling

You can set the color scheme:

```html
<details-pulldown data-color-scheme="dark"></details-pulldown>
```

Or style individual elements:

```html
<details-pulldown data-position="left">
  <template shadowrootmode="open">
    <link rel="stylesheet" href="details-pulldown.css" />
    <style>
      :host(details-pulldown) details > summary {
        --surface: var(--surface-custom);
      }
      :host(details-pulldown) .pull-down {
        --surface: var(--surface-custom);
      }
    </style>
    <details>
      <summary>Pull down left</summary>
      <div class="pull-down">Pull down text</div>
    </details>
  </template>
</details-pulldown>
```
