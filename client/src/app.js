import { NegociacaoController } from "./controllers/NegociacaoController";
import { debounce } from "./util/Debounce";

const controller = new NegociacaoController();
const $ = document.querySelector.bind(document);
$("form").addEventListener("submit", controller.adiciona.bind(controller));
$("#botao-apaga").addEventListener("click", controller.apaga.bind(controller));
$("#botao-importa").addEventListener(
  "click",
  debounce(() => {
    console.log("Executou a operacao do debounce");
    controller.importaNegociacoes.bind(controller);
  }, 1000)
);
