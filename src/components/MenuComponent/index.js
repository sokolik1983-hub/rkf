import React, {useState} from "react";
import {Link} from "react-router-dom";
import Card from "../Card";
import Alert from "../Alert";
import "./index.scss";


const MenuComponent = ({alias, name, btnName}) => {
    const [showAlert, setShowAlert] = useState(false);

    const handleClick = e => {
        e.preventDefault();
        setShowAlert(true);
    };

    const handleClose = () => setShowAlert(false);

    return (
        <Card className="menu-component">
            {showAlert &&
                <Alert
                    title="Внимание!"
                    text="Раздел находится в разработке."
                    autoclose={1.5}
                    onOk={handleClose}
                />
            }
            <h4 className="menu-component__title" title={`Меню ${name}`}>{`Меню ${name}`}</h4>
            <ul className="menu-component__list">
                <li className="menu-component__item">
                    <Link to={`/exhibitions?Alias=${alias}`} className="menu-component__link">Мероприятия</Link>
                </li>
                <li className="menu-component__item">
                    <Link to="/" onClick={handleClick} className="menu-component__link">Президиум</Link>
                </li>
                <li className="menu-component__item">
                    <Link to="/" onClick={handleClick} className="menu-component__link not-active">Новости</Link>
                </li>
                {alias !== 'rkf' &&
                    <li className="menu-component__item">
                        <Link to="/" onClick={handleClick} className="menu-component__link not-active">Клейма</Link>
                    </li>
                }
            </ul>
            <Link to={`/${alias}`} className="menu-component__button">{btnName}</Link>
        </Card>
    )
};

export default React.memo(MenuComponent);