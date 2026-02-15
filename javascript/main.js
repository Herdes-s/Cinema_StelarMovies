import { Sala } from "./models/Sala.js";
import { Sessao } from "./models/Sessao.js";
import { Filme } from "./models/Filme.js";
import { renderizarAssentos } from "./ui/renderizarAssentos.js";

const sala1 = new Sala(1, 50);

const batman = new Filme("Batman", 120, "14 anos", "Ação");

const sessao1 = new Sessao(batman, sala1, "09:00");

sala1.adicionarSessao(sessao1);

console.log(sessao1);

renderizarAssentos(sessao1);
