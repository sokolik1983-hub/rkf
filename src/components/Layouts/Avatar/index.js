import React, {memo, useState} from "react";
import {CSSTransition} from "react-transition-group";
import {SvgIcon} from "@progress/kendo-react-common";
import {pencil, trash} from "@progress/kendo-svg-icons";
import LightTooltip from "../../LightTooltip";
import InitialsAvatar from "../../InitialsAvatar";
import {getInitials} from "../../../utils/getInitials";
import {DEFAULT_IMG} from "../../../appConfig";
import ClientAvatar from "../../ClientAvatar";
import EditAvatar from "../../EditAvatar";
import ModalDeleteAvatar from "../UserInfo/ModalDeleteAvatar";
import {isFederationAlias} from "../../../utils";
import {connectAuthUserInfo} from "../../../pages/Login/connectors";


const Avatar = ({
    user_info,
    alias,
    canEdit,
    card,
    data,
    id,
    logo,
    name,
    open,
    subclass,
    userType
}) => {
    const [hover, setHover] = useState(false);
    const [modalType, setModalType] = useState('');

    const {logo_link} = user_info;
    const logoLink = canEdit ? logo_link : logo;

    switch (data) {
        case 'canEdit':
            return(
                <div className={logoLink ? 'user-info__logo-wrap' : 'user-info__logo-wrap empty'}
                     onMouseEnter={() => setHover(true)}
                     onMouseLeave={() => setHover(false)}
                     onTouchStart={() => {
                         setHover(true);
                         setTimeout(() => setHover(false), 3000);
                     }}
                >
                    {canEdit &&
                        <>
                            <CSSTransition
                                classNames="user-info__transition"
                                in={hover}
                                timeout={350}
                                unmountOnExit
                            >
                                <LightTooltip
                                    title="Редактировать"
                                    enterDelay={200}
                                    leaveDelay={200}
                                >
                                    <button
                                        className="user-info__edit-btn"
                                        type="button"
                                        onClick={() => setModalType('edit')}
                                    >
                                        <SvgIcon icon={pencil} size="default"/>
                                    </button>
                                </LightTooltip>
                            </CSSTransition>
                            {logoLink &&
                                <CSSTransition
                                    classNames="user-info__transition"
                                    in={hover}
                                    timeout={350}
                                    unmountOnExit
                                >
                                    <LightTooltip
                                        title="Удалить"
                                        enterDelay={200}
                                        leaveDelay={200}
                                    >
                                        <button
                                            className="user-info__delete-btn"
                                            type="button"
                                            onClick={() => setModalType('delete')}
                                        >
                                            <SvgIcon icon={trash} size="default"/>
                                        </button>
                                    </LightTooltip>
                                </CSSTransition>
                            }
                        </>
                    }
                    {logoLink ?
                        <img className="user-info__logo" src={logoLink} alt="logo"/>
                        :
                        (userType === 3) ?
                            <img className="user-info__logo" src={DEFAULT_IMG.clubAvatar} alt="logo"/>
                            :
                            isFederationAlias(alias) ?
                                <img className="user-info__logo" src={DEFAULT_IMG.userAvatar} alt="logo"/>
                                :
                                <InitialsAvatar
                                    card={card}
                                    name={name}
                                />
                    }
                    {modalType === 'edit' &&
                        <EditAvatar
                            setModalType={setModalType}
                            pageBanner={false}
                        />
                    }
                    {modalType === 'delete' &&
                        <ModalDeleteAvatar
                            closeModal={() => setModalType('')}
                            pageBanner={false}
                        />
                    }
                </div>
            );

        case 'logo':
            return logoLink ?
                <div className={`widget-login__${subclass}${open ? ' _active' : ''}`}
                     style={{backgroundImage: `url(${logoLink})`}}
                />
                :
                (userType === 1 || userType === 4 || userType === 7) ?
                    <div className={`widget-login__${subclass}${open ? ' _active' : ''}`}>
                        <InitialsAvatar
                            card={card}
                            name={userType === 1 ? getInitials(name) : name}
                        />
                    </div>
                    :
                    <div className={`widget-login__${subclass} ${open && ' _active'}`}
                         style={{backgroundImage: `url(${DEFAULT_IMG.clubAvatar})`}}
                    />

        case 'nkp':
            return logoLink ?
                <span className="card-organization__logo"
                      style={{backgroundImage: `url(${logoLink})`}}
                />
                :
                <InitialsAvatar
                    id={id}
                    card={card}
                    name={name}
                />

        case 'organization':
            return logoLink ?
                <img src={logoLink} alt="logo"/>
                :
                (userType === 3 || userType === 5) ?
                    <img src={DEFAULT_IMG.clubAvatar} alt="logo"/>
                    :
                    <InitialsAvatar
                        id={id}
                        card={card}
                        name={name}
                    />

        case 'header':
            return logoLink ?
                <img src={logoLink} className={subclass} alt="logo" />
                :
                <InitialsAvatar
                    card={card}
                    name={name}
                />

        case 'article':
            return logoLink && logoLink !== "/static/icons/default/default_avatar.svg" ?
                <ClientAvatar
                    size={40}
                    avatar={logoLink}
                />
                :
                (userType === 4 || userType === 1 || userType === 7) ?
                    <InitialsAvatar
                        card={card}
                        name={name}
                    />
                    :
                    <ClientAvatar
                        size={40}
                        avatar={"/static/icons/default/club-avatar-new.png"}
                    />

        case 'mobile-user-menu':
            return logoLink ?
                <img src={logoLink} alt="menu-logo" />
                :
                userType === 3 ?
                    <img src={'/static/icons/default/club-avatar.svg'} alt="menu-logo" />
                    :
                    <InitialsAvatar
                        card={card}
                        name={name}
                    />

        case 'cardnewsnew':
            return logoLink ?
                <div className="card-news-new__left-logo"
                     style={{background: `url(${logoLink}) center center/cover no-repeat`}}
                />
                :
                (userType === 1 || userType === 4 || userType === 7) ?
                    <div className="card-news-new__left-logo">
                        <InitialsAvatar
                            card={card}
                            name={name}
                        />
                    </div>
                    :
                    <div className="card-news-new__left-logo"
                         style={{background: `url(${DEFAULT_IMG.clubAvatar}) center center/cover no-repeat`}}
                    />

        case 'nursery-docs':
            return logoLink || userType === 3 || !userType ?
                <div className="top-component__logo"
                     style={{backgroundImage: `url(${logoLink || DEFAULT_IMG.clubAvatar})`}}
                />
                :
                <InitialsAvatar
                    card={card}
                    name={name}
                />

        case 'specialist-card':
            return logoLink ?
                <span className="card-specialists__photo"
                      style={{backgroundImage: `url(${logoLink})`}}
                />
                :
                <InitialsAvatar
                    id={id}
                    card={card}
                    name={name}
                />

        default:
            return(
                <InitialsAvatar
                    id={id}
                    card={card}
                    name={name}
                />
            );
    }
};

export default memo(connectAuthUserInfo(Avatar));