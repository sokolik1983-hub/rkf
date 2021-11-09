import React, { useRef, useState, useEffect } from "react";
import { Link as LinkScroll } from 'react-scroll';
import HorizontalSwipe from "../../../../components/HorozintalSwipe";
import mobileMenuMoves from "../../../../utils/mobileMenuMoves";
import "./index.scss";
import scrollMenuMoves from "../../../../utils/scrollMenuMoves";


const ListFilter = ({ setCardClicked, userType, isAuthenticated}) => {
    const wrap = useRef();

    const handleClick = (place, e) => {
        const currentNode = wrap.current;
        const calendarButton = currentNode.querySelector('.list-filter__item._active');
        if(calendarButton) calendarButton.classList.remove('_active');
        e.target.closest('.list-filter__item').classList.add("_active");
        mobileMenuMoves(place, e.target, wrap);
    }

    // const [scrollPosition, setScrollPosition] = useState(0);
    //
    // const handleScroll = () => {
    //     const position = document.body.getBoundingClientRect().top;
    //     setScrollPosition(position);
    // };
    //
    // const scrollMenuMoves = (position, wrap) => {
    //     if(wrap) {
    //         let allLinks = document.querySelectorAll('.list-filter__item');
    //         let allDivs = document.querySelectorAll('.Card');
    //         allDivs.forEach((item, index) => {
    //             if(item.getBoundingClientRect().top < 200 && item.getBoundingClientRect().top > 180 ) {
    //                 allLinks.forEach(item => item.classList.remove('_active'));
    //                 allLinks[index].classList.add('_active');
    //             };
    //         });
    //     }
    // }
    //
    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll, { passive: true });
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);
    //
    // useEffect(()=> {
    //     scrollMenuMoves(scrollPosition, wrap);
    // },[scrollPosition]);


    return (
            <div className="search-page__list-filter">
                    <h4 className="list-filter__title">Сервисы</h4>
                <div className="slider-inner">
                    <div className="slider" ref={wrap}>
                        <HorizontalSwipe  id="search-page__list-filter1" className="list-filter slider-wrap" desktopScroll={true}>
                            <div  className="list-filter__item _active">
                                <LinkScroll
                                    activeClass='active'
                                    to='global-search-anchor'
                                    spy={true}
                                    smooth={true}
                                    offset={-210}
                                    duration={200}
                                    className='search-page__link'
                                    title='Глобальный поиск'
                                    onClick={(e) => {
                                        handleClick(1, e);
                                        setCardClicked(8);
                                    }}
                                >
                                    <span className="list-filter__control">Глобальный поиск</span>
                                </LinkScroll>
                            </div>
                            <div className="list-filter__item">
                                <LinkScroll
                                    activeClass='active'
                                    to='found-info-anchor'
                                    spy={true}
                                    smooth={true}
                                    offset={-170}
                                    duration={200}
                                    className='search-page__link'
                                    title='Информация о найденных собаках'
                                    onClick={(e) => {
                                        handleClick(2, e);
                                        setCardClicked(1);
                                    }}
                                >
                                <span
                                    className="list-filter__control">Информация <br /> о найденных собаках</span>
                                </LinkScroll>

                            </div>
                            <div className="list-filter__item">
                                <LinkScroll
                                    activeClass='active'
                                    to='check-status-anchor'
                                    spy={true}
                                    smooth={true}
                                    offset={-170}
                                    duration={200}
                                    className='search-page__link'
                                    title='Статус документов'
                                    onClick={(e) => {
                                        handleClick(3, e);
                                        setCardClicked(2);
                                    }}
                                >
                                    <span className="list-filter__control">Статус документов</span>
                                </LinkScroll>

                            </div>
                            <div className="list-filter__item">
                                <LinkScroll
                                    activeClass='active'
                                    to='check-registration-anchor'
                                    spy={true}
                                    smooth={true}
                                    offset={-170}
                                    duration={200}
                                    className='search-page__link'
                                    title='Регистрационные данные собаки'
                                    onClick={(e) => {
                                        handleClick(4, e);
                                        setCardClicked(3);
                                    }}
                                >
                                    <span className="list-filter__control">Регистрационные <br /> данные собаки</span>
                                </LinkScroll>

                            </div>
                            <div className="list-filter__item">
                                <LinkScroll
                                    activeClass='active'
                                    to='stamp-search-anchor'
                                    spy={true}
                                    smooth={true}
                                    offset={-170}
                                    duration={200}
                                    className='search-page__link'
                                    title='Поиск клуба/питомника'
                                    onClick={(e) => {
                                        handleClick(5, e);
                                        setCardClicked(4);
                                    }}
                                >
                                    <span className="list-filter__control">Поиск клуба/<br />питомника по клейму</span>
                                </LinkScroll>

                            </div>
                            <div  className="list-filter__item">
                                <LinkScroll
                                    activeClass='active'
                                    to='referee-search-anchor'
                                    spy={true}
                                    smooth={true}
                                    offset={-170}
                                    duration={200}
                                    className='search-page__link'
                                    title='Поиск судьи'
                                    onClick={(e) => {
                                        handleClick(6, e);
                                        setCardClicked(6);
                                    }}
                                >
                                    <span className="list-filter__control">Поиск судьи</span>
                                </LinkScroll>

                            </div>
                            <div  className="list-filter__item">
                                <LinkScroll
                                    activeClass='active'
                                    to='publication-search-anchor'
                                    spy={true}
                                    smooth={true}
                                    offset={-170}
                                    duration={200}
                                    className='search-page__link'
                                    title='Поиск по объявлениям'
                                    onClick={(e) => {
                                        handleClick(7, e);
                                        setCardClicked(7);
                                    }}
                                >
                                    <span className="list-filter__control">Поиск по <br /> объявлениям</span>
                                </LinkScroll>

                            </div>
                            {isAuthenticated && (userType === 3 || userType === 4 || userType === 5) &&
                            <div  className='list-filter__item'>
                                <LinkScroll
                                    activeClass='active'
                                    to='check-status__letter'
                                    spy={true}
                                    smooth={true}
                                    offset={-170}
                                    duration={200}
                                    className='search-page__link'
                                    title='Информация о помётах'
                                    onClick={(e) => {
                                        handleClick(8, e);
                                        setCardClicked(5);
                                    }}
                                >
                                    <span className="list-filter__control">Информация о помётах</span>
                                </LinkScroll>
                            </div>}
                        </HorizontalSwipe>
                    </div>
                </div>
            </div>

    )
}

export default ListFilter;