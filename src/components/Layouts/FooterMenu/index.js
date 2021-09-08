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
    const [fedInfo, setFedInfo] = useState(null);

    const isExhibitionPage = match.path === pathname;

    const isKennel = pathname.search('kennel') === 1 || user_type === 4;
    const isUser = pathname.search('user') === 1 || user_type === 1;

    const exceptionUrl =
        pathname === '/organizations'
        || pathname === '/exhibitions'
        || pathname === '/search'
        || pathname === '/base-search'
        || pathname === ''
        || pathname === '/'
        || pathname === '/about'
        || pathname === '/uploaded-documents'
        || pathname === '/auth/login'
        || pathname === '/auth/registration';

    function checkUrlAlias() {
        if (exceptionUrl) {
            return alias ? alias ? !exceptionUrl : pathname : null;
        } else if (pathname.search('kennel') === 1 || pathname.search('user') === 1) {
            return pathname.split('/')[2];
        }
//Временное решение, избегаем поломки страницы, при кейсе, когда с физика заходишь в клуб.
// При этом решении в меню футера ссылки будут вести на страницы физика, а не клуба не котором находишься
// Последний else оставляем
        else if (pathname.search('kennel') === -1 || pathname.search('user') === -1 ) {
            if (isFederationAlias(pathname.split('/')[1])) {
                return pathname.split('/')[1]
            } else {
                return alias || pathname.split('/')[1]
            }
        }
///////////
        else {
            return pathname.split('/')[1];
        }
    }

    useEffect(() => {
        if (isFederationAlias(checkUrlAlias() || alias)) {
            (() => Request({
                url: endpointGetClubInfo + (checkUrlAlias() || alias)
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
        console.log('footer-menu', openUserMenu)
    }

    const handleZlineClick = (e) => {
        e.preventDefault();
        setShowZlineModal(true);
        hideWidgetLoginPopup();
    };
    return (
        <>
            {isMobile1080 &&
                <div className='footer__menu'
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
                    {isAuthenticated && <WidgetLogin footerNav={footerNav[2]} setOpen={setOpen} open={open}/>}
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
                        <div onClick={hideWidgetLoginPopup} className={(checkUrlAlias() === null) ? 'more_btn-hide' : 'class-for-grid4'}>
                            {isFederationAlias(checkUrlAlias() || alias)
                                ?
                                <MenuComponent
                                    isExhibitionPage={isExhibitionPage}
                                    alias={checkUrlAlias() || alias}
                                    name={fedInfo?.short_name || fedInfo?.name || 'Название федерации отсутствует'}
                                    isFederation={true}
                                />
                                :
                                isKennel ? <UserMenu
                                        test={'1111'}
                                        setOpenUserMenu={setOpenUserMenu}
                                        openUserMenu={openUserMenu}
                                        userNav={canEdit
                                    ? kennelNav(checkUrlAlias() || alias) // Show NewsFeed menu item to current user only
                                    : kennelNav(checkUrlAlias() || alias).filter(i => i.id !== 2)}
                                    notificationsLength={notificationsLength}
                                /> :
                                    isUser ?
                                        <UserMenu
                                            test={'2222'}
                                            setOpenUserMenu={setOpenUserMenu}
                                            openUserMenu={openUserMenu}
                                            userNav={canEdit
                                            ? userNav(checkUrlAlias() || alias) // Show NewsFeed menu item to current user only
                                            : userNav(checkUrlAlias() || alias).filter(i => i.id !== 2)}
                                            notificationsLength={notificationsLength}
                                        />
                                        : <UserMenu
                                            test={'3333'}
                                            setOpenUserMenu={setOpenUserMenu}
                                            openUserMenu={openUserMenu}
                                            userNav={canEdit
                                            ? clubNav(checkUrlAlias() || alias) // Show NewsFeed menu item to current user only
                                            : clubNav(checkUrlAlias() || alias).filter(i => i.id !== 2)}
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
