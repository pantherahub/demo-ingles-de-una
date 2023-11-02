
let filesImport = [
    { type: 'style', url:  './css/libraries/bootstrap.min.css'},
    { type: 'style', url:  './css/index.css'},

    { type: 'script', url:  './js/libraries/_style_js.js'},
]
let titlePage = null
let page = null
let bg = null

document.addEventListener('DOMContentLoaded', ()=> {
    getFilesImport(filesImport)

    titlePage = getQueryVariable('title')
    page = getQueryVariable('page')
    bg = getQueryVariable('bg')

    if(titlePage && page){
        let contentPage = document.querySelector('#content-page')
        let html = ` <iframe title="${titlePage}" src="./exercises/${titlePage}/${page}/index.html"> </iframe> `

        if(bg){
            // document.querySelector('body').style.setProperty('--bg-image-body', `url('https://dummyimage.com/600x600/ccc/000')`)
            document.querySelector('body').style.setProperty('--bg-image-body', `url("./../images/template/${bg}.jpg")`) /*  */
        }
        
        contentPage.innerHTML = html
    }
})


function getFilesImport(files){
    files.forEach(file => {
        file.type == 'style' && setFileStyle(file.url)
        file.type == 'script' && setFileScript(file.url)
    });
}

function setFileStyle(url){
    document.querySelector('head').innerHTML += ` <link rel="stylesheet" href="${url}"> `
}

function setFileScript(url){
    document.querySelector('body').innerHTML += ` <script src="${url}"></script> `
}

function getQueryVariable(variable){
    let url = window.location.href.replace(/%20/g, ' ').split('/')

    try{
        let groupVars = url[url.length-1].split('?')[1]
        let vars = groupVars.split('&')

        for(var i = 0; i < vars.length; i++){
            var pair = vars[i].split('=')
            if(pair[0] == variable){
                return pair[1];
            }
        }
        return false
    }catch(err){
        return false
    }
}


window.addEventListener('message', function(event) {
    if(event.data.winScore){    
        if(event.data.winScore == 'win'){
            let url = `${titlePage}/${page}`
            window.location.href = `exercises/${url}/win.html?bg=${bg}`
            return
        }

        window.location.href = `./exercises/score.html?modulo=${event.data.winScore.modulo}&lesson=${event.data.winScore.lesson}`
        return
    }
    window.location.href = 'index.html'
});
