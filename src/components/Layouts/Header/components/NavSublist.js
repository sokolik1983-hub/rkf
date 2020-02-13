import React, { forwardRef, useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { NavLink } from "react-router-dom";
import SlideDownComponent from "../../../SlideDown";
import { CSSTransition } from 'react-transition-group';


const NavSublist = forwardRef(
    ({ navItem, setIsOpen }, ref) => {
        const [open, setOpen] = useState(false);
        const [isMobile, setIsMobile] = useState(window.innerWidth <= 990);

        useEffect(() => {
            window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 990));
            return window.removeEventListener('resize', () => setIsMobile(window.innerWidth <= 990));
        }, []);

        const onClose = () => {
            setOpen(false);
            setIsOpen(false);
        };

        return isMobile
            ? <>
                <p className={`header__nav-sublist-title${open ? ' _open' : ''}`}
                    onClick={() => setOpen(!open)}
                >
                    {navItem.title}
                    <i className="icon-right-open" />
                </p>
                <SlideDownComponent open={open}>
                    <ul className="header__nav-sublist">
                        {navItem.children.map(item =>
                            <li className={`header__nav-subitem${item.disabled ? ' disabled' : ''}`} key={item.id}>
                                <NavLink to={item.to}
                                    exact={item.exact}
                                    onClick={e => item.disabled ? e.preventDefault() : onClose()}
                                >
                                    {item.title}
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </SlideDownComponent>
            </>
            : <OutsideClickHandler ref={ref} onOutsideClick={onClose}>
                <p className={`header__nav-sublist-title${open ? ' _open' : ''}`}
                    onClick={() => setOpen(!open)}
                >
                    {navItem.title}
                    <i className="icon-right-open" />
                </p>
                <CSSTransition
                    in={open}
                    timeout={350}
                    classNames="header__nav-sublist-transition"
                    unmountOnExit
                    appear
                >
                    <div className="header__nav-sublist-wrap">
                        <ul className="header__nav-sublist">
                            {navItem.children.map(item =>
                                <li className={`header__nav-subitem${item.disabled ? ' disabled' : ''}`} key={item.id}>
                                    <NavLink to={item.to}
                                        exact={item.exact}
                                        onClick={e => item.disabled ? e.preventDefault() : onClose()}
                                    >
                                        {item.title}
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </CSSTransition>
            </OutsideClickHandler>
    }
);

export default React.memo(NavSublist);