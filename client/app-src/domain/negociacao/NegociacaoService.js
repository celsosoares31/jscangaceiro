export class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }
  obtemNegociacoesDaSemana() {
    return this._http.get("negociacoes/semana").then(
      (dados) => {
        const response = dados.map((obj) => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor));
        return response;
      },
      (err) => {
        throw new Error("Nao foi possivel obter as negociacoes da semana");
      }
    );
  }
  obtemNegociacoesDaSemanaAnterior() {
    return this._http.get("negociacoes/anterior").then(
      (dados) => dados.map((obj) => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)),
      (err) => {
        throw new Error("Nao foi possivel obter as negociacoes da semana anterior");
      }
    );
  }
  obtemNegociacoesDaSemanaRetrasada() {
    return this._http.get("negociacoes/retrasada").then(
      (dados) => dados.map((obj) => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)),
      (err) => {
        throw new Error("Nao foi possivel obter as negociacoes da semana retrasada");
      }
    );
  }
  obtemNegociacoesDoPeriodo() {
    return Promise.all([this.obtemNegociacoesDaSemana(), this.obtemNegociacoesDaSemanaAnterior(), this.obtemNegociacoesDaSemanaRetrasada()])
      .then((periodo) => periodo.reduce((acc, periodo) => acc.concat(periodo), []).sort((a, b) => a.data.getTime() - b.data.getTime()))
      .catch((err) => {
        console.log(err);
        throw new Error(`Nao foi possivel obter as negociacoes do periodo`);
      });
  }
}
