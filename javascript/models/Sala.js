class Sala {
  constructor(numero) {
    this.numero = numero;
    this.assentos = this.criarAssentos();
  }

  criarAssentos() {
    let assentos = [];

    for (let i = 0; i < 5; i++) {
      let fileira = String.fromCharCode(65 + i);

      for (let j = 0; j < 10; j++) {
        assentos.push({
          id: `${fileira}${j}`,
          status: "disponivel",
        });
      }
    }

    return assentos;
  }

  venderAssentos(id) {
    const assento = this.assentos.find((a) => a.id === id);

    if (!assento) {
      console.log("assento não encontrado!");
      return;
    }

    if (assento.status === "vendido") {
      console.log("assento já vendido!");
      return;
    }

    assento.status = "vendido";
    console.log(`Assento ${id} vendido com sucesso.`);
  }

  assentosDisponiveis() {
    this.assentos.filter((assento) => assento.status == "disponivel");
  }

  quantidadeDisponivel() {
    return this.assentos.reduce(
      (acc, assento) => acc + (assento.status === "disponivel" ? 1 : 0),
      0,
    );
  }

  mapearAssentosPorFileira() {
    return this.assentos.reduce((acc, assento) => {
      const fileira = assento.id.charAt(0);

      if (!acc[fileira]) {
        acc[fileira] = [];
      }

      acc[fileira].push(assento);
      return acc;
    }, {});
  }

  obterMapaVisual() {
    const agrupado = this.mapearAssentosPorFileira();
    return Object.values(agrupado);
  }
}

function renderizarAssentos(sala) {
  const container = document.getElementById("cinema");
  container.innerHTML = "";

  const mapa = sala.obterMapaVisual();

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

      botao.addEventListener("click", () => {
        sala.venderAssentos(assento.id);
        renderizarAssentos(sala);
      });
      linha.appendChild(botao);
    });
    container.appendChild(linha);
  });
}

const sala1 = new Sala(1);
renderizarAssentos(sala1);