import { saveRotina, loadRotina } from "./rotina.js";

const estatisticasButton =
    document.querySelector(".estatisticas");

const rotinaButton =
    document.querySelector(".rotina");

//========================
// IR PARA ESTATÍSTICAS
//========================
estatisticasButton.addEventListener("click", () => {
    const rotinaExercicios = loadRotina();

    saveRotina(rotinaExercicios);
    const paginaAtual =
        window.location.pathname;

    if (
        !paginaAtual.includes("estatistica.html")
    ) {
        window.location.href =
            "estatisticas.html";
    }
});

//========================
// IR PARA ROTINA
//========================
rotinaButton.addEventListener("click", () => {
    const rotinaExercicios = loadRotina();
    saveRotina(rotinaExercicios);
    const paginaAtual =
        window.location.pathname;

    if (
        !paginaAtual.includes("rotina.html")
    ) {
        window.location.href =
            "index.html";
    }
});