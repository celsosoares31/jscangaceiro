class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document);

    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");

    this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView("#negociacoes"), "adiciona", "esvazia");

    this._mensagem = new Bind(new Mensagem(), new MensagemView("#mensagemView"), "texto");
    this._service = new NegociacaoService();
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

  importaNegociacoes(e) {
    // this._service.obtemNegociacoesDaSemana((err, negociacoes) => {
    //   if (err) {
    //     this._mensagem.texto = err;
    //     return;
    //   }
    //   negociacoes.forEach((negociacao) => this._negociacoes.adiciona(negociacao));
    //   this._mensagem.texto = `Negociacoes importadas com sucesso`;
    // });
    //FIXME: The code below is optional to the code above, the idea implemented below, uses promisses to handle the imports to the API
    // const negociacoes = [];
    // this._service
    //   .obtemNegociacoesDaSemana()
    //   .then((semana) => {
    //     negociacoes.push(...semana);
    //     return this._service.obtemNegociacoesDaSemanaAnterior();
    //   })
    //   .then((anterior) => {
    //     negociacoes.push(...anterior);
    //     return this._service.obtemNegociacoesDaSemanaRetrasada();
    //   })
    //   .then((retrasada) => {
    //     negociacoes.push(...retrasada);
    //     negociacoes.forEach((negociacao) => this._negociacoes.adiciona(negociacao));
    //     this._mensagem.texto = `Negociacoes importadas com sucesso`;
    //   })
    //   .catch((error) => (this._mensagem.texto = error));

    this._service.obtemNegociacoesDoPeriodo().then((negociacoes) => {
      negociacoes
        .filter(
          (novaNegociacao) => !this._negociacoes.paraArray().some((negociacaoExistente) => novaNegociacao.equals(negociacaoExistente))
        )
        .forEach((negociacao) => this._negociacoes.adiciona(negociacao));
    });
  }
}
