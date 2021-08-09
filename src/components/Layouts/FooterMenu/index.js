import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link, withRouter } from 'react-router-dom';
import useIsMobile from "../../../utils/useIsMobile";
import WidgetLogin from "../Header/components/WidgetLogin";
import ls from "local-storage";
import { connectAuthVisible } from "../../../pages/Authorization/connectors";
import { footerNav } from "../../../appConfig";
import { clubNav, endpointGetClubInfo } from '../../../pages/Club/config';
import { isFederationAlias } from "../../../utils";
import UserMenu from "../UserMenu";
import MenuComponent from "../../MenuComponent";
import { connectShowFilters } from "../connectors";
import ZlineModal from "../../ZlineModal";
import { Request } from "../../../utils/request";

import "./footerMenu.scss";

const FooterMenu = ({
    history,
    match,
    is_active_profile,
    profile_id,
    notificationsLength,
    isAuthenticated,
    setShowFilters,
    setIsOpen }) => {
    const isMobile1080 = useIsMobile(1080);
    const { alias,  user_type, id, name } = ls.get('user_info') || {};
    const { pathname } = useLocation();
    const [canEdit, setCanEdit] = useState(false);
    const [showZlineModal, setShowZlineModal] = useState(false);
    const [clubInfo, setClubInfo] = useState(null);
    const aliasParams = match.path;
    const isExhibitionPage = aliasParams === pathname;

    useEffect(() => {
        (() => Request({
            url: endpointGetClubInfo + aliasParams ? aliasParams : alias
        }, data => {
            if (data.user_type === 4) {
                history.replace(`/kennel/${match.params.route}/news`);
            } else {
                setClubInfo(data);
                setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
            }
        }, error => {
            console.log(error.response);
        }))();
    }, [match]);


    useEffect(() => {
        if (alias) {
            setCanEdit(isAuthenticated && is_active_profile && profile_id === id);
        }
    }, []);

    const urlAlias = pathname.search('kennel') === 1 ? pathname.split('/')[2] : pathname.split('/')[1];

    const isFederation = aliasParams === 'rkf'
        || aliasParams === 'rfss'
        || aliasParams === 'rfls'
        || aliasParams === 'rfos'
        || aliasParams === 'oankoo';

    const checkPathForMenu = aliasParams !== 'rkf'
        && aliasParams !== 'organizations'
        && aliasParams !== 'exhibitions'
        && aliasParams !== 'search'
        && aliasParams !== 'base-search'
        && aliasParams !== ''
        && aliasParams !== 'uploaded-documents'
        && aliasParams !== 'login'
        && aliasParams !== 'registration';

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

                <div className="footer__menu"
                     onClick={hideSideMenu}
                     style={{padding:
                             checkPathForMenu && !isFederation
                                 ? "10px 20px 5px 15px"
                                 :  isAuthenticated && isFederation
                                     ?  "10px 20px 5px 15px"
                                     :  "10px 19% 5px 15px"}}
                >
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



                    {(!!urlAlias || !!alias) === true ? isFederationAlias( urlAlias || alias) ?
                        <MenuComponent
                            isExhibitionPage={isExhibitionPage}
                            alias={ urlAlias || alias}
                            name={clubInfo?.short_name || clubInfo?.name || 'Название федерации отсутствует'}
                            isFederation={true}
                        /> :
                        <UserMenu userNav={canEdit
                            ? clubNav(clubInfo?.club_alias) // Show NewsFeed menu item to current user only
                            : clubNav(clubInfo?.club_alias).filter(i => i.id !== 2)}
                                  notificationsLength={notificationsLength}
                        />
                        : ''
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

export default withRouter(connectAuthVisible(connectShowFilters(React.memo(FooterMenu))));
