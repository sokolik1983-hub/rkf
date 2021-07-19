import React, {useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";
import useIsMobile from "../../../utils/useIsMobile";
import WidgetLogin from "../Header/components/WidgetLogin";
import UserMenu from "../UserMenu";
import ls from "local-storage";
import {connectAuthVisible} from "../../../pages/Authorization/connectors";
import { footerNav } from "../../../appConfig";
import {clubNav} from "../../../pages/Club/config";
import {kennelNav} from "../NurseryLayout/config";
import {userNav} from "../UserLayout/config";

import { isFederationAlias} from "../../../utils";

import './footerMenu.scss'
import MenuComponent from "../../MenuComponent";

const FooterMenu = ({ notificationsLength, isAuthenticated, is_active_profile, profile_id}) => {
    const [canEdit, setCanEdit] = useState(false);
    const isMobile1080 = useIsMobile(1080);
    const {alias, user_type, id, name} = ls.get('user_info') || {};

    console.log(user_type)
    useEffect(() => {
        if(alias) {
            setCanEdit(isAuthenticated && is_active_profile && profile_id === id);
        }
    }, []);

    return (
        <>
            {isMobile1080 &&

                <div className="footer__menu">

                <NavLink className="footer__menu-link" to='/'>
                    {footerNav[0].image}
                    <span>{footerNav[0].title}</span>
                </NavLink>

                {isAuthenticated &&
                <NavLink className="footer__menu-link __disabled" to='/'>
                    {footerNav[1].image}
                    <span>{footerNav[1].title}</span>
                </NavLink>
                }

                <WidgetLogin footerNav={footerNav[2]} />

                    {isAuthenticated  && isFederationAlias(alias) && user_type === 5 &&  <MenuComponent
                        footerNav={footerNav[3]}
                        alias={alias}
                        name={name}
                        isFederation={true}
                    />}

                {isAuthenticated && user_type !== 5 &&
                <UserMenu
                    notificationsLength={notificationsLength}
                    footerNav={footerNav[3]}
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
            </div>
            }
        </>
    )
};


export default connectAuthVisible(React.memo(FooterMenu));
