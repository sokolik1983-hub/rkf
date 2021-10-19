const mobileMenuSearchPage = (place, elem, wrap) => {
    const clientWidth = window.innerWidth,
        clickElemWidth = elem.getBoundingClientRect().width,
        sliderWrap = document.querySelector(".slider-wrap"),
        sliderWidth = document.querySelector(".slider").getBoundingClientRect().width;

    console.log('4444444',wrap.current.childNodes[0])

    let allDivs = wrap.current.childNodes[0].querySelectorAll('.list-filter__item');



    let widthBeforeElems = 0,
        widthAllElems = 0,
        position = 0;

    //Считаем общую длину слайдера
    for( elem of allDivs) {
        widthAllElems = widthAllElems + elem.getBoundingClientRect().width;
    }

    // console.log('werty', widthAllElems)

    //Считаем общую длину слайдера
    // for (let item of wrap.current.children.childNodes) {if (item === elem) {break;} else {widthAllElems = widthAllElems +item.getBoundingClientRect().width}}

    for (let i = 0; i < place-1; i++) {
        widthBeforeElems = widthBeforeElems + allDivs[i].getBoundingClientRect().width;
    }

    let widthAfterElems = widthAllElems - widthBeforeElems - clickElemWidth/2;

    console.log('11111',widthAfterElems)


    if(widthBeforeElems < (wrap.current.clientWidth-clickElemWidth)/2)  {
        position = 0;
    } else if (widthAfterElems < (wrap.current.clientWidth-clickElemWidth)) {
        position = widthAllElems - wrap.current.clientWidth;
    } else {
        position = widthBeforeElems - ((wrap.current.clientWidth - clickElemWidth)/2);
    }
    document.querySelector('.slider').style.transform = `translateX(-${position}px)`;
}

export default mobileMenuSearchPage;