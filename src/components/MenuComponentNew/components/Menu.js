import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Card from "../../Card";
import {presidium, presidiumRfls} from "../config";
import Modal from "../../Modal";
import {blockContent} from "../../../utils/blockContent";
import Alert from "../../Alert";
import {Request} from "../../../utils/request";

export const Menu = ({currentPageNav, setOpenUserMenu, currentPageUserInfo, isMobile, openUserMenu}) => {
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState(false);
    const [notificationCounter, setNotificationCounter] = useState(null);

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
        console.log('currentPageAlias', currentPageAlias)
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

    const getNotifications = async () => {
        await Request({
            url: `/api/article/notifications`,
        }, (data) => {
            setNotificationCounter(data?.counters?.counter_of_new);
        }, error => {
            console.log(error);
        });
    };

    useEffect(() => {
        if (openUserMenu || showModal) {
            blockContent(true)
        } else {
            blockContent(false)
        }
    }, [openUserMenu, showModal]);

    useEffect(() => {
        getNotifications()
    }, []);

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
                                    target={(navItem.id === 7 || navItem.id === 8) ? '_blank' : ''}
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
                                    target={(navItem.id === 7 || navItem.id === 8) ? '_blank' : ''}
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
                                    className="menu-component-new__item"
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
                                                target={(navItem.id === 7 || navItem.id === 8) ? '_blank' : ''}
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
                                                target={(navItem.id === 7 || navItem.id === 8) ? '_blank' : ''}
                                            >
                                                {navItem.icon}
                                                <span>{navItem.title}</span>
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
            {alert && <Alert
                title="Внимание!"
                text="Раздел находится в разработке."
                autoclose={1.5}
                onOk={() => setAlert(false)}
            />}
        </>
    );
};

export default Menu;