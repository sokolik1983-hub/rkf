

const mobileMenuMoves = (place, elem) => {
    const clickElemWidth = elem.getBoundingClientRect().width,
             sliderWrap = document.querySelector(".slider-wrap"),
             sliderWidth = document.querySelector(".slider").getBoundingClientRect().width;



    let widthBeforeElems = 0,
        widthAfterElems=0,
        widthAllElems=0,
        position = 0;
    for (let item of sliderWrap.querySelectorAll('div')) {if (item === elem) {break;} else {widthBeforeElems = widthBeforeElems +item.getBoundingClientRect().width}};
    for (let item of sliderWrap.querySelectorAll('div')) {widthAllElems = widthAllElems +item.getBoundingClientRect().width};

    widthAfterElems = (sliderWidth - clickElemWidth)/2;


    console.log('widthBeforeElems',widthAfterElems, sliderWrap.querySelectorAll('div')[3].getBoundingClientRect().width)

    switch(place) {
        case 1:
            position = 0;
            break;
        case 2:
            if(widthBeforeElems < clickElemWidth) {
                position = 0;
            } else {
                position = widthBeforeElems - ((sliderWidth-clickElemWidth)/2);
            }
            break;
        case 3:
            if((sliderWidth - clickElemWidth)/2 > sliderWrap.querySelectorAll('div')[3].getBoundingClientRect().width) {
                position = widthBeforeElems - (sliderWidth - clickElemWidth) + sliderWrap.querySelectorAll('div')[3].getBoundingClientRect().width;
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
    console.log('position', position)
}

export default mobileMenuMoves;