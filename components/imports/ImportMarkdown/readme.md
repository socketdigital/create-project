# Icon Button

<p>A paragraph</p>

<sample-component>
  <template shadowrootmode="open">
    <style>
      ::slotted(p) {
        color: red;
      }
    </style>
    <slot></slot>
  </template>
  <p>Red paragraph a declarative web component.</p>
</sample-component>

<icon-button>
  <template shadowrootmode="open">
    <button aria-labelledby="open-all" title="Open all">
      <svg
        width="1em"
        height="1em"
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
      >
        <use href="../../../icons.svg#icon-more"></use>
      </svg>
      <span id="open-all" hidden>More</span>
    </button>
  </template>
</icon-button>

## Hiding Unstyled Flash of Content whith <html-import>

To be added: replace and remove <html-imports> during buld process.

During development (.i.e running not from dist folder):

To make display of page wait until all html imports are loaded, to avoid a flash of unstyled content:

Put data-hidden-until-loaded attribute on the HTML element:

```html
<html lang="en" data-hidden-until-loaded></html>
```

And put data-visible-when-loaded attribute on the LAST html-import element on the page:

```html
<import-html
  source="/imports/footer.html"
  data-visible-when-loaded
></import-html>
```

The html-import fetch calls will then be chained into an array of promises, and when they are all complete, the data-hidden-until-loaded attribute will be removed from the HTML element.

The base layer css (base.css) hides the entire page when the data-hidden-until-loaded attribute is on the html element:

```css
@layer base {
  html[data-hidden-until-loaded] {
    visibility: hidden;
  }
}
```
