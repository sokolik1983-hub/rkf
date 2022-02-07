import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_IMG } from 'appConfig';
import Card from '../../../../components/Card';
import Alert from '../../../../components/Alert';
import Share from '../../../../components/Share';
import UserActionControls from '../../../../components/UserActionControls';
import { ActiveUserMark, FederationChoiceMark } from '../../../../components/Marks';

import './style.scss';


const UserHeader = ({
                        user,
                        logo,
                        name,
                        alias,
                        profileId,
                        subscribed,
                        member,
                        onSubscriptionUpdate,
                        federationName,
                        federationAlias,
                        active_rkf_user,
                        active_member,
                        isAuthenticated,
                        canEdit
}) => {
    const [shareAlert, setShareAlert] = useState(false);
    const shareOk = () => setShareAlert(false);

    const setUserType = (user, alias) => {
        if (alias === 'rkf' || alias === 'rfss' || alias === 'rfls' || alias === 'rfos' || alias === 'oankoo') {
            return 'Федерация';
        } else if (user === 'nursery') {
            return 'Питомник';
        } else if (user === 'club'){
            return 'Клуб';
        } else {
            return 'Физическое лицо';
        }
    };


    return (
        <Card className="user-header">
            <div className="user-header__logo-wrap">
                <div className="user-header__logo" style={logo
                    ? { backgroundImage: `url(${logo})` }
                    : { backgroundImage: `url(${DEFAULT_IMG.clubAvatar})`, borderRadius: '50%', border: '1px solid #c0d3f9', width: '100px' }} />
            </div>
            <div className="user-header__content">
                <div className="user-header__info">
                    <div className="user-header__wrap">
                        <div>
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
                            {setUserType(user, alias) === "Федерация" && <div className="user-header__federation" />}
                            {federationName
                                && federationAlias
                                && alias !== "rkf"
                                && alias !== "rfss"
                                && alias !== "rfls"
                                && alias !== "rfos"
                                && alias !== "oankoo"
                                && <div className="user-header-link">
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
                            {canEdit &&
                                <Link
                                    to={`/${setUserType(user, alias) === 'Питомник' 
                                        ? "kennel" 
                                        : "client"}/${alias}/edit`}
                                    className="widget-login__button">
                                    Редактировать профиль
                                </Link>
                            }
                            {!canEdit && isAuthenticated &&
                                <>
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
        </Card>
    )
};

export default React.memo(UserHeader);