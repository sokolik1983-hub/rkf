import OutsideClickHandler from "react-outside-click-handler";
import Card from "../../../../components/Card";
import {Link as LinkScroll} from "react-scroll";
import React from "react";

function SearchCard({handleActiveReset, setFoundInfoClicked, setStatusClicked, setRegistrationClicked, setStampClicked, setRefereeClicked, setPublicationClicked}) {
    return(
        <>
            <OutsideClickHandler onOutsideClick={handleActiveReset}>
                <Card className="menu-component__card">
                    <h3 className="menu-component__title">Поиск</h3>
                    <ul className="menu-component__list">
                        <li className="menu-component__item">
                            <LinkScroll
                                to="found-info-anchor"
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={500}
                                className="menu-component__link"
                                title="Информация о найденных собаках"
                                onClick={() => {
                                    handleActiveReset();
                                    setFoundInfoClicked(true);
                                }}
                            >
                                                                   <span className="menu-component__icon"><img src="/static/icons/menu-component-info-icon.svg"
                                                                                                               alt=""/></span>Информация о найденных собаках
                            </LinkScroll>
                        </li>
                        <li className="menu-component__item">
                            <LinkScroll
                                to="check-status-anchor"
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={500}
                                className="menu-component__link"
                                title="Статус документов"
                                onClick={() => {
                                    handleActiveReset();
                                    setStatusClicked(true);
                                }}
                            >
                                                                    <span className="menu-component__icon"><img src="/static/icons/menu-component-status-icon.svg"
                                                                                                                alt=""/></span>Статус документов
                            </LinkScroll>
                        </li>
                        <li className="menu-component__item">
                            <LinkScroll
                                to="check-registration-anchor"
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={500}
                                className="menu-component__link"
                                title="Регистационные данные собаки"
                                onClick={() => {
                                    handleActiveReset();
                                    setRegistrationClicked(true);
                                }}
                            >
                                                                    <span className="menu-component__icon"><img src="/static/icons/menu-component-register-icon.svg"
                                                                                                                alt=""/></span>Регистационные данные собаки
                            </LinkScroll>
                        </li>
                        <li className="menu-component__item">
                            <LinkScroll
                                to="stamp-search-anchor"
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={500}
                                className="menu-component__link"
                                title="Поиск клуба/питомника"
                                onClick={() => {
                                    handleActiveReset();
                                    setStampClicked(true);
                                }}
                            >
                                                                    <span className="menu-component__icon"><img src="/static/icons/menu-component-search-club-icon.svg"
                                                                                                                alt=""/></span>Поиск клуба/питомника по клейму
                            </LinkScroll>
                        </li>
                        <li className="menu-component__item menu-component__item--judge">
                            <LinkScroll
                                to="referee-search-anchor"
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={500}
                                className="menu-component__link"
                                title="Поиск судьи"
                                onClick={() => {
                                    handleActiveReset();
                                    setRefereeClicked(true);
                                }}
                            >
                                                                    <span className="menu-component__icon"><img src="/static/icons/menu-component-judge-icon.svg"
                                                                                                                alt=""/></span>Поиск судьи
                            </LinkScroll>
                        </li>
                        <li className="menu-component__item">
                            <LinkScroll
                                to="publication-search-anchor"
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={500}
                                className="menu-component__link"
                                title="Поиск по объявлениям"
                                onClick={() => {
                                    handleActiveReset();
                                    setPublicationClicked(true);
                                }}
                            >
                                                                    <span className="menu-component__icon"><img src="/static/icons/menu-component-search-ad-icon.svg"
                                                                                                                alt=""/></span>Поиск по объявлениям
                            </LinkScroll>
                        </li>
                    </ul>
                </Card>
            </OutsideClickHandler>
        </>
    )
}

export default SearchCard;