class Negociacao {
  constructor(_data, _quantidade, _valor) {
    Object.assign(this, {
      _quantidade,
      _valor,
    });
    (this._data = new Date(_data.getTime())), //this will avoid having date object reference.
      //the line below freezes the objects creted through the constructor, to proibit the object change afterward.
      Object.freeze(this);
  }
  get volume() {
    return this._valor * this._quantidade;
  }
  get quantidade() {
    return this._quantidade;
  }
  get valor() {
    return this._valor;
  }
  get data() {
    return new Date(this._data.getTime()); // this will avoid the date from being updated, after the object creation.
  }
}
