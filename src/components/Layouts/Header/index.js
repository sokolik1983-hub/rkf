import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container";
import Search from "./components/Search";
import Nav from "./components/Nav";
import WidgetLogin from "./components/WidgetLogin";
import Notifications from "./components/Notifications";
import { connectShowFilters } from "../connectors";
import "./index.scss";


const Header = ({ withFilters, isOpenFilters, setShowFilters, login_page }) => (
    <header className="header">
        <Container className="header__content">
            <Link to="/" className="header__logo" />
            {withFilters &&
                <button className="header__filters" onClick={() => setShowFilters({ isOpenFilters: !isOpenFilters })} />
            }
            <Search withFilters={withFilters} />
            <Nav login_page={login_page} />
            <div className="header__widgets">
                <Notifications />
                <WidgetLogin login_page={login_page} />
            </div>
        </Container>
    </header>
);

export default connectShowFilters(React.memo(Header));