

const mobileMenuMoves = (place, elem) => {
    const clickElemWidth = elem.getBoundingClientRect().width,
             sliderWrap = document.querySelector(".slider-wrap"),
             sliderWidth = document.querySelector(".slider").getBoundingClientRect().width;


    let widthBeforeElems = 0,
        widthAllElems = 0,
        position = 0;
    for (let item of sliderWrap.querySelectorAll('div')) {if (item === elem) {break;} else {widthBeforeElems = widthBeforeElems +item.getBoundingClientRect().width}}

    for (let item of sliderWrap.querySelectorAll('div')) {widthAllElems = widthAllElems + item.getBoundingClientRect().width}


    switch(place) {
        case 1:
            position= 0;
            break;
        case 2:
        case 3:
            position = widthBeforeElems - ((sliderWidth-clickElemWidth)/2)
            break;
        case 4:
            position = widthBeforeElems - (sliderWidth - clickElemWidth);
            break;
        default:
            break;
    }
    sliderWrap.style.transform = `translateX(-${position}px)`;
}

export default mobileMenuMoves;