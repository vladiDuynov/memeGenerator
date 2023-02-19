'use strict'

function onInit(){
    __createImgs()
    renderGallery()
    gCanvas = document.querySelector("#my-canvas")
    gCtx = gCanvas.getContext("2d")
}

function __createImg(url, keywords) {
    return {
        id: gNextId++,
        url,
        keywords
    }
}

function __createImgs() {
    for (let i = 1; i < 10; i++) {
        gImgs.push(__createImg(`imgs/${i}.jpg`, ['funny']))
    }
}