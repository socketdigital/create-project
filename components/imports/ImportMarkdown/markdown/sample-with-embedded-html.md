## Sample Markdown file with Embedded HTML

<p>Some text in a paragraph.</p>

This is markdown/sample-with-embedded-html.md.

- item 1
- item 2

<h3>Heading 3 in HTML tag</h3>

### Sample Component

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

<hr />
