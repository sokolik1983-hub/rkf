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
                               <span className="menu-component__icon">
                                   <svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 20 20"><path fill="#72839C" d="M10.2,0.44c-5.22,0-9.5,4.28-9.5,9.5c0,5.22,4.28,9.5,9.5,9.5c5.22,0,9.5-4.28,9.5-9.5	C19.7,4.71,15.42,0.44,10.2,0.44z M11.15,14.69h-1.9v-5.7h1.9V14.69z M11.15,7.09h-1.9v-1.9h1.9V7.09z"/></svg>
                               </span>
                                Информация о найденных собаках
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
                                <span className="menu-component__icon">
                                    <svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 20 20"><g><g><defs><rect x="2.59" y="1" width="14.82" height="18"/></defs><clipPath><rect x="2.59" y="1" width="14.82" height="18"/></clipPath><g className="st0"><path fill="#72839C" d="M4.18,1v1.66h11.58v14.75h1.66c0-0.12,0-15.95,0-16.41C17.07,1,4.52,1,4.18,1z"/><path fill="#72839C" className="st1" d="M2.59,19h12.13V3.72H2.59V19z M5.21,6.87h6.86v1.06H5.21V6.87z M5.21,9.52h6.86v1.06H5.21V9.52z M5.21,12.14 h6.86v1.06H5.21V12.14z M5.21,14.79h6.86v1.06H5.21V14.79z"/></g></g></g></svg>
                                </span>
                                Статус документов
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
                                <span className="menu-component__icon">
                                    <svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 20 20"><path fill="#72839C" d="M14.6,8.57c-0.19-1.58-2.5-2.87-5.48-3.06c0,0-1.58-1.17-1.69-3.2C7.41,2,7.17,1.7,6.86,1.77	c-0.8,0.19-2.15,1.18-2.22,5.68c0,0-4.33,2.11-4.65,8.19c2.78,1.61,6.01,2.55,9.47,2.61l-0.04-0.87c-0.01-0.31,0.22-0.64,0.51-0.75	l3.69-1.33c0,0,4.1,0.23,4.82-1.02c0.36-0.63,1.13-1.05,1.38-1.33c0.2-0.23,0.23-1.12,0-1.33C19.08,10.9,14.74,9.74,14.6,8.57z	 M12.41,10.09c-0.36,0-0.65-0.28-0.65-0.63c0-0.35,0.29-0.63,0.65-0.63c0.36,0,0.65,0.28,0.65,0.63	C13.06,9.81,12.77,10.09,12.41,10.09z"/></svg>
                                </span>
                                Регистационные данные собаки
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
                                <span className="menu-component__icon">
                                    <svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 20 20"><path fill="#72839C" d="M10.9,7.3h4.95L10.9,2.35V7.3z M4.6,1h7.2l5.4,5.4v10.8c0,0.48-0.19,0.94-0.53,1.27 C16.34,18.81,15.88,19,15.4,19H4.6c-1,0-1.8-0.81-1.8-1.8V2.8C2.8,1.8,3.6,1,4.6,1z M12.7,15.4v-1.8H4.6v1.8H12.7z M15.4,11.8V10	H4.6v1.8H15.4z"/></svg>
                                </span>
                                Поиск клуба/питомника по клейму
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
                                <span className="menu-component__icon">
                                    <svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 20 20"><path fill="#72839C" d="M10,16.84c-2.38,0-4.47-1.22-5.7-3.04c0.03-1.9,3.8-2.95,5.7-2.95s5.67,1.05,5.7,2.95	C14.47,15.62,12.38,16.84,10,16.84z M10,3.35c0.76,0,1.48,0.3,2.02,0.83c0.53,0.53,0.83,1.26,0.83,2.02s-0.3,1.48-0.83,2.02	C11.48,8.75,10.76,9.05,10,9.05c-0.76,0-1.48-0.3-2.02-0.83C7.45,7.68,7.15,6.96,7.15,6.2s0.3-1.48,0.83-2.02 C8.52,3.65,9.24,3.35,10,3.35z M10,0.5c-1.25,0-2.48,0.25-3.64,0.72C5.21,1.7,4.16,2.4,3.28,3.28C1.5,5.06,0.5,7.48,0.5,10	c0,2.52,1,4.94,2.78,6.72c0.88,0.88,1.93,1.58,3.08,2.06C7.52,19.25,8.75,19.5,10,19.5c2.52,0,4.94-1,6.72-2.78	c1.78-1.78,2.78-4.2,2.78-6.72C19.5,4.75,15.23,0.5,10,0.5z"/></svg>
                                </span>
                                Поиск судьи
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
                                <span className="menu-component__icon">
                                   <svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 20 20"><path fill="#72839C" d="M10.9,7.3h4.95L10.9,2.35V7.3z M4.6,1h7.2l5.4,5.4v10.8c0,0.48-0.19,0.94-0.53,1.27	C16.34,18.81,15.88,19,15.4,19H4.6c-1,0-1.8-0.81-1.8-1.8V2.8C2.8,1.8,3.6,1,4.6,1z M12.7,15.4v-1.8H4.6v1.8H12.7z M15.4,11.8V10	H4.6v1.8H15.4z"/></svg>
                                </span>
                                Поиск по объявлениям
                            </LinkScroll>
                        </li>
                    </ul>
                </Card>
            </OutsideClickHandler>
        </>
    )
}

export default SearchCard;