import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import useIsMobile from "../../../utils/useIsMobile";
import WidgetLogin from "../Header/components/WidgetLogin";
import UserMenu from "../UserMenu";
import ls from "local-storage";
import {clubNav} from "../../../pages/Club/config";
import {connectShowFilters} from "../../../components/Layouts/connectors";
import {connectAuthVisible} from "../../../pages/Authorization/connectors";
import { Request } from "utils/request";

import './footerMenu.scss'

const FooterMenu = ({ notificationsLength, isAuthenticated, is_active_profile, profile_id}) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const {alias} = ls.get('user_info')

    const [open, setOpen] = useState(false);

    const getClub = () => {
        return Request({
            url: '/api/Club/public/' + alias
        }, data => {
            setClubInfo(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);

        }, error => console.log(error));
    };

    useEffect(() => {
        getClub()
    }, []);

    const isMobile1024 = useIsMobile(1080)
    return (
        <>
            {isMobile1024 && <div className="footer__menu">
                <NavLink className="footer__menu-link" to='/'>
                    Главная
                </NavLink>

                <NavLink className="footer__menu-link" to='/'>
                    Чат
                </NavLink>

                <WidgetLogin  />
                {/*<img alt="img" className="image-svg" src='/static/icons/footer-menu/menu.svg'/>*/}
                <UserMenu
                    userNav={canEdit
                    ? clubNav(clubInfo?.club_alias) // Show NewsFeed menu item to current user only
                    : clubNav(clubInfo?.club_alias).filter(i => i.id !== 2)}
                    notificationsLength={notificationsLength}
                />
            </div>}

        </>
    );
};
export default connectAuthVisible(connectShowFilters(React.memo(FooterMenu)));
