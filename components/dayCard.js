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
                <progress value="0" max="100"></progress>
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

    if(diaRotina.hora) { //CASO O USUARIO JA TENHA SELECIONADO A HORA
        hora = `
            <time>${diaRotina.hora}</time>
        `
    } else { // CASO ELE NÃO TENHA SELECIONADO A HORA
        hora = `
            <label>Hora <input type="time"/></label>
        `
    }


    //RETORNAMOS O HTML DO CARD DO DIA FORMATADO CORRETAMENTE PARA INSERIR NA TELA
    return `
        <article class="dayCard" data-day="${diaRotina.dia}">
            <header class="headerDayCard divsCard">
                <div class="dateDiv">
                    <h2>${diaRotina.dia}</h2>
                    ${hora}
                </div>
                <div>
                    <span class="statusBox">${diaRotina.status}</span>
                </div>
            </header>
            <section class="BodyDayCard divsCard">
                <section class="meta_exercicio" id="exercicioMetaCard">
                    <div class="addMetaDia">
                        
                            <h3>Exercício</h3>
                            <div>
                                <label for="metaTreino">Tempo de treino</label>
                                <input type="time" class="metaTreino" name="metaTreino">
                            </div>
                            <div>
                                <progress value="0" max="100" class="barraTreino"></progress>
                                <div>
                                    <span class="contador">0h:0m:0s</span>
                                    <button class="timerButton inicia">Inciar</button>
                                </div>
                            </div>
                    </div>
                </section>
                <section class="metaAguaSection" id="aguaMetaCard">
                    <div>
                        <label for="meta_agua">Meta de Água</label>
                        <input 
                            type="number" 
                            name="meta_agua"
                            class="inserirMetaAgua"
                            value=0
                        />
                    </div>
                    <div>
                        <label for="mls_bebidos_hoje">Água bebida</label>
                        <input 
                            type="number" 
                            name="mls_bebidos_hoje" 
                            class="inserirMlAgua" 
                            id="inserirMlAgua" 
                            value=0
                        />
                    </div>
                    <div class="barraProgresso aguaProgresso">
                        <progress value="" max="100" class="barraAgua"></progress>
                    </div>
                </section>
            </section>
        </article>
    `;
}