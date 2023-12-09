const mobileMenuAccountPage = (place, elem, wrap) => {
    if(wrap) {
        const clickElemWidth = elem.getBoundingClientRect().width,
            sliderWidth = wrap.getBoundingClientRect().width;

        let widthAllElems = 0,
        widthBeforeElems = 0,
        position = 0,
        elemPosition = sliderWidth - clickElemWidth;

        for (let i = 0; i < place; i++) {
            widthBeforeElems = widthBeforeElems + wrap.querySelectorAll('div li')[i].getBoundingClientRect().width;
        }

        for (let item of wrap.querySelectorAll('div li')) {
            widthAllElems = widthAllElems + item.getBoundingClientRect().width;
        }

        let afterWidthElems = widthAllElems - clickElemWidth - widthBeforeElems;

        if( widthBeforeElems < elemPosition/2 ) {
            position = 0;
        } else if(afterWidthElems < elemPosition/2) {
            position = widthBeforeElems - elemPosition + afterWidthElems;
        } else {
            position = widthBeforeElems - (elemPosition/2);
        }
        wrap.querySelector('div').style.transform = `translateX(-${position}px)`;
    }
}

export default mobileMenuAccountPage;