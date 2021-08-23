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
            >
                {isMobile &&
                    <button className={`user-nav__button more-btn${open ? ' _open' : ''}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.04099 13.8913C3.99341 13.5411 3.42809 12.4079 3.7783 11.3604C4.12852 10.3128 5.26165 9.74745 6.30923 10.0977C7.35681 10.4479 7.92214 11.581 7.57192 12.6286C7.40374 13.1317 7.04261 13.5473 6.56797 13.7841C6.09333 14.0209 5.54406 14.0595 5.04099 13.8913ZM11.3655 13.8968C10.318 13.5466 9.75264 12.4135 10.1029 11.3659C10.4531 10.3183 11.5862 9.753 12.6338 10.1032C13.6814 10.4534 14.2467 11.5866 13.8965 12.6341C13.7283 13.1372 13.3672 13.5529 12.8925 13.7897C12.4179 14.0265 11.8686 14.065 11.3655 13.8968ZM17.6901 13.9024C16.6425 13.5522 16.0772 12.419 16.4274 11.3715C16.7776 10.3239 17.9108 9.75855 18.9583 10.1088C20.0059 10.459 20.5712 11.5921 20.221 12.6397C20.0528 13.1428 19.6917 13.5584 19.2171 13.7952C18.7424 14.032 18.1932 14.0706 17.6901 13.9024Z"/>
                        </svg>
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