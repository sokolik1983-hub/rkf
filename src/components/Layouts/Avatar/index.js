import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { SvgIcon } from "@progress/kendo-react-common";
import { pencil, trash } from "@progress/kendo-svg-icons";
import LightTooltip from "../../LightTooltip";
import InitialsAvatar from "../../InitialsAvatar";
import { getInitials } from "../../../utils/getInitials";
import { DEFAULT_IMG } from "../../../appConfig";
import ClientAvatar from "../../ClientAvatar";
import EditAvatar from "../../EditAvatar";
import ModalDeleteAvatar from "../UserInfo/ModalDeleteAvatar";
import { isFederationAlias } from "../../../utils";


const Avatar = ({
    alias,
    avatarName,
    canEdit,
    card,
    currentPageUserInfo,
    data,
    id,
    logo,
    name,
    open,
    subclass,
    updateInfo,
    user,
    userType,
    user_type,
}) => {

const [hover, setHover] = useState(false);
const [modalType, setModalType] = useState('');

    switch (data) {
        case 'canEdit':
            return(
                <div className={logo ? 'user-info__logo-wrap' : 'user-info__logo-wrap empty'}
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
                            {logo &&
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
                    {logo ?
                        <img className="user-info__logo" src={logo} alt="logo"/>
                        :
                        (user === 'club') ?
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
                            avatar={logo}
                            pageBanner={false}
                        />
                    }
                    {modalType === 'delete' &&
                        <ModalDeleteAvatar
                            closeModal={() => setModalType('')}
                            updateInfo={updateInfo}
                            pageBanner={false}
                        />
                    }
                </div>
            );

        case 'logo':
            return(
                <>
                    {logo ?
                        <div className={`widget-login__${subclass} ${open && ' _active'}`}
                             style={{backgroundImage: `url(${logo})`}}
                        />
                        :
                        (user_type === 1 || user_type === 4) ?
                            <div className={`widget-login__${subclass} ${open && ' _active'}`}>
                                <InitialsAvatar
                                    card={card}
                                    name={user_type === 1 ? getInitials(name) : name}
                                />
                            </div>
                            :
                            <div className={`widget-login__${subclass} ${open && ' _active'}`}
                                 style={{backgroundImage: `url(${DEFAULT_IMG.clubAvatar})`}}
                            />
                    }
                </>
            );

        case 'nkp':
            return(
                <>
                    {logo ?
                        <span className="card-organization__logo"
                              style={{ backgroundImage: `url(${ logo || DEFAULT_IMG.clubAvatar })`}}
                        />
                        :
                        <InitialsAvatar
                            id={id}
                            card={card}
                            name={name}
                        />
                    }
                </>
            );

        case 'organization':
            return(
                <>
                    {(user_type === 3 || user_type === 5) ?
                        <img src={logo || DEFAULT_IMG.clubAvatar} alt="logo"/>
                        :
                        logo ?
                            <img src={logo} alt="logo"/>
                            :
                            <InitialsAvatar
                                id={id}
                                card={card}
                                name={name}
                            />
                    }
                </>
            );

        case 'header':
            return(
                <>
                    {logo ?
                        <img src={logo} className={subclass} alt="logo" />
                        :
                        <InitialsAvatar
                            card={card}
                            name={name}
                        />
                    }
                </>
            );

        case 'headerRedesign':
            return(
                <>
                    {logo ?
                        <img className="user-info__logo" src={logo} alt=""/>
                        :
                        (user === 'nursery') ?
                            <InitialsAvatar
                                card={card}
                                name={name}
                            />
                            :
                            (user === 'club') ?
                                <img className="user-info__logo" src={DEFAULT_IMG.clubAvatar} alt=""/>
                                :
                                <img className="user-info__logo" src={DEFAULT_IMG.userAvatar} alt=""/>
                    }
                </>
            );

        case 'article':
            return(
                <>
                    {logo && logo !== "/static/icons/default/default_avatar.svg" ?
                        <ClientAvatar
                            size={40}
                            avatar={logo}
                        />
                        :
                        (userType === 4 || userType === 1) ?
                            <InitialsAvatar
                                card={card}
                                name={name}
                            />
                            :
                            <ClientAvatar
                                size={40}
                                avatar={"/static/icons/default/club-avatar-new.png"}
                            />
                    }
                </>
            );

        case 'mobile-user-menu':
            return(
                <>
                    {logo ?
                        <img src={logo} alt="menu-logo" />
                        :
                        (currentPageUserInfo?.user_type === 3 || userType === 3) ?
                            <img src={'/static/icons/default/club-avatar.svg'} alt="menu-logo" />
                            :
                            <InitialsAvatar
                                card={card}
                                name={name}
                            />
                    }
                </>
            );

        case 'cardnewsnew':
            return(
                <>
                    {logo ?
                        <div className="card-news-new__left-logo"
                             style={{background: `url(${logo}) center center/cover no-repeat`}}
                        />
                        :
                        (user_type === 1 || user_type === 4) ?
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
                    }
                </>
            );

        case 'nursery-docs':
            return(
                <>
                    {userType === 4 ?
                        <InitialsAvatar
                            card={card}
                            name={name}
                        />
                        :
                        <div style={{ backgroundImage: `url(${logo || DEFAULT_IMG.clubAvatar})` }}
                             className="top-component__logo"
                        />
                    }
                </>
            );

        case 'specialist-card':
            return(
                <>
                    {logo
                        ?
                        <span className="card-specialists__photo"
                              to={logo}
                              style={{ backgroundImage: `url(${logo})` }}
                        />
                        :
                        <InitialsAvatar
                            id={id}
                            card={card}
                            name={name}
                        />
                    }
                </>
            );

        default:
            return(
                <InitialsAvatar
                    id={id}
                    card={card}
                    name={avatarName}
                />
            );
    }
};

export default Avatar;
