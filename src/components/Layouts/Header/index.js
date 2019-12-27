import React from "react";
import { Link } from "react-router-dom";
import Nav from "./components/Nav";
import WidgetLogin from "../../../apps/Auth/components/WidgetLogin";
import Feedback from "../../Feedback";
import { connectShowFilters } from "../connectors";
import './index.scss';


const Header = ({ withFilters, isOpenFilters, setShowFilters }) => (
    <header className="Header">
        <Link to="/" className="Header__logo">
            <img src="/static/images/header/rkf-logo.svg" alt="logo" />
        </Link>
        <div className="Header__controlls">
            <Feedback className="Header__feedback" />
            <WidgetLogin />
            {withFilters && <button className="Header__filters" onClick={() => setShowFilters({ isOpenFilters: !isOpenFilters })} />}
            <Nav />
        </div>
    </header>
);

export default connectShowFilters(React.memo(Header));