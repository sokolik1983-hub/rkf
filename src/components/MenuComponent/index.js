import React, { useState } from "react";
import Card from "../Card";
import Alert from 'components/Alert'
import "./index.scss";


const MenuComponent = ({ alias, name, btnName, btnHref, items }) => {
    const [showAlert, setShowAlert] = useState(false);

    const handleClick = e => {
        e.preventDefault();
        setShowAlert(true);
    }

    const handleClose = e => setShowAlert(false);

    return <Card className="menu-component">
        {showAlert && <Alert
            title="Внимание!"
            text="Раздел находится в разработке."
            autoclose={1.5}
            onOk={handleClose}
        />}
        <h4 className="menu-component__title">{name}</h4>
        <ul className="menu-component__list">
            {items.map((item, index) => (
                <li key={index} className="menu-component__item">
                    <a href={item.href} className="menu-component__link disabled" onClick={handleClick}>{item.title}</a>
                </li>
            ))}
        </ul>
        <a href={btnHref} className="menu-component__button">{btnName}</a>
    </Card>
};
export default React.memo(MenuComponent);