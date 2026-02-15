export class Ingresso {
  constructor(sessao, assentoId, preco) {
    this.id = crypto.randomUUID();
    this.filme = sessao.filme.titulo;
    this.horario = sessao.horario;
    this.sala = sessao.sala.numero;
    this.assento = assentoId;
    this.preco = preco;
    this.dataCompra = new Date();
  }
}
