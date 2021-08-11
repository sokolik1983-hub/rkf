import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link, withRouter } from 'react-router-dom';
import useIsMobile from '../../../utils/useIsMobile';
import WidgetLogin from '../Header/components/WidgetLogin';
import ls from 'local-storage';
import { connectAuthVisible } from '../../../pages/Authorization/connectors';
import { footerNav } from '../../../appConfig';
import { isFederationAlias } from '../../../utils';
import MenuComponent from '../../MenuComponent';
import { connectShowFilters } from '../connectors';
import { Request } from '../../../utils/request';
import { clubNav, endpointGetClubInfo } from '../../../pages/Club/config';
import { kennelNav, endpointGetNurseryInfo } from '../../../pages/Nursery/config';
import { endpointGetUserInfo, userNav } from "../UserLayout/config";
import UserMenu from '../UserMenu';
import ZlineModal from '../../ZlineModal';

import './footerMenu.scss';

const FooterMenu = ({
    match,
    is_active_profile,
    profile_id,
    notificationsLength,
    isAuthenticated,
    setShowFilters,
    setIsOpen
}) => {
    const isMobile1080 = useIsMobile(1080);
    const { alias, id, user_type } = ls.get('user_info') || {};
    const { pathname } = useLocation();
    const [canEdit, setCanEdit] = useState(false);
    const [showZlineModal, setShowZlineModal] = useState(false);
    const [clubInfo, setClubInfo] = useState(null);

    const isExhibitionPage = match.path === pathname;

    //заменить в коде ниже на checkUrlAlias ??
    const urlAlias = (pathname.search('kennel') === 1 || pathname.search('user') === 1) ? pathname.split('/')[2] : pathname.split('/')[1];

    const isKennel = pathname.search('kennel') === 1 || user_type === 4;
    const isUser = pathname.search('user') === 1 || user_type === 1;

    const exceptionUrl =
        pathname === '/organizations'
        || pathname === '/exhibitions'
        || pathname === '/search'
        || pathname === '/base-search'
        || pathname === ''
        || pathname === '/'
        || pathname === '/uploaded-documents'
        || pathname === '/auth/login'
        || pathname === '/auth/registration';


    function checkUrlAlias() {
        if (exceptionUrl) {
            return alias ? alias : null;
        } else if (pathname.search('kennel') === 1 || pathname.search('user') === 1) {
            return pathname.split('/')[2];
        } else {
            return pathname.split('/')[1];
        }
    }

    useEffect(() => {
        (() => Request({
            url: (isKennel ? endpointGetNurseryInfo : isUser ? endpointGetUserInfo : endpointGetClubInfo) + checkUrlAlias()
        }, data => {
            setClubInfo(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
        }, error => {
            console.log(error.response);
        }))();

    }, [match]);

    useEffect(() => {
        if (alias) {
            setCanEdit(isAuthenticated && is_active_profile && profile_id === id);
        }
    }, []);

    const hideSideMenu = () => {
        setShowFilters({ isOpenFilters: false });
        setIsOpen(false);
    };

    const handleZlineClick = (e) => {
        e.preventDefault();
        setShowZlineModal(true);
    };

    return (
        <>
            {isMobile1080 &&
                <div className='footer__menu'
                    onClick={hideSideMenu}
                >
                    <NavLink className='footer__menu-link' to='/'>
                        {footerNav[0].image}
                        <span>{footerNav[0].title}</span>
                    </NavLink>
                    <Link to='' className='footer__menu-link' onClick={e => handleZlineClick(e)}>
                        {footerNav[5].image}
                        <span>{footerNav[5].title}</span>
                    </Link>
                    {isAuthenticated && <WidgetLogin footerNav={footerNav[2]} />}
                    {!isAuthenticated &&
                        <>
                            <NavLink className='footer__menu-link' to={footerNav[6].to}>
                                {footerNav[6].image}
                                <span>{footerNav[6].title}</span>
                            </NavLink>
                            <NavLink className='footer__menu-link' to={footerNav[7].to}>
                                {footerNav[7].image}
                                <span>{footerNav[7].title}</span>
                            </NavLink>
                        </>
                    }

                    {
                        <div className={(checkUrlAlias() === null) ? 'more_btn-hide' : ''}>

                            {isFederationAlias(urlAlias || alias)
                                ?
                                <MenuComponent
                                    isExhibitionPage={isExhibitionPage}
                                    alias={urlAlias || alias}
                                    name={clubInfo?.short_name || clubInfo?.name || 'Название федерации отсутствует'}
                                    isFederation={true}
                                />
                                :
                                isKennel ? <UserMenu userNav={canEdit
                                    ? kennelNav(clubInfo?.alias) // Show NewsFeed menu item to current user only
                                    : kennelNav(clubInfo?.alias).filter(i => i.id !== 2)}
                                    notificationsLength={notificationsLength}
                                /> :
                                    isUser ?
                                        <UserMenu userNav={canEdit
                                            ? userNav(clubInfo?.alias) // Show NewsFeed menu item to current user only
                                            : userNav(clubInfo?.alias).filter(i => i.id !== 2)}
                                            notificationsLength={notificationsLength}
                                        />
                                        : <UserMenu userNav={canEdit
                                            ? clubNav(clubInfo?.club_alias) // Show NewsFeed menu item to current user only
                                            : clubNav(clubInfo?.club_alias).filter(i => i.id !== 2)}
                                            notificationsLength={notificationsLength}
                                        />}
                        </div>
                    }

                </div>
            }
            <ZlineModal showModal={showZlineModal}
                handleClose={() => {
                    setShowZlineModal(false);
                }}
            >
                <iframe src={'https://zline.me/widgets/registration-for-service?id=33'} title='unique_iframe' />
            </ZlineModal>
        </>
    );
};

export default withRouter(connectAuthVisible(connectShowFilters(React.memo(FooterMenu))));
