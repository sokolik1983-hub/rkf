import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from "react-router-dom";
import useIsMobile from "../../../utils/useIsMobile";
import WidgetLogin from "../Header/components/WidgetLogin";
import ls from "local-storage";
import { connectAuthVisible } from "../../../pages/Authorization/connectors";
import { footerNav } from "../../../appConfig";
import { clubNav } from "../../../pages/Club/config";
import { kennelNav } from "../NurseryLayout/config";
import { userNav } from "../UserLayout/config";
import { isFederationAlias } from "../../../utils";
import UserMenu from "../UserMenu";
import MenuComponent from "../../MenuComponent";
import { connectShowFilters } from "../connectors";
import ZlineModal from "../../ZlineModal";

import "./footerMenu.scss";

const FooterMenu = ({
    is_active_profile,
    profile_id,
    notificationsLength,
    isAuthenticated,
    setShowFilters,
    setIsOpen }) => {
    const isMobile1080 = useIsMobile(1080);
    const { alias, user_type, id, name } = ls.get('user_info') || {};
    const { pathname } = useLocation();
    const [canEdit, setCanEdit] = useState(false);
    const [showZlineModal, setShowZlineModal] = useState(false);

    useEffect(() => {
        if (alias) {
            setCanEdit(isAuthenticated && is_active_profile && profile_id === id);
        }
    }, []);



    const pathAlias = pathname.substr(pathname.lastIndexOf('/') + 1);

    const urlAlias = pathname.search('kennel') === 1 ? kennelNav(pathAlias) : clubNav(pathAlias);

    const isFederation = pathAlias === 'rkf'
        || pathAlias === 'rfss'
        || pathAlias === 'rfls'
        || pathAlias === 'rfos'
        || pathAlias === 'oankoo';

    const checkPathForMenu = pathAlias !== 'rkf'
        && pathAlias !== 'organizations'
        && pathAlias !== 'exhibitions'
        && pathAlias !== 'search'
        && pathAlias !== 'base-search'
        && pathAlias !== ''
        && pathAlias !== 'uploaded-documents'
        && pathAlias !== 'login'
        && pathAlias !== 'registration';

    const hideSideMenu = () => {
        setShowFilters({ isOpenFilters: false });
        setIsOpen(false);
    }
    const handleZlineClick = (e) => {
        e.preventDefault();
        setShowZlineModal(true);
    };

    return (
        <>
            {isMobile1080 &&

                <div className="footer__menu" onClick={hideSideMenu}>
                    <NavLink className="footer__menu-link" to='/'>
                        {footerNav[0].image}
                        <span>{footerNav[0].title}</span>
                    </NavLink>

                    <Link to="" className="footer__menu-link" onClick={e => handleZlineClick(e)}>
                        {footerNav[5].image}
                        <span>{footerNav[5].title}</span>
                    </Link>

                    {isAuthenticated && <WidgetLogin footerNav={footerNav[2]} />}

                    {!isAuthenticated &&
                        <>
                            <NavLink className="footer__menu-link" to={footerNav[6].to}>
                                {footerNav[6].image}
                                <span>{footerNav[6].title}</span>
                            </NavLink>

                            <NavLink className="footer__menu-link" to={footerNav[7].to}>
                                {footerNav[7].image}
                                <span>{footerNav[7].title}</span>
                            </NavLink>
                        </>
                    }


                    {isAuthenticated && !checkPathForMenu && !isFederation && user_type !== 5 && alias !== 'rkf' &&
                        <UserMenu
                            notificationsLength={notificationsLength}
                            footerNav={footerNav[4]}
                            userNav={canEdit && user_type &&
                                user_type === 1 ?
                                userNav(alias)
                                : user_type === 3 ?
                                    clubNav(alias)
                                    : user_type === 4 ?
                                        kennelNav(alias)
                                        : []
                            }
                        />
                    }

                    {isFederation &&
                        <MenuComponent
                            footerNav={footerNav[4]}
                            alias={pathAlias}
                            name={name}
                            isFederation={isFederationAlias}
                        />
                    }

                    {!isFederation && checkPathForMenu &&
                        <UserMenu
                            notificationsLength={notificationsLength}
                            footerNav={footerNav[4]}
                            userNav={urlAlias}
                        />
                    }

                </div>
            }
            <ZlineModal showModal={showZlineModal}
                handleClose={() => {
                    setShowZlineModal(false);
                }}
            >
                <iframe src={'https://zline.me/widgets/registration-for-service?id=33'} title="unique_iframe" />
            </ZlineModal>
        </>
    )
};

export default connectAuthVisible(connectShowFilters(React.memo(FooterMenu)));
