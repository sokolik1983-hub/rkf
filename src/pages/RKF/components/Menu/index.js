import React from "react";
import Card from "../../../../components/Card";
import "./index.scss";


const MenuComponent = () => (
    <Card className="menu-component">
        <h4 className="menu-component__title">Меню</h4>
        <ul className="menu-component__list">
            <li className="menu-component__item">
                <a href="/" className="menu-component__link">Мероприятия</a>
            </li>
            <li className="menu-component__item">
                <a href="/" className="menu-component__link">Президиум РКФ</a>
            </li>
            <li className="menu-component__item">
                <a href="/" className="menu-component__link">Новости РКФ</a>
            </li>
        </ul>
        <a href="/" className="menu-component__button">Страница РКФ</a>
    </Card>
);

export default React.memo(MenuComponent);