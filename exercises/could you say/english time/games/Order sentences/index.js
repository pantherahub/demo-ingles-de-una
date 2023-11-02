let accerts = 0
let intents = 0
let previous = 0
let num_card = 0

let words = [
    {
        audio: './assets/audios/audio-1.mp3',
        options: [
            {
                name: 'Would you please repeat? I said that we should focus on the sustainable development goals.',
            },
            { name: 'Can I ask a question? Sure, what do you want to know?' },
            {
                name: "Sorry, I'm not sure what you mean. Don’t worry, I mean  that we need to use clean energy to save the planet.",
            },
            {
                name: 'Could you be more specific? Yes, I think that we should  have a responsible consumption and production of paper to reduce  deforestation.',
            },
            {
                name: 'Can you give me an example? Sure. For example, if you use a plastic bottle, you have to recycle it or reuse it.',
            },
            {
                name: 'Can you clarify that for me, please? Yes, we can focus on teaching our community how to reduce inequalities.',
            },
        ],
    },
]

printOrder()
changeStatusButtons()

function printOrder() {
    document.getElementById('btn-sound').innerHTML = ''
    document.getElementById('items').innerHTML = ''

    document.getElementById('btn-sound').innerHTML = `                
        <div class="d-flex">
            <audio id="audio-player" src="${words[num_card].audio}" controls>
                Your browser does not support the <code>audio</code> element.
            </audio>
            <div id="counter" class="pt-3 ">${num_card + 1}/${
        words.length
    }</div>
        </div>`

    getRandomArray(words[num_card].options).forEach((option, index) => {
        document.querySelector(
            '#items'
        ).innerHTML += `<div class="cross-center card cursor-pointer ">${option.name}</div>`
    })

    document.getElementById('counter').classList.add('animate-button')
    setTimeout(() => {
        document.getElementById('counter').classList.remove('animate-button')
    }, 2000)
}

function getRandomArray(data) {
    return data
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}

let el = document.getElementById('items')

var sortable = Sortable.create(el, {
    swapThreshold: 1,
    animation: 150,

    onEnd: function (evt) {
        var cards = evt.from.children
        let check = 0

        for (i = 0; i <= cards.length - 1; i++) {
            if (check == cards.length - 1) {
                accerts++
                if (num_card == words.length - 1) {
                    alertExcellentWithImage()
                    soundGameSuccess()
                    document
                        .getElementById('items')
                        .classList.add('disable-div')
                } else {
                    alertExcellent()
                    soundCorrectAnswer()
                    document
                        .getElementById('next')
                        .classList.add('animate-button')
                }
            }

            if (cards[i].innerHTML == words[num_card].options[i].name) {
                cards[i].classList.add('correct')
                check++
            } else {
                cards[i].classList.remove('correct')
            }
        }
        let promedio = Math.round(
            (check * 100) / words[num_card].options.length
        )
        setScoreStorage((module = 'M1'), (lesson = 'L2'), {
            name: 'order sentences',
            score: promedio,
            type: 'englishTime',
        })
    },
})

function changeWord(type) {
    if (type == 'next')
        num_card++,
            document.getElementById('next').classList.remove('animate-button')
    else num_card--

    printOrder()
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
