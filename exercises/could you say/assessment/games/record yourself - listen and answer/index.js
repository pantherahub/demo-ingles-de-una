const containerCards = document.querySelector('#container-cards')
const containerCounter = document.getElementById('counter')

let url = ''
let download_recording = {}
let id_buttons = [{ btn_play: false }, { btn_download: false }]
let isPlay2 = false
let isReproduce = 'reproducir'
let isPlay = false
let audio = new Audio()
let voice = new Audio()
const music = new Audio('./assets/audios/Message Notification.wav')

let num_card = 0
let accerts = 0
let intents = 0
let detener_grabacion = false
let counter = 1

let btn_play = document.querySelector('#btn_play')
let btn_download = document.querySelector('#btn_download')
let btn_sound = document.querySelector('#btn-sound')

let img_record = document.querySelector('#img-record-pronunciation')
let img_play = document.querySelector('#img-play')
let img_download = document.querySelector('#img-download')
let img_sound = document.querySelector('#img-sound')

const getImg = (name) => `./../../../../assets/img/numbers/${name}.svg`

let words = [
    { name: 'Would you please repeat?', img: getImg('20') },
    { name: 'Can I ask a question?', img: getImg('21') },
    { name: 'Could you be more specific?', img: getImg('22') },
    { name: 'Can you give me an example?', img: getImg('23') },
    { name: 'Can you clarify that for me, please?', img: getImg('24') },
]

containerCounter.innerHTML = `
    <h3>${counter}/${words.length}</h3>
`

changeStatusButtons()

function soundVoice(name_sound) {
    voice.src = `./assets/audios/${name_sound.replace('?', '')}.mp3`
    voice.play()
}

function changeWord(type) {
    if (type == 'next') {
        num_card++
        counter++

        containerCounter.innerHTML = `
        <h3>${counter}/${words.length}</h3>
        `

        errors = 3
        $('#btn-record-pronunciation').css('pointer-events', '')
        document.getElementById('next').classList.remove('animate-button')
    } else {
        num_card--
        counter--

        containerCounter.innerHTML = `
        <h3>${counter}/${words.length}</h3>
        `
    }
    // if(type == "next") num_card++, errors = 3, $("#btn-record-pronunciation").css('pointer-events', ''), document.getElementById('next').classList.remove("animate-button")
    // else num_card--;

    if (num_card >= 0 && num_card < words.length) {
        let word = words[num_card]
    }

    promedio = Math.round(((num_card + 1) * 100) / words.length)
    setScoreStorage((module = 'M1'), (lesson = 'L2'), {
        name: 'record yourself recording voice',
        score: promedio,
        type: 'selftCheck',
    })

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

$btnComenzarGrabacion = document.querySelector('#btn-record-pronunciation')

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
    const comenzarAGrabar = () => {
        changeRecordButtonState()

        if (detener_grabacion) {
            detenerGrabacion()
            return
        }

        disabledButtons()

        Command: toastr['info']('starting recording', 'recording')

        toastr.options = {
            closeButton: false,
            debug: false,
            newestOnTop: false,
            progressBar: true,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            onclick: null,
            showDuration: '300',
            hideDuration: '1000',
            timeOut: '5000',
            extendedTimeOut: '1000',
            showEasing: 'swing',
            hideEasing: 'linear',
            showMethod: 'fadeIn',
            hideMethod: 'fadeOut',
        }

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

                    // Crear un elemento <a> invisible para descargar el audio

                    // Y remover el objeto
                    // window.URL.revokeObjectURL(urlParaDescargar);
                })
            })
            .catch((error) => {
                // Aquí maneja el error, tal vez no dieron permiso
                console.log(error)
            })

        detener_grabacion = true
    }

    const detenerGrabacion = () => {
        if (!mediaRecorder) return alert('No se está grabando')
        mediaRecorder.stop()
        mediaRecorder = null

        detener_grabacion = false

        enablePlayButton()

        Command: toastr['success']('recording finished')

        toastr.options = {
            closeButton: false,
            debug: false,
            newestOnTop: false,
            progressBar: true,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            onclick: null,
            showDuration: '300',
            hideDuration: '1000',
            timeOut: '5000',
            extendedTimeOut: '1000',
            showEasing: 'swing',
            hideEasing: 'linear',
            showMethod: 'fadeIn',
            hideMethod: 'fadeOut',
        }
    }

    $btnComenzarGrabacion.addEventListener('click', comenzarAGrabar)

    // Cuando ya hemos configurado lo necesario allá arriba llenamos la lista
    llenarLista()
}

init()
disabledButtons()

function reproducir() {
    if (isPlay) {
        audio.pause()
        isPlay = false

        btn_play.classList.remove('record-color')
        img_play.src = './assets/img/icon-play.svg'
        return
    }

    audio.play()
    isPlay = true

    enableDownloadButton()

    disabledButtons()

    audio.addEventListener('ended', function () {
        btn_play.classList.remove('record-color')
        img_play.src = './assets/img/icon-play.svg'
        isPlay = false
    })
}

function sound() {
    if (img_sound.src.includes('icon-sound') && isPlay2 == false) {
        isReproduce = 'reproducir'
    }

    if (isReproduce == 'reproducir') {
        soundVoice(words[num_card].name)
        isReproduce = 'pausar'

        btn_sound.classList.add('record-color')
        img_sound.src = './assets/img/icon-pause.svg'
    } else if (isReproduce == 'pausar') {
        synth.pause()
        voice.pause()
        isReproduce = 'continuar'
        isPlay2 = true

        btn_sound.classList.remove('record-color')
        img_sound.src = './assets/img/icon-sound.svg'
    } else if (isReproduce == 'continuar') {
        synth.resume()
        voice.play()
        isReproduce = 'pausar'

        btn_sound.classList.add('record-color')
        img_sound.src = './assets/img/icon-pause.svg'
    }

    utterThis.addEventListener('end', (event) => {
        btn_sound.classList.remove('record-color')
        img_sound.src = './assets/img/icon-sound.svg'

        synth.cancel()
        isPlay2 = false
        isReproduce = 'reproducir'
    })

    // Descomentar si se están utilizando archivos de audio
    voice.addEventListener('ended', (event) => {
        btn_sound.classList.remove('record-color')
        img_sound.src = './assets/img/icon-sound.svg'

        voice.currentTime = 0
        isPlay2 = false
        isReproduce = 'reproducir'
    })
}

function downloadRecording() {
    changeColorBtnDownload()

    let download_recording = document.createElement('a')
    document.body.appendChild(download_recording)
    download_recording.style = 'display: none'
    download_recording.href = url
    download_recording.download = 'grabacion.webm'
    // Hacer click en el enlace
    download_recording.click()

    if (num_card == words.length - 1)
        alertExcellentWithImage(), soundGameSuccess()
    else document.getElementById('next').classList.add('animate-button')
}

function disabledButtons() {
    _.forEach(id_buttons, function (state, key) {
        let element = document.getElementById(Object.keys(state))
        let value = Object.values(state)

        value[0] == false
            ? (element.style = 'pointer-events: none')
            : (element.style = 'pointer-events: ')
    })
}

function changeRecordButtonState() {
    img_record.classList.add('animate-button')
    $btnComenzarGrabacion.classList.add('record-color')
    img_record.src = './assets/img/icon-pause-record.svg'

    music.play()
}

function enablePlayButton() {
    img_play.classList.add('animate-button')
    btn_play.classList.remove('grayscale')
    _.set(id_buttons, '[0].btn_play', true)
    disabledButtons()

    img_record.classList.remove('animate-button')
    $btnComenzarGrabacion.classList.remove('record-color')
    img_record.src = './assets/img/icon-microphone.svg'
}

function enableDownloadButton() {
    btn_play.classList.add('record-color')
    img_play.classList.remove('animate-button')
    img_play.src = './assets/img/icon-pause.svg'

    btn_download.classList.remove('grayscale')
    _.set(id_buttons, '[1].btn_download', true)
}

function changeColorBtnDownload() {
    btn_download.classList.add('record-color')
    img_download.src = './assets/img/icon-download-white.svg'

    setTimeout(() => {
        btn_download.classList.remove('record-color')
        img_download.src = './assets/img/icon-download.svg'
    }, 1000)
}

function soundGameSuccess() {
    const music = new Audio('./assets/audios/game-success.mp3')
    music.play()
}
