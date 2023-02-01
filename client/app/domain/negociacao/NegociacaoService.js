class NegociacaoService {
  obterNegociacoesDaSemana(cb) {
    const xhr = new XMLHttpRequest(); // xmlHttpRequest is the class responsable by the AJAX requests in javascript
    xhr.open("GET", "negociacoes/semana"); //this line opens a GET connction to the route negociacoes/semana
    /**
     * the ready state can assume 4 status
     * 0. connection with the server not established
     * 1. connection established
     * 2. requisition received
     * 3. processing the request
     * 4. requisition ready and response ready
     */
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          const response = JSON.parse(xhr.responseText).map((obj) => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor));

          cb(null, response);
        } else {
          console.log(xhr.responseText);
          cd("Nao foi possivel obter as negociacoes da semana", null);
        }
      }
    };
    xhr.send(); //sending the requisition
  }
}
