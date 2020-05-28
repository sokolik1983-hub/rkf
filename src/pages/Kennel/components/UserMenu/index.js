import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {CSSTransition} from "react-transition-group";
import OutsideClickHandler from "react-outside-click-handler/esm/OutsideClickHandler";
import Card from "../../../../components/Card";
import Alert from "../../../../components/Alert";
import "./index.scss";


const UserMenu = ({alias, name}) => {
    const [open, setOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 769);

        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 769);
        });

        return window.removeEventListener('resize', () => {
            setIsMobile(window.innerWidth < 769);
        });
    }, []);

    const defaultClick = e => {
        e.preventDefault();
        setShowAlert(true);
    };

    return (
        <Card className="user-menu">
            <h4 className="user-menu__title">Меню</h4>
            <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
                {isMobile &&
                    <button className={`user-menu__button${open ? ' _open' : ''}`} onClick={() => setOpen(!open)}>
                        <span/>
                        <span/>
                        <span/>
                        <span/>
                    </button>
                }
                <CSSTransition
                    in={!isMobile || (isMobile && open)}
                    timeout={350}
                    classNames="user-menu__transition"
                    unmountOnExit
                >
                    <ul className="user-menu__list">
                        <li className="user-menu__item">
                            <Link to={`/exhibitions`} className="user-menu__link">Мероприятия</Link>
                        </li>
                        <li className="user-menu__item">
                            <Link to={`/kennel/${alias}/news`} onClick={defaultClick} className="user-menu__link disabled">Новости</Link>
                        </li>
                        <li className="user-menu__item">
                            <Link
                                to={`/kennel/${alias}`}
                                className="user-menu__link"
                                title={`Старница ${name}`}
                            >{`Старница ${name}`}</Link>
                        </li>
                    </ul>
                </CSSTransition>
            </OutsideClickHandler>
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