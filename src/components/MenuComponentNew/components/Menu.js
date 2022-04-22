import React from "react";
import {NavLink} from "react-router-dom";
import Card from "../../Card";

export const Menu = ({currentPageNav, notificationCounter, setShowModal, setOpenUserMenu, setAlert, currentPageUserInfo, isMobile}) => {

    const clickOnDisabledLink = e => {
        e.preventDefault();
        setOpenUserMenu(false);
        setAlert(true);
    };

    const clickOnPresidium = (e) => {
        e.preventDefault();
        setOpenUserMenu(false);
        setShowModal('presidium');
    };

    return (
        <>
            {
                isMobile ?
                        currentPageNav?.map(navItem => <li
                        className={`menu-component-new__item${(navItem.title === 'Уведомления') ? ' _hidden' : ''}`}
                        key={navItem.id}>
                        {navItem.title === 'Уведомления' &&
                            notificationCounter !== 0 &&
                            notificationCounter &&
                            <span
                                className={`menu-component-new__notification${notificationCounter > 99 ? ' _plus' : ''}`}
                            >
                                                { notificationCounter > 99 ? 99 : notificationCounter }
                                            </span>
                        }
                        {
                            navItem.onClick
                                ?
                                <NavLink
                                    to={navItem.to}
                                    exact={navItem.exact}
                                    className={`menu-component-new__link${navItem.disabled ? ' _disabled' : ''}`}
                                    onClick={e => clickOnPresidium(e, currentPageUserInfo?.club_alias)}
                                >
                                    {navItem.icon}
                                    <span>{navItem.title}</span>
                                </NavLink>
                                :
                                <NavLink
                                    to={navItem.to}
                                    exact={navItem.exact}
                                    className={`menu-component-new__link${navItem.disabled ? ' _disabled' : ''}`}
                                    onClick={e => navItem.disabled ? clickOnDisabledLink(e) : setOpenUserMenu(false)}
                                >
                                    {navItem.icon}
                                    <span>{navItem.title}</span>
                                </NavLink>
                        }
                    </li>)
                    :
                    <Card>
                        <ul className="menu-component-new__list">
                            {
                                currentPageNav?.map(navItem => <li
                                    className={`menu-component-new__item${(navItem.title === 'Уведомления') ? ' _hidden' : ''}`}
                                    key={navItem.id}>
                                    {navItem.title === 'Уведомления' && notificationCounter !== 0 && notificationCounter &&
                                        <span
                                            className={`menu-component-new__notifications${notificationCounter > 99 ? ' _plus' : ''}`}>
                                            {notificationCounter > 99 ? 99 : notificationCounter}
                                        </span>
                                    }
                                    {
                                        navItem.onClick
                                            ?
                                            <NavLink
                                                to={navItem.to}
                                                exact={navItem.exact}
                                                onClick={e => navItem.onClick(e, setShowModal)}
                                                className={`menu-component-new__link${navItem.disabled ? ' _disabled' : ''}`}
                                            >
                                                {navItem.icon}
                                                <span>{navItem.title}123</span>
                                            </NavLink>
                                            :
                                            <NavLink
                                                to={navItem.to}
                                                exact={navItem.exact}
                                                className={`menu-component-new__link${navItem.disabled ? ' _disabled' : ''}`}
                                            >
                                                {navItem.icon}
                                                <span>{navItem.title}1234</span>
                                            </NavLink>
                                    }
                                </li>)
                            }
                        </ul>
                    </Card>
            }
        </>
    );
};

export default Menu;