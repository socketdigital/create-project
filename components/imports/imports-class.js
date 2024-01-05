export default class Imports {
  static imports = [];

  static async fetchImports() {
    await Promise.allSettled(Imports.imports).then((results) => {
      document.documentElement.removeAttribute(
        "data-hidden-until-imports-imported"
      );
    });
  }

  static async fetchImport(fetchImportPromise, that) {
    if (
      document.documentElement.hasAttribute(
        "data-hidden-until-imports-imported"
      )
    ) {
      Imports.imports.push(fetchImportPromise);
      if (that.hasAttribute("data-visible-when-imported")) {
        await Imports.fetchImports();
      }
      return;
    }

    await Promise.allSettled([fetchImportPromise]);
  }
}
