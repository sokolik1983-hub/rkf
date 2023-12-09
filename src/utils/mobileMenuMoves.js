

const mobileMenuMoves = (place, elem, wrap) => {

    if(wrap) {
        const node = wrap.current;

        const clickElemWidth = elem.getBoundingClientRect().width,
            sliderWrap = node.querySelector(".slider-wrap"),
            allDivs = sliderWrap.querySelectorAll('div'),
            sliderWidth = node.getBoundingClientRect().width;

        let widthBeforeElems = 0,
            widthAllElems = 0,
            position = 0;
        for (let i = 0; i < place-1; i++) {
            widthBeforeElems = widthBeforeElems + allDivs[i].getBoundingClientRect().width;
        }

        for (let item of sliderWrap.querySelectorAll('div')) {widthAllElems = widthAllElems + item.getBoundingClientRect().width}

        let widthAfterElems = widthAllElems - clickElemWidth - widthBeforeElems;

        if((sliderWidth - clickElemWidth)/2 > widthBeforeElems) {
            position = 0;
        } else if((sliderWidth - clickElemWidth)/2 > widthAfterElems) {
            position = widthBeforeElems - (sliderWidth-clickElemWidth) + widthAfterElems;
        } else {
            position = widthBeforeElems - (sliderWidth-clickElemWidth)/2;
        }

        sliderWrap.style.transform = `translateX(-${position}px)`;
    }
}

export default mobileMenuMoves;