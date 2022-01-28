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
import { kennelNav } from '../../../pages/Nursery/config';
import { userNav } from "../UserLayout/config";
import UserMenu from '../UserMenu';
import ZlineModal from '../../ZlineModal';
import {blockContent} from "../../../utils/blockContent";
import { checkAliasUrl } from '../../../utils/checkAliasUrl';

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
    const [open, setOpen] = useState(false);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [openMenuComponent, setOpenMenuComponent] = useState(false);
    const [openFedMenu, setOpenFedMenu] = useState(false);
    const [fedInfo, setFedInfo] = useState(null);
    const apiKey = localStorage.getItem('apikey');
    const isExhibitionPage = match.path === pathname;
    const isKennel = pathname.search('kennel') === 1 || user_type === 4;
    const isUser = pathname.search('user') === 1 || user_type === 1;

    useEffect(() => {
        if (isFederationAlias(checkAliasUrl(pathname, alias) || alias)) {
            (() => Request({
                url: endpointGetClubInfo + (checkAliasUrl(pathname, alias) || alias)
            }, data => {
                setFedInfo(data);
                setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
            }, error => {
                console.log(error.response);
            }))();
        }
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

    const hideWidgetLoginPopup = () => {
        setOpen(false);
    };

    const handleZlineClick = (e) => {
        e.preventDefault();
        hideWidgetLoginPopup();
        setShowZlineModal(true);
    };

    useEffect(() => {
        if(showZlineModal || open || openUserMenu || openFedMenu || openMenuComponent) {
            blockContent(true);
        } else {
            blockContent(false);
        }
    }, [showZlineModal, open, openUserMenu, openFedMenu, openMenuComponent]);

    return (
        <>
            {isMobile1080 &&
                <div className={`footer__menu${!isAuthenticated ? ' unregistered-user' : ''}`}
                    onClick={hideSideMenu}
                >
                    <NavLink onClick={hideWidgetLoginPopup} className='footer__menu-link class-for-grid-block1' to='/'>
                        {footerNav[0].image}
                        <span>{footerNav[0].title}</span>
                    </NavLink>
                    <Link to='' className='footer__menu-link class-for-grid-block2' onClick={e => (handleZlineClick(e))}>
                        {footerNav[5].image}
                        <span>{footerNav[5].title}</span>
                    </Link>
                    {isAuthenticated && <WidgetLogin footerNav={footerNav[2]} setOpen={setOpen} open={open} />}
                    {!isAuthenticated &&
                        <>
                            <NavLink className='footer__menu-link class-for-grid-block6' to={footerNav[6].to}>
                                {footerNav[6].image}
                                <span>{footerNav[6].title}</span>
                            </NavLink>
                            <NavLink className='footer__menu-link class-for-grid-block5' to={footerNav[7].to}>
                                {footerNav[7].image}
                                <span>{footerNav[7].title}</span>
                            </NavLink>
                        </>
                    }
                    {
                        <div onClick={hideWidgetLoginPopup} className={(checkAliasUrl(pathname, alias) === null) ? 'more_btn-hide' : 'class-for-grid4'}>
                            {isFederationAlias(checkAliasUrl(pathname, alias) || alias)
                                ?
                                <MenuComponent
                                    openMenuComponent={openMenuComponent}
                                    setOpenMenuComponent={setOpenMenuComponent}
                                    isExhibitionPage={isExhibitionPage}
                                    alias={checkAliasUrl(pathname, alias) || alias}
                                    name={fedInfo?.short_name || fedInfo?.name || 'Название федерации отсутствует'}
                                    isFederation={true}
                                />
                                :
                                isKennel ? <UserMenu
                                        setOpenUserMenu={setOpenUserMenu}
                                        openUserMenu={openUserMenu}
                                        userNav={canEdit
                                    ? kennelNav(checkAliasUrl(pathname, alias) || alias) // Show NewsFeed menu item to current user only
                                    : kennelNav(checkAliasUrl(pathname, alias) || alias).filter(i => i.id !== 2)}
                                    notificationsLength={notificationsLength}
                                /> :
                                    isUser ?
                                        <UserMenu
                                            setOpenUserMenu={setOpenUserMenu}
                                            openUserMenu={openUserMenu}
                                            userNav={canEdit
                                            ? userNav(checkAliasUrl(pathname, alias) || alias) // Show NewsFeed menu item to current user only
                                            : userNav(checkAliasUrl(pathname, alias) || alias).filter(i => i.id !== 2)}
                                            notificationsLength={notificationsLength}
                                        />
                                        : <UserMenu
                                            setOpenUserMenu={setOpenUserMenu}
                                            openUserMenu={openUserMenu}
                                            userNav={canEdit
                                            ? clubNav(checkAliasUrl(pathname, alias) || alias) // Show NewsFeed menu item to current user only
                                            : clubNav(checkAliasUrl(pathname, alias) || alias).filter(i => i.id !== 2)}
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
                <iframe
                    title="unique_iframe"
                    src={process.env.NODE_ENV === 'production' ?
                        `https://zline.me/widgets/registration-for-service?id=33${apiKey ? '&ak=' + apiKey : ''}` :
                        `http://zsdev.uep24.ru/widgets/registration-for-service?id=92${apiKey ? '&ak=' + apiKey : ''}`
                    }
                />
            </ZlineModal>
        </>
    );
};

export default withRouter(connectAuthVisible(connectShowFilters(React.memo(FooterMenu))));
