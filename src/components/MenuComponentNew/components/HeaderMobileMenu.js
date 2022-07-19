import React, {memo} from "react";
import {Link} from "react-router-dom";
import Avatar from "../../Layouts/Avatar";


const HeaderMobileMenu = ({currentPageUserInfo, userType}) => {

    console.log('currentPageUserInfo', currentPageUserInfo);

    const getLinkForName = () => {
        switch(currentPageUserInfo?.user_type || userType) {
            case 7:
                return `/nbc/${currentPageUserInfo?.alias}`;
            case 5:
                return `/${currentPageUserInfo?.club_alias}`;
            case 4:
                return `/kennel/${currentPageUserInfo?.alias}`;
            case 3:
                if(currentPageUserInfo?.club_alias === 'rkf') {
                    return '/rkf';
                }

                return `/club/${currentPageUserInfo?.club_alias}`;
            case 1:
                return `/user/${currentPageUserInfo?.alias}`;
            default:
                return '';
        }
    };

    const getName = () => {
        switch(currentPageUserInfo?.user_type || userType) {
            case 1:
                return `${currentPageUserInfo?.personal_information.first_name} ${currentPageUserInfo?.personal_information.last_name}`;
            case 4:
                return `${currentPageUserInfo?.name}`;
            case 3:
                if(currentPageUserInfo?.club_alias === "rkf") {
                    return `${currentPageUserInfo?.federation_name}`;
                }

                return `${currentPageUserInfo?.short_name}`;
            case 5:
                return `${currentPageUserInfo?.federation_name}`;
            case 7:
                return `${currentPageUserInfo?.name}`;
            default:
                return '';
        }
    };

    const getHeadlinerLink = () => {
        if(currentPageUserInfo?.headliner_link) {
            return currentPageUserInfo.headliner_link;
        } else if(currentPageUserInfo?.club_alias === 'rkf') {
            return '/static/images/slider/1.jpg';
        }

        return '/static/images/noimg/no-banner.png';
    };

    const getLogoLink = () => {
        if(currentPageUserInfo?.logo_link) {
            return currentPageUserInfo.logo_link;
        }

        return '';
    };

    return (
        <>
            <div className="menu-component-new__bg-wrap">
                <img src={getHeadlinerLink()} alt="menu-background" />
                <div className="menu-component-new__userpic">
                    <Avatar
                        card="mobile-user-menu"
                        data="mobile-user-menu"
                        logo={getLogoLink()}
                        name={getName()}
                        userType={currentPageUserInfo?.user_type === 3 ? 3 : {userType}}
                    />
                </div>
            </div>
            <div className="menu-component-new__alias-name">
                <Link to={getLinkForName}>
                    {getName()}
                </Link>
            </div>
        </>
    );
};

export default memo(HeaderMobileMenu);
