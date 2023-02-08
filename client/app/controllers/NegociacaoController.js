System.register(["../domain/negociacao/Negociacoes", "../ui/views/NegociacoesView", "../ui/models/Mensagem", "../ui/views/MensagemView", "../domain/negociacao/NegociacaoService", "../util/DaoFactory", "../ui/converters/DataInvalidaException", "../domain/negociacao/Negociacao", "../util/Bind", "../ui/converters/DateConverter"], function (_export, _context) {
  "use strict";

  var Negociacoes, NegociacoesView, Mensagem, MensagemView, NegociacaoService, getNegociacaoDao, DataInvalidaException, Negociacao, Bind, DateConverter;
  return {
    setters: [function (_domainNegociacaoNegociacoes) {
      Negociacoes = _domainNegociacaoNegociacoes.Negociacoes;
    }, function (_uiViewsNegociacoesView) {
      NegociacoesView = _uiViewsNegociacoesView.NegociacoesView;
    }, function (_uiModelsMensagem) {
      Mensagem = _uiModelsMensagem.Mensagem;
    }, function (_uiViewsMensagemView) {
      MensagemView = _uiViewsMensagemView.MensagemView;
    }, function (_domainNegociacaoNegociacaoService) {
      NegociacaoService = _domainNegociacaoNegociacaoService.NegociacaoService;
    }, function (_utilDaoFactory) {
      getNegociacaoDao = _utilDaoFactory.getNegociacaoDao;
    }, function (_uiConvertersDataInvalidaException) {
      DataInvalidaException = _uiConvertersDataInvalidaException.DataInvalidaException;
    }, function (_domainNegociacaoNegociacao) {
      Negociacao = _domainNegociacaoNegociacao.Negociacao;
    }, function (_utilBind) {
      Bind = _utilBind.Bind;
    }, function (_uiConvertersDateConverter) {
      DateConverter = _uiConvertersDateConverter.DateConverter;
    }],
    execute: function () {
      class NegociacaoController {
        constructor() {
          const $ = document.querySelector.bind(document);

          this._inputData = $("#data");
          this._inputQuantidade = $("#quantidade");
          this._inputValor = $("#valor");

          this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView("#negociacoes"), "adiciona", "esvazia");

          this._mensagem = new Bind(new Mensagem(), new MensagemView("#mensagemView"), "texto");
          this._service = new NegociacaoService();

          this._init();
        }
        _init() {
          getNegociacaoDao().then(dao => dao.listaTodos()).then(negociacoes => negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))).catch(err => this._mensagem.texto = err);
        }
        adiciona(e) {
          try {
            e.preventDefault();
            const negociacao = this._criaNegociacao();
            getNegociacaoDao().then(dao => dao.adiciona(negociacao)).then(() => {
              this._negociacoes.adiciona(this._criaNegociacao());
              this._mensagem.texto = "Negociacao adicionada com sucesso";
              this._limpaFormulario();
            });
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
          return new Negociacao(DateConverter.paraData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
        apaga() {
          getNegociacaoDao().then(dao => dao.apagaTodos()).then(() => {
            this._negociacoes.esvazia();
            this._mensagem.texto = "Negociacoes apagadas com sucesso";
          }).catch(err => this._mensagem.texto = err);
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

          this._service.obtemNegociacoesDoPeriodo().then(negociacoes => {
            negociacoes.filter(novaNegociacao => !this._negociacoes.paraArray().some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente))).forEach(negociacao => this._negociacoes.adiciona(negociacao));
          });
        }
      }

      _export("NegociacaoController", NegociacaoController);
    }
  };
});
//# sourceMappingURL=NegociacaoController.js.map