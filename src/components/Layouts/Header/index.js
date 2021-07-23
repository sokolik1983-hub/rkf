import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Container from "../Container";
import Search from "./components/Search";
import Nav from "./components/Nav";
import WidgetLogin from "./components/WidgetLogin";
import Notifications from "./components/Notifications";
import { connectShowFilters } from "../connectors";
import { connectAuthVisible } from "pages/Login/connectors";
import useIsMobile from "../../../utils/useIsMobile";

import "./index.scss";

const Header = ({ isAuthenticated, withFilters, isOpenFilters, setShowFilters, login_page, setNotificationsLength, isOpen, setIsOpen }) => {
    const isMobile = useIsMobile(1080);
    const {pathname} = useLocation();
    const [openWidgets, setOpenWidgets] = useState(false);

    const needChangeIsOpen = (valueIsOpen) => {
        if (valueIsOpen) {
            setShowFilters({isOpenFilters: false})
        }
    }

    const hideSideMenu = () => {
        setShowFilters({isOpenFilters: false});
        setIsOpen(false);
    }

    return (
        <header className="header">
            <Container className="header__content">

                {isMobile
                    ? <div className="header__nav-wrap">
                        <Nav
                            isOpenFilters={isOpenFilters}
                            needChangeIsOpen={needChangeIsOpen}
                            login_page={login_page}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    </div>
                    : <div><Link to="/" className="header__logo"/></div>
                }

                    <Search hideSideMenu={hideSideMenu} withFilters={withFilters}/>


                {!isMobile
                && <Nav isAuthenticated={isAuthenticated}/>
                }
                <div className="header__widgets">
                    {isAuthenticated &&
                        <>
                            {/*<div className={`header__widgets--feedback${login_page ? ' login-page' : ''}`}>*/}
                            {/*    <Feedback isMainNav={true}/>*/}
                            {/*</div>*/}
                            <div onClick={hideSideMenu} className="header__widgets-notifications-wrap">
                                <Notifications  open={openWidgets}
                                                setOpen={setOpenWidgets}
                                                setNotificationsLength={setNotificationsLength}
                                />
                                {isMobile && <span  style={{color: openWidgets && "#3366ff"}}>Уведомления</span>}
                            </div>
                        </>
                    }

                {isMobile
                    ? <div className={ (withFilters || pathname === '/') ? "header__filters" : "header__filters __hidden"}  onClick={() => {
                        setShowFilters({isOpenFilters: !isOpenFilters})
                    }}>
                        <div className={isOpenFilters ? "open" : ''}>
                            <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 14V16H6V14H0ZM0 2V4H10V2H0ZM10
                            18V16H18V14H10V12H8V18H10ZM4 6V8H0V10H4V12H6V6H4ZM18
                            10V8H8V10H18ZM12 6H14V4H18V2H14V0H12V6Z" fill="#90999e"/>
                            </svg>

                        </div>
                        <button style={{color: isOpenFilters && "#3366ff"}}>Фильтр</button>

                        </div>
                        : <WidgetLogin login_page={login_page}/>}
                </div>


            </Container>

        </header>
    )
};

export default connectAuthVisible(connectShowFilters(React.memo(Header)));