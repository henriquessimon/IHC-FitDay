export function DayCard(diaRotina) {
    //INICIALIZAMOS ESSAS VARIAVEIS PARA CONSEGUIRMOS DEFINIR O 
    // HTML PARA O USUARIO JA TENHA SELECIONA OU NÃO A META E A HORA
    let meta = ``
    let hora = ``

    if(diaRotina.meta) { //CASO O USUARIO JA TENHA PREENCHIDO A META
        meta = `
            <h3>Tempo Exercicio</h3>
            <div class="divContadorMetaExercicio">
                <span>Inicio</span>
                <progress aria-label="Progresso do treino" value="0" max="100"></progress>
            </div>
        `;
    } else { //CASO O USUARIO NÃO TENHA PREENCHIDO A META
        meta = `
            <div class="addMetaDia">
                <h3>Exercício</h3>

                <label>
                    Tempo de treino
                    <input type="time" class="fimTreino">
                </label>

                <progress value="0" max="100"></progress>
            </div>
        `;
    }

    console.log(diaRotina)

    //RETORNAMOS O HTML DO CARD DO DIA FORMATADO CORRETAMENTE PARA INSERIR NA TELA
    return `
        <article class="dayCard" data-day="${diaRotina.dia}" aria-labelledby="titulo-${diaRotina.dia}">
            <header class="headerDayCard divsCard">
                <div class="dateDiv">
                    <h2 id="titulo-${diaRotina.dia}">${diaRotina.dia}</h2>
                    <label for="horaTreino">
                        Hora do treino
                    </label>

                    <input
                        id="horaTreino"
                        type="time"
                        class="horaTreino"
                    />
                </div>
            </header>
            <section class="BodyDayCard divsCard">
                <section class="meta_exercicio cardSection" id="exercicioMetaCard">
                    <div class="addMetaDia">
                        
                            <h3>Exercício</h3>
                            <label for="metaTreino">Tempo de treino(h/m)</label>
                            <input type="time" class="metaTreino" name="metaTreino">
                            <div>
                                <div>
                                    <span
                                        class="contador"
                                        aria-live="polite"
                                    >
                                        0 horas 0 minutos 0 segundos
                                    </span>
                                    <button
                                        class="timerButton inicia"
                                        aria-label="Iniciar cronômetro do treino"
                                    >
                                        Iniciar
                                    </button>
                                </div>
                            </div>
                            <label for="barraTreino">
                                Progresso do treino
                            </label>

                            <progress
                                id="barraTreino"
                                class="barraTreino"
                                value="40"
                                max="100"
                                aria-label="Progresso do treino"
                            ></progress>
                            <p
                                class="statusMessage treinoStatus"
                                aria-live="polite"
                            >
                                Meta atingida
                            </p>
                    </div>
                </section>
                <section class="metaAguaSection cardSection" id="aguaMetaCard" aria-labelledby="tituloAgua">
                    <div>
                        <h3 id="tituloAgua">
                            Meta de água
                        </h3>
                        <input 
                            type="number" 
                            name="meta_agua"
                            class="inserirMetaAgua"
                            value=0
                        />
                    </div>
                    <div>
                        <label for="mls_bebidos_hoje">Água bebida(ml)</label>
                        <input 
                            type="number" 
                            name="mls_bebidos_hoje" 
                            class="inserirMlAgua" 
                            id="inserirMlAgua" 
                            value=0
                        />
                    </div>
                    <div class="barraProgresso aguaProgresso">
                        <progress 
                            value="" 
                            max="100" 
                            class="barraAgua"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            aria-valuenow="0"
                            aria-valuetext="0% da meta de água concluída"
                        >
                        </progress>
                    </div>

                    <p class="statusMessage aguaStatus">
                        ${diaRotina.metaAguaStatus}
                    </p>
                </section>
            </section>
            <div class="dayButtons">
                <button
                    class="dayNavigationButton nextDayButton"
                    aria-label="Ir para o dia anterior"
                >
                ← Dia anterior
                </button>

                <button class="dayNavigationButton nextDayButton" aria-label="Ir para o dia anterior">
                    Próximo dia →
                </button>
            </div>
        </article>
    `;
}