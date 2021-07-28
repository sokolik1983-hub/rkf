import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import useIsMobile from "../../../utils/useIsMobile";
import WidgetLogin from "../Header/components/WidgetLogin";
import ls from "local-storage";
import {connectAuthVisible} from "../../../pages/Authorization/connectors";
import { footerNav } from "../../../appConfig";
import {clubNav} from "../../../pages/Club/config";
import {kennelNav} from "../NurseryLayout/config";
import {userNav} from "../UserLayout/config";
import {isFederationAlias} from "../../../utils";
import UserMenu from "../UserMenu";
import MenuComponent from "../../MenuComponent";
import { connectShowFilters } from "../connectors";

import './footerMenu.scss'


const FooterMenu = ({ notificationsLength, isAuthenticated, is_active_profile, profile_id, setShowFilters, setIsOpen }) => {
    const [canEdit, setCanEdit] = useState(false);
    const isMobile1080 = useIsMobile(1080);
    const {alias, user_type, id, name} = ls.get('user_info') || {};

    useEffect(() => {
        if(alias) {
            setCanEdit(isAuthenticated && is_active_profile && profile_id === id);
        }
    }, []);

    const hideSideMenu = () => {
        setShowFilters({isOpenFilters: false});
        setIsOpen(false);
    }
    return (
        <>
            {isMobile1080 &&

            <div className="footer__menu" onClick={hideSideMenu}>
                <NavLink className="footer__menu-link" to='/'>
                    {footerNav[0].image}
                    <span>{footerNav[0].title}</span>
                </NavLink>

                <NavLink className="footer__menu-link" to='/'>
                    {footerNav[5].image}
                    <span>{footerNav[5].title}</span>
                </NavLink>

                {/*{isAuthenticated &&*/}
                {/*<NavLink className="footer__menu-link __disabled" to='/'>*/}
                {/*    {footerNav[1].image}*/}
                {/*    <span>{footerNav[1].title}</span>*/}
                {/*</NavLink>*/}
                {/*}*/}

                {isAuthenticated && (user_type === 5 || alias === 'rkf') &&
                <MenuComponent
                    footerNav={footerNav[4]}
                    alias={alias}
                    name={name}
                    isFederation={isFederationAlias}
                />
                }

                {isAuthenticated && user_type !== 5 && alias !== 'rkf' &&
                <UserMenu
                    notificationsLength={notificationsLength}
                    footerNav={footerNav[4]}
                    userNav={canEdit && user_type &&
                        user_type === 1 ?
                            userNav(alias)
                            : user_type === 3  ?
                                clubNav(alias)
                            : user_type === 4  ?
                                kennelNav(alias)
                            : []
                    }
                />
                }


                <NavLink className="footer__menu-link" to={footerNav[6].to}>
                    {footerNav[6].image}
                    <span>{footerNav[6].title}</span>
                </NavLink>


                <NavLink className="footer__menu-link" to={footerNav[7].to}>
                    {footerNav[7].image}
                    <span>{footerNav[7].title}</span>
                </NavLink>
            </div>
            }
        </>
    )
};


export default connectAuthVisible(connectShowFilters(React.memo(FooterMenu)));
