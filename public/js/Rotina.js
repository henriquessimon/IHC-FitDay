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

    // atualiza rotina do usuário atual
    currentUser.rotina = rotinaAtualizada;

    // atualiza no array geral
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