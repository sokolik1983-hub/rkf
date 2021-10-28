const mobileMenuSearchPage = (place, elem, wrap, userType) => {
    const clientWidth = window.innerWidth,
        clickElemWidth = elem.getBoundingClientRect().width,
        sliderWrap = document.querySelector("#search-page__list-filter1"),
        allDivs = sliderWrap.querySelectorAll('div'),
        sliderWidth = document.querySelector(".slider").getBoundingClientRect().width;



    let widthBeforeElems = 0,
        widthAllElems = 0,
        position = 0;
    for (let i = 0; i < place-1; i++) {
        widthBeforeElems = widthBeforeElems + allDivs[i].getBoundingClientRect().width;
    }

    for (let item of sliderWrap.querySelectorAll('div')) {widthAllElems = widthAllElems + item.getBoundingClientRect().width}

    let widthAfterElems = widthAllElems - clickElemWidth - widthBeforeElems;

        switch(place) {
            case 1:
                position =  0;
                break;
            case 2:
                    position =  (sliderWidth-clickElemWidth)/2 + 16;
                break;
            case 3:
                position = widthBeforeElems - ((sliderWidth-clickElemWidth)/2);
                    break;
            case 4:
            case 5:
            case 6:
                    position = widthBeforeElems - ((sliderWidth-clickElemWidth)/2);
                break;
            case 7:
                if (userType === 3 || userType === 4 || userType === 5) {
                    if(widthBeforeElems > ((sliderWidth-clickElemWidth)/2) && widthAfterElems > ((sliderWidth-clickElemWidth)/2) ) {
                        position = widthBeforeElems - ((sliderWidth-clickElemWidth)/2);
                    } else {
                        position = widthBeforeElems + widthAfterElems - (sliderWidth-clickElemWidth);
                    }
                } else {
                    position = widthBeforeElems - (sliderWidth-clickElemWidth - 35);
                }
                break;
            case 8:
                position = widthBeforeElems - (sliderWidth-clickElemWidth - 35);
                break;
            default:
                break;
        }

    sliderWrap.style.transform = `translateX(-${position}px)`;
}

export default mobileMenuSearchPage;