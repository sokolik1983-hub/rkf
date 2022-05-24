import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link, withRouter } from 'react-router-dom';
import useIsMobile from '../../../utils/useIsMobile';
import WidgetLogin from '../Header/components/WidgetLogin';
import ls from 'local-storage';
import { connectAuthVisible } from '../../../pages/Authorization/connectors';
import { footerNav } from '../../../appConfig';
import { connectShowFilters } from '../connectors';
import ZlineWidget from "../../ZLineWidget";
import {blockContent} from "../../../utils/blockContent";
import { checkAliasUrl } from '../../../utils/checkAliasUrl';
import MenuComponentNew from "../../MenuComponentNew";

import './footerMenu.scss';

const FooterMenu = ({
    isAuthenticated,
    setShowFilters
}) => {
    const isMobile1080 = useIsMobile(1080);
    const { alias } = ls.get('user_info') || {};
    const { pathname } = useLocation();
    const [showZlineModal, setShowZlineModal] = useState(false);
    const [open, setOpen] = useState(false);

    const hideSideMenu = () => {
        setShowFilters({ isOpenFilters: false, isOpen: false });
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
        if(showZlineModal || open ) {
            blockContent(true);
        } else {
            blockContent(false);
        }
    }, [showZlineModal, open]);

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
                            <MenuComponentNew />
                        </div>
                    }
                </div>
            }
            <ZlineWidget
                isModalShow={showZlineModal}
                handleClose={() => setShowZlineModal(false)}
                iframeLink={process.env.NODE_ENV === 'production' ?
                    'https://zline.me/widgets/registration-for-service?id=33' :
                    'https://zsstage.uep24.ru/widgets/registration-for-service?id=92'
                }
            />
        </>
    );
};

export default withRouter(connectAuthVisible(connectShowFilters(React.memo(FooterMenu))));
