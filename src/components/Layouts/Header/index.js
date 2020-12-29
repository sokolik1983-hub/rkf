import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container";
import Search from "./components/Search";
import Nav from "./components/Nav";
import WidgetLogin from "./components/WidgetLogin";
import Notifications from "./components/Notifications";
import { connectShowFilters } from "../connectors";
import { connectAuthVisible } from "pages/Login/connectors";
import Feedback from "components/Feedback";
import "./index.scss";


const Header = ({ isAuthenticated, withFilters, isOpenFilters, setShowFilters, login_page }) => (
    <header className="header">
        <Container className="header__content">
            <Link to="/" className="header__logo" />
            {withFilters &&
                <button className="header__filters" onClick={() => setShowFilters({ isOpenFilters: !isOpenFilters })} />
            }
            <Search withFilters={withFilters} />
            <Nav login_page={login_page} />
            <div className="header__widgets">
                {!isAuthenticated &&
                    <div className={`header__widgets--feedback${login_page ? ' login-page' : ''}`}>
                        <Feedback isMainNav={true} />
                    </div>
                }
                <Notifications />
                <WidgetLogin login_page={login_page} />
            </div>
        </Container>
    </header>
);

export default connectAuthVisible(connectShowFilters(React.memo(Header)));