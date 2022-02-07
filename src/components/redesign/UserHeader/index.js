import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "components/Card";
import Alert from "components/Alert";
import { DEFAULT_IMG } from "appConfig";
import { ActiveUserMark, FederationChoiceMark } from "../../Marks";
import Share from "components/Share";
import UserActionControls from "components/UserActionControls";
import { CSSTransition } from "react-transition-group";
import LightTooltip from "../../LightTooltip";
import { SvgIcon } from "@progress/kendo-react-common";
import { pencil, trash } from "@progress/kendo-svg-icons";
import EditAvatar from "../../EditAvatar";
import ModalDeleteAvatar from "../../Layouts/UserInfo/ModalDeleteAvatar";

import "./index.scss";


const UserHeader = ({ user, logo, name, alias, profileId, subscribed, member, onSubscriptionUpdate, federationName, federationAlias, isFederation = false, active_rkf_user, active_member, isAuthenticated, canEdit }) => {

    const [shareAlert, setShareAlert] = useState(false);
    const [modalType, setModalType] = useState('');
    const [hover, setHover] = useState(false);
    const shareOk = () => setShareAlert(false);

    const setUserType = (user, alias) => {
        if (alias === 'rkf' || alias === 'rfss' || alias === 'rfls' || alias === 'rfos' || alias === 'oankoo') {
            return 'Федерация';
        } else if (user === 'nursery') {
            return 'Питомник';
        } else {
            return 'Клуб';
        }
    };
    return (
        <Card className="user-header">
            <div
                className={logo ? "user-info__logo-wrap" : "user-info__logo-wrap empty"}
                onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            >
                {canEdit &&
                    <>
                        <CSSTransition
                            in={hover}
                            timeout={350}
                            classNames="user-info__transition"
                            unmountOnExit
                        >
                            <LightTooltip
                                title="Редактировать"
                                enterDelay={200}
                                leaveDelay={200}>
                                <button
                                    className="user-info__edit-btn"
                                    type="button"
                                    onClick={() => setModalType('edit')}
                                >
                                    <SvgIcon icon={pencil} size="default" />
                                </button>
                            </LightTooltip>
                        </CSSTransition>
                        {logo &&
                            <CSSTransition
                                in={hover}
                                timeout={350}
                                classNames="user-info__transition"
                                unmountOnExit
                            >
                                <LightTooltip
                                    title="Удалить"
                                    enterDelay={200}
                                    leaveDelay={200}>
                                    <button
                                        className="user-info__delete-btn"
                                        type="button"
                                        onClick={() => setModalType("delete")}
                                    >
                                        <SvgIcon icon={trash} size="default" />
                                    </button>
                                </LightTooltip>
                            </CSSTransition>
                        }
                    </>
                }
                <img className="user-info__logo" src={logo ? logo : DEFAULT_IMG.userAvatar} alt="" />
            </div>
            <div className="user-header__content">
                <div className="user-header__info">
                    <div className="user-header__wrap">
                        <div style={{ width: '100%' }}>
                            <div className="user-header__user-wrap">
                                <p className="user-header__user">
                                    {setUserType(user, alias)}
                                </p>
                                <div className= "user-header__user">
                                {active_rkf_user &&
                                    <ActiveUserMark />
                                }
                                {active_member &&
                                    <FederationChoiceMark />
                                }
                                </div>
                            </div>
                            <div className="user-header__container">
                                <h3 className="user-header__name">{name}</h3>
                                <Share />
                            </div>
                            {setUserType(user, alias) === 'Федерация' && <div className="user-header__federation" style={{paddingTop: 0}}/>}
                            {federationName && federationAlias && alias !== 'rkf' && alias !== 'rfss' && alias !== 'rfls' && alias !== 'rfos' && alias !== 'oankoo' &&
                                <div className='user-header-link'>
                                <Link to={`/${federationAlias}`}
                                        className={name.length > 50
                                                        ? "user-header__federation long-bottom" 
                                                        : name.length > 30 
                                                        ? "user-header__federation middle-bottom" 
                                                        : "user-header__federation"}>
                                            {federationName}
                                </Link>
                                </div>
                            }
                            {
                                canEdit &&
                                <Link
                                    to={`/${setUserType(user, alias) === 'Питомник' ? "kennel" : "client"}/${alias}/edit`}
                                    className="widget-login__button"
                                    style={{marginTop: "20px"}}>
                                    Редактировать профиль
                                </Link>
                            }
                            {
                                !canEdit && isAuthenticated && <>
                                    <UserActionControls
                                        userType={3}
                                        subscribed_id={profileId}
                                        subscribed={subscribed}
                                        member={member}
                                        onSubscriptionUpdate={onSubscriptionUpdate}
                                    />
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {shareAlert &&
                <Alert
                    title="Поделиться"
                    text="Ссылка скопирована в буфер обмена"
                    autoclose={1.5}
                    onOk={shareOk}
                />
            }
            {modalType === "edit" &&
                <EditAvatar
                setModalType={setModalType}
                avatar={logo}
                />}
            {modalType === "delete" &&
                <ModalDeleteAvatar
                    closeModal={() => setModalType("")}
                />}
        </Card>
    )
};

export default React.memo(UserHeader);