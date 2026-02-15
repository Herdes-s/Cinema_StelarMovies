export class SeatManager {
  constructor(capacidade = 50) {
    this.assentos = this.criarAssentos(capacidade);
  }

  criarAssentos(capacidade) {
    const assentos = [];
    const fileiras = capacidade / 10;

    for (let i = 0; i < fileiras; i++) {
      const letraFileira = String.fromCharCode(65 + i);

      for (let j = 1; j <= 10; j++) {
        assentos.push({
          id: `${letraFileira}${j}`,
          status: "disponivel",
        });
      }
    }
    return assentos;
  }

  venderAssento(id) {
    const assento = this.assentos.find((a) => a.id === id);

    if (!assento) {
      return {
        sucesso: false,
        mensagem: "Assento não encontrado!",
      };
    }

    if (assento.status === "vendido") {
      return {
        sucesso: false,
        mensagem: "Assento indisponivel!",
      };
    }

    assento.status = "vendido";

    return {
      sucesso: true,
      mensagem: `Assento ${id} vendido com Sucesso!`,
    };
  }

  assentosDisponiveis() {
    return this.assentos.filter((assento) => assento.status === "disponivel");
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
    return Object.values(this.mapearAssentosPorFileira());
  }
}
