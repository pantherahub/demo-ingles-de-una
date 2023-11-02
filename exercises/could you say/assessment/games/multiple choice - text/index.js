let num_card = 0
let accerts = 0
let intents = 0
let previous = -1

let words = [
    {
        question: '1. Would you please repeat?',
        options: [
            {
                name: 'Yes, I think that we should have a responsible consumption and production of paper to reduce deforestation.',
            },
            {
                name: 'I said that we should focus on the sustainable development goals.',
            },
            {
                name: 'Yes, we can focus on teaching our community how to reduce inequalities.',
            },
            {
                name: 'Don’t worry, I mean that we  need to use clean energy to save the planet',
            },
        ],
        correct_option:
            'I said that we should focus on the sustainable development goals.',
    },
    {
        question: '2. Can I ask a question?',
        options: [
            {
                name: 'Yes, I think that we should have a responsible consumption and production of paper to reduce deforestation.',
            },
            {
                name: 'Don’t worry, I mean that we  need to use clean energy to save the planet.',
            },
            { name: 'Sure, what do you want to know?' },
        ],
        correct_option: 'Sure, what do you want to know?',
    },
    {
        question: "3. Sorry, I'm not sure what you mean.",
        options: [
            { name: 'Sure, what do you want to know?' },
            {
                name: 'Don’t worry, I mean that we  need to use clean energy to save the planet.',
            },
            {
                name: 'Sure. For example, if you use a plastic bottle, you have to recycle it or reuse it.',
            },
        ],
        correct_option:
            'Don’t worry, I mean that we  need to use clean energy to save the planet.',
    },
    {
        question: '4. Do you mean to say',
        options: [
            {
                name: 'Yes, I think that we should have a responsible consumption and production of paper to reduce deforestation.',
            },
            { name: 'Sure, what do you want to know?' },
            {
                name: 'Don’t worry, I mean that we  need to use clean energy to save the planet',
            },
        ],
        correct_option:
            'Yes, I think that we should have a responsible consumption and production of paper to reduce deforestation.',
    },
    {
        question: '5. Could you elaborate on that?',
        options: [
            {
                name: 'Sure. For example, if you use a plastic bottle, you have to recycle it or reuse it.',
            },
            {
                name: 'Don’t worry, I mean that we  need to use clean energy to save the planet',
            },
            {
                name: 'Yes, we can focus on teaching our community how to reduce inequalities.',
            },
        ],
        correct_option:
            'Sure. For example, if you use a plastic bottle, you have to recycle it or reuse it.',
    },
    {
        question: '6. Could you provide more details?',
        options: [
            {
                name: 'Yes, I think that we should have a responsible consumption and production of paper to reduce deforestation.',
            },
            {
                name: 'Sure. For example, if you use a plastic bottle, you have to recycle it or reuse it.',
            },
            {
                name: 'Yes, we can focus on teaching our community how to reduce inequalities.',
            },
        ],
        correct_option:
            'Yes, we can focus on teaching our community how to reduce inequalities.',
    },
]

printWords()
changeStatusButtons()

function disableButton() {
    document.getElementById('submit').disabled = true
    document.getElementById('submit').classList.add('opacity')
}

function printWords() {
    document.querySelector('#container-cards').innerHTML = ''

    document.querySelector('#container-cards').innerHTML += `
        <div class="mb-2 fs-4 position">${words[num_card].question}</div>
    `

    words[num_card].options.forEach((option, index) => {
        document.querySelector('#container-cards').innerHTML += `<div id="${
            'option' + index
        }" class="mb-3 ml-2 option-button cursor-pointer" onclick="selectOption('${index}')">
            ${option.name}
        </div>`
    })

    document.querySelector('#container-cards').innerHTML += `
    <div class="position">
        <button id="submit" class="btn btn-lg bg-dark text-white my-4" onclick="validarOpcionSeleccionada()">
            Submit
        </button>
    </div>
    `
    disableButton()
}

function selectOption(index) {
    if (previous != -1) {
        document
            .getElementById(`option${previous}`)
            .classList.remove('selected')
    }
    previous = index
    document.getElementById(`option${index}`).classList.add('selected')

    document.getElementById('submit').disabled = false
    document.getElementById('submit').classList.remove('opacity')
}

function validarOpcionSeleccionada() {
    intents++
    if (
        words[num_card].options[previous].name == words[num_card].correct_option
    ) {
        if (words.length == num_card + 1) {
            alertExcellentWithImage()
            soundGameSuccess()
        } else {
            soundCorrectAnswer()
            alertExcellent()
            document.getElementById('next').classList.add('animate-button')
        }
        accerts++
    } else {
        soundIncorrectAnswer()
        alertTryAgain()
    }

    let promedio = Math.round((accerts * 100) / intents)
    setScoreStorage((module = 'M1'), (lesson = 'L2'), {
        name: 'multiple choice',
        score: promedio,
        type: 'assessment',
    })
}

function changeWord(type) {
    if (type == 'next')
        num_card++,
            document.getElementById('next').classList.remove('animate-button')
    else num_card--

    printWords()
    changeStatusButtons()
}

function changeStatusButtons() {
    if (num_card <= 0 || isEvaluation()) {
        document.querySelector('#img-prev').src =
            './assets/img/button-back-gray.svg'
        document.querySelector('#prev').disabled = true
        document.querySelector('#prev').classList.remove('boton-presionado')
    } else {
        document.querySelector('#img-prev').src = './assets/img/button-back.svg'
        document.querySelector('#prev').disabled = false
        document.querySelector('#prev').classList.add('boton-presionado')
    }

    if (num_card == words.length - 1) {
        document.querySelector('#img-next').src =
            './assets/img/button-next-gray.svg'
        document.querySelector('#next').disabled = true
        document.querySelector('#next').classList.remove('boton-presionado')
    } else {
        document.querySelector('#img-next').src = './assets/img/button-next.svg'
        document.querySelector('#next').disabled = false
        document.querySelector('#next').classList.add('boton-presionado')
    }
}

function soundGameSuccess() {
    const music = new Audio('./assets/audios/game-success.mp3')
    music.play()
}

function soundCorrectAnswer() {
    const music = new Audio('./assets/audios/correct-answer.mp3')
    music.play()
}

function soundIncorrectAnswer() {
    const music = new Audio('./assets/audios/incorrect-answer.mp3')
    music.play()
}
