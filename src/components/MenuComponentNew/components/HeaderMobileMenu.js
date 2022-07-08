import React, {useEffect, useState} from "react";
import Avatar from "../../Layouts/Avatar";


const HeaderMobileMenu = ({currentPageUserInfo, userType}) => {
    const [linkForName, setLinkForName] = useState('');
    const [name, setName] = useState(null);
    const [headliner, setHeadliner] = useState('');
    const [logoLink, setLogoLink] = useState('');

    const getMeLinkForName = () => {
        switch(currentPageUserInfo?.user_type || userType) {
            case 7:
                setLinkForName(`/nbc/${currentPageUserInfo?.alias}`);
                break;
            case 5:
                setLinkForName(`/${currentPageUserInfo?.club_alias}`);
                break;
            case 4:
                setLinkForName(`/kennel/${currentPageUserInfo?.alias}`);
                break;
            case 3:
                if(currentPageUserInfo?.club_alias === "rkf") {
                    setLinkForName("/rkf")
                } else {
                    setLinkForName(`/club/${currentPageUserInfo?.club_alias}`);
                }
                break;
            case 1:
                setLinkForName(`/user/${currentPageUserInfo?.alias}`);
                break;
            default:
                break;
        }
    };

    const getMeName = () => {
        switch(currentPageUserInfo?.user_type || userType) {
            case 1:
                setName(`${currentPageUserInfo?.personal_information.first_name} ${currentPageUserInfo?.personal_information.last_name}`);
                break;
            case 4:
                setName(`${currentPageUserInfo?.name}`);
                break;
            case 3:
                if(currentPageUserInfo?.club_alias === "rkf") {
                    setName(`${currentPageUserInfo?.federation_name}`);
                } else {
                    setName(`${currentPageUserInfo?.short_name}`);
                }
                break;
            case 5:
                setName(`${currentPageUserInfo?.federation_name}`);
                break;
            case 7:
                setName(`${currentPageUserInfo?.name}`);
                break;
            default:
                break;
        }
    };

    const getMeHeadliner = () => {
        if (currentPageUserInfo?.headliner_link) {
            setHeadliner(currentPageUserInfo.headliner_link);
        } else if(currentPageUserInfo?.club_alias === "rkf") {
            setHeadliner("/static/images/slider/1.jpg");
        } else {
            setHeadliner("/static/images/noimg/no-banner.png");
        }
    };

    const getMeLogoLink = () => {
        if(currentPageUserInfo?.logo_link) {
            setLogoLink(currentPageUserInfo.logo_link);
        } else {
            setLogoLink(null);
        }
    };

    useEffect(() => {
        getMeLogoLink();
        getMeHeadliner();
        getMeName();
        getMeLinkForName();
    }, [currentPageUserInfo]);

    return (
        <>
            <div className="menu-component-new__bg-wrap">
                <img src={headliner} alt="menu-background" />
                <div className="menu-component-new__userpic">
                    <Avatar
                        card="mobile-user-menu"
                        data="mobile-user-menu"
                        logo={logoLink}
                        name={`${name}`}
                        userType={currentPageUserInfo?.user_type === 3 ? 3 : {userType}}
                    />
                </div>
            </div>
            <div className="menu-component-new__alias-name">
                <a href={linkForName}>
                    {name}
                </a>
            </div>
        </>
    );
};

export default HeaderMobileMenu;
