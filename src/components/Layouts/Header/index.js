import React from "react";
import { Link } from "react-router-dom";
//import Nav from "./components/Nav";
import WidgetLogin from "../../../apps/Auth/components/WidgetLogin";
import Dropdown from "components/Dropdown";
import { DropDownItem } from "components/DropDownItem";
import Feedback from "../../Feedback";
import { connectShowFilters } from "../connectors";
import './index.scss';


const Header = ({ withFilters, isOpenFilters, setShowFilters }) => (
    <header className="Header">
        <div className="Header__wrapper">
            <Link to="/" className="Header__logo">
                <img src="/static/images/header/rkf-logo-transparent.svg" alt="logo" />
            </Link>
            <div className="Header__menu">
                <Link className="Header__single-link" to={"/rkf"}>РКФ</Link>
                <Dropdown closeOnClick={true} innerComponent={<span>Федерации</span>}>
                    <DropDownItem><Link to={"/rfls"}>РФЛС</Link></DropDownItem>
                    <DropDownItem><Link to={"/rfss"}>РФСС</Link></DropDownItem>
                    <DropDownItem><Link to={"/rfos"}>РФОС</Link></DropDownItem>
                    <DropDownItem><Link to={"/oankoo"}>ОАНКОО</Link></DropDownItem>
                </Dropdown>
                <Dropdown closeOnClick={true} innerComponent={<span>Кинологические организации</span>}>
                    <DropDownItem><Link to={"/clubs"}>Клубы</Link></DropDownItem>
                    <DropDownItem><Link to={"/organizations/national-breed-clubs"}>Национальные Клубы Пород</Link></DropDownItem>
                    <DropDownItem><Link to={"/organizations/nurseries"}>Питомники</Link></DropDownItem>
                </Dropdown>
                <Dropdown closeOnClick={true} className="left" innerComponent={<span>Выставки</span>}>
                    <DropDownItem><Link to={"/exhibitions"}>Календарь выставок</Link></DropDownItem>
                    <DropDownItem><Link to={"/results/cacib"}>Результаты CACIB</Link></DropDownItem>
                    <DropDownItem><Link to={"/results/cac"}>Результаты CAC</Link></DropDownItem>
                    <DropDownItem><a href="/">Результаты монопородных выставок</a></DropDownItem>
                </Dropdown>
            </div>
            <div className="Header__controlls">
                <Feedback className="Header__feedback" />
                <WidgetLogin />
                {/* {withFilters && <button className="Header__filters" onClick={() => setShowFilters({ isOpenFilters: !isOpenFilters })} />} */}
                {/* <Nav /> */}
            </div>
        </div>
    </header>
);

export default connectShowFilters(React.memo(Header));