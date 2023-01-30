class DateConverter {
  constructor() {
    throw new Error("A classe date converter nao pode ser instanciada");
  }
  static paraTexto(data) {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }
  static paraData(texto) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
      throw new Error("A data deve obdecer o formato aaaa-mm-dd");
    }
    return new Date(...texto.split("-").map((item, indice) => item - (indice % 2)));
  }
}
