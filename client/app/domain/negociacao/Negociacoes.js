class Negociacoes {
  constructor(objectUpdateHandler) {
    this._negociacoes = [];
    this._objectUpdateHandler = objectUpdateHandler;
    Object.freeze(this);
  }
  esvazia() {
    this._negociacoes.length = 0;
    this._objectUpdateHandler(this);
  }
  adiciona(negociacao) {
    this._negociacoes.push(negociacao);
    this._objectUpdateHandler(this);
  }
  paraArray() {
    return [].concat(this._negociacoes);
  }
  get volumeTotal() {
    return this._negociacoes.reduce((total, negociacao) => total + negociacao.volume, 0);
  }
}
