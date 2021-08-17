import React from "react";

const mobileMenuSearchPage = (place, elem, wrap) => {
        if(wrap){
            const clickElemWidth = elem.getBoundingClientRect().width,
                sliderWrap = wrap.current.childNodes[0],
                sliderWidth = wrap.current.getBoundingClientRect().width;
            let width = 0,
                position = 0;

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
                    position = width - ((sliderWidth-clickElemWidth));
                    break;
                case 8:
                    position = width - clickElemWidth - (sliderWidth-clickElemWidth);
                    break;
                default:
                    break;
            }
            sliderWrap.style.transform = `translateX(-${position}px)`;
        }
}

export default mobileMenuSearchPage;