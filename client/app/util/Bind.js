System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      class Bind {
        constructor(model, view, ...props) {
          const proxy = ProxyFactory.create(model, props, model => view.update(model));
          view.update(model);
          return proxy;
        }
      }

      _export("Bind", Bind);
    }
  };
});
//# sourceMappingURL=Bind.js.map