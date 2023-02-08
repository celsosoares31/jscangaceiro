System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      class DataInvalidaException extends ApplicationException {
        constructor() {
          super(`A data deve obdecer o formato "dd/aa/mmmm"`);
        }
      }

      _export("DataInvalidaException", DataInvalidaException);
    }
  };
});
//# sourceMappingURL=DataInvalidaException.js.map