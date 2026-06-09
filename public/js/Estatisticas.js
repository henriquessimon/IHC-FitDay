import { loadRotina } from "./Rotina.js";
import { Header } from "../../components/header.js"
import { isAuthenticated, getUser} from "./Auth.js";

if(!isAuthenticated()) {

    window.location.href =
        "../views/logAndCreateUser.html";
}

const rotinaExercicios = loadRotina();

renderEstatisticas();

const currentUser = getUser();

document.querySelector(".userNameTitle")
    .textContent = `${currentUser.name}`;

const htmlHeader = Header()
const headerPage = document.querySelector(".headerPage")

headerPage.innerHTML = htmlHeader



function renderEstatisticas() {

    renderResumo();

    renderProgressos();

    renderRotinaSemana();

    renderDetalhes();
}


function renderResumo() {

    //========================
    // TEMPO TREINADO
    //========================

    const totalTreinado =
        rotinaExercicios.reduce(
            (acc, dia) =>
                acc + dia.tempo_feito,
            0
        );

    const totalMetaTreino =
        rotinaExercicios.reduce(
            (acc, dia) =>
                acc + dia.meta_exercicio,
            0
        );

    document.getElementById(
        "tempoTreinadoSemana"
    ).textContent =
        `${formatTime(totalTreinado)} / ${formatTime(totalMetaTreino)}`;

    //========================
    // ÁGUA
    //========================

    const totalAgua =
        rotinaExercicios.reduce(
            (acc, dia) =>
                acc + dia.ml_bebidos,
            0
        );

    const totalMetaAgua =
        rotinaExercicios.reduce(
            (acc, dia) =>
                acc + dia.meta_agua,
            0
        );

    document.getElementById(
        "aguaSemana"
    ).textContent =
        `${totalAgua}ml / ${totalMetaAgua}ml`;

    //========================
    // CONSISTÊNCIA
    //========================

    const diasComMeta =
        rotinaExercicios.filter(
            dia => dia.meta_exercicio > 0
        );

    const diasConcluidos =
        diasComMeta.filter(
            dia =>
                dia.tempo_feito >=
                dia.meta_exercicio
        );

    const consistencia =
        diasComMeta.length > 0
        ? Math.round(
            (diasConcluidos.length /
            diasComMeta.length) * 100
        )
        : 0;

    document.getElementById(
        "consistenciaSemana"
    ).textContent =
        `${consistencia}%`;
}

function renderProgressos() {

    const totalTreinado =
        rotinaExercicios.reduce(
            (acc, dia) =>
                acc + dia.tempo_feito,
            0
        );

    const totalMetaTreino =
        rotinaExercicios.reduce(
            (acc, dia) =>
                acc + dia.meta_exercicio,
            0
        );

    const treinoPercent =
        totalMetaTreino > 0
        ? Math.round(
            (totalTreinado /
            totalMetaTreino) * 100
        )
        : 0;

    document.getElementById(
        "treinoPercentText"
    ).textContent =
        `${treinoPercent}%`;

    document.getElementById(
        "treinoProgress"
    ).value =
        treinoPercent;

    //========================
    // ÁGUA
    //========================

    const totalAgua =
        rotinaExercicios.reduce(
            (acc, dia) =>
                acc + dia.ml_bebidos,
            0
        );

    const totalMetaAgua =
        rotinaExercicios.reduce(
            (acc, dia) =>
                acc + dia.meta_agua,
            0
        );

    const aguaPercent =
        totalMetaAgua > 0
        ? Math.round(
            (totalAgua /
            totalMetaAgua) * 100
        )
        : 0;

    document.getElementById(
        "aguaPercentText"
    ).textContent =
        `${aguaPercent}%`;

    document.getElementById(
        "aguaProgress"
    ).value =
        aguaPercent;
}

function renderRotinaSemana() {

    const diasContainer =
        document.getElementById(
            "diasSemana"
        );

    diasContainer.innerHTML = "";

    rotinaExercicios.forEach((dia, index) => {

        const statusClasse =
            getStatusDia(dia, index);;

        let simbolo = "•";

        if(statusClasse === "descanso") {
            simbolo = "−";
        }

        if(statusClasse === "concluido") {
            simbolo = "✔";
        }

        if(statusClasse === "falhou") {
            simbolo = "✖";
        }

        diasContainer.innerHTML += `
            <article class="diaStatus ${statusClasse}">
                <h3>${dia.dia.slice(0,3)}</h3>
                <span>${simbolo}</span>
            </article>
        `;
    });
}

function renderDetalhes() {

    const detalhes =
        document.getElementById(
            "detalhesLista"
        );

    detalhes.innerHTML = "";

    //========================
    // MAIOR TREINO
    //========================

    const maiorTreino =
        [...rotinaExercicios]
        .sort(
            (a,b) =>
                b.tempo_feito -
                a.tempo_feito
        )[0];

    detalhes.innerHTML += `
        <article class="detalheItem">
            <span>Maior treino</span>

            <strong>
                ${maiorTreino.dia} -
                ${formatTime(maiorTreino.tempo_feito)}
            </strong>
        </article>
    `;
}

function formatTime(seconds) {

    const hours =
        Math.floor(seconds / 3600);

    const minutes =
        Math.floor(
            (seconds % 3600) / 60
        );

    return `${hours}h ${minutes}m`;
}

function getStatusDia(diaObj, index) {

    const hojeJS =
        new Date().getDay();

    /*
    JS:
    domingo = 0
    segunda = 1
    ...
    sábado = 6
    */

    const hojeIndex =
        hojeJS === 0 ? 6 : hojeJS - 1;

    // descanso
    if (
        !diaObj.meta_exercicio ||
        diaObj.meta_exercicio <= 0
    ) {
        return "descanso";
    }

    const treinoCompleto =
        diaObj.tempo_feito >=
        diaObj.meta_exercicio;

    const aguaCompleta =
        diaObj.ml_bebidos >=
        diaObj.meta_agua;

    if (
        treinoCompleto &&
        aguaCompleta
    ) {
        return "concluido";
    }

    // dia já passou
    if (index < hojeIndex) {
        return "falhou";
    }

    // hoje ou futuro
    return "pendente";
}