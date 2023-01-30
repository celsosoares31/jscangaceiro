class NegociacaoController {
  constructor() {
    // alert("Controller em accao dd");
    const $ = document.querySelector.bind(document);

    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");

    this._negociacoes = new Negociacoes();
    this._negociacoesView = new NegociacoesView("#negociacoes");
    this._negociacoesView.update(this._negociacoes);

    this._mensagem = new Mensagem();
    this._mensagemView = new MensagemView("#mensagemView");
    this._mensagemView.update(this._mensagem);
  }
  adiciona(e) {
    e.preventDefault();

    this._negociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = "Negociacao adicionada com sucesso";
    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update(this._mensagem);

    this._limpaFormulario();
  }
  //the method below can only be accessed inside the class. its a private method
  _limpaFormulario() {
    this._inputData.value = "";
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }
  _criaNegociacao() {
    return new Negociacao(
      DateConverter.paraData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );
  }
}
