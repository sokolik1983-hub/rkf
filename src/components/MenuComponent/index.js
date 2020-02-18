import React from "react";
import Card from "../Card";
import "./index.scss";


const MenuComponent = ({alias, name, btnName, btnHref, items}) => (

    <Card className="menu-component">
        <h4 className="menu-component__title">{name}</h4>
        <ul className="menu-component__list">
            {items.map(item => (
                <li className="menu-component__item">
                <a href={item.href} className="menu-component__link">{item.title}</a>
            </li>
            ))}
        </ul>
        <a href={btnHref} className="menu-component__button">{btnName}</a>
    </Card>
);
export default React.memo(MenuComponent);