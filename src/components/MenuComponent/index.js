import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Card";
import Alert from "../Alert";
import "./index.scss";
import Modal from "../Modal";


const MenuComponent = ({ alias, name, presidium }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleClick = e => {
        e.preventDefault();
        setShowAlert(true);
    };

    const onPresidiumClick = e => {
        e.preventDefault();
        setShowModal(true);
    };

    return (
        <Card className="menu-component">
            <h4 className="menu-component__title" title="Меню">Меню</h4>
            <ul className="menu-component__list">
                <li className="menu-component__item">
                    <Link to={`/exhibitions?Alias=${alias}`} className="menu-component__link" title="Мероприятия">Мероприятия</Link>
                </li>
                {presidium &&
                    <li className="menu-component__item">
                        <Link to="/" onClick={onPresidiumClick} className="menu-component__link" title="Президиум">Президиум</Link>
                    </li>
                }
                <li className="menu-component__item">
                    <Link to="/" onClick={handleClick} className="menu-component__link not-active" title="Новости">Новости</Link>
                </li>
                {alias !== 'rkf' &&
                    <li className="menu-component__item">
                        <Link to="/" onClick={handleClick} className="menu-component__link not-active" title="Клейма">Клейма</Link>
                    </li>
                }
                <li className="menu-component__item">
                    <Link to={`/${alias}`} className="menu-component__link not-active" title={`Cтраница ${name}`}>{`Cтраница ${name}`}</Link>
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
            {showModal &&
                <Modal className="menu-component__modal" showModal={showModal} handleClose={() => setShowModal(false)} noBackdrop={true}>
                    <div className="menu-component__presidium">
                        <h4 className="menu-component__presidium-title">{presidium.title}</h4>
                        <ol className="menu-component__presidium-list">
                            {presidium.members.map((member, i) =>
                                <li className="menu-component__presidium-item" key={i}>{member}</li>
                            )}
                        </ol>
                    </div>
                </Modal>
            }
        </Card>
    )
};

export default React.memo(MenuComponent);