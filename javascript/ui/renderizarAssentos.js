export function renderizarAssentos(sessao) {
  const container = document.getElementById("cinema");
  container.innerHTML = "";

  const mapa = sessao.obterMapaVisual();

  mapa.forEach((fileira) => {
    const linha = document.createElement("div");
    linha.classList.add("fileira");

    fileira.forEach((assento) => {
      const botao = document.createElement("button");

      botao.textContent = assento.id;
      botao.classList.add("assento");

      if (assento.status === "vendido") {
        botao.classList.add("vendido");
      }

      botao.onclick = () => {
        const resultado = sessao.venderAssento(assento.id);

        console.log(resultado.mensagem);

        if (resultado.sucesso) {
          renderizarAssentos(sessao);
        }
      };

      linha.appendChild(botao);
    });

    container.appendChild(linha);
  });
}
