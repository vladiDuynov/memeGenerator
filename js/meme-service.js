'use strict'

let gImgs = []
let gMeme
let gCurrImg
let gNextId = 1
let gCanvas
let gCtx
let gDownload = false

function getImgs(){
    return gImgs
}

function setImg(imgId){
    __createMeme(imgId)
    openEditor()
    renderMeme()
}

function getMeme() {
    return gMeme
}

function findImgById(imgId) {
    return gImgs.find(img => {
        return img.id === imgId
    })
}

function __createMeme(imgId) {
    gCurrImg = findImgById(imgId)
    const meme = {
        selectedImg: gCurrImg,
        selectedTxtIdx: 0,
        txts: [{
            line: '',
            fontFam: 'Impact',
            txtAlign: "start",
            fontColor: "white",
            strokeColor: "black",
            size: 50,
            width: 0,
            x: 70,
            y: 70
        }, 
        {
            line: '',
            fontFam: 'Impact',
            txtAlign: "start",
            fontColor: "white",
            strokeColor: "black",
            size: 50,
            width: 0,
            x: 70,
            y: 420
        }]
    }
    gMeme = meme
}

function setLineText(txt){
    let meme = gMeme
    let txtIdx = meme.selectedTxtIdx
    meme.txts[txtIdx].line = txt
}

function updateTxtWidth(textWidth) {
    let meme = gMeme
    meme.txts[meme.selectedTxtIdx].width = textWidth
}

function updateFontColor(fontColor) {
    let meme = gMeme
    let textIdx = meme.selectedTxtIdx
    meme.txts[textIdx].fontColor = fontColor
}

function updateOutlineColor(strokeColor) {
    let meme = gMeme
    let textIdx = meme.selectedTxtIdx
    meme.txts[textIdx].strokeColor = strokeColor
}

function updateTxtWidth(textWidth) {
    let meme = gMeme
    meme.txts[meme.selectedTxtIdx].width = textWidth
}

function updateSize(diff) {
    let meme = gMeme
    meme.txts[meme.selectedTxtIdx].size += diff
}

function updateHeight(diff) {
    let meme = gMeme
    let txtIdx = meme.selectedTxtIdx
    let currHeight = meme.txts[txtIdx].y
    meme.txts[txtIdx].y = currHeight + diff
}

function addLine() {
    let meme = gMeme
    meme.txts.push({
        line: '',
        fontFam: 'Impact',
        txtAlign: "start",
        fontColor: "white",
        strokeColor: "black",
        size: 60,
        width: 0,
        x: 80,
        y: (gCanvas.height / 2)
    })
    meme.selectedTxtIdx = meme.txts.length - 1
}

function deleteLine() {
    let meme = gMeme
    let txtIdx = meme.selectedTxtIdx
    meme.txts[txtIdx].line = ''
}

function setTxtIdx() {
    let meme = gMeme
    let txtIdx = meme.selectedTxtIdx
    if (txtIdx < meme.txts.length - 1) {
        meme.selectedTxtIdx++
    } else {
        meme.selectedTxtIdx = 0
    }
}

function updateAlign(txtAlign) {
    let meme = gMeme
    let text = meme.txts[meme.selectedTxtIdx]
    text.txtAlign = txtAlign
    switch (text.txtAlign) {
        case "start":
            text.x = 80
            break
        case "center":
            text.x = gCanvas.width / 2
            break
        case "end":
            text.x = gCanvas.width - 80
            break
    }
}

function updateFontFamily(fontFamily) {
    let meme = gMeme
    let text = meme.txts[meme.selectedTxtIdx]
    switch (fontFamily) {
        case "impact":
            text.fontFam = 'Impact'
            break
        case "ariel":
            text.fontFam = 'Ariel'
            break
        case "helvetica":
            text.fontFam = 'Helvetica'
            break
        case "roboto":
            text.fontFam = 'Roboto'
            break
        case "calibri":
            text.fontFam = 'Calibri'
            break
    }
}

