let allKeys = [
    {
        key: 'flashcard',
        weight: 10
    },
    {
        key: 'flashcard-2',
        weight: 10
    },
    {
        key: 'vocabulary',
        weight: 10
    },
    {
        key: 'roleplay',
        weight: 40
    },
    {
        key: 'lets-talk',
        weight: 40
    },
    {
        key: 'lets-count',
        weight: 40
    },
    {
        key: 'lets-count-2',
        weight: 20
    },
    {
        key: 'drag-and-drop',
        weight: 20
    },
    {
        key: 'match',
        weight: 40
    },
    {
        key: 'match-2',
        weight: 40
    },
    {
        key: 'multiple-choice',
        weight: 40
    },
    {
        key: 'choose-the-size',
        weight: 40
    },
    {
        key: 'lets-play',
        weight: 30
    },
    {
        key: 'text-replace',
        weight: 10
    },
    {
        key: 'text-replace-2',
        weight: 10
    },
    {
        //assessment
        key: 'order-the-pictures',
        weight: 40
    },
    {
        //assessment
        key: 'order-the-pictures-2',
        weight: 40
    },
    {
        key: 'memory',
        weight: 20
    },
    {
        key: 'memory-2',
        weight: 20
    },
];

function scoreFlashcard(num_card, long) {
    let promedio = (num_card * 100) / long;
    sessionStorage.setItem("score-flashcard", promedio);
    console.log(promedio);
}
function scoreChooseTheSize(num_card, long) {
    let promedio = (num_card * 100) / long;
    sessionStorage.setItem("score-choose-the-size", promedio);
    console.log(promedio);
}

function scoreFlashcard2(num_card, long) {
    let promedio = (num_card * 100) / long;
    sessionStorage.setItem("score-flashcard-2", promedio);
    console.log(promedio);
}

function scoreVocabulary(num_option, long) {
    console.log(num_option, long)
    if(num_option < long) {
        let promedio = (num_option * 100) / long;
        sessionStorage.setItem("score-vocabulary", promedio);
        console.log(promedio);
    }  
}

function scoreRoleplay(num_option, long) {
    let promedio = (num_option * 100) / long;
    sessionStorage.setItem("score-roleplay", promedio);
    console.log(promedio);
}
function scoreMemory(accerts, intents) {
    let promedio = (accerts * 100) / intents;
    sessionStorage.setItem("score-memory", promedio);
}
function scoreMemory2(accerts, intents) {
    let promedio = (accerts * 100) / intents;
    sessionStorage.setItem("score-memory-2", promedio);
}

function scoreLetsTalk(accerts, intents) {
    let promedio = (accerts * 100) / intents;
    sessionStorage.setItem("score-lets-talk", promedio);
    console.log(promedio);
}
function scoreOrderThePictures(intents, posible_intents) {
    let promedio = (intents * 100) / posible_intents;
    sessionStorage.setItem("score-order-the-pictures", promedio);
    console.log(promedio);
}
function scoreOrderThePictures2(intents, posible_intents) {
    let promedio = (intents * 100) / posible_intents;
    sessionStorage.setItem("score-order-the-pictures-2", promedio);
    console.log(promedio);
}
function scoreLetsCount(accerts, intents) {
    let promedio = (accerts * 100) / intents;
    sessionStorage.setItem("score-lets-count", promedio);
    console.log(promedio);
}
function scoreLetsCount2(accerts, intents) {
    let promedio = (accerts * 100) / intents;
    sessionStorage.setItem("score-lets-count-2", promedio);
    console.log(promedio);
}

function scoreDragAndDrop(intents, posible_intents) {
    let promedio = (intents * 100) / posible_intents;
    sessionStorage.setItem("score-drag-and-drop", promedio);
    console.log(promedio);
}

function scoreMatch(accerts, intents) {
    let promedio = (accerts * 100) / intents;
    sessionStorage.setItem("score-match", promedio);
    console.log(promedio);
}
function scoreMatch2(accerts, intents) {
    let promedio = (accerts * 100) / intents;
    sessionStorage.setItem("score-match-2", promedio);
    console.log(promedio);
}

function scoreTextReplace(accerts, intents) {
    let promedio = (accerts * 100) / intents;
    sessionStorage.setItem("score-text-replace", promedio);
    console.log(promedio);
}
function scoreTextReplace2(accerts, intents) {
    let promedio = (accerts * 100) / intents;
    sessionStorage.setItem("score-text-replace-2", promedio);
    console.log(promedio);
}

function scoreMultipleChoice(accerts, intents) {
    let promedio = (accerts * 100) / intents;
    sessionStorage.setItem("score-multiple-choice", promedio);
    console.log(promedio);
}

function scoreLetsPlay(promedio){
    sessionStorage.setItem("score-lets-play", promedio);
    calculatePromedio();
}

function calculatePromedio() {
    let suma = 0;
    let acumulador = 0;
    let ponderado = 0;
    allKeys.forEach((key, weight) => {
        
        suma = parseInt( sessionStorage.getItem(`score-${key.key}`) ) * key.weight
        if(!Number.isNaN(suma)) acumulador += suma; 

        ponderado += key.weight;
    });

    let promedio = acumulador / ponderado;
    sessionStorage.setItem("total-score", Math.round(promedio));
    console.log('total: '+promedio);
}
