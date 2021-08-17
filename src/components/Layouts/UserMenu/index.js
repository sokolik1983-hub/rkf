import React, {memo, useState} from "react";
import OutsideClickHandler from "react-outside-click-handler";
import {CSSTransition} from "react-transition-group";
import {NavLink} from "react-router-dom";
import Alert from "../../Alert";
import useIsMobile from "../../../utils/useIsMobile";
import "./index.scss";


const UserMenu = ({userNav, notificationsLength, isExhibitionPage}) => {
    const [alert, setAlert] = useState(false);
    const [open, setOpen] = useState(false);
    const isMobile = useIsMobile(1080);

    const clickOnDisabledLink = e => {
        e.preventDefault();
        setAlert(true);
    };

    return (
        <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
            <div
                className={`user-nav${isMobile ? '' : ' _desktop_card'}`}
                onClick={() => setOpen(open => !open)}
                style={{backgroundPosition: "top 20% left 50%"}}
            >
                {isMobile &&
                    <button className={`user-nav__button${open ? ' _open' : ''}`}>
                        Еще
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
                            <li className={`user-nav__item${isExhibitionPage && navItem.title === 'Уведомления' ? ' _hidden' : ''}`} key={navItem.id}>
                                <NavLink
                                    to={navItem.to}
                                    exact={navItem.exact}
                                    className={`user-nav__link${navItem.disabled ? ' _disabled' : ''}`}
                                    onClick={e => navItem.disabled ? clickOnDisabledLink(e) : null}
                                >
                                    {navItem.icon}
                                    <span>{navItem.title}</span>
                                </NavLink>
                                {navItem.title === 'Уведомления' && notificationsLength !== 0 && notificationsLength &&
                                    <span className={`user-nav__item-notification${notificationsLength > 99 ? ' _plus' : ''}`}>
                                        {notificationsLength > 99 ? 99 : notificationsLength}
                                    </span>
                                }
                            </li>
                        )}
                    </ul>
                </CSSTransition>
                {alert &&
                    <Alert
                        title="Внимание!"
                        text="Раздел находится в разработке."
                        autoclose={1.5}
                        onOk={() => setAlert(false)}
                    />
                }
            </div>
        </OutsideClickHandler>
    )
};

export default memo(UserMenu);