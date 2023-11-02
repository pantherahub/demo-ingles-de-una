let words = [
    {
        clue: 'Would you please repeat?',
        phrase_find:
            'I SAID THAT WE SHOULD FOCUS ON THE SUSTAINABLE DEVELOPMENT GOALS',
    },
    {
        clue: 'Can I ask a question?',
        phrase_find: 'SURE WHAT DO YOU WANT TO KNOW',
    },
    {
        clue: 'Sorry Im not sure what you mean',
        phrase_find:
            'DONT WORRY I MEAN THAT WE NEED TO USE CLEAN ENERGY TO SAVE THE PLANET',
    },
    {
        clue: 'Could you be more specific?',
        phrase_find:
            'YES I THINK THAT WE SHOULD HAVE A RESPONSIBLE CONSUMPTION AND PRODUCTION OF PAPER TO REDUCE DEFORESTATION',
    },
]

let limit_incorrects = 10
let hangman_number = 0
let accerts = 0
let intents = 0
let isWin = true

window.onload = () => {
    changeStatusButtons()
    printClues()
}

function printClues() {
    printActualWord()

    document.querySelector('.container-clues').innerHTML = `
        <p class="clues m-0" id="hangman${hangman_number}">${
        hangman_number + 1
    }. ${words[hangman_number].clue}</p>
    `
}

function select() {
    let selected_element = document.getSelection().focusNode.parentElement
    intents++
    if (
        selected_element.hidden == false &&
        !selected_element.innerHTML.includes('<p>')
    ) {
        if (
            words[hangman_number].phrase_find.includes(
                selected_element.innerHTML
            )
        ) {
            correct += 1
            accerts++

            for (let i = 0; i < words[hangman_number].phrase_find.length; i++) {
                newWord +=
                    words[hangman_number].phrase_find.charAt(i) ==
                    selected_element.innerHTML
                        ? selected_element.innerHTML
                        : words[hangman_number].phrase_find.charAt(i) == '_'
                        ? '_'
                        : words[hangman_number].phrase_find.charAt(i) == ' '
                        ? ' '
                        : oldword.charAt(i)
            }

            document.getElementById('word').innerHTML = newWord
            oldword = newWord
            newWord = ''

            soundCorrectAnswer()
        } else {
            mistakes += 1

            $('.part-' + mistakes).css('opacity', '1')
            if (mistakes < limit_incorrects) {
                soundIncorrectAnswer()
            } else {
                for (
                    let i = 0;
                    i < words[hangman_number].phrase_find.length;
                    i++
                ) {
                    newWord += words[hangman_number].phrase_find.charAt(i)
                }

                document.getElementById('word').innerHTML = newWord
                oldword = newWord
                newWord = ''
                isWin = false

                alertTryAgain()
            }
        }

        selected_element.setAttribute('hidden', 0)
        selected_element.setAttribute('disabled', 0)
        document.getElementById('correct').innerHTML = correct
        document.getElementById('wrong').innerHTML = mistakes

        if (!oldword.includes('_') && isWin) {
            if (hangman_number == words.length - 1) {
                alertExcellentWithImage({ modulo: 'M1', lesson: 'L2' })
                soundGameSuccess()
                $('.action-buttons').css('pointer-events', 'none')
            } else {
                alertExcellent()
                document.getElementById('next').classList.add('animate-button')
            }
        }

        let promedio = (accerts * 100) / intents
        setScoreStorage((module = 'M1'), (lesson = 'L2'), {
            name: 'hangman',
            score: promedio,
            type: 'assessment',
        })
    }
}

function printActualWord() {
    document.getElementById('actual_word').innerHTML =
        'Word ' + (hangman_number + 1) + ':'
}

function change(type) {
    if (type == 'next') hangman_number += 1
    else hangman_number -= 1

    document.getElementById('next').classList.remove('animate-button')

    restart()
    printClues()
    changeStatusButtons()
}

function restart() {
    correct = 0
    oldword = ''
    newWord = ''
    mistakes = 0
    isWin = true
    document.getElementById('letters').innerHTML =
        '<tr><td><p>A</p></td><td><p>B</p></td><td><p>C</p></td><td><p>D</p></td><td><p>E</p></td><td><p>F</p></td><td><p>G</p></td><td><p>H</p></td><td><p>I</p></td><td><p>J</p></td><td><p>K</p></td><td><p>L</p></td><td><p>M</p></td></tr><tr><td><p>N</p></td><td><p>O</p></td><td><p>P</p></td><td><p>Q</p></td><td><p>R</p></td><td><p>S</p></td><td><p>T</p></td><td><p>U</p></td><td><p>V</p></td><td><p>W</p></td><td><p>X</p></td><td><p>Y</p></td><td><p>Z</p></td></tr>'

    for (let i = 0; i < words[hangman_number].phrase_find.length; i++) {
        oldword +=
            words[hangman_number].phrase_find.charAt(i) == ' ' ? ' ' : '_'
    }

    document.getElementById('word').innerHTML = oldword
    document.getElementById('correct').innerHTML = correct
    document.getElementById('wrong').innerHTML = mistakes

    restartImgHangman()
}

restart()

function restartImgHangman() {
    for (let i = 1; i <= limit_incorrects; i++) {
        $('.part-' + i).css('opacity', '0')
    }
}

function changeStatusButtons() {
    if (hangman_number <= 0 || isEvaluation()) {
        document.querySelector('#img-prev').src =
            './assets/img/button-back-gray.svg'
        document.querySelector('#prev').disabled = true
        document.querySelector('#prev').classList.remove('boton-presionado')
    } else {
        document.querySelector('#img-prev').src = './assets/img/button-back.svg'
        document.querySelector('#prev').disabled = false
        document.querySelector('#prev').classList.add('boton-presionado')
    }

    if (hangman_number == words.length - 1) {
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
    // alertExcellent();
    const music = new Audio('./assets/audios/correct-answer.mp3')
    music.play()
}

function soundIncorrectAnswer() {
    // alertTryAgain();
    const music = new Audio('./assets/audios/incorrect-answer.mp3')
    music.play()
}

function getRandomArray(data) {
    return data
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}
