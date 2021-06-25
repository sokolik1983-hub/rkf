import React from 'react';

import './footerMenu.scss'
import {NavLink} from "react-router-dom";
import useIsMobile from "../../../utils/useIsMobile";

const FooterMenu = () => {

    const isMobile1024 = useIsMobile(1024)
    return (
        <>
            {isMobile1024 && <div className="footer__menu">
                <NavLink to='/'>
                    Главная
                </NavLink>
                <NavLink to='/'>
                    Чат
                </NavLink>
                <NavLink to='/'>
                    Профиль
                </NavLink>
                <NavLink to='/'>
                    Моё меню
                </NavLink>

            </div>}

        </>
    );
};

export default FooterMenu;
