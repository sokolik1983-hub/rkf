import React, {useState} from "react";
import {Link} from "react-router-dom";
import Card from "../../../../components/Card";
import Alert from "../../../../components/Alert";
import "./index.scss";


const UserMenu = ({alias, name}) => {
    const [showAlert, setShowAlert] = useState(false);

    const defaultClick = e => {
        e.preventDefault();
        setShowAlert(true);
    };

    return (
        <Card className="user-menu">
            <h4 className="user-menu__title">Меню</h4>
            <ul className="user-menu__list">
                <li className="user-menu__item">
                    <Link to={`/exhibitions`} className="user-menu__link">Мероприятия</Link>
                </li>
                <li className="user-menu__item">
                    <Link to={`/owner/${alias}/news`} onClick={defaultClick} className="user-menu__link disabled">Новости</Link>
                </li>
                <li className="user-menu__item">
                    <Link to={`/owner/${alias}/dogs`} onClick={defaultClick} className="user-menu__link disabled">Собаки</Link>
                </li>
                <li className="user-menu__item">
                    <Link
                        to={`/owner/${alias}`}
                        className="user-menu__link"
                        title={`Старница ${name}`}
                    >{`Старница ${name}`}</Link>
                </li>
            </ul>
            {showAlert &&
                <Alert
                    title="Внимание!"
                    text="Раздел находится в разработке."
                    autoclose={1.5}
                    onOk={() => setShowAlert(false)}
                />
            }
        </Card>
    )
};

export default React.memo(UserMenu);