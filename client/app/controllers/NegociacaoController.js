class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document);

    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");

    this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView("#negociacoes"), "adiciona", "esvazia");

    this._mensagem = new Bind(new Mensagem(), new MensagemView("#mensagemView"), "texto");
  }
  adiciona(e) {
    try {
      e.preventDefault();
      this._negociacoes.adiciona(this._criaNegociacao());
      this._mensagem.texto = "Negociacao adicionada com sucesso";
      this._limpaFormulario();
    } catch (error) {
      console.log(error);

      if (error instanceof DataInvalidaException) {
        this._mensagem.texto = error.message;
      } else {
        this._mensagem.texto = `Erro desconhecido, por favor entrar em contacto com a assistencia`;
      }
    }
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
  apaga() {
    this._negociacoes.esvazia();

    this._mensagem.texto = "Negociacoes apagadas com sucesso";
  }
}
