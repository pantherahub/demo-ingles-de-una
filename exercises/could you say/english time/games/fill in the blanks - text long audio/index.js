const containerCards = document.querySelector('#container-cards')
const containerSound = document.querySelector('#btn-sound-pronunciation')

let optionWord
let optionSound
let num_card = 0
let count = 0
let errors = 3
let accerts = 0
let intents = 0

const music = document.querySelector('#audio')

let all_fields_filled = true

function getImg(name) {
    return `./assets/img/cards/${name}.png`
}

let words = getRandomArray([
    {
        img: getImg('apple'),
        sound: 'audio-1',
        complete: [
            'would you please repeat that?',
            'Can I ask a question?',
            'Can you clarify that for me, please?',
            'combating climate change',
            'promoting access to education',
        ],
        name: `
            I heard you were interested in discussing sustainable development goals. <br>
            <span class="green-color"> Person 2: </span> Yes, that's right. I think it's an important topic that we should all be aware of. <br>
            <span class="gray-color">Person 1:</span> We should focus on the sustainable development goals. <br>
            <span class="green-color"> Person 2: </span> Oh, sorry,_I didn't quite catch what you said. <br>
            <span class="gray-color">Person 1:</span> No problem at all. I said that we should focus on the sustainable development goals. <br>
            <span class="green-color"> Person 2: </span>_ <br>
            <span class="gray-color">Person 1:</span> Of course, go ahead. <br>
            <span class="green-color"> Person 2: </span> What exactly are the sustainable development goals?_ <br>
            <span class="gray-color">Person 1:</span> The sustainable development goals are a set of targets that the United Nations has identified to create a better and more sustainable future for all. They include 17 goals such as eliminating poverty, promoting gender equality, and_. <br>
            <span class="green-color"> Person 2: </span> Oh, I see. Thanks for explaining that. <br>
            <span class="gray-color">Person 1:</span> Besides, we can focus on teaching our community how to reduce inequalities. This can include_and healthcare for all, and addressing issues of discrimination and exclusion. <br>
            <span class="green-color"> Person 2: </span> I understand now. Thank you for explaining everything to me. It's really important that we all work together to achieve these goals. <br>
        `,
    },
])

let clues = new Array(words[num_card].complete.length)
for (let i = 0; i < clues.length; i++) {
    clues[i] = ''
}

let aciertos = []

printOptions()
changeStatusButtons()

function printOptions() {
    document.getElementById('container-buttons-roulette').innerHTML = `
        <div id="option-listen" class="text-replace-content-answer">
                                        
        </div>

        <button class="btn btn-lg bg-dark text-white btn-submit my-4 fs-6" onclick="validarOpcionSeleccionada()" style="width: 6em;">
            Submit
        </button>
    `

    let input = `
        <input type="text" class="input-replace-input m-1" oncopy="return false" onpaste="return false" autocomplete="off"/>
        <button class="btn btn-clue bg-white">
            clue
        </button>
    `
    let cardObject = words[num_card].name.replaceAll('_', input)

    document.getElementById('option-listen').innerHTML += `     
        ${cardObject}      
    `

    addEventBtnClues()

    music.src = `./assets/audios/${words[num_card].sound}.mp3`
}

function addEventBtnClues() {
    document
        .querySelectorAll('.input-replace-input')
        .forEach((element, key) => {
            element.setAttribute('id', 'question-' + key)
        })

    document.querySelectorAll('.btn-clue').forEach((element, key) => {
        element.addEventListener('click', function () {
            clue(key)
        })
    })
}

function clue(number) {
    let text_input = document.querySelector('#question-' + number).value
    let long_val = words[num_card].complete[number].substring(
        0,
        text_input.length
    )
    let fill_input = true
    clues[number] = ''

    for (let i = 0; i < long_val.length; i++) {
        if (long_val.charAt(i) == text_input.charAt(i) && fill_input) {
            clues[number] += long_val.charAt(i)
        } else {
            fill_input = false
        }
    }

    if (clues[number].length < words[num_card].complete[number].length / 2) {
        clues[number] += words[num_card].complete[number].charAt(
            clues[number].length
        )
        document.querySelector('#question-' + number).value = clues[number]
    }
}

function validarOpcionSeleccionada() {
    intents++
    count = 0
    all_fields_filled = true

    let input = $('#option-listen input')

    _.forEach(input, function (element, key) {
        _.forEach(input, function (element) {
            if ($(element).val() == '' || $(element).val() == ' ') {
                element.classList.add('animate-kid')

                all_fields_filled = false
                return
            }
        })

        if (all_fields_filled) {
            element.style.opacity = '1'
            element.style.color = 'white'

            if (
                $(element).val().toLowerCase() ==
                words[num_card].complete[key].toLowerCase()
            ) {
                count++
                element.style.background = '#016429'
            } else {
                element.style.background = '#701B15'
                soundIncorrectAnswer()
            }
        }
    })

    if (count == words[num_card].complete.length) {
        if (num_card == words.length - 1) {
            alertExcellentWithImage('win')
            $('.btn-submit').css('pointer-events', 'none')
        } else {
            soundCorrectAnswer()
            document.getElementById('next').classList.add('animate-button')
        }
    } else if (all_fields_filled) {
        soundIncorrectAnswer()
    }

    let score = (count * 100) / words[num_card].complete.length
    setScoreStorage((module = 'M1'), (lesson = 'L2'), {
        name: 'fill in the blanks text long audio',
        score: score,
        type: 'englishTime',
    })
}

function changeWord(type) {
    if (type == 'next') num_card++
    else num_card--

    document.getElementById('next').classList.remove('animate-button')
    $('.option-listen').css('pointer-events', '')

    printOptions()
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
    alertExcellent()
    const music = new Audio('./assets/audios/correct-answer.mp3')
    music.play()
}

function soundIncorrectAnswer() {
    alertTryAgain()
    const music = new Audio('./assets/audios/incorrect-answer.mp3')
    music.play()
}

function soundAddStar() {
    const music = new Audio('./assets/audios/points.mp3')
    music.play()
}

function getRandomArray(data) {
    return data
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}
