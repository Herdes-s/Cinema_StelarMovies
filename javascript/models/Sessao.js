import { SeatManager } from "../SeatManager.js";

export class Sessao {
  constructor(filme, sala, horario) {
    this.filme = filme;
    this.sala = sala;
    this.horario = horario;

    this.seatManager = new SeatManager(sala.capacidade);
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

  obterMapaVisual() {
    return this.seatManager.obterMapaVisual();
  }

  venderAssento(id) {
    return this.seatManager.venderAssento(id);
  }
}
