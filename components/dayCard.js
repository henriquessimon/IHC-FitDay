export function DayCard(diaRotina) {
    //INICIALIZAMOS ESSAS VARIAVEIS PARA CONSEGUIRMOS DEFINIR O 
    // HTML PARA O USUARIO JA TENHA SELECIONA OU NÃO A META E A HORA
    let meta = ``
    let hora = ``

    if(diaRotina.meta) { //CASO O USUARIO JA TENHA PREENCHIDO A META
        meta = `
            <label>Tempo Exercicio</label>
            <div class="divContadorMetaExercicio">
                <span>Icon timer</span>
                <div class="barraProgresso exercicioProgresso">
                    <div class="progressoBarraExercicio"></div>
                </div>
            </div>
        `;
    } else { //CASO O USUARIO NÃO TENHA PREENCHIDO A META
        meta = `
            <div class="addMetaDia">
                <label>Exercicio</label>
                <div class="addMetaTreino">Adicionar meta de tempo de treino</div>
            </div>
        `;
    }

    if(diaRotina.hora) { //CASO O USUARIO JA TENHA SELECIONADO A HORA
        hora = `
            <p>${diaRotina.hora}</p>
        `
    } else { // CASO ELE NÃO TENHA SELECIONADO A HORA
        hora = `
            <p class="inserirHoraInicioTreino">Inserir hora de inicio</p>
        `
    }


    //RETORNAMOS O HTML DO CARD DO DIA FORMATADO CORRETAMENTE PARA INSERIR NA TELA
    return `
        <div class="dayCard" style="background-color: ${diaRotina.color}">
            <div class="headerDayCard divsCard">
                <div>
                    <h2>${diaRotina.dia}</h2>
                    ${hora}
                </div>
                <div>
                    <div>${diaRotina.status}</div>
                </div>
            </div>
            <div class="BodyDayCard divsCard">
                <div class="meta exercicio" id="exercicioMetaCard">
                    ${meta}
                </div>
                <div class="meta agua" id="aguaMetaCard">
                    <label>Água bebida</label>
                    <div class="barraProgresso aguaProgresso">
                        <div class="progressoBarraAgua"></div>
                    </div>
                    <label>
                        Mls bebidos hoje
                        <input type="number" name="mls_bebidos_hoje" class="inserirMlAgua" id="inserirMlAgua" value=${diaRotina.meta_agua}/>
                    <label/>
                </div>
            </div>
        </div>
    `;
}