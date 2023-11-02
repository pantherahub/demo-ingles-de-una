// Would you please repeat?
// Can I ask a question?
// Sorry,I'm not sure what you mean.
// Could you be more specific?
// Can you give me an example?
// Can you clarify that for me, please?

// I said that we should focus on the sustainable development goals.
// Sure, what do you want to know?
// Don’t worry, I mean that we need to use clean energy to save the planet.
// Yes, I think that we should have a responsible consumption and production of paper to reduce deforestation.
// Sure. For example, if you use a plastic bottle, you have to recycle it or reuse it.
// Yes, we can focus on teaching our community how to reduce inequalities.

const containerCards = document.querySelector('#container-cards')
const containerSound = document.querySelector('#container-sound')
let optionWord
let optionSound
let num_card = 0
let isback = false
const music = new Audio()
let words = [
    {
        img: 'repeat',
        name: 'I said that we should focus on the sustainable development goals.',
        name_audio: 'Would you please repeat',
        name_audio_back: 'goals',
    },
    {
        img: 'question',
        name: 'Sure, what do you want to know',
        name_audio: 'Can I ask a question',
        name_audio_back: 'know',
    },
    {
        img: 'mean',
        name: 'Don’t worry, I mean that we need to use clean energy to save the planet.',
        name_audio: 'Sorry,Im not sure what you mean',
        name_audio_back: 'planet',
    },
    {
        img: 'specific',
        name: 'Yes, I think that we should have a responsible consumption and production of paper to reduce deforestation.',
        name_audio: 'Could you be more specific',
        name_audio_back: 'deforestation',
    },
    {
        img: 'example',
        name: 'Sure. For example, if you use a plastic bottle, you have to recycle it or reuse it.',
        name_audio: 'Can you give me an example',
        name_audio_back: 'reuse',
    },
    {
        img: 'please',
        name: 'Yes, we can focus on teaching our community how to reduce inequalities.',
        name_audio: 'Can you clarify that for me, please',
        name_audio_back: 'inequalities',
    },
]

printCards(words[0])
changeStatusButtons()

let promedio = 0

//funcion para mostrar objetos randomes
function changeWord(type) {
    if (type == 'next') {
        document.getElementById('next').classList.remove('animate-button')

        isback = false
        num_card++
    } else {
        isback = false
        num_card--
    }

    document.querySelector('.cards').classList.remove('flip')

    promedio = ((num_card + 1) * 100) / words.length
    setScoreStorage((module = 'M1'), (lesson = 'L2'), {
        name: 'flashcard',
        score: promedio,
        type: 'presentation',
    })

    if (num_card >= 0 && num_card < words.length) {
        let word = words[num_card]
        printCards(word)
    }

    changeStatusButtons()
}

function sound(name, back) {
    if (isback) playSound(back)
    else playSound(name)
}

function printCards(word) {
    document.getElementById('btn-flip').classList.add('animate-button')

    optionWord = `
        <div class="front">
            <img src="./assets/img/cards/${word.img}.svg" alt="" width="100%" />
        </div>
        <div class="back">
            ${word.name}
        </div>
            `
    containerCards.innerHTML = optionWord

    //busca el sonido de las cartas en el array y los inserta en el html
    optionSound = `
            <img onclick="sound('${word.name_audio}', '${word.name_audio_back}')"
                src="./assets/img/sound-icon.svg" alt="sound" height="100%" />
            `
    containerSound.innerHTML = optionSound
}

function playSound(name_sound) {
    music.src = `./assets/audio/${name_sound.replace('.', '')}.mp3`
    music.play()
}

//funcion para rotar la carta y volverla a su estado original
function transform() {
    if (isback) isback = false
    else isback = true

    document.querySelector('.cards').classList.toggle('flip')
    document.getElementById('btn-flip').classList.remove('animate-button')
    const music = new Audio('./assets/audio/flip.wav')
    music.play()

    num_card == words.length - 1
        ? alertExcellentWithImage()
        : document.getElementById('next').classList.add('animate-button')
}

document.querySelector('#btn-flip').onclick = function () {
    transform()
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
