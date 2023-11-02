let intervalId = null
let element = {}
let img_button = {}
let comenzarAGrabar = {}
let detenerGrabacion = {}
let isPlay = false
let audio = new Audio()
const music = new Audio()
let url = ''

let isReproduce = 'reproducir'

let words = [
    {
        name: 'icon-play',
        name_audio: 'audio-1',
        greeting:
            'I heard you were interested in discussing sustainable development goals.',
    },
    {
        name: 'icon-play',
        name_audio: 'audio-2',
        greeting:
            "Yes, that's right. I think it's an important topic that we should all be aware of.",
    },
    {
        name: 'icon-play',
        name_audio: 'audio-3',
        greeting: 'We should focus on the sustainable development goals.',
    },
    {
        name: 'icon-play',
        name_audio: 'audio-4',
        greeting:
            "Oh, sorry, would you please repeat that? I didn't quite catch what you said.",
    },
    {
        name: 'icon-play',
        name_audio: 'audio-5',
        greeting:
            'No problem at all. I said that we should focus on the sustainable development goals.',
    },
    {
        name: 'icon-play',
        name_audio: 'audio-6',
        greeting: 'Can I ask a question?',
    },
    {
        name: 'icon-play',
        name_audio: 'audio-7',
        greeting: 'Of course, go ahead.',
    },
    {
        name: 'icon-play',
        name_audio: 'audio-8',
        greeting:
            'What exactly are the sustainable development goals? Can you clarify that for me, please?',
    },
    {
        name: 'icon-microphone',
        name_audio: 'audio-9',
        greeting:
            'The sustainable development goals are a set of targets that the United Nations has identified to create a better and more sustainable future for all. They include 17 goals such as eliminating poverty, promoting gender equality, and combating climate change.',
    },
    {
        name: 'icon-play',
        name_audio: 'audio-10',
        greeting: 'Oh, I see. Thanks for explaining that.',
    },
    {
        name: 'icon-play',
        name_audio: 'audio-11',
        greeting:
            'Besides, we can focus on teaching our community how to reduce inequalities. This can include promoting access to education and healthcare for all, and addressing issues of discrimination and exclusion.',
    },
    {
        name: 'icon-play',
        name_audio: 'audio-12',
        greeting:
            "I understand now. Thank you for explaining everything to me. It's really important that we all work together to achieve these goals.",
    },
]

window.onload = () => {
    initialize('firstPart')
}

function initialize(progress) {
    if (progress == 'firstPart') {
        document.querySelector('.message-box-holder').innerHTML = ''
        init()

        words.forEach(function (element, key) {
            document.querySelector('.message-box-holder').innerHTML += `
                        <div style="${
                            key % 2 != 0
                                ? 'margin: 0 30px; '
                                : 'margin: 15px 15px;'
                        }" id="message-${key}" class="d-flex mb-3 cursor-pointer ${
                key % 2 != 0 ? 'flex-row-reverse' : 'align-self-start'
            } mb-2 container-message">
                            <div class="person ${
                                key % 2 != 0 ? 'ms-4' : 'me-4'
                            }" data-action="0" onclick='definir("${
                element.name
            }", "${element.name_audio}", "${key}")' id="${
                'btn-record-pronunciation' + key
            }">
                                <img src="./assets/img/roleplay/${
                                    element.name
                                }.svg" class="imagen" height="35em" alt="" >
                            </div>
                        
                            <div onclick="action('${
                                element.name_audio
                            }', '${key}')" class="message-box ${
                key % 2 != 0 ? '' : 'message-partner'
            }">
                                ${element.greeting}
                            </div>
                        </div>
                        `
        })
        let images = document.querySelectorAll('.imagen')

        images.forEach((image, key) => {
            if (image.src.includes('icon-play.svg')) {
                image.classList.add('grayscale')
            }
        })

        images[0].classList.add('animate-button')
        images[0].classList.remove('grayscale')
    }
}

