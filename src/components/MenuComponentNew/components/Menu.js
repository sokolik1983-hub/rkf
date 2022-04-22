import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Card from "../../Card";
import {presidium, presidiumRfls} from "../config";
import Modal from "../../Modal";
import {blockContent} from "../../../utils/blockContent";

export const Menu = ({currentPageNav, notificationCounter, setOpenUserMenu, setAlert, currentPageUserInfo, isMobile, openUserMenu}) => {
    const [showModal, setShowModal] = useState(false);

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

    const showPresidium = (currentPageAlias) => {
        if (currentPageAlias === 'rfls') {
            return presidiumRfls
        } else {
            return <>
                <ol className="menu-component-new__wrap-list">
                    {presidium[currentPageAlias].members.map((member, i) =>
                        <li className="menu-component__wrap-item" key={i}>{member}</li>
                    )}
                </ol>
            </>
        }
    };

    useEffect(() => {
        if (openUserMenu || showModal) {
            blockContent(true)
        } else {
            blockContent(false)
        }
    }, [openUserMenu, showModal]);

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
            {showModal &&
                <Modal
                    iconName="icon-presidium-white"
                    headerName={currentPageUserInfo?.club_alias === 'rfls' ? "Президиум РФЛС" : "Президиум"}
                    className="menu-component__modal"
                    showModal={showModal} handleClose={() => setShowModal(false)}
                    noBackdrop={true}>
                    <div className="menu-component__wrap">
                        {showModal === 'presidium' && showPresidium(currentPageUserInfo?.club_alias)}
                    </div>
                </Modal>
            }
        </>
    );
};

export default Menu;