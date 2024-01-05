# Details Tabs Shadow DOM

Displays Details Accordion in a tabs layout

- Details Tabs - details elements in light DOM
- Details Tabs Shadow DOM - details elements in shadow DOM

Fixed height

## Basic Usage

```html
<details-tabs-shadow-dom>
  <template shadowrootmode="open">
    <link rel="stylesheet" href="details-tabs-shadow-dom.css" />
    <style>
      :host(details-tabs-shadow-dom) {
        --details-tabs-height: 100%;
        --text: var(--text-custom);
        --surface: var(--surface-custom);
        --details-tabs-header-text: var(--text-dark);
        --details-tabs-header-surface: var(--surface-dark);
      }
    </style>
    <section>
      <details open>
        <summary>Tab 1</summary>
        <div class="details-content">
          Details about tab 1. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Dolores expedita, necessitatibus perspiciatis nobis
          maiores nulla sit quaerat itaque consectetur quod asperiores
          aspernatur? Earum, sunt dolorum fugiat iure beatae quisquam soluta!
        </div>
      </details>
      <details>
        <summary>Tab 2</summary>
        <div class="details-content">
          Details about tab 2. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Recusandae ducimus tempora odio esse possimus
          dignissimos culpa, sed nesciunt neque. Ut nulla nobis iste dolor
          dignissimos accusamus reiciendis molestiae illum velit.
        </div>
      </details>
      <details>
        <summary>Tab 3 (long)</summary>
        <div class="details-content">
          Details about tab 3 Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Tempore consectetur labore, odit incidunt dolores
          obcaecati ullam doloribus possimus similique itaque assumenda dolore
          temporibus corporis dolor error debitis cum quidem. Nobis.
          <p>
            Quae rem obcaecati temporibus ut nihil, molestiae vitae dolores a
            est alias labore adipisci optio perferendis itaque eos delectus
            doloribus sit, nesciunt sed consequuntur veritatis placeat ex
            tempora cupiditate. Totam!
          </p>
          <p>
            Eius vero eum quis, corporis dolores eveniet itaque perspiciatis,
            libero deserunt harum nobis nihil amet voluptas nisi quam accusamus
            quae tempore quo saepe eaque laborum vel pariatur. Quo, esse
            aperiam.
          </p>
          <p>
            Animi tempore numquam in eos corporis, mollitia magni culpa
            voluptatibus labore quo error quam dicta tenetur sit ea! Dolorum
            eius maxime laborum eaque error mollitia sit necessitatibus omnis
            sunt impedit.
          </p>
        </div>
      </details>
    </section>
  </template>
</details-tabs-shadow-dom>
```