function action(audio, key) {
    if (
        !$('#message-' + key + ' div:nth-child(2)').hasClass('message-selected')
    ) {
        isReproduce = 'reproducir'
    }

    $('#message-' + key + ' img').removeClass('animate-button')

    if (isReproduce == 'reproducir') {
        synth.cancel()
        //speakText(greeting);
        // Descomentar siguientes lineas si se están utilizando archivos de audio
        music.src = `./assets/audios/${audio}.mp3`
        music.play()

        isReproduce = 'pausar'

        $('#message-' + key + ' .message-box').addClass('message-selected')
        $('#message-' + key + ' div::after').css(
            'background-color',
            '#DF3629 !important'
        )

        $('#message-' + key + ' .person').addClass('record-color')
        $('#message-' + key + ' img').removeClass('grayscale')
        $('#message-' + key + ' img').attr(
            'src',
            './assets/img/roleplay/icon-pause.svg'
        )

        for (let i = 0; i < words.length; i++) {
            if (key != i) {
                $('#message-' + i + ' .message-box').removeClass(
                    'message-selected'
                )
            }
        }
    } else if (isReproduce == 'pausar') {
        synth.pause()
        // Descomentar siguientes lineas si se están utilizando archivos de audio
        music.pause()

        isReproduce = 'continuar'

        $('#message-' + key + ' .person').removeClass('record-color')
        $('#message-' + key + ' img').attr(
            'src',
            './assets/img/roleplay/icon-play.svg'
        )
    } else if (isReproduce == 'continuar') {
        synth.resume()
        // Descomentar siguientes lineas si se están utilizando archivos de audio
        music.play()

        isReproduce = 'pausar'

        $('#message-' + key + ' .person').addClass('record-color')
        $('#message-' + key + ' img').attr(
            'src',
            './assets/img/roleplay/icon-pause.svg'
        )
    }

    utterThis.addEventListener('end', (event) => {
        $('#message-' + key + ' .message-box').removeClass('message-selected')
        $('#message-' + key + ' div::after').css(
            'background-color',
            '#DF3629 !important'
        )

        $('#message-' + key + ' .person').removeClass('record-color')
        $('#message-' + key + ' img').addClass('grayscale')
        $('#message-' + key + ' img').attr(
            'src',
            './assets/img/roleplay/icon-play.svg'
        )

        synth.cancel()
        isReproduce = 'reproducir'

        $('#message-' + (Number(key) - 1) + ' img').removeClass(
            'animate-button'
        )
        $('#message-' + Number(key) + ' img').removeClass('animate-button')

        $('#message-' + (Number(key) + 1) + ' img').addClass('animate-button')
        $('#message-' + (Number(key) + 1) + ' img').removeClass('grayscale')

        let promedio = Math.round(((Number(key) + 1) * 100) / words.length)
        setScoreStorage((module = 'M1'), (lesson = 'L2'), {
            name: 'roleplay microphone',
            score: promedio,
            type: 'englishTime',
        })
    })

    // Descomentar siguientes lineas si se están utilizando archivos de audio
    music.addEventListener('ended', (event) => {
        $('#message-' + key + ' .message-box').removeClass('message-selected')
        $('#message-' + key + ' div::after').css(
            'background-color',
            '#DF3629 !important'
        )

        $('#message-' + key + ' .person').removeClass('record-color')
        $('#message-' + key + ' img').addClass('grayscale')
        $('#message-' + key + ' img').attr(
            'src',
            './assets/img/roleplay/icon-play.svg'
        )

        music.currentTime = 0
        isReproduce = 'reproducir'

        $('#message-' + (Number(key) - 1) + ' img').removeClass(
            'animate-button'
        )
        $('#message-' + Number(key) + ' img').removeClass('animate-button')

        $('#message-' + (Number(key) + 1) + ' img').addClass('animate-button')
        $('#message-' + (Number(key) + 1) + ' img').removeClass('grayscale')
    })
}

function definir(name, audio, key) {
    name != 'icon-microphone' ? action(audio, key) : assingAction(key)
}

function stopInterval() {
    clearInterval(intervalId)
    intervalId = null
}

function assingAction(key) {
    element = document.querySelector(`#btn-record-pronunciation${key}`)
    img_button = document.querySelector(`#btn-record-pronunciation${key} > img`)

    switch (Number(element.dataset.action)) {
        case 0:
            record()
            break
        case 1:
            pause()
            break

        case 2:
            play()
            break

        case 3:
            download(key)
            break

        default:
            repeat()
            break
    }
}

function record() {
    element.addEventListener('click', comenzarAGrabar())
    img_button.classList.add('animate-button')

    element.classList.add('record-color')
    img_button.src = './assets/img/roleplay/icon-pause-record.svg'
    element.dataset.action = 1
}

function pause() {
    detenerGrabacion()

    img_button.classList.remove('animate-button')

    element.classList.remove('record-color')
    img_button.src = './assets/img/roleplay/icon-play.svg'
    element.dataset.action = 2
}

