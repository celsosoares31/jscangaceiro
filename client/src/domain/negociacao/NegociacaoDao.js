import { Negociacao } from "./Negociacao";

export class NegociacaoDao {
  constructor(connection) {
    this._connection = connection;
    this._store = "negociacoes";
  }
  adiciona(negociacao) {
    return new Promise((resolve, reject) => {
      const request = this._connection.transaction([this._store], "readwrite").objectStore(this._store).add(negociacao);

      request.onsuccess = (e) => resolve();

      request.onerror = (e) => reject("nao foi possivel salvar a negociacao");
    });
  }
  apagaTodos() {
    return new Promise((resolve, reject) => {
      const request = this._connection.transaction([this._store], "readwrite").objectStore(this._store).clear();

      request.onsuccess = (e) => resolve();

      request.onerror = (e) => reject("nao foi possivel apagar as negociacoes");
    });
  }
  listaTodos() {
    return new Promise((resolve, reject) => {
      const negociacoes = [];

      const cursor = this._connection.transaction([this._store], "readwrite").objectStore(this._store).openCursor();

      cursor.onsuccess = (e) => {
        const actual = e.target.result;

        if (actual) {
          negociacoes.push(new Negociacao(actual.value._data, actual.value._quantidade, actual.value._valor));
          actual.continue();
        } else {
          resolve(negociacoes);
        }
      };

      cursor.onerror = (e) => reject("nao foi possivel listar as negociacao");
    });
  }
}
