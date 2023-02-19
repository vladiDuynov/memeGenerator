'use strict'

function openEditor() {
    document.querySelector('.menu-item.gallery-tab').classList.remove('active')
    document.querySelector('.editor-container').classList.remove('hidden')
    document.querySelector('.main-content').classList.add('hidden')
}

function closeEditor() {
    document.querySelector('.menu-item.gallery-tab').classList.add('active')
    document.querySelector('.editor-container').classList.add('hidden')
    document.querySelector('.main-content').classList.remove('hidden')
}

function drawText(text) {
    gCtx.font = `${text.size}px ${text.fontFam}`
    gCtx.textAlign = text.txtAlign
    gCtx.lineWidth = 2
    gCtx.fillStyle = text.fontColor
    gCtx.strokeStyle = text.strokeColor
    gCtx.fillText(text.line, text.x, text.y)
    gCtx.strokeText(text.line, text.x, text.y)
}

function drawRect(text) {
    gCtx.beginPath()
    gCtx.rect(text.x, text.y - text.size, text.width + 20, text.size * 1.5)
    gCtx.fillStyle = "rgba(250,250,250,0)"
    gCtx.strokeStyle = 'white'
    gCtx.fillRect(text.x, text.y - text.size, text.width + 20, text.size * 1.5)
    gCtx.stroke()
    gCtx.closePath()
}

function renderMeme() {
    let elImg = new Image()
    let img = gCurrImg
    elImg.onload = () => {
        gCanvas.width = elImg.width
        gCanvas.height = elImg.height
        let meme = getMeme()
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
        drawRect(meme.txts[meme.selectedTxtIdx])
        meme.txts.forEach(txt => {
            drawText(txt)
        })

    }
    elImg.src = img.url
}

function onSetLineText(){
    let meme = getMeme()
    let txt = document.querySelector('.txt-input').value
    setLineText(txt) 
    setTextWidth(meme.txts[meme.selectedTxtIdx].line)
    renderMeme()
}

function setTextWidth(textLine) {
    let textWidth = gCtx.measureText(textLine).width
    updateTxtWidth(textWidth)
}

function onUpdateOutlineColor() {
    let strokeColor = document.querySelector('.stroke-color').value
    updateOutlineColor(strokeColor)
    renderMeme()
}

function onUpdateFontColor() {
    let fontColor = document.querySelector('.font-color').value
    updateFontColor(fontColor)
    renderMeme()
}

function onUpdateSize(diff) {
    updateSize(diff)
    renderMeme()
}

function onUpdateHeight(diff) {
    updateHeight(diff)
    renderMeme()
}

function onAddLine() {
    addLine()
    let meme = getMeme()
    document.querySelector('.txt-input').value = ''
    if (meme.txts.length) {
        let elDeleteBtn = document.querySelector(".delete-btn")
        elDeleteBtn.classList.remove("disabled")
    }
}

function onDeleteLine() {
    deleteLine()
    let meme = getMeme()
    document.querySelector('.txt-input').value = ''
    if (meme.txts.length < 1) {
        let elDeleteBtn = document.querySelector(".delete-btn")
        elDeleteBtn.classList.add("disabled")
    }
    onSetTxtIdx()
    renderMeme()
}

function onSetTxtIdx() {
    setTxtIdx()
    let meme = getMeme()
    if (meme.txts.length) {
        document.querySelector('.txt-input').value = meme.txts[meme.selectedTxtIdx].line
    } else {
        document.querySelector('.txt-input').value = ''
    }
    drawRect(meme.txts[meme.selectedTxtIdx])
    renderMeme()
}

function onUpdateAlign(txtAlign) {
    updateAlign(txtAlign)
    renderMeme()
}

function onUpdateFontFamily(fontFamily) {
    updateFontFamily(fontFamily)
    renderMeme()
}

function onDownloadCanvas(elLink) {
    gDownload = true
    renderMeme()
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.png'
}