import { Ingresso } from "../models/Ingresso.js";

export function renderizarAssentos(sessao, aoComprar) {
  const container = document.getElementById("app");
  container.innerHTML = "";

  // BOTÃO VOLTAR (fora do loop!)
  const btnVoltar = document.createElement("button");
  btnVoltar.textContent = "Voltar";
  btnVoltar.classList.add("btn-voltar");
  btnVoltar.onclick = () => history.back(); // temporário

  container.appendChild(btnVoltar);

  // TÍTULO
  const titulo = document.createElement("h2");
  titulo.textContent = `Escolha seu assento - ${sessao.filme.titulo}`;
  container.appendChild(titulo);

  const tela = document.createElement("div");
  tela.classList.add("tela");
  tela.textContent = "TELA";
  container.appendChild(tela);

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
        const resultado = sessao.venderIngresso(assento.id);

        console.log(resultado.mensagem);

        if (resultado.sucesso) {
          // criar ingresso
          const ingresso = new Ingresso(sessao, assento.id);

          // avisar o main que comprou
          if (aoComprar) {
            aoComprar(ingresso);
          }

          renderizarAssentos(sessao, aoComprar);
        }
      };

      linha.appendChild(botao);
    });

    container.appendChild(linha);
  });
}
