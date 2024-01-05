# Card Grid

A grid of cards

## Basic Usage

```html
<card-grid>
  <template shadowrootmode="open">
    <link rel="stylesheet" href="card-grid.css" />
    <section>
      <slot></slot>
    </section>
  </template>
  <card-item data-color-scheme="custom">
    <h2>Web component-oriented design principles</h2>
    <ul>
      <li>Design HTML-first</li>
      <li>Design-in theming & accessibility</li>
      <li>Encapsulate & colocate</li>
      <li>Style with CSS variables</li>
      <li>Stay simple, clean & SOLID</li>
    </ul>
  </card-item>
</card-grid>
```

## Styling

Theme variables

- --text
- --surface
- --gap
- --box-shadow

Component variables

- --card-column-min-width: 15em;

```html
<card-grid>
  <template shadowrootmode="open">
    <link rel="stylesheet" href="card-grid.css" />
    <style>
      :host(card-grid) {
        text-wrap: balance;
        --card-column-min-width: 20em;
      }
    </style>
  </template>
  ...
</card-grid>
```

You can set the color scheme of individual card items:

```html
<card-item data-color-scheme="custom">...</card-item>
```

## Attributes

To switch to a flex layout with scroll-snap enabled:

```html
<card-grid data-layout="flex">...</card-grid>
```
