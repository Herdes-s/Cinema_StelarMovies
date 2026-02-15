import { SeatManager } from "../SeatManager.js";
import { Ingresso } from "../models/Ingresso.js";

export class Sessao {
  constructor(filme, sala, horario) {
    this.filme = filme;
    this.sala = sala;
    this.horario = horario;

    this.seatManager = new SeatManager(sala.capacidade);
    this.ingressosVendidos = [];
  }

  venderAssento(id) {
    return this.seatManager.venderAssento(id);
  }

  assentosDisponiveis() {
    return this.seatManager.assentosDisponiveis();
  }

  quantidadeDisponivel() {
    return this.seatManager.quantidadeDisponivel();
  }

  venderIngresso(assentoId, preco = 30) {
    const resultado = this.seatManager.venderAssento(assentoId);

    if (!resultado.sucesso) {
      return resultado;
    }

    const ingresso = new Ingresso(this, assentoId, preco);

    this.ingressosVendidos.push(ingresso);

    return {
      sucesso: true,
      mensagem: "Ingresso vendido com sucesso!",
      ingresso: ingresso,
    };
  }
  

  obterMapaVisual() {
    return this.seatManager.obterMapaVisual();
  }

  venderAssento(id) {
    return this.seatManager.venderAssento(id);
  }
}
