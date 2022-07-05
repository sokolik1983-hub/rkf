import React, {memo, useEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react/swiper-react.js';
import {FreeMode} from 'swiper';
import 'swiper/modules/free-mode/free-mode.scss';
import 'swiper/modules/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';
import {Link as LinkScroll} from 'react-scroll';

import './index.scss';

const SwipeTabs = ({items, activeTabIndex, onChange}) => {
    const [activeIndex, setActiveIndex] = useState(activeTabIndex !== -1 ? activeTabIndex : 0);
    const swiperRef = useRef(null);

    useEffect(() => {
        const swiper = swiperRef.current.swiper;

        if(swiper.size >= swiper.virtualSize) {
            swiper.disable();
        }

        return () => swiper.destroy();
    }, []);

    useEffect(()=>{
        swiperRef.current.swiper.slideTo(activeTabIndex);
    }, [activeTabIndex]);

    const handleMoveToActive = index => {
        if(swiperRef?.current) {
            swiperRef.current.swiper.slideTo(index);
            setActiveIndex(index);
        }
    };

    return (
        <Swiper
            ref={swiperRef}
            className="swipe-tabs"
            modules={[FreeMode]}
            freeMode={{
                enabled: true,
                sticky: true
            }}
            slidesPerView="auto"
            initialSlide={activeIndex}
            centeredSlidesBounds={true}
            centeredSlides={true}
            onResize={swiper => {
                if(swiper.size < swiper.virtualSize) {
                    swiper.enable();
                    swiper.slideTo(activeIndex);
                } else {
                    swiper.setTranslate(0);
                    swiper.disable();
                }
            }}
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
                            onSetActive={() => handleMoveToActive(i)}
                            onClick={() => onChange(item)}
                        >
                            {item.title}
                        </LinkScroll> :
                        <span
                            className={`swipe-tabs__tab${activeTabIndex === i ? ' _active' : item.disabled ? ' _disabled' : ''}`}
                            onClick={() => {
                                if(!item.disabled) {
                                    onChange(item);
                                    handleMoveToActive(i);
                                }
                            }}
                        >
                            {item.title}
                            {!!item.count &&
                                <span className="swipe-tabs__tab-count">
                                    {item.count <= 99 ? item.count : '99+'}
                                </span>
                            }
                        </span>
                    }
                </SwiperSlide>
            )}
        </Swiper>
    );
};

export default memo(SwipeTabs);
