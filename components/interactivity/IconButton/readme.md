# icon-button

<icon-button data-color-scheme="dark">
  <template shadowrootmode="open">
  <style>
  :host() {
    color: text;
    background-color: surface;
  }
  </style>
    <button aria-labelledby="more" title="More">
      <svg
        width="1em"
        height="1em"
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
      >
        <use href="../../../public/svg/icons.svg#icon-more"></use>
      </svg>
      <span id="more" >More</span>
    </button>
  </template>
</icon-button>

```html
<icon-button>
  <template shadowrootmode="open">
    <button aria-labelledby="more" title="More">
      <svg
        width="1em"
        height="1em"
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
      >
        <use href="../../../public/svg/icons.svg#icon-more"></use>
      </svg>
      <span id="more">More</span>
    </button>
  </template>
</icon-button>
```

To hide the text, add the "hidden" attribute:

```html
<span id="more" hidden>More</span>
```

<icon-button>
  <template shadowrootmode="open">
    <button aria-labelledby="more" title="More">
      <svg
        width="1em"
        height="1em"
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
      >
        <use href="../../../public/svg/icons.svg#icon-more"></use>
      </svg>
      <span id="more" hidden>More</span>
    </button>
  </template>
</icon-button>

## Accessibility

Uses "[Technique #2: Accessible Visually Hidden Text with hidden and aria-labelledby](https://www.sarasoueidan.com/blog/accessible-icon-buttons/#technique-%232%3A-accessible-visually-hidden-text-with-hidden-and-aria-labelledby)" from [Accessible Icon Buttons](https://www.sarasoueidan.com/blog/accessible-icon-buttons/) by Sara Soueidan.

Buttons should always have an accessible name, and in buttons represented by icons, the accessible name may be provided from the aria-label or aria-labelledby attributes. See MDN "[Basic Buttons](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role#basic_buttons)".

MDN [Aria Labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby): "The aria-labelledby property value can include content from elements that aren't even visible. While you should provide assistive technology users with the same content as all other users, you can include content from elements with the HTML hidden attribute ...."

"If the label text is available in the DOM (i.e. typically visible text content), authors SHOULD use aria-labelledby and SHOULD NOT use aria-label." [Accessible Rich Internet Applications (WAI-ARIA) 1.2](https://www.w3.org/TR/wai-aria-1.2/#aria-label)

Using only a title attribute for accessibility is [not recommended](https://www.w3.org/WAI/tutorials/forms/labels/#using-the-title-attribute), but providing a title attribute in addition to aria-labelledby provides additional information for visual users when the text is hidden, although this technique is open to debate and potential inconsistency across screen readers. See "[Text Links: Best Practices for Screen Readers](https://www.deque.com/blog/text-links-practices-screen-readers/)" by Sailesh Panchang. See also [JAWS reads both "aria-label" and "title" attribute for button](https://github.com/FreedomScientific/standards-support/issues/654)/

## Theming
