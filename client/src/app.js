import { NegociacaoController } from './controllers/NegociacaoController';
import { Negociacao } from './domain/negociacao/Negociacao';

const controller = new NegociacaoController();
const negociacao = new Negociacao(new Date(), 20, 200);
const headers = new Headers();

headers.set('Content-Type', 'application/json');

const method = 'POST';
const body = JSON.stringify(negociacao);

const config = {
  method,
  headers,
  body,
};

const url = '/negociacoes';
// fetch(url, config).then(() => console.log('Dado enviado com sucesso'));
