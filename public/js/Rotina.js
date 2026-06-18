export const defaultRotinaExercicios = [
    {
        dia: "Domingo",
        hora: "",
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: 0,
        ml_bebidos: 0,
        tempo_feito: 0,
        ultimaNotificacao: null,
        ultimaNotificacaoAgua18: null,
        ultimaNotificacaoAgua22: null,
        notificacaoTreinoCompleto: false,
        metaTreinoStatus: "Não Iniciado",
        metaAguaStatus: "Não Iniciado"
    },
    {
        dia: "Segunda",
        hora: "",
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: 0,
        ml_bebidos: 0,
        tempo_feito: 0,
        ultimaNotificacao: null,
        ultimaNotificacaoAgua18: null,
        ultimaNotificacaoAgua22: null,
        notificacaoTreinoCompleto: false,
        metaTreinoStatus: "Não Iniciado",
        metaAguaStatus: "Não Iniciado"
    },
    {
        dia: "Terça",
        hora: "",
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: 0,
        ml_bebidos: 0,
        tempo_feito: 0,
        ultimaNotificacao: null,
        ultimaNotificacaoAgua18: null,
        ultimaNotificacaoAgua22: null,
        notificacaoTreinoCompleto: false,
        metaTreinoStatus: "Não Iniciado",
        metaAguaStatus: "Não Iniciado"
    },
    {
        dia: "Quarta",
        hora: "",
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: 0,
        ml_bebidos: 0,
        tempo_feito: 0,
        ultimaNotificacao: null,
        ultimaNotificacaoAgua18: null,
        ultimaNotificacaoAgua22: null,
        notificacaoTreinoCompleto: false,
        metaTreinoStatus: "Não Iniciado",
        metaAguaStatus: "Não Iniciado"
    },
    {
        
        dia: "Quinta",
        hora: "",
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: 0,
        ml_bebidos: 0,
        tempo_feito: 0,
        ultimaNotificacao: null,
        ultimaNotificacaoAgua18: null,
        ultimaNotificacaoAgua22: null,
        notificacaoTreinoCompleto: false,
        metaTreinoStatus: "Não Iniciado",
        metaAguaStatus: "Não Iniciado"
    },
    {
        dia: "Sexta",
        hora: "",
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: 0,
        ml_bebidos: 0,
        tempo_feito: 0,        
        ultimaNotificacao: null,
        ultimaNotificacaoAgua18: null,
        ultimaNotificacaoAgua22: null,
        notificacaoTreinoCompleto: false,
        metaTreinoStatus: "Não Iniciado",
        metaAguaStatus: "Não Iniciado"
    },
    {
        dia: "Sábado",
        hora: "",
        status: "Sem treino",
        meta_exercicio: 0,
        meta_agua: 0,
        ml_bebidos: 0,
        tempo_feito: 0,
        ultimaNotificacao: null,
        ultimaNotificacaoAgua18: null,
        ultimaNotificacaoAgua22: null,
        notificacaoTreinoCompleto: false,
        metaTreinoStatus: "Não Iniciado",
        metaAguaStatus: "Não Iniciado"
    }
]

export function loadRotina() {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    return currentUser?.rotina || defaultRotinaExercicios;
}

export function saveRotina(rotinaAtualizada) {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    const users =
        JSON.parse(localStorage.getItem("users")) || [];

    // Cria uma cópia da rotina sem os intervalos
    const rotinaSemInterval = structuredClone(rotinaAtualizada);

    rotinaSemInterval.forEach(dia => {
        delete dia.interval;
    });

    // Atualiza a rotina do usuário atual
    currentUser.rotina = rotinaSemInterval;

    // Atualiza no array geral
    const updatedUsers = users.map(user => {

        if(user.id === currentUser.id) {
            return currentUser;
        }

        return user;
    });

    localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
    );

    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );
}