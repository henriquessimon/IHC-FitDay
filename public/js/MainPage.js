import { DayCard } from "../../components/dayCard.js"

//========VARIÁVEIS PARA SIMULAR BANCO DE DADOS============
const metaDiariaAgua = 0 // META DIARIA DE AGUA INICIAL

//ARRAY DE OBJETOS COM CADA DIA DE EXERCÍCIO INCIAL
const rotinaExercicios = [
    {
        dia: "Domingo",
        hora: 0,
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: 400,
        ml_bebidos: 0,
        tempo_feito: 0,
        interval: null,
    },
    {
        dia: "Segunda",
        hora: 0,
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: metaDiariaAgua,
        ml_bebidos: 0,
        tempo_feito: 0,
        interval: null,
    },
    {
        dia: "Terça",
        hora: 0,
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: metaDiariaAgua,
        ml_bebidos: 0,
        tempo_feito: 0,
        interval: null,
    },
    {
        dia: "Quarta",
        hora: 0,
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: metaDiariaAgua,
        ml_bebidos: 0,
        tempo_feito: 0,
        interval: null,
    },
    {
        
        dia: "Quinta",
        hora: 0,
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: metaDiariaAgua,
        ml_bebidos: 0,
        tempo_feito: 0,
        interval: null,
    },
    {
        dia: "Sexta",
        hora: 0,
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: metaDiariaAgua,
        ml_bebidos: 0,
        tempo_feito: 0,
        interval: null,
    },
    {
        dia: "Sabado",
        hora: 0,
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: metaDiariaAgua,
        ml_bebidos: 0,
        tempo_feito: 0,
        interval: null,
    }
]

const cards = document.getElementById("cards"); //PEGA O ELEMENTO HTML PARA INSERIR CARDS DOS DIAS

//PERCORRE TODOS O ARRAY rotinaExercicios DIA POR DIA INSERINDO O 
// HTML GERADO A PARTIR DE DayCard PASSANDO CADA dia COMO PARAMETRO
rotinaExercicios.forEach(dia => {
    cards.innerHTML += DayCard(dia)
})


//ATIVA E DESATIVA CAIXA DE CONFIGURAÇÕES
const configWrapper = document.getElementById('configWrapper')
const configMenuBox = document.querySelector('.configMenuBox');

//MOSTRA A CAIXA DE CONFIGS
configWrapper.addEventListener('click', (e) => {
    e.stopPropagation();
    configMenuBox.classList.toggle('active')
})

//IMPEDE DE FECHAR AO CLICAR NELA MESMA OU ELEMENTO DENTRO DELA
configMenuBox.addEventListener("click", (e) => {
    e.stopPropagation();
})

//ESCONDE A CAIXA DE CONFIGS
document.addEventListener("click", () => {
    configMenuBox.classList.remove('active')
})

//MUDA O TEMA
changeTema();

//ATUALIZA META DE TREINOS
document.addEventListener('change', (e) => {
    if(e.target.classList.contains("metaTreino")) {
        const dia = e.target.closest(".dayCard").dataset.day
        const barra = e.target.closest(".dayCard").querySelector(".barraTreino")
        const meta = e.target.value
    
        const sec_meta = attMetaDia(dia, meta)

        console.log(sec_meta)

        barra.max = sec_meta
    }
})

//INICIAR/PAUSAR TIMER
let time

document.addEventListener('click', (e) => {
    if(e.target.classList.contains("timerButton")) {
        const dia = e.target.closest(".dayCard").dataset.day
        const barra = e.target.closest(".dayCard").querySelector(".barraTreino")
        const meta = rotinaExercicios.find(r => r.dia == dia).meta_exercicio
        const contador = e.target.closest(".dayCard").querySelector(".contador")
        const objDia = rotinaExercicios.find(d => d.dia == dia)

        if(!e.target.classList.contains("pausa")) {
            time = startTimer(objDia, barra, meta, contador);
        } else {
            time = pauseTimer(objDia)
        }

        if(!time && time != 0) {
            e.target.classList.remove("inicia")
            e.target.classList.add("pausa")
            e.target.textContent = "Pausar"
        } else if (time && time == 1) {
            e.target.classList.remove("pausa")
            e.target.classList.add("inicia")
            e.target.textContent = "Retomar"
        }
    }
})

//ADICIONA META DE AGUA E ATUALIZA QUANTIDADE BEBIDO
document.addEventListener('change', (e) => {
    const dia = e.target.closest(".dayCard").dataset.day
    const objDia = rotinaExercicios.find(d => d.dia == dia)
    if (e.target.classList.contains("inserirMetaAgua")) {
        objDia.meta_agua = e.target.value
        e.target.closest(".dayCard").querySelector(".barraAgua").max = e.target.value
    }

    if (e.target.classList.contains("inserirMlAgua")) {
        if(objDia.meta_agua <= 0) {
            alert("Defina uma meta de agua para o dia")
            e.target.value = 0
            return
        }
        objDia.ml_bebidos = e.target.value
        e.target.closest(".dayCard").querySelector(".barraAgua").value = e.target.value

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

 if(diaObj.interval) return;

 if(diaObj.meta_exercicio <= 0) {
    alert("Defina um tempo de treino primeiro")
    return 0
 }

 let start = Date.now() - diaObj.tempo_feito *1000;

 diaObj.interval = setInterval(()=>{

   let elapsed = Math.floor(
      (Date.now()-start)/1000
   );

   diaObj.tempo_feito = elapsed;

   progress.value = elapsed;

   display.textContent =
      formatTime(elapsed);

 },1000);
}

function pauseTimer(diaObj){

 clearInterval(diaObj.interval);

 diaObj.interval = null;

 return 1
}

function changeTema() {
    const selectTema = document.getElementById('selectTema');

    selectTema.addEventListener('change', () => {
        const value = selectTema.value;
        const bodyClass = document.body.classList

        if(value == bodyClass) {
            return
        } else if (value == "colorido") {
            document.body.classList.remove("escuro", "claro");
            document.body.classList.add("colorido")
        } else if (value == "claro") {
            document.body.classList.remove("escuro", "colorido");
            document.body.classList.add("claro")
        } else if (value == "escuro") {
            document.body.classList.remove("colido", "claro");
            document.body.classList.add("escuro")
        }
    })
}

//ATUALIZA META DO TREINO DO DIA
function attMetaDia(dia, meta) {
    console.log(meta);

    const diaSemana = rotinaExercicios.find(r => r.dia == dia);

    const sec = timeToSeconds(meta);

    console.log(sec);

    diaSemana.meta_exercicio = sec;

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
}

//ATUALIZA STATUS DO TREINO DO DIA 
function attStatusDia(dia, status) {
    const diaSemana = rotinaExercicios.find(r => r.dia == dia)
    diaSemana.stutus = status
}

//ATUALIZA TEMPO FEITO DE EXERCICIO DO DIA
function attTempoFeitoDia(dia, tempoFeito) {
    const diaSemana = rotinaExercicios.find(r => r.dia == dia)
    diaSemana.tempo_feito = tempoFeito
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

    return percentualBebido;
}