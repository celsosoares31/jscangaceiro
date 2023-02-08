System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      const campos = [document.querySelector("#data"), document.querySelector("#valor"), document.querySelector("#quantidade")];
      // console.log(campos);

      const tbody = document.querySelector("table tbody");

      document.querySelector(".form").addEventListener("submit", function (e) {
        const tr = document.createElement("tr");
        campos.forEach(item => {
          const td = document.createElement("td");
          td.textContent = item.value;
          tr.appendChild(td);
        });
        const tdVolumes = document.createElement("td");

        tdVolumes.textContent = campos[1].value * campos[2].value;
        tr.appendChild(tdVolumes);
        tbody.appendChild(tr);
        // console.log(tr);
        e.preventDefault();
        campos.forEach(item => {
          item.value = "";
        });
        campos[2].value = 1;
        campos[0].focus();
      });
    }
  };
});
//# sourceMappingURL=index.js.map