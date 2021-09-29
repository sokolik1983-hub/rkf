const mobileMenuSearchPage = (place, elem, wrap, userType) => {
    if(wrap){
        const clickElemWidth = elem.getBoundingClientRect().width,
            clientWidth = window.innerWidth,
            sliderWrap = wrap.current.childNodes[0],
            sliderWidth = wrap.current.getBoundingClientRect().width,
            hiddenElemWidth = sliderWrap.querySelectorAll('div')[5].getBoundingClientRect().width,
            lastElemWidth = sliderWrap.querySelectorAll('div')[6].getBoundingClientRect().width;

        let width = 0,
            position = 0;

        if(clientWidth < 700) {
            for (let i = 0; i < place-1; i++) {
                width = width + sliderWrap.querySelectorAll('div')[i].getBoundingClientRect().width;
            }
            switch(place) {
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    position = width - ((sliderWidth-clickElemWidth)/2);
                    break;
                case 7:
                    if(userType === 3 || userType === 4 || userType === 5) {
                        position = width - ((sliderWidth-clickElemWidth)/2);
                    } else {
                        position = width - hiddenElemWidth - ((sliderWidth-clickElemWidth)/2);
                    }
                    break;
                case 8:
                    if(userType === 3 || userType === 4 || userType === 5) {
                        position = width + 16 - (sliderWidth - clickElemWidth);
                    } else {
                        position = width + 16 - hiddenElemWidth - (sliderWidth - clickElemWidth);
                    }
                    break;
                default:
                    break;
            }
        } else {
            for (let item of sliderWrap.querySelectorAll('div')) {
                width = width + item.getBoundingClientRect().width;
            }
            switch(place) {
                case 5:
                case 6:
                case 7:
                case 8:
                    if(userType === 3 || userType === 4 || userType === 5) {
                        position = width - lastElemWidth - (sliderWidth - lastElemWidth) ;
                    } else {
                        position = width - hiddenElemWidth - (sliderWidth - lastElemWidth);
                    }
                    break;
                default:
                    break;
            }
        }
        sliderWrap.style.transform = `translateX(-${position}px)`;
    }
}

export default mobileMenuSearchPage;