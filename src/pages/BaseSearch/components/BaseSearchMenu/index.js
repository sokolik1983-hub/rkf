import React from "react";
import Card from "../../../../components/Card";
import { Link, animateScroll as scroll } from "react-scroll";
import "./index.scss";

const BaseSearchMenu = () => {
 return (
     <Card>
         <h3>Поиск</h3>
         <ul className="menu-component__list">
            <li className="menu-component__item">
                <Link
                    to="found-info-anchor"
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration= {500}
                    className="menu-component__link"
                    title="Информация о найденных собаках"
                >
                    Информация о найденных собаках
                </Link>
            </li>
            <li className="menu-component__item">
                <Link
                    to="check-status-anchor"
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration= {500}
                    className="menu-component__link" 
                    title="Статус документов"
                >
                    Статус документов
                </Link>
            </li>
            <li className="menu-component__item">
                <Link
                    to="check-registration-anchor"
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration= {500}
                    className="menu-component__link" 
                    title="Регистационные данные собаки"
                >
                    Регистационные данные собаки
                </Link>
            </li>
            <li className="menu-component__item">
                <Link
                    to="stamp-search-anchor"
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration= {500}
                    className="menu-component__link" 
                    title="Поиск клуба/питомника"
                >
                    Поиск клуба/питомника по клейму
                </Link>
            </li>
            <li className="menu-component__item">
                <Link
                    to="referee-search-anchor"
                    spy={true}
                    smooth={true}
                    offset={-60}
                    duration= {500}
                    className="menu-component__link" 
                    title="Поиск судьи"
                >
                    Поиск судьи
                </Link>
            </li>
        </ul>
     </Card>
 );
};

export default React.memo(BaseSearchMenu);