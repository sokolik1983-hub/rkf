import React, {useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";
import useIsMobile from "../../../utils/useIsMobile";
import WidgetLogin from "../Header/components/WidgetLogin";
import UserMenu from "../UserMenu";
import ls from "local-storage";
import {clubNav} from "../../../pages/Club/config";
import {connectAuthVisible} from "../../../pages/Authorization/connectors";
import { Request } from "utils/request";
import { footerNav } from "../../../appConfig";

import './footerMenu.scss'

const FooterMenu = ({ notificationsLength, isAuthenticated, is_active_profile, profile_id}) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const isMobile1080 = useIsMobile(1080);
    const {alias} = ls.get('user_info');

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

    return (
        <>
            {isMobile1080 &&

            <div className="footer__menu">

                <NavLink className="footer__menu-link" to='/'>
                    {footerNav[0].image}
                    <span>{footerNav[0].title}</span>
                </NavLink>

                <NavLink className="footer__menu-link __disabled" to='/'>
                    {footerNav[1].image}
                    <span>{footerNav[1].title}</span>
                </NavLink>

                <WidgetLogin footerNav={footerNav[2]} />

                <UserMenu
                    footerNav={footerNav[3]}
                    userNav={canEdit
                    ? clubNav(clubInfo?.club_alias) // Show NewsFeed menu item to current user only
                    : clubNav(clubInfo?.club_alias).filter(i => i.id !== 2)}
                    notificationsLength={notificationsLength}
                />
            </div>}

        </>
    );
};
export default connectAuthVisible(React.memo(FooterMenu));
