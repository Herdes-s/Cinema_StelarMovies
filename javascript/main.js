import { Sala } from "./models/Sala.js";
import { Sessao } from "./models/Sessao.js";
import { renderizarAssentos } from "./ui/renderizarAssentos.js";

const sala1 = new Sala(1, 50);

const sessao1 = new Sessao(1, "batman", "09:00", sala1.capacidade);

sala1.adicionarSessao(sessao1)

console.log(sala1)
renderizarAssentos(sessao1);
