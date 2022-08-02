import React, {memo, useState, useEffect} from "react";
import {NavLink, Link, useLocation, withRouter} from "react-router-dom";
import MenuComponentNew from "../../MenuComponentNew";
import WidgetLogin from "../Header/components/WidgetLogin";
import ZlineWidget from "../../ZLineWidget";
import {footerNav} from "../../../appConfig";
import {connectAuthVisible} from "../../../pages/Authorization/connectors";
import {connectShowFilters} from "../connectors";
import {blockContent} from "../../../utils/blockContent";
import {checkAliasUrl} from "../../../utils/checkAliasUrl";

import "./footerMenu.scss";


const FooterMenu = ({isAuthenticated, setShowFilters}) => {
    const [open, setOpen] = useState(false);
    const [showZlineModal, setShowZlineModal] = useState(false);
    const {pathname} = useLocation();

    useEffect(() => {
        if(showZlineModal || open ) {
            blockContent(true);
        } else {
            blockContent(false);
        }
    }, [showZlineModal, open]);

    const hideSideMenu = () => {
        setShowFilters({ isOpenFilters: false, isOpen: false });
    };

    const hideWidgetLoginPopup = () => {
        setOpen(false);
    };

    const handleZlineClick = e => {
        e.preventDefault();
        hideWidgetLoginPopup();
        setShowZlineModal(true);
    };

    return (
        <>
            <div className={`footer__menu${!isAuthenticated ? ' unregistered-user' : ''}`}
                 onClick={hideSideMenu}
            >
                <NavLink to="/" className="footer__menu-link class-for-grid-block1" onClick={hideWidgetLoginPopup}>
                    {footerNav[0].image}
                    <span>{footerNav[0].title}</span>
                </NavLink>
                <Link to="/" className="footer__menu-link class-for-grid-block2" onClick={e => handleZlineClick(e)}>
                    {footerNav[5].image}
                    <span>{footerNav[5].title}</span>
                </Link>
                {isAuthenticated &&
                    <WidgetLogin footerNav={footerNav[2]} setOpen={setOpen} open={open} />
                }
                {!isAuthenticated &&
                    <>
                        <NavLink to={footerNav[6].to} className="footer__menu-link class-for-grid-block6">
                            {footerNav[6].image}
                            <span>{footerNav[6].title}</span>
                        </NavLink>
                        <NavLink to={footerNav[7].to} className="footer__menu-link class-for-grid-block5">
                            {footerNav[7].image}
                            <span>{footerNav[7].title}</span>
                        </NavLink>
                    </>
                }
                <div className={checkAliasUrl(pathname) ? 'more_btn-hide' : 'class-for-grid4'}
                     onClick={hideWidgetLoginPopup}
                >
                    <MenuComponentNew />
                </div>
            </div>
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

export default withRouter(connectAuthVisible(connectShowFilters(memo(FooterMenu))));
