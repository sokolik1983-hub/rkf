

const mobileMenuMoves = (place, elem) => {
    const clientWidth = window.innerWidth,
             clickElemWidth = elem.getBoundingClientRect().width,
             sliderWrap = document.querySelector(".slider-wrap"),
             sliderWidth = document.querySelector(".slider").getBoundingClientRect().width;


    let widthBeforeElems = 0,
        widthAllElems = 0,
        position = 0;
    for (let item of sliderWrap.querySelectorAll('div')) {if (item === elem) {break;} else {widthBeforeElems = widthBeforeElems +item.getBoundingClientRect().width}}

    for (let item of sliderWrap.querySelectorAll('div')) {widthAllElems = widthAllElems + item.getBoundingClientRect().width}

    let widthAfterElems = widthAllElems - clickElemWidth - widthBeforeElems;

    switch(place) {
        case 2:
            if(clientWidth > 500 && clientWidth < 600) {
                break;
            } else {
                position = widthBeforeElems - ((sliderWidth-clickElemWidth)/2)
            }
            break;
        case 3:
            if(clientWidth > 500 && clientWidth < 600 || clickElemWidth < 120) {
                position = (widthBeforeElems +widthAfterElems) - (sliderWidth-clickElemWidth);
            } else {
                position = widthBeforeElems - ((sliderWidth-clickElemWidth)/2);
            }
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