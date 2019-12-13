import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../Container";
import Nav from "./components/Nav";
import WidgetLogin from "../../../apps/Auth/components/WidgetLogin";
import BurgerButton from "./components/BurgerButton";
import Feedback from "../../Feedback";
import { connectShowFilters } from "../connectors";
import ClickGuard from 'components/ClickGuard';
import './index.scss';


const Header = ({ withFilters, isOpenFilters, setShowFilters }) => {
    const [isOpen, setIsOpen] = useState(false);

    const setOverflow = (isOpen) => {
        if (window.innerWidth <= 768) {
            document.body.style.overflow = isOpen ? 'hidden' : '';
        } else if (window.innerWidth > 768 && isOpen) {
            document.body.style.overflow = '';
        }
    };

    useEffect(() => {
        setOverflow(isOpen);
        window.addEventListener('resize', () => setOverflow(isOpen));
        return () => window.removeEventListener('resize', () => setOverflow(isOpen));
    }, [isOpen]);

    return (<>
        <ClickGuard value={isOpen} callback={() => setIsOpen(false)} />
        <header className="Header">
            <Container className="Header__wrap">
                <Link to="/" className="Header__logo">
                    <img src="/static/images/header/rkf-logo.svg" alt="logo" />
                </Link>
                <div className={`Header__controls${isOpen ? ' _open' : ''}`}>
                    <Nav closeMenu={() => setIsOpen(false)} />
                    <Feedback />
                    <WidgetLogin />
                </div>
                {withFilters && <button className="Header__filters" onClick={() => setShowFilters({ isOpenFilters: !isOpenFilters })} />}
                <BurgerButton
                    className={isOpen ? '_open' : ''}
                    onClick={() => setIsOpen(!isOpen)}
                />
            </Container>
        </header>
    </>)
};

export default connectShowFilters(React.memo(Header));