System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      class View {
        constructor(selector) {
          this._element = document.querySelector(selector);
        }
        update(model) {
          this._element.innerHTML = this.template(model);
        }
        template(model) {
          throw new Error("Voce precisa implementar o metodo tamplate(model)");
        }
      }

      _export("View", View);
    }
  };
});
//# sourceMappingURL=View.js.map