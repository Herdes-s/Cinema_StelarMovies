export class Sala {
  constructor(numero, capacidade) {
    this.numero = numero;
    this.capacidade = capacidade;
    this.sessoes = [];
  }

  adicionarSessao(sessao) {
    this.sessoes.push(sessao);
  }

  removerSessao(id) {
    this.sessoes = this.sessoes.filter((s) => s.id !== id);
  }

  obterSessao(id) {
    return this.sessoes.find((s) => s.id === id);
  }
}
