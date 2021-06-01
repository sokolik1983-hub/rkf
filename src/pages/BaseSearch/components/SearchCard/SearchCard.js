import OutsideClickHandler from "react-outside-click-handler";
import Card from "../../../../components/Card";
import {Link as LinkScroll} from "react-scroll";
import React from "react";

function SearchCard({handleActiveReset, setCardClicked, userType, isAuthenticated}) {
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
                                    setCardClicked(1);
                                }}
                            >
                               <span className="menu-component__icon">
                                   <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.5 0C4.27562 0 0 4.27562 0 9.5C0 14.7244 4.27562 19 9.5 19C14.7244 19 19 14.7244 19 9.5C19 4.27562 14.7244 0 9.5 0ZM10.4512 14.2512H8.55124V8.54876H10.4512V14.2512ZM10.4512 6.64876H8.55124V4.74876H10.4512V6.64876Z" fill="#72839C"/>
                                    </svg>
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
                                    setCardClicked(2);
                                }}
                            >
                                <span className="menu-component__icon">
                                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0)">
                                        <path d="M3.67645 0V1.74936H15.8977V17.3235H17.647C17.647 17.202 17.647 0.485934 17.647 0C17.2826 0 4.0409 0 3.67645 0Z" fill="#72839C"/>
                                        <path d="M2 19H14.8043V2.867H2V19ZM4.76982 6.19565H12.0102V7.3133H4.76982V6.19565ZM4.76982 8.98977H12.0102V10.1074H4.76982V8.98977ZM4.76982 11.7596H12.0102V12.8772H4.76982V11.7596ZM4.76982 14.5537H12.0102V15.6714H4.76982V14.5537Z" fill="#72839C"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0">
                                        <rect width="15.6471" height="19" fill="white" transform="translate(2)"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
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
                                    setCardClicked(3);
                                }}
                            >
                                <span className="menu-component__icon">
                                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8655 8.46722C13.683 6.96988 11.4914 5.73607 8.65933 5.56078C8.65933 5.56078 7.15562 4.44596 7.05468 2.52162C7.03812 2.23029 6.81232 1.94073 6.51906 2.01052C5.7623 2.19007 4.4774 3.12699 4.41337 7.40599C4.41337 7.40599 0.29743 9.40852 0 15.1818C2.63836 16.7105 5.71287 17.6072 8.99453 17.6593L8.95774 16.8323C8.94412 16.541 9.1633 16.2215 9.44602 16.1194L12.9519 14.8514C12.9519 14.8514 16.8503 15.0725 17.5342 13.8821C17.8805 13.282 18.6093 12.8872 18.846 12.6171C19.0396 12.3948 19.0627 11.5551 18.846 11.352C18.1297 10.6853 14.0019 9.58618 13.8655 8.46722ZM11.7858 9.91655C11.4458 9.91655 11.1699 9.65171 11.1699 9.32265C11.1699 8.99288 11.4458 8.72745 11.7858 8.72745C12.1271 8.72745 12.403 8.99288 12.403 9.32265C12.4031 9.65159 12.1272 9.91655 11.7858 9.91655Z" fill="#72839C"/>
                                    </svg>
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
                                    setCardClicked(4);
                                }}
                            >
                                <span className="menu-component__icon">
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.32454 2H0V17.0789H2.32454V2Z" fill="#72839C"/>
                                    <path d="M9.99893 2H6.91693V17.0789H9.99893V2Z" fill="#72839C"/>
                                    <path d="M19 2H15.918V17.0789H19V2Z" fill="#72839C"/>
                                    <path d="M4.50619 2H3.34052V17.0789H4.50619V2Z" fill="#72839C"/>
                                    <path d="M14.0742 2H12.9086V17.0789H14.0742V2Z" fill="#72839C"/>
                                    </svg>

                                </span>
                                Поиск клуба/питомника по клейму
                            </LinkScroll>
                        </li>
                        {isAuthenticated
                            && userType === 3
                            && <li className="menu-component__item">
                            <LinkScroll
                                to="check-status__letter"
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration={500}
                                className="menu-component__link"
                                title="Информация о помётах"
                                onClick={() => {
                                    handleActiveReset();
                                    setCardClicked(5);
                                }}
                            >
                                <span className="menu-component__icon">
                                   <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.5 16.34C7.125 16.34 5.0255 15.124 3.8 13.3C3.8285 11.4 7.6 10.355 9.5 10.355C11.4 10.355 15.1715 11.4 15.2 13.3C13.9745 15.124 11.875 16.34 9.5 16.34ZM9.5 2.85C10.2559 2.85 10.9808 3.15027 11.5153 3.68475C12.0497 4.21922 12.35 4.94413 12.35 5.7C12.35 6.45587 12.0497 7.18078 11.5153 7.71525C10.9808 8.24973 10.2559 8.55 9.5 8.55C8.74413 8.55 8.01922 8.24973 7.48475 7.71525C6.95027 7.18078 6.65 6.45587 6.65 5.7C6.65 4.94413 6.95027 4.21922 7.48475 3.68475C8.01922 3.15027 8.74413 2.85 9.5 2.85ZM9.5 0C8.25244 0 7.0171 0.245725 5.86451 0.723144C4.71191 1.20056 3.66464 1.90033 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C3.66464 17.0997 4.71191 17.7994 5.86451 18.2769C7.0171 18.7543 8.25244 19 9.5 19C12.0196 19 14.4359 17.9991 16.2175 16.2175C17.9991 14.4359 19 12.0196 19 9.5C19 4.2465 14.725 0 9.5 0Z" fill="#72839C"/>
                                    </svg>
                                </span>
                                Информация о помётах
                            </LinkScroll>
                        </li>
                        }

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
                                    setCardClicked(6);
                                }}
                            >
                                <span className="menu-component__icon">
                                   <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.55 6.65H15.775L10.55 1.425V6.65ZM3.9 0H11.5L17.2 5.7V17.1C17.2 17.6039 16.9998 18.0872 16.6435 18.4435C16.2872 18.7998 15.8039 19 15.3 19H3.9C2.8455 19 2 18.145 2 17.1V1.9C2 0.8455 2.8455 0 3.9 0ZM12.45 15.2V13.3H3.9V15.2H12.45ZM15.3 11.4V9.5H3.9V11.4H15.3Z" fill="#72839C"/>
                                    </svg>

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
                                    setCardClicked(7);
                                }}
                            >
                                <span className="menu-component__icon">
                                   <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.44444 8.44444H10.5556L10.5556 14.7778H8.44445L8.44444 8.44444ZM9.5 3.90556C9.86394 3.90556 10.213 4.05013 10.4703 4.30747C10.7276 4.56481 10.8722 4.91384 10.8722 5.27778C10.8722 5.64171 10.7276 5.99074 10.4703 6.24809C10.213 6.50543 9.86394 6.65 9.5 6.65C9.13606 6.65 8.78703 6.50543 8.52969 6.24809C8.27235 5.99074 8.12778 5.64171 8.12778 5.27778C8.12778 4.91384 8.27235 4.56481 8.52969 4.30747C8.78703 4.05013 9.13606 3.90556 9.5 3.90556ZM5.56278 19H13.4372L19 13.4372V5.56278L13.4372 0L5.56278 6.88406e-07L0 5.56278L6.88406e-07 13.4372L5.56278 19Z" fill="#72839C"/>
                                </svg>

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