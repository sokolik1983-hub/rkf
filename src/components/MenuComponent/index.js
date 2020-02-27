import React from "react";
import {Link} from "react-router-dom";
import Card from "../Card";
import "./index.scss";


const MenuComponent = ({alias, btnName}) => (
    <Card className="menu-component">
        <h4 className="menu-component__title">Меню</h4>
        <ul className="menu-component__list">
            <li className="menu-component__item">
                <Link to={`/exhibitions?Alias=${alias}`} className="menu-component__link">Мероприятия</Link>
            </li>
            <li className="menu-component__item">
                <Link to="/" className="menu-component__link">Президиум</Link>
            </li>
            <li className="menu-component__item">
                <Link to="/" onClick={e => e.preventDefault()} className="menu-component__link not-active">Новости</Link>
            </li>
            {alias !== 'rkf' &&
                <li className="menu-component__item">
                    <Link to="/" onClick={e => e.preventDefault()} className="menu-component__link not-active">Клейма</Link>
                </li>
            }
        </ul>
        <Link to={`/${alias}`} className="menu-component__button">{btnName}</Link>
    </Card>
);
export default React.memo(MenuComponent);