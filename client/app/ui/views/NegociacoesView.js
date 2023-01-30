class NegociacoesView extends View {
  template(model) {
    console.log(model);
    return `
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th>DATA</th>
          <th>QUANTIDADE</th>
          <th>VALOR</th>
          <th>VOLUME</th>
        </tr>
      </thead>

      <tbody>
      ${model
        .paraArray()
        .map((negociacao) => {
          const { data, quantidade, valor, volume } = negociacao;
          return `<tr>
          <td>${DateConverter.paraTexto(data)}</td>
          <td>${quantidade}</td>
          <td>${valor}</td>
          <td>${volume}</td>
        </tr>;
        `;
        })
        .join("")}
      </tbody>

      <tfoot>
      <tr>
      <td colspan="3"></td>
      <td>${model.volumeTotal}</td>
      </tr>
      </tfoot>
    </table>`;
  }
}