function play() {
    reproducir()
}

function download(key) {
    element.classList.add('record-color')
    img_button.src = './assets/img/roleplay/icon-download-white.svg'

    downloadRecording()

    setTimeout(() => {
        element.classList.remove('record-color')
        img_button.src = './assets/img/roleplay/icon-repeat.svg'
        element.dataset.action = 4

        $('#message-' + (Number(key) + 1) + ' img').addClass('animate-button')
        $('#message-' + (Number(key) + 1) + ' img').removeClass('grayscale')
    }, 1000)
}

function repeat() {
    img_button.src = './assets/img/roleplay/icon-microphone.svg'
    element.dataset.action = 0
}

function reproducir() {
    if (isPlay) {
        audio.pause()
        isPlay = false

        element.classList.remove('record-color')
        img_button.src = './assets/img/roleplay/icon-play.svg'
        return
    }

    audio.play()
    isPlay = true

    element.classList.add('record-color')
    img_button.src = './assets/img/roleplay/icon-pause.svg'

    audio.addEventListener('ended', function () {
        element.classList.remove('record-color')
        img_button.src = './assets/img/roleplay/icon-download.svg'
        isPlay = false

        element.dataset.action = 3
    })
}

function downloadRecording() {
    let download_recording = document.createElement('a')
    document.body.appendChild(download_recording)
    download_recording.style = 'display: none'
    download_recording.href = url
    download_recording.download = 'grabacion.webm'
    // Hacer click en el enlace
    download_recording.click()
}

const init = () => {
    const tieneSoporteUserMedia = () => !!navigator.mediaDevices.getUserMedia

    // Si no soporta...
    // Amable aviso para que el mundo comience a usar navegadores decentes ;)
    if (typeof MediaRecorder === 'undefined' || !tieneSoporteUserMedia())
        return alert(
            'Tu navegador web no cumple los requisitos; por favor, actualiza a un navegador decente como Firefox o Google Chrome'
        )

    let mediaRecorder
    // Consulta la lista de dispositivos de entrada de audio y llena el select
    const listaDeDispositivos = []
    const llenarLista = () => {
        navigator.mediaDevices.enumerateDevices().then((dispositivos) => {
            dispositivos.forEach((dispositivo, indice) => {
                if (dispositivo.kind === 'audioinput') {
                    const opcion = []
                    opcion.value = dispositivo.deviceId
                    listaDeDispositivos.push(opcion)
                }
            })
        })
    }

    // Comienza a grabar el audio con el dispositivo seleccionado
    comenzarAGrabar = () => {
        if (!listaDeDispositivos.length) return alert('No hay dispositivos')

        // No permitir que se grabe doblemente
        if (mediaRecorder) return alert('Ya se está grabando')

        navigator.mediaDevices
            .getUserMedia({
                audio: {
                    deviceId: listaDeDispositivos[0].value,
                },
            })
            .then((stream) => {
                // Comenzar a grabar con el stream
                mediaRecorder = new MediaRecorder(stream)
                mediaRecorder.start()
                // En el arreglo pondremos los datos que traiga el evento dataavailable
                const fragmentosDeAudio = []
                // Escuchar cuando haya datos disponibles
                mediaRecorder.addEventListener('dataavailable', (evento) => {
                    // Y agregarlos a los fragmentos
                    fragmentosDeAudio.push(evento.data)
                })
                // Cuando se detenga (haciendo click en el botón) se ejecuta esto
                mediaRecorder.addEventListener('stop', () => {
                    // Detener el stream
                    stream.getTracks().forEach((track) => track.stop())

                    // Convertir los fragmentos a un objeto binario
                    const blobAudio = new Blob(fragmentosDeAudio)

                    // Crear una URL o enlace para descargar
                    const urlParaDescargar = URL.createObjectURL(blobAudio)

                    url = urlParaDescargar
                    audio.src = url
                })
            })
            .catch((error) => {
                // Aquí maneja el error, tal vez no dieron permiso
                console.log(error)
            })
    }

    detenerGrabacion = () => {
        if (!mediaRecorder) return alert('No se está grabando')
        mediaRecorder.stop()
        mediaRecorder = null
    }

    // Cuando ya hemos configurado lo necesario allá arriba llenamos la lista
    llenarLista()
}

function soundGameSuccess() {
    const music = new Audio('./assets/audios/game-success.mp3')
    music.play()
}
