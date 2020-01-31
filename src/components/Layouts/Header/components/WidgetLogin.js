import React, {forwardRef, useState} from "react";
import {Link} from "react-router-dom";
import ls from "local-storage";
import OutsideClickHandler from "react-outside-click-handler";
import SlideDownComponent from "../../../SlideDown";
import {LOGIN_URL, DEFAULT_IMG} from "../../../../appConfig";
import {connectWidgetLogin} from "../../../../apps/Auth/connectors";


const WidgetLogin = forwardRef(
    ({isAuthenticated, is_active_profile, logOutUser, logo_link}, ref) => {
        const [open, setOpen] = useState(false);
        const clubAlias = ls.get('user_info') ? ls.get('user_info').club_alias : '';
        const clubName = ls.get('user_info') ? ls.get('user_info').club_name : '';
        const clubLogo = ls.get('user_info') ? ls.get('user_info').logo_link : logo_link;

        return (
            <div className="widget-login">
                {isAuthenticated ?
                    <OutsideClickHandler ref={ref} onOutsideClick={() => setOpen(false)}>
                        <div className={`widget-login__user-icon${open ? ' _active' : ''}`}
                             style={{backgroundImage: `url(${clubLogo ? clubLogo : DEFAULT_IMG.clubAvatar})`}}
                             onClick={() => setOpen(!open)}
                        />
                        {open &&
                            <div className="widget-login__content">
                                <SlideDownComponent open={open}>
                                    <ul className="widget-login__list">
                                        <li className="widget-login__item" title={clubName}>
                                            {clubName}
                                        </li>
                                        <li className="widget-login__item">
                                            <Link to={is_active_profile ? `/${clubAlias}` : "/not-confirmed"}>Личный кабинет</Link>
                                        </li>
                                        {is_active_profile &&
                                        <li className="widget-login__item">
                                            <Link to="/reports">Отчёты</Link>
                                        </li>
                                        }
                                        <li className="widget-login__item">
                                            <Link to={'/'} onClick={logOutUser}>Выход</Link>
                                        </li>
                                    </ul>
                                </SlideDownComponent>
                            </div>
                        }
                    </OutsideClickHandler> :
                    <Link className="login-link" to={LOGIN_URL}>Войти</Link>
                }
            </div>
        )
    }
);

export default connectWidgetLogin(React.memo(WidgetLogin));