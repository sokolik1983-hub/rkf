import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "../Container";
import Search from "./components/Search";
import Nav from "./components/Nav";
import WidgetLogin from "./components/WidgetLogin";
import Notifications from "./components/Notifications";
import { connectShowFilters } from "../connectors";
import { connectAuthVisible } from "pages/Login/connectors";
import Feedback from "components/Feedback";
import useIsMobile from "../../../utils/useIsMobile";

import "./index.scss";


const Header = ({ isAuthenticated, withFilters, isOpenFilters, setShowFilters, login_page, setNotificationsLength }) => {
    const isMobile = useIsMobile(1080);
    const headerTitle = localStorage.getItem('_ym61376485_il')?.slice(1, -1);
    const {pathname} = useLocation();

    const needChangeIsOpen = (valueIsOpen) => {
        if (valueIsOpen) {
            setShowFilters({isOpenFilters: false})
        }
    }
    return (
        <header className="header">
            <Container className="header__content">

                {isMobile
                    ? <div className="header__nav-wrap">
                        <Nav isOpenFilters={isOpenFilters} needChangeIsOpen={needChangeIsOpen} login_page={login_page}/>
                        <h5 className="header__nav-menu">Меню</h5>
                    </div>
                    : <div><Link to="/" className="header__logo"/></div>
                }
                <Search withFilters={withFilters}/>
                {isMobile && <h3 className="header__title">{headerTitle}</h3>}

                {!isMobile
                && <Nav isAuthenticated={isAuthenticated}/>
                }
                <div className="header__widgets">
                    {isAuthenticated &&
                        <>

                            <div className={`header__widgets--feedback${login_page ? ' login-page' : ''}`}>
                                <Feedback isMainNav={true}/>
                            </div>
                            <div className="header__widgets-notifications-wrap">
                                <Notifications setNotificationsLength={setNotificationsLength}/>
                                {isMobile && <span>Уведомления</span>}
                            </div>
                        </>
                    }

                {isMobile
                    ? <div className={ withFilters || pathname === '/' ? "header__filters" : "header__filters __hidden"}  onClick={() => {
                        setShowFilters({isOpenFilters: !isOpenFilters})
                    }}>
                        <button>Фильтр</button>

                        </div>
                        : <WidgetLogin login_page={login_page}/>}
                </div>


            </Container>

        </header>
    )
};

export default connectAuthVisible(connectShowFilters(React.memo(Header)));