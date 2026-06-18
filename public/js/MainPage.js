import { DayCard } from "../../components/dayCard.js"
import { Header } from "../../components/header.js"
import { saveRotina, loadRotina, defaultRotinaExercicios  } from "./rotina.js";
import { isAuthenticated, logout, getCurrentUserRoutine } from "./Auth.js";

if(!isAuthenticated()) {

    window.location.href =
        "../views/logAndCreateUser.html";
}

if ("Notification" in window) {
    Notification.requestPermission();
} else {
    console.log("Navegador não suporta notificações");
}

const rotinaExercicios = loadRotina();

console.log(rotinaExercicios.map(d => ({
    dia: d.dia,
    interval: d.interval,
    tipo: typeof d.interval
})));

//ARRAY DE OBJETOS COM CADA DIA DE EXERCÍCIO INCIAL

window.rotinaExercicios = rotinaExercicios;

const cards = document.getElementById("cards"); //PEGA O ELEMENTO HTML PARA INSERIR CARDS DOS DIAS

//PERCORRE TODOS O ARRAY rotinaExercicios DIA POR DIA INSERINDO O 
// HTML GERADO A PARTIR DE DayCard PASSANDO CADA dia COMO PARAMETRO
let html = "";

rotinaExercicios.forEach(dia => {
    html += DayCard(dia)
})

const htmlHeader = Header()
const headerPage = document.querySelector(".headerPage")

headerPage.innerHTML = htmlHeader
cards.innerHTML = html;

let currentDayIndex = 0;

hydrateUIFromCache();

//ATUALIZA META DE TREINOS
document.addEventListener('change', (e) => {
    if(e.target.classList.contains("metaTreino")) {
        const dia = e.target.closest(".dayCard").dataset.day
        const barra = e.target.closest(".dayCard").querySelector(".barraTreino")
        const meta = e.target.value
    
        const sec_meta = attMetaDia(dia, meta)

        barra.max = sec_meta
        
    }
})


document.addEventListener('click', (e) => {

    if(!e.target.classList.contains("timerButton"))
        return;

    const dia =
        e.target.closest(".dayCard").dataset.day;

    const barra =
        e.target.closest(".dayCard")
            .querySelector(".barraTreino");

    const contador =
        e.target.closest(".dayCard")
            .querySelector(".contador");

    const objDia =
        rotinaExercicios.find(d => d.dia == dia);

    const meta =
        objDia.meta_exercicio;

    if(objDia.interval) {

        pauseTimer(objDia);

        e.target.classList.remove("pausa");
        e.target.classList.add("inicia");
        e.target.textContent = "Retomar";

    } else {

       const iniciou = startTimer(
            objDia,
            barra,
            meta,
            contador
        );

        if(iniciou) {
            e.target.classList.remove("inicia");
            e.target.classList.add("pausa");
            e.target.textContent = "Pausar";
            e.setAttribute(
                "aria-label",
                "Pausar cronômetro do treino"
            );
        }
    }
});

//ADICIONA META DE AGUA E ATUALIZA QUANTIDADE BEBIDO
document.addEventListener('change', (e) => {
    const dia = e.target.closest(".dayCard").dataset.day
    const objDia = rotinaExercicios.find(d => d.dia == dia)
    if (e.target.classList.contains("inserirMetaAgua")) {
        objDia.meta_agua = Number(e.target.value)
        updateAguaStatus(objDia);
        saveRotina(rotinaExercicios);
        e.target.closest(".dayCard").querySelector(".barraAgua").max = e.target.value
    }

    if (e.target.classList.contains("inserirMlAgua")) {
        if(objDia.meta_agua <= 0) {
            alert("Defina uma meta de agua para o dia")
            e.target.value = 0
            return
        }
        objDia.ml_bebidos = Number(e.target.value)

        const card = e.target.closest(".dayCard");

        refreshAgua(card, objDia);

        hydrateStatus(card, objDia);
        
        saveRotina(rotinaExercicios);
        e.target.closest(".dayCard").querySelector(".barraAgua").value = e.target.value

    }
})


//ATT A HORA DE TREINO
document.addEventListener('change', (e) => {
    if(e.target.classList.contains("horaTreino")) {

        const dia = e.target.closest(".dayCard").dataset.day;

        console.log(attHoraDia(dia, e.target.value))

    }
})
//=============FUNÇÕES=================================//

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${String(hours).padStart(2, '0')}:${
        String(minutes).padStart(2, '0')
    }:${
        String(secs).padStart(2, '0')
    }`
}

function startTimer(diaObj, progress, totalSeconds, display){
    
    if(diaObj.interval) return false;

    if(diaObj.meta_exercicio <= 0) {
        alert("Defina um tempo de treino primeiro")
        return false
    }

    let start = Date.now() - diaObj.tempo_feito * 1000;

    diaObj.interval = setInterval(() => {

        let elapsed = Math.floor(
            (Date.now() - start) / 1000
        );

        diaObj.tempo_feito = elapsed;

        updateTreinoStatus(diaObj);

        const card = document.querySelector(
            `.dayCard[data-day="${diaObj.dia}"]`
        );

        if(card) {  
            hydrateStatus(card, diaObj);
        }

        if(elapsed % 10 === 0) {
            saveRotina(rotinaExercicios);
        }

        progress.value = elapsed;

        display.textContent =
            formatTime(elapsed);

        saveRotina(rotinaExercicios);

        //========================
        // TREINO COMPLETO
        //========================
        if (
            elapsed >= totalSeconds &&
            !diaObj.notificacaoTreinoCompleto
        ) {

            enviarNotificacao(
                "Meta concluída ✅",
                `Você completou sua meta de treino de ${diaObj.dia}!`
            );

            diaObj.notificacaoTreinoCompleto = true;
        }

    }, 1000);

    return true
}

function pauseTimer(diaObj){

 clearInterval(diaObj.interval);

 diaObj.interval = null;

 return 1
}

//ATUALIZA META DO TREINO DO DIA
function attMetaDia(dia, meta) {

    const diaSemana =
        rotinaExercicios.find(r => r.dia == dia);

    const sec = timeToSeconds(meta);

    diaSemana.meta_exercicio = sec;

    // reseta notificação
    diaSemana.notificacaoTreinoCompleto = false;

    updateTreinoStatus(diaSemana);

    saveRotina(rotinaExercicios);

    return sec;
}

//CONVERTE O VALOR QUE VEM DO INPUT DE TIME PARA SEGUNDOS
function timeToSeconds(time) {
    if (!time) return 0;

    const [h, m] = time.split(":").map(Number);

    if (isNaN(h) || isNaN(m)) return 0;

    return (h * 3600) + (m * 60);
}

//ATUALIZA HORA DO TREINO DO DIA
function attHoraDia(dia, hora) {
    const diaSemana = rotinaExercicios.find(r => r.dia == dia)
    diaSemana.hora = hora

    saveRotina(rotinaExercicios);
}

//ATUALIZA TEMPO FEITO DE EXERCICIO DO DIA
function attTempoFeitoDia(dia, tempoFeito) {
    const diaSemana = rotinaExercicios.find(r => r.dia == dia)
    diaSemana.tempo_feito = tempoFeito

    saveRotina(rotinaExercicios);
}

//ATUALIZA MLS DE ÁGUA
function attMlsAgua(dia, mls) {
    const diaSemana = rotinaExercicios.find(r => r.dia == dia)
    
    if (diaSemana.meta_agua == 0) {
        return
    }

    const percentualBebido = (mls / diaSemana.meta_agua) * 100
    console.log(percentualBebido)
    diaSemana.ml_bebidos = percentualBebido

    saveRotina(rotinaExercicios);

    return percentualBebido;
}

//FUNÇÃO PARA ENVIAR NOTIFICAÇÃO
function enviarNotificacao(titulo, mensagem) {
    if (Notification.permission === "granted") {
        new Notification(titulo, {
            body: mensagem,
            icon: "../public/img/icon.png"
        });
    }
}

function startNotificationChecker() {

    setInterval(() => {

        const now = new Date();

        const horaAtual =
            String(now.getHours()).padStart(2, '0') +
            ":" +
            String(now.getMinutes()).padStart(2, '0');

        const diasSemana = [
            "Domingo",
            "Segunda",
            "Terça",
            "Quarta",
            "Quinta",
            "Sexta",
            "Sábado"
        ];

        const hojeFormatado =
            diasSemana[now.getDay()];

        rotinaExercicios.forEach((diaObj) => {

            //========================
            // NOTIFICAÇÃO DE TREINO
            //========================
            if (
                diaObj.dia === hojeFormatado &&
                diaObj.hora === horaAtual &&
                diaObj.ultimaNotificacao !== horaAtual
            ) {

                enviarNotificacao(
                    "Hora do treino 💪",
                    `Está na hora do treino de ${diaObj.dia}`
                );

                diaObj.ultimaNotificacao = horaAtual;
            }

            //========================
            // NOTIFICAÇÃO ÁGUA 18H
            //========================
            if (
                diaObj.dia === hojeFormatado &&
                horaAtual === "18:00" &&
                diaObj.ultimaNotificacaoAgua18 !== horaAtual
            ) {

                const faltando =
                    diaObj.meta_agua - diaObj.ml_bebidos;

                if (
                    diaObj.meta_agua > 0 &&
                    faltando > 0
                ) {

                    enviarNotificacao(
                        "Água do dia 💧",
                        `Ainda faltam ${faltando}ml para sua meta de água hoje.`
                    );

                    diaObj.ultimaNotificacaoAgua18 =
                        horaAtual;
                }
            }

            //========================
            // NOTIFICAÇÃO ÁGUA 22H
            //========================
            if (
                diaObj.dia === hojeFormatado &&
                horaAtual === "22:00" &&
                diaObj.ultimaNotificacaoAgua22 !== horaAtual
            ) {

                const faltando =
                    diaObj.meta_agua - diaObj.ml_bebidos;

                if (
                    diaObj.meta_agua > 0 &&
                    faltando > 0
                ) {

                    enviarNotificacao(
                        "Meta de água incompleta 💧",
                        `O dia está acabando e ainda faltam ${faltando}ml de água.`
                    );

                    diaObj.ultimaNotificacaoAgua22 =
                        horaAtual;
                }
            }

        });

    }, 1000);
}

startNotificationChecker();

function hydrateUIFromCache() {

    rotinaExercicios.forEach(diaObj => {

        const card = document.querySelector(
            `.dayCard[data-day="${diaObj.dia}"]`
        );

        if(!card) return;

        hydrateTreino(card, diaObj);
        hydrateAgua(card, diaObj);
        hydrateHora(card, diaObj);
        hydrateStatus(card, diaObj);
    });
}

function hydrateTreino(card, diaObj) {

    const inputMeta =
        card.querySelector(".metaTreino");

    const barraTreino =
        card.querySelector(".barraTreino");

    const contador =
        card.querySelector(".contador");

    const button =
        card.querySelector(".timerButton");

    //========================
    // INPUT META
    //========================

    inputMeta.value =
        secondsToTime(
            diaObj.meta_exercicio
        );

    //========================
    // BARRA
    //========================

    barraTreino.max =
        diaObj.meta_exercicio;

    barraTreino.value =
        diaObj.tempo_feito;

    //========================
    // CONTADOR
    //========================

    contador.textContent =
        formatTime(
            diaObj.tempo_feito
        );

        // NOVO TRECHO
    if (
        diaObj.tempo_feito > 0
    ) {
        button.classList.remove("pausa");
        button.classList.add("inicia");
        button.textContent = "Retomar";
    }
}

function hydrateAgua(card, diaObj) {

    const metaAguaInput =
        card.querySelector(".inserirMetaAgua");

    const mlInput =
        card.querySelector(".inserirMlAgua");

    const barraAgua =
        card.querySelector(".barraAgua");

    metaAguaInput.value =
        diaObj.meta_agua;

    mlInput.value =
        diaObj.ml_bebidos;

    barraAgua.max =
        diaObj.meta_agua;

    barraAgua.value =
        diaObj.ml_bebidos;
}

function hydrateHora(card, diaObj) {

    const horaInput =
        card.querySelector(".horaTreino");

    horaInput.value =
        diaObj.hora;
}

function secondsToTime(seconds) {

    const hours =
        Math.floor(seconds / 3600);

    const minutes =
        Math.floor(
            (seconds % 3600) / 60
        );

    return `${String(hours).padStart(2, '0')}:${
        String(minutes).padStart(2, '0')
    }`;
}

function updateDayNavigationButtons() {
    rotinaExercicios.forEach((diaObj) => {

        const card = document.querySelector(
            `.dayCard[data-day="${diaObj.dia}"]`
        );

        if (!card) return;

        const previousButton =
            card.querySelector(".previousDayButton");

        const nextButton =
            card.querySelector(".nextDayButton");
        
        const dayButtons = card.querySelector(".dayButtons");

        if (diaObj.dia === "Domingo") {
            previousButton.style.display = "none";
            dayButtons.style.justifyContent = "flex-end";
        }

        if (diaObj.dia === "Sábado") {
            nextButton.style.display = "none";
        }
    });
}

function showDayCard(index) {
    const allCards =
        document.querySelectorAll(".dayCard");

    allCards.forEach((card, i) => {
        card.style.display =
            i === index ? "block" : "none";
    });

    currentDayIndex = index;
}

function goToNextDay() {
    if (
        currentDayIndex <
        rotinaExercicios.length - 1
    ) {
        showDayCard(currentDayIndex + 1);
    }
}

function goToPreviousDay() {
    if (currentDayIndex > 0) {
        showDayCard(currentDayIndex - 1);
    }
}

document.addEventListener("click", (e) => {
    const card =
        e.target.closest(".dayCard");

    if (!card) return;

    if (
        e.target.classList.contains(
            "nextDayButton"
        )
    ) {
        const nextCard =
            card.nextElementSibling;

        if (nextCard) {
            nextCard.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest"
            });
        }
    }

    if (
        e.target.classList.contains(
            "previousDayButton"
        )
    ) {
        const previousCard =
            card.previousElementSibling;

        if (previousCard) {
            previousCard.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest"
            });
        }
    }
});

function hydrateStatus(card, diaObj) {

    const treinoStatus =
        card.querySelector(".treinoStatus");

    const aguaStatus =
        card.querySelector(".aguaStatus");

    updateStatusElement(
        treinoStatus,
        diaObj.metaTreinoStatus
    );

    updateStatusElement(
        aguaStatus,
        diaObj.metaAguaStatus
    );
}

function updateStatusElement(element, status) {

    if(!element) return;

    element.textContent = status;

    element.classList.remove(
        "status-nao-iniciado",
        "status-em-andamento",
        "status-concluido",
        "status-nao-concluido"
    );

    switch(status) {
        case "Não Iniciado":
            element.classList.add(
                "status-nao-iniciado"
            );
            break;

        case "Em Andamento":
            element.classList.add(
                "status-em-andamento"
            );
            break;

        case "Concluído":
            element.classList.add(
                "status-concluido"
            );
            break;

        case "Não Concluído":
            element.classList.add(
                "status-nao-concluido"
            );
            break;
    }
}

hydrateUIFromCache();
updateDayNavigationButtons();

function updateTreinoStatus(diaObj) {

    if(diaObj.meta_exercicio <= 0) {
        diaObj.metaTreinoStatus = "Não Iniciado";
        return;
    }

    if(diaObj.tempo_feito >= diaObj.meta_exercicio) {
        diaObj.metaTreinoStatus = "Concluído";
        return;
    }

    if(diaObj.tempo_feito > 0) {
        diaObj.metaTreinoStatus = "Em Andamento";
        return;
    }

    diaObj.metaTreinoStatus = "Não Iniciado";
}

function updateAguaStatus(diaObj) {

    if(diaObj.meta_agua <= 0) {
        diaObj.metaAguaStatus = "Não Iniciado";
        return;
    }

    if(diaObj.ml_bebidos >= diaObj.meta_agua) {
        diaObj.metaAguaStatus = "Concluído";
        return;
    }

    if(diaObj.ml_bebidos > 0) {
        diaObj.metaAguaStatus = "Em Andamento";
        return;
    }

    diaObj.metaAguaStatus = "Não Iniciado";
}

function refreshAgua(card, diaObj) {

    const barra = card.querySelector(".barraAgua");
    const status = card.querySelector(".aguaStatus");

    // Atualiza a barra
    barra.max = diaObj.meta_agua;
    barra.value = diaObj.ml_bebidos;

    // Atualiza os atributos para leitores de tela
    const porcentagem =
        diaObj.meta_agua > 0
            ? Math.round((diaObj.ml_bebidos / diaObj.meta_agua) * 100)
            : 0;

    barra.setAttribute(
        "aria-valuenow",
        porcentagem
    );

    barra.setAttribute(
        "aria-valuetext",
        `${porcentagem}% da meta de água concluída`
    );

    // Atualiza o status
    updateAguaStatus(diaObj);
    updateStatusElement(
        status,
        diaObj.metaAguaStatus
    );

    saveRotina(rotinaExercicios);
}