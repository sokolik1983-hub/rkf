import React, {memo, useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react/swiper-react.js";
import {FreeMode, Scrollbar} from "swiper";
import "swiper/modules/free-mode/free-mode.scss";
import "swiper/modules/scrollbar/scrollbar.scss";
import "swiper/swiper.scss";
import {Link as LinkScroll} from "react-scroll";
import "./index.scss";


const SwipeTabs = ({items, activeTabIndex, onChange}) => {
    const [activeIndex, setActiveIndex] = useState(activeTabIndex !== -1 ? activeTabIndex : 0);
    const swiper = useRef(null);

    useEffect(() => {
        const swiperProps = swiper.current.swiper;

        if(swiperProps.size >= swiperProps.virtualSize) {
            swiperProps.disable();
        }

        swiperProps.on('resize', newSwiper => {
            console.log(newSwiper)
            if(newSwiper.size < newSwiper.virtualSize) {

                console.log(activeIndex, activeIndex);
                newSwiper.enable();
                newSwiper.slideTo(activeIndex);
            } else {
                newSwiper.setTranslate(0);
                newSwiper.disable();
            }
        });

        return () => swiperProps.destroy();
    }, []);

    useEffect(() => {
        setActiveIndex(activeTabIndex !== -1 ? activeTabIndex : 0)
    }, [activeTabIndex]);

    useEffect(() => {
        swiper.current.swiper.activeIndex = activeTabIndex;
        swiper.current.swiper.slideTo(activeIndex);
    }, [activeIndex]);

    return (
        <Swiper
            ref={swiper}
            className="swipe-tabs"
            modules={[FreeMode, Scrollbar]}
            freeMode={{
                enabled: true,
                sticky: true
            }}
            slidesPerView="auto"
            slideToClickedSlide={true}
            centeredSlidesBounds={true}
            centeredSlides={true}
        >
            {items.map((item, i) =>
                <SwiperSlide key={`tab-${i}`}>
                    {item.to ?
                        <LinkScroll
                            className="swipe-tabs__tab"
                            activeClass="_active"
                            to={item.to}
                            spy={true}
                            smooth={true}
                            isDynamic={true}
                            offset={item.offset}
                            duration={200}
                            onSetActive={() => setActiveIndex(i)}
                            onClick={() => onChange(item)}
                        >
                            {item.title}
                        </LinkScroll> :
                        <button
                            className={`swipe-tabs__tab${activeTabIndex === i ? ' _active' : item.disabled ? ' _disabled' : ''}`}
                            type="button"
                            // disabled={item.disabled} нельзя, иначе свайп не работает
                            onClick={() => !item.disabled && onChange(item)}
                        >
                            {item.title}
                        </button>
                    }
                </SwiperSlide>
            )}
        </Swiper>
    );
}

export default memo(SwipeTabs);