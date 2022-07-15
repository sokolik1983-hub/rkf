import React, {memo, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Alert from "../../Alert";
import Modal from "../../Modal";
import {PresidiumRfls, presidium} from "../config";
import {Request} from "../../../utils/request";
import {blockContent} from "../../../utils/blockContent";


const Menu = ({currentPageNav, setOpenUserMenu, currentPageUserInfo, openUserMenu}) => {
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState(false);
    const [notificationCounter, setNotificationCounter] = useState(null);

    useEffect(() => {
        (() => getNotifications())();
    }, []);

    useEffect(() => {
        if (openUserMenu || showModal) {
            blockContent(true);
        } else {
            blockContent(false);
        }
    }, [openUserMenu, showModal]);

    const getNotifications = async () => {
        await Request({
            url: '/api/article/notifications'
        }, data => {
            setNotificationCounter(data?.counters?.counter_of_new);
        }, error => {
            console.log(error);
        });
    };

    const clickOnDisabledLink = e => {
        e.preventDefault();
        setOpenUserMenu(false);
        setAlert(true);
    };

    const clickOnPresidium = e => {
        e.preventDefault();
        setOpenUserMenu(false);
        setShowModal(true);
    };

    return (
        <>
            <ul className="menu-component-new__list">
                {currentPageNav?.map(navItem =>
                    <li className="menu-component-new__item" key={navItem.id}>
                        {navItem.title === 'Уведомления' && notificationCounter !== 0 && notificationCounter &&
                            <span className={`menu-component-new__notifications${notificationCounter > 99 ? ' _plus' : ''}`}>
                                {notificationCounter > 99 ? 99 : notificationCounter}
                            </span>
                        }
                        <NavLink
                            to={navItem.to}
                            exact={navItem.exact}
                            target={(navItem.id === 7 || navItem.id === 8) ? '_blank' : ''}
                            className={`menu-component-new__link${navItem.disabled ? ' _disabled' : ''}`}
                            onClick={e => navItem.isPresidium ?
                                clickOnPresidium(e) :
                                navItem.disabled ? clickOnDisabledLink(e) :
                                setOpenUserMenu(false)
                            }
                        >
                            {navItem.icon}
                            <span>{navItem.title}</span>
                        </NavLink>
                    </li>
                )}
            </ul>
            {showModal &&
                <Modal
                    iconName="icon-presidium-white"
                    headerName={currentPageUserInfo?.club_alias === 'rfls' ? 'Президиум РФЛС' : 'Президиум'}
                    className="menu-component__modal"
                    showModal={showModal}
                    handleClose={() => setShowModal(false)}
                    noBackdrop={true}
                >
                    <div className="menu-component__wrap">
                        {currentPageUserInfo?.club_alias === 'rfls' ?
                            <PresidiumRfls/> :
                            <ol className="menu-component-new__wrap-list">
                                {presidium[currentPageUserInfo?.club_alias].members.map((member, i) =>
                                    <li className="menu-component__wrap-item" key={i}>{member}</li>
                                )}
                            </ol>
                        }
                    </div>
                </Modal>
            }
            {alert &&
                <Alert
                    title="Внимание!"
                    text="Раздел находится в разработке."
                    autoclose={1.5}
                    onOk={() => setAlert(false)}
                />
            }
        </>
    );
};

export default memo(Menu);