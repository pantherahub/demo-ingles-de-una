let url = window.location.href.replace(/%20/g, ' ').split('/')
let titlePage = url[url.length - 3].toUpperCase()
let currentSection = url[url.length - 2].toUpperCase()
let swiperMenu = []

let configActivity = {
    filesBase: [
        { type: 'style', url: '../../assets/css/libraries/bootstrap.min.css' },
        {
            type: 'style',
            url: '../../assets/css/libraries/swiper-bundle.min.css',
        },
        { type: 'style', url: '../../assets/css/index.css' },
        { type: 'script', url: '../../assets/libs/jquery.min.js' },
        { type: 'script', url: '../../assets/libs/swiper-bundle.min.js' },
    ],
    'COULD YOU SAY': {
        'ENGLISH TIME': {
            PRESENTATION: [
                {
                    title: "Let's explore",
                    bg: '#009BDD',
                    game: 'lets explore',
                },
                {
                    title: 'Flashcards',
                    bg: '#FE4B8F',
                    game: 'flashcards',
                },
            ],
            'ENGLISH TIME': [
                {
                    title: "Let's order",
                    bg: '#B750F7',
                    game: 'Order sentences',
                },
                {
                    title: 'Roleplay',
                    bg: '#DF3629',
                    game: 'roleplay - microphone',
                },
                {
                    title: 'Fill in the blanks',
                    bg: '#01C851',
                    game: 'fill in the blanks - text long audio',
                },
            ],
        },

        ASSESSMENT: {
            'SELF CHECK': [
                {
                    title: 'Record yourself',
                    bg: '#FF9317',
                    game: 'record yourself - listen and answer',
                },
                {
                    title: 'Multiple choice',
                    bg: '#FE4B8F',
                    game: 'multiple choiceV2 - audios',
                },
            ],
            ASSESSMENT: [
                {
                    title: 'Multiple choice',
                    bg: '#B750F7',
                    game: 'multiple choice - text',
                },
                { title: 'Hangman', bg: '#E03629', game: 'hangman' },
            ],
        },
    },
}

getFilesImport(configActivity['filesBase'])
setConfigActivity()

function setConfigActivity() {
    // document.getElementById('title').innerHTML = titlePage
    let currentActivities = configActivity[titlePage][currentSection]

    let htmlContentHead = `
        <div class="mb-4 pt-5 d-flex justify-content-around" id="container-ports">
        <a href="../../../index.html" class="btn-action-circle">
        <img src="../../assets/img/icon-slide-back.svg" width="100%" alt="">
    </a>  
       
            <h1 class="title-activity" id="title"> ${
                titlePage == 'COULD YOU SAY'
                    ? 'Sorry, could you say that again?'
                    : titlePage
            } </h1>
            <a href="../../../index.html" onclick="setDirection()" class="btn-action-circle">
            <img src="../../assets/img/icon-home.svg" width="100%" alt="">
        </a>
        <img class="people-img" src="../../assets/img/people.svg" width="100%" alt="">

        </div>
    `
    let htmlContentSections = `
        <div class="container">
            <div class="row">
    `

    Object.keys(currentActivities).forEach((nameSection) => {
        htmlContentSections += `
            <div class="col-12 col-lg-6 custom-scrollbar">
                <h3 class="subtitle-activity">${nameSection}</h3>
        `
        currentActivities[nameSection].forEach((activity) => {
            swiperMenu.push(activity)

            htmlContentSections += `
                <a href="#" class="content-cards" onclick="selectActivity('${activity.game}')">
                    <div class="content-cards--description text-center">${activity.title}</div>
                </a>
            `
        })

        htmlContentSections += `
            </div>
        `
    })

    htmlContentSections += `
        </div>
    </div>
    `
    document.getElementById('content-head').innerHTML = htmlContentHead
    document.getElementById('content-sections').innerHTML = htmlContentSections
}

function getFilesImport(files) {
    files.forEach((file) => {
        file.type == 'style' && setFileStyle(file.url)
        file.type == 'script' && setFileScript(file.url)
    })
}

function setFileStyle(url) {
    document.querySelector(
        'head'
    ).innerHTML += ` <link rel="stylesheet" href="${url}"> `
}

function setFileScript(url) {
    var s = document.createElement('script')
    s.src = url
    document.querySelector('head').appendChild(s)
}

function setDirection() {
    window.parent.postMessage({ message: 'Hello world' }, '*')
}

function selectActivity(activity) {
    let titleActivity = activity.toUpperCase()
    let htmlActivityHead = ``
    let htmlActivity = `<iframe name="iframe-activity" title="${titleActivity}" src="./games/${activity}/index.html"> </iframe> `

    htmlActivityHead += `
        <div class="mb-4 pt-5 d-flex justify-content-between" id="container-ports">
            <a href="../../../index.html" class="btn-action-circle">
                <img src="../../assets/img/icon-home.svg" width="100%" alt="">
            </a>
            <a class="swiper-prev btn-action-circle">
                <img id="img-back" src="../../assets/img/icon-slide-back-simple-gray.svg" width="100%" alt="">
            </a>
            <div class="swiper swiper-flashcards">
                <div class="swiper-wrapper">
    `

    swiperMenu.forEach((item) => {
        let isStyle =
            titleActivity == item.game.toUpperCase() &&
            `background: ${item.bg}; color: white`
        // console.log(isStyle)
        htmlActivityHead += `
            <div class="swiper-slide botones-superiores text-center" data-activity="${item.game}" onclick="selectActivity('${item.game}')" style="${isStyle}">
                ${item.title}
            </div>
        `
    })

    htmlActivityHead += `
                </div>
            </div>
            <a class="swiper-next btn-action-circle">
            <img id="img-next" src="../../assets/img/icon-slide-next-simple.svg" width="100%" alt="">
        </a>
    </div>
    `

    document.getElementById('content-head').innerHTML = htmlActivityHead
    document.getElementById('content-sections').innerHTML = htmlActivity

    setTimeout(() => {
        document.querySelector(`[data-activity="${activity}"]`).scrollIntoView()
    }, 1000)

    if (document.querySelector('.swiper-flashcards')) {
        const swiper = new Swiper('.swiper-flashcards', {
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
            },
        })

        swiper.on('reachBeginning', function () {
            document.querySelector('#img-back').src =
                '../../assets/img/icon-slide-back-simple-gray.svg'
            document.querySelector('#img-next').src =
                '../../assets/img/icon-slide-next-simple.svg'
        })

        swiper.on('reachEnd', function () {
            document.querySelector('#img-back').src =
                '../../assets/img/icon-slide-back-simple.svg'
            document.querySelector('#img-next').src =
                '../../assets/img/icon-slide-next-simple-gray.svg'
        })
    }
}
