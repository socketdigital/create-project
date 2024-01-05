# App Shell

Grid layout for an app shell, ala Apple [split view pattern](https://developer.apple.com/design/human-interface-guidelines/split-views) or "holy grail" layout.

## Basic Usage

```html
<app-shell>
  <template shadowrootmode="open">
    <link rel="stylesheet" href="./app-shell.css" />
    <section><slot></slot></section>
  </template>
  <header>Header</header>
  <sidebar-area>Sidebar</sidebar-area>
  <canvas-area>Canvas</canvas-area>
  <inspector-area>Inspector</inspector-area>
  <footer>Footer</footer>
</app-shell>
```

## Hiding Areas

```html
<app-shell data-area-hidden="inspector"></app-shell>
...
<app-shell data-area-hidden="sidebar"></app-shell>
...
<app-shell data-area-hidden="both"></app-shell>
```

To exclude a header or footer, simply don't include one in the first place or hide it with CSS:

```html
<style>
  app-shell header {
    display: none;
  }
</style>
```

## Styling Areas

```html
<app-shell>
  The areas are all light DOM slots, so they can be styled from DOM-level
  styling or with ::slotted.

  <template shadowrootmode="open">
    <style>
      :host ::slotted(header),
      :host ::slotted(footer) {
        --text: var(--text-dark);
        --surface: var(--surface-dark);
      }
      :host ::slotted(sidebar-area),
      :host ::slotted(inspector-area) {
        --text: var(--text-custom);
        --surface: var(--surface-custom);
      }
    </style>
    <link rel="stylesheet" href="./app-shell.css" />
    <section><slot></slot></section>
  </template>
  ...
</app-shell>
```
