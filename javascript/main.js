import { Sala } from "./models/Sala.js";
import { Sessao } from "./models/Sessao.js";
import { Filme } from "./models/Filme.js";
import { Ingresso } from "./models/Ingresso.js";
import { renderizarAssentos } from "./ui/renderizarAssentos.js";

const app = document.getElementById("app");

let sessaoAtual = null;

let ingressos = [];

/* =========================
   INICIALIZAÇÃO DO SISTEMA
========================= */

const sala1 = new Sala(1, 50);

const filmes = [
  new Filme(
    "Batman",
    120,
    "14 anos",
    "Ação",
    "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  ),
  new Filme(
    "Interestelar",
    169,
    "10 anos",
    "Ficção Científica",
    "https://image.tmdb.org/t/p/w500/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg",
  ),
  new Filme(
    "Titanic",
    195,
    "12 anos",
    "Romance",
    "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
  ),
  new Filme(
    "Vingadores: Ultimato",
    181,
    "12 anos",
    "Ação",
    "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  ),
  new Filme(
    "Coringa",
    122,
    "16 anos",
    "Drama",
    "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  ),
];

const sessoes = filmes.map((filme, index) => {
  const sessao = new Sessao(filme, sala1, `${9 + index}:00`);
  sala1.adicionarSessao(sessao);
  return sessao;
});

/* =========================
   RENDER HOME
========================= */

function renderHome() {
  app.innerHTML = `
    <section class="banner">
      Bem-vindo ao StelarMovies 🍿
    </section>

    <section class="filmes-container">
      ${sessoes
        .map(
          (sessao, index) => `
        <div class="filme-card" data-id="${index}">
          <img src="${sessao.filme.imagem}" />
          <h3>${sessao.filme.titulo}</h3>
          <p class="genero ${formatarGenero(sessao.filme.genero)}">${sessao.filme.genero}</p>
        </div>
      `,
        )
        .join("")}
    </section>
  `;

  function formatarGenero(genero) {
    return genero
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }
}

function renderDetalhes(sessao) {
  sessaoAtual = sessao;

  app.innerHTML = `
    <section class="detalhes-container">

      <div class="detalhes-poster">
        <img src="${sessao.filme.imagem}" />
      </div>

      <div class="detalhes-info">
        <h2>${sessao.filme.titulo}</h2>
        <p><strong>Duração:</strong> ${sessao.filme.duracao} min</p>
        <p><strong>Classificação:</strong> ${sessao.filme.classificacao}</p>
        <p><strong>Gênero:</strong> ${sessao.filme.genero}</p>
        <p><strong>Horário:</strong> ${sessao.horario}</p>

        <button class="btn-comprar">Comprar Ingresso</button>
        <button class="btn-voltar">Voltar</button>
      </div>

    </section>
  `;
}

function renderIngressos() {
  app.innerHTML = `
    <h2 style="padding:20px;">Meus Ingressos</h2>

    <div class="ingressos-container">
      ${
        ingressos.length === 0
          ? "<p style='padding:20px;'>Nenhum ingresso comprado ainda.</p>"
          : ingressos
              .map(
                (ingresso) => `
          <div class="ingresso-card">
            <h3>${ingresso.filme}</h3>
            <p>Sala: ${ingresso.sala}</p>
            <p>Horário: ${ingresso.horario}</p>
            <p>Assento: ${ingresso.assento}</p>
            <p>Preço: R$ ${ingresso.preco}</p>
          </div>
        `,
              )
              .join("")
      }
    </div>
  `;
}

function mostrarNotificacao(mensagem, tipo = "sucesso") {
  const box = document.getElementById("notificacao");

  box.textContent = mensagem;
  box.className = "";
  box.classList.add("mostrar");

  if (tipo === "erro") {
    box.classList.add("erro");
  }

  setTimeout(() => {
    box.classList.remove("mostrar");
  }, 2000);
}

function renderizarMeusIngressos() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const titulo = document.createElement("h2");
  titulo.textContent = "Meus Ingressos 🎟️";
  app.appendChild(titulo);

  if (ingressos.length === 0) {
    const vazio = document.createElement("p");
    vazio.textContent = "Você ainda não comprou ingressos.";
    app.appendChild(vazio);
    return;
  }

  ingressos.forEach((ingresso, index) => {
    const card = document.createElement("div");
    card.classList.add("card-ingresso");

    card.innerHTML = `
      <p><strong>Filme:</strong> ${ingresso.filme}</p>
      <p><strong>Assento:</strong> ${ingresso.assento}</p>
      <p><strong>Sessão:</strong> ${ingresso.horario}</p>
    `;

    app.appendChild(card);
  });

  const btnVoltar = document.createElement("button");
  btnVoltar.textContent = "Voltar";
  btnVoltar.classList.add("btn-voltar");
  btnVoltar.onclick = renderizarHome;

  app.appendChild(btnVoltar);
}

/* =========================
   EVENTOS
========================= */

document.addEventListener("click", (e) => {
  const card = e.target.closest(".filme-card");

  if (card) {
    const id = card.dataset.id;
    const sessao = sessoes[id];

    renderDetalhes(sessao);
  }
});

document.addEventListener("click", (e) => {
  const card = e.target.closest(".filme-card");
  if (card) {
    const id = card.dataset.id;
    renderDetalhes(sessoes[id]);
  }

  if (e.target.classList.contains("btn-voltar")) {
    renderHome();
  }

  if (e.target.classList.contains("btn-comprar")) {
    renderizarAssentos(sessaoAtual, (ingresso) => {
      ingressos.push(ingresso);
      mostrarNotificacao("Ingresso comprado com sucesso!");
    });
  }

  document
    .getElementById("btnIngressos")
    .addEventListener("click", renderIngressos);
});

document.addEventListener("click", (e) => {
  if (e.target.id === "meus-ingressos") {
    renderizarMeusIngressos();
  }
});

/* =========================
   INÍCIO
========================= */

renderHome();
