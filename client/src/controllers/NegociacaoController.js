import { Negociacoes } from '../domain/negociacao/Negociacoes';
import { Mensagem } from '../ui/models/Mensagem';
import { MensagemView } from '../ui/views/MensagemView';
import { NegociacoesView } from '../ui/views/NegociacoesView';

import { getNegociacaoDao } from '../util/DaoFactory';

import { Negociacao } from '../domain/negociacao/Negociacao';
import { Bind } from '../util/Bind';
import { DateConverter } from '../ui/converters/DateConverter';
import { getExceptionMessage } from '../util/ApplicationException';
import { debounce } from '../util/decoractors/Debounce';
import { controller } from '../util/decoractors/Controller';
import { bindEvent } from '../util/decoractors/BindEvent';

@controller('#data', '#quantidade', '#valor')
class NegociacaoController {
  constructor(_inputData, _inputQuantidade, _inputValor) {
    Object.assign(this, { _inputData, _inputQuantidade, _inputValor });

    this._negociacoes = new Bind(
      new Negociacoes(),
      new NegociacoesView('#negociacoes'),
      'adiciona',
      'esvazia'
    );

    this._mensagem = new Bind(new Mensagem(), new MensagemView('#mensagemView'), 'texto');
    // this._service = new NegociacaoService();

    this._init();
  }
  async _init() {
    try {
      const dao = await getNegociacaoDao();
      const negociacoes = await dao.listaTodos();
      negociacoes.forEach((negociacao) => this._negociacoes.adiciona(negociacao));
    } catch (err) {
      this._mensagem.texto = getExceptionMessage(err);
    }
  }
  @debounce()
  @bindEvent('submit', '.form')
  async adiciona(e) {
    try {
      // e.preventDefault();
      const negociacao = this._criaNegociacao();
      const dao = await getNegociacaoDao();
      const negociacoes = await dao.adiciona(negociacao);

      this._negociacoes.adiciona(this._criaNegociacao());
      this._mensagem.texto = 'Negociacao adicionada com sucesso';
      this._limpaFormulario();
    } catch (err) {
      this._mensagem.texto = getExceptionMessage(err);
    }
  }
  //the method below can only be accessed inside the class. its a private method
  _limpaFormulario() {
    this._inputData.value = '';
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
  @bindEvent('click', '#botao-apaga')
  async apaga() {
    try {
      const dao = await getNegociacaoDao();
      await dao.apagaTodos();

      this._negociacoes.esvazia();
      this._mensagem.texto = 'Negociacoes apagadas com sucesso';
    } catch (err) {
      this._mensagem.texto = getExceptionMessage(err);
    }
  }

  @debounce()
  @bindEvent('click', '#botao-importa')
  async importaNegociacoes() {
    try {
      const { NegociacaoService } = await import('../domain/negociacao/NegociacaoService');

      const service = new NegociacaoService();
      const negociacoes = await service.obtemNegociacoesDoPeriodo();
      console.log(negociacoes);

      negociacoes
        .filter(
          (novaNegociacao) =>
            !this._negociacoes
              .paraArray()
              .some((negociacaoExistente) => novaNegociacao.equals(negociacaoExistente))
        )
        .forEach((negociacao) => this._negociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociacoes importadas com sucesso.';
    } catch (err) {
      this._mensagem.texto = getExceptionMessage(err);
    }
  }
}

export { NegociacaoController };
