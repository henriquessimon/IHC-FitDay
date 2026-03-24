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
        meta_agua: metaDiariaAgua,
        tempo_feito: 0,
        color: '#ff000079'
    },
    {
        dia: "Segunda",
        hora: 0,
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: metaDiariaAgua,
        tempo_feito: 0,
        color: '#ff582aab'
    },
    {
        dia: "Terça",
        hora: 0,
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: metaDiariaAgua,
        tempo_feito: 0,
        color: '#fbeb3e9c'
    },
    {
        dia: "Quarta",
        hora: 0,
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: metaDiariaAgua,
        tempo_feito: 0,
        color: '#4e9952a7'
    },
    {
        
        dia: "Quinta",
        hora: 0,
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: metaDiariaAgua,
        tempo_feito: 0,
        color: '#576ec292'
    },
    {
        dia: "Sexta",
        hora: 0,
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: metaDiariaAgua,
        tempo_feito: 0,
        color: '#905bc2a7'
    },
    {
        dia: "Sabado",
        hora: 0,
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: metaDiariaAgua,
        tempo_feito: 0,
        color: '#fc92e5a0'
    }

]

const cards = document.getElementById("cards"); //PEGA O ELEMENTO HTML PARA INSERIR CARDS DOS DIAS

//PERCORRE TODOS O ARRAY rotinaExercicios DIA POR DIA INSERINDO O 
// HTML GERADO A PARTIR DE DayCard PASSANDO CADA dia COMO PARAMETRO
rotinaExercicios.forEach(dia => {
    cards.innerHTML += DayCard(dia)
})

//ATUALIZA META DO TREINO DO DIA
function attMetaDia(dia, meta) {
    const diaSemana = rotinaExercicios.find(r => r.dia == dia)
    diaSemana.meta_exercicio = meta
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

