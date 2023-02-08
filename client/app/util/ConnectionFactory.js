System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      const stores = ["negociacoes"];
      let connection = null;
      let close = null;

      class ConnectionFactory {
        constructor() {
          throw new Error("Nao e possivel criar instancias desta classe");
        }
        static _createStores(connection) {
          stores.forEach(store => {
            if (connection.objectStoreNames.contains(store)) {
              connection.deleteObjectStore(store);
            }
            connection.createObjectStore(store, { autoIncrement: true });
          });
        }
        static closeConnection() {
          if (connection) close();
        }
        static getConnection() {
          return new Promise((resolve, reject) => {
            if (connection) return resolve(connection);
            const openRequest = indexedDB.open("cangaceiroDB", 1);

            openRequest.onupgradeneeded = e => {
              ConnectionFactory._createStores(e.target.result);
            };

            openRequest.onsuccess = e => {
              connection = e.target.result;
              close = connection.close.bind(connection);
              connection.close = () => {
                throw new Error("Voce nao pode fechar a conexao directamente");
              };
              resolve(e.target.result);
            };

            openRequest.onerror = e => {
              reject(e.target.error.name);
            };
          });
        }
      }

      _export("ConnectionFactory", ConnectionFactory);
    }
  };
});
//# sourceMappingURL=ConnectionFactory.js.map