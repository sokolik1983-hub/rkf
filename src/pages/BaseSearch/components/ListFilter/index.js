import React, {useRef} from "react";
import { Link as LinkScroll } from 'react-scroll';
import HorizontalSwipe from "../../../../components/HorozintalSwipe";
import mobileMenuSearchPage from "../../../../utils/mobileMenuSearchPage";
import "./index.scss";


const ListFilter = ({ setCardClicked, userType, isAuthenticated, isMobile }) => {
    const wrap = useRef();
    const handleClick = (place, e) => {
        const calendarButton = document.getElementsByClassName('list-filter__item _active')[0];
        if(calendarButton) calendarButton.classList.remove('_active');
        e.target.closest('.list-filter__item').classList.add("_active");
        if(isMobile) {
            mobileMenuSearchPage(place, e.target, wrap)
        }
    }
    return (
            <div className="search-page__list-filter">
                    <h4 className="list-filter__title">Поиск</h4>
                <div ref={wrap} className="slider">
                                <HorizontalSwipe  id="search-page__list-filter1" className="list-filter slider-wrap" desktopScroll={true}>
                                    <div  className="list-filter__item">
                                        <LinkScroll
                                            to='global-search-anchor'
                                            spy={false}
                                            smooth={true}
                                            offset={-170}
                                            duration={500}
                                            className='search-page__link'
                                            title='Глобальный поиск'
                                            onClick={(e) => {
                                                handleClick(1, e);
                                                setCardClicked(8);
                                            }}
                                        >
                                            <span className="list-filter__control _active">Глобальный поиск</span>
                                        </LinkScroll>
                                    </div>
                                    <div className="list-filter__item">
                                        <LinkScroll
                                            to='found-info-anchor'
                                            spy={false}
                                            smooth={true}
                                            offset={-170}
                                            duration={500}
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
                                            to='check-status-anchor'
                                            spy={false}
                                            smooth={true}
                                            offset={-170}
                                            duration={500}
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
                                            to='check-registration-anchor'
                                            spy={false}
                                            smooth={true}
                                            offset={-170}
                                            duration={500}
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
                                            to='stamp-search-anchor'
                                            spy={false}
                                            smooth={true}
                                            offset={-170}
                                            duration={500}
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
                                    {isAuthenticated && (userType === 3 || userType === 4 || userType === 5) &&
                                    <div  className='list-filter__item'>
                                        <LinkScroll
                                            to='check-status__letter'
                                            spy={false}
                                            smooth={true}
                                            offset={-170}
                                            duration={500}
                                            className='search-page__link'
                                            title='Информация о помётах'
                                            onClick={(e) => {
                                                handleClick(6, e);
                                                setCardClicked(5);
                                            }}
                                        >
                                            <span className="list-filter__control">Информация о помётах</span>
                                        </LinkScroll>
                                    </div>}
                                    <div  className="list-filter__item">
                                        <LinkScroll
                                            to='referee-search-anchor'
                                            spy={false}
                                            smooth={true}
                                            offset={-170}
                                            duration={500}
                                            className='search-page__link'
                                            title='Поиск судьи'
                                            onClick={(e) => {
                                                handleClick(7, e);
                                                setCardClicked(6);
                                            }}
                                        >
                                            <span className="list-filter__control">Поиск судьи</span>
                                        </LinkScroll>

                                    </div>
                                    <div  className="list-filter__item">
                                        <LinkScroll
                                            to='publication-search-anchor'
                                            spy={false}
                                            smooth={true}
                                            offset={-170}
                                            duration={500}
                                            className='search-page__link'
                                            title='Поиск по объявлениям'
                                            onClick={(e) => {
                                                handleClick(8, e);
                                                setCardClicked(7);
                                            }}
                                        >
                                            <span className="list-filter__control">Поиск по <br /> объявлениям</span>
                                        </LinkScroll>

                                    </div>
                                </HorizontalSwipe>
                            </div>
            </div>

    )
}

export default ListFilter;