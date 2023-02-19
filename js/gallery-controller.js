'use strict'

function renderGallery() {
    let imgs = getImgs()
    let elGalleryContainer = document.querySelector('.gallery')
    let htmls = imgs.map(img => {
        return `<img  data-id = "${img.id}" src="imgs/${img.id}.jpg" onclick=setImg(${img.id})>`
    })
    elGalleryContainer.innerHTML = htmls.join('')
}
