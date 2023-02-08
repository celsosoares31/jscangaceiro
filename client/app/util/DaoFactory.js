System.register([], function (_export, _context) {
  "use strict";

  function getNegociacaoDao() {
    return ConnectionFactory.getConnection().then(conn => new NegociacaoDao(conn));
  }

  _export("getNegociacaoDao", getNegociacaoDao);

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=DaoFactory.js.map