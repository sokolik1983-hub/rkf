import React, {useState} from "react";
import { Link } from "react-router-dom";
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
    const isMobile = useIsMobile(1025);
        return (
            <header className="header">
        <Container className="header__content">

             {isMobile &&
                <div className="header__nav-wrap">
                    <Nav login_page={login_page}/>
                    <span>Меню</span>
                </div>
            }

            {!isMobile &&
                <div>
                    <Link to="/" className="header__logo"/>
                </div>
            }

            {withFilters &&
                <button className="header__filters" onClick={() => setShowFilters({isOpenFilters: !isOpenFilters})}/>
            }
            <Search withFilters={withFilters}/>


            {!isMobile &&
                <Nav login_page={login_page}/>
            }
            <div className="header__widgets">
                {!isAuthenticated &&
                    <div className={`header__widgets--feedback${login_page ? ' login-page' : ''}`}>
                        <Feedback isMainNav={true}/>
                    </div>
                }
                <div className="header__widgets-notifications-wrap">
                    <Notifications setNotificationsLength={setNotificationsLength}/>
                    {isMobile && <span>Уведомления</span>}
                </div>
                {isMobile
                    ? <div className="header__filters">
                        <button>Фильтр</button>
                    </div>
                    : <WidgetLogin login_page={login_page}/>}
            </div>




        </Container>
    </header>
    )
};

export default connectAuthVisible(connectShowFilters(React.memo(Header)));