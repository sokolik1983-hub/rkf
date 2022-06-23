import React from "react";
import {Link} from "react-router-dom";
import {widgetLoginIcon} from "../../../../../appConfig";
import MenuLinks from "./MenuLinks";
import {getInitials} from "../../../../../utils/getInitials";
import Avatar from "../../../Avatar";

const Content = ({
    accountType,
    alias,
    isMobile1080,
    is_active_profile,
    logOutUser,
    loginUserSuccess,
    logo,
    menuBackground,
    name,
    open,
    setOpen,
    setShowModal,
    userType,
}) => {

    return (
        <div className="widget-login__content">
            <div className="widget-login__userpic-wrap">
                <div className="widget-login__bg-box">
                    {menuBackground ?
                        <img src={menuBackground} alt=""/> :
                        <img src='/static/images/widget-login/userpic-bg.jpg' alt=""/>
                    }
                </div>
                <Avatar
                    data="logo"
                    card="widget-login"
                    logo={logo}
                    open={open}
                    userType={userType}
                    name={name}
                    subclass="userpic"
                />
            </div>
            <div className="widget-login__username">
                {userType === 1 &&
                    <Link to={`/user/${alias}`}>{name ? getInitials(name) : 'Аноним'}</Link>
                }
                {userType === 3  && (alias !== 'rkf' || alias === 'rkf-online') &&
                    <Link to={is_active_profile ? `/club/${alias}` : '/not-confirmed'}>{name}</Link>
                }
                {(userType === 5 || alias === 'rkf') &&
                    <Link to={is_active_profile ? `/${alias}` : '/not-confirmed'}>{name}</Link>
                }
                {userType === 4 &&
                    <Link to={is_active_profile ? `/kennel/${alias}` : '/kennel/activation'}>{name}</Link>
                }
                {userType === 7 &&
                    <Link to={is_active_profile ? `/nbc/${alias}` : '/not-confirmed'}>{name}</Link>
                }
            </div>
            <ul className="widget-login__list">
                {is_active_profile &&
                    <MenuLinks
                        alias={alias}
                        setOpen={setOpen}
                        accountType={accountType}
                        setShowModal={setShowModal}
                        loginUserSuccess={loginUserSuccess}
                        is_active_profile={is_active_profile}
                        userTypes={
                            userType === 1 ? "user" :
                            userType === 3 && alias !== "rkf" && alias !== "rkf-online" ? "club" :
                            userType === 5 || alias === "rkf" || alias === "rkf-online" ? "federation" :
                            userType === 4 ? "kennel" :
                            userType === 7 && "nbc"
                        }
                        logInLogOut={
                            accountType === 5 && (userType === 5 || alias === "rkf" || alias === "rkf-online") ? "in" :
                            accountType === 5 && userType !== 5 && alias !== "rkf" && alias !== "rkf-online" && "out"
                        }
                    />
                }
                <li className="widget-login__item widget-login__item--logout" onClick={() => setOpen(false)}>
                    <Link to="/" onClick={logOutUser}>{widgetLoginIcon.exit}Выход</Link>
                </li>
                <li className="widget-login__item widget-login__add-user">
                    <div>Добавить пользователя</div>
                </li>
                {!isMobile1080 &&
                    <li className="widget-login__item" onClick={() => setOpen(false)}>
                        <a className="widget-login__item-link"
                            href="https://help.rkf.online/ru/knowledge_base/art/146/cat/3/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            База знаний
                        </a>
                    </li>
                }
            </ul>
        </div>
    );
};

export default Content;
