import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";
import Alert from "../../Alert";
import useIsMobile from "../../../utils/useIsMobile";
import "./index.scss";


const UserMenu = ({ userNav, notificationsLength }) => {
    const [alert, setAlert] = useState(false);
    const [open, setOpen] = useState(false);
    const isMobile = useIsMobile();

    const clickOnDisabledLink = e => {
        e.preventDefault();
        setAlert(true);
    };

    return (
        <div className={`user-nav ${isMobile ? `` : `_desktop_card`}`}>
            <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
                {isMobile &&
                    <button className={`user-nav__button${open ? ' _open' : ''}`} onClick={() => setOpen(!open)}>
                        <span />
                        <span />
                        <span />
                        <span />
                    </button>
                }
                <CSSTransition
                    in={!isMobile || (isMobile && open)}
                    timeout={350}
                    classNames="user-nav__transition"
                    unmountOnExit
                >
                    <ul className="user-nav__list">
                        {userNav.map(navItem =>
                            <li className="user-nav__item" key={navItem.id}>
                                <NavLink
                                    to={navItem.to}
                                    exact={navItem.exact}
                                    className={`user-nav__link${navItem.disabled ? ' _disabled' : ''}`}
                                    onClick={e => navItem.disabled ? clickOnDisabledLink(e) : null}
                                >
                                    {navItem.icon}
                                    <span>{navItem.title}</span>
                                </NavLink>
                                {/* {navItem.title === 'Уведомления' && notificationsLength && <span className="user-nav__item-notification">{notificationsLength}</span>} */}
                            </li>
                        )}
                    </ul>
                </CSSTransition>
            </OutsideClickHandler>
            {alert &&
                <Alert
                    title="Внимание!"
                    text="Раздел находится в разработке."
                    autoclose={1.5}
                    onOk={() => setAlert(false)}
                />
            }
        </div>
    )
};

export default React.memo(UserMenu);