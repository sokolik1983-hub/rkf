import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "components/Card";
import Alert from "components/Alert";
import { DEFAULT_IMG } from "appConfig";
import { ActiveUserMark, FederationChoiceMark } from "../../Marks";
import Share from "components/Share";
import UserActions from "components/UserActions";
import "./index.scss";


const UserHeader = ({ user, logo, name, alias, profileId, subscribed, member, onSubscriptionUpdate, federationName, federationAlias, isFederation = false, active_rkf_user, active_member, isAuthenticated, canEdit }) => {
    const [shareAlert, setShareAlert] = useState(false);

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
            <div className="user-header__logo-wrap">
                <div className="user-header__logo" style={logo
                    ? { backgroundImage: `url(${logo})` }
                    : { backgroundImage: `url(${DEFAULT_IMG.clubAvatar})`, borderRadius: '50%', border: '1px solid #c0d3f9', width: '100px' }} />
            </div>
            <div className="user-header__content">
                <hr />
                <div className="user-header__info">
                    <div className="user-header__wrap">
                        <div style={{ width: '100%' }}>
                            <div>
                                <p className="user-header__user">
                                    {setUserType(user, alias)}
                                </p>
                                {active_rkf_user &&
                                    <ActiveUserMark />
                                }
                                {active_member &&
                                    <FederationChoiceMark />
                                }
                            </div>
                            <div className="user-header__container">
                                <h3 className="user-header__name">{name}</h3>
                                <Share />
                            </div>
                            {federationName && federationAlias && alias !== 'rkf' && alias !== 'rfss' && alias !== 'rfls' && alias !== 'rfos' && alias !== 'oankoo' &&
                                <Link to={`/${federationAlias}`} className="user-header__federation">{federationName}</Link>
                            }
                            {
                                !canEdit && isAuthenticated && <>
                                    <hr style={{ margin: '12px 0 0 0' }} />
                                    < UserActions
                                        userType={3}
                                        subscribed_id={profileId}
                                        subscribed={subscribed}
                                        member={member}
                                        onSubscriptionUpdate={onSubscriptionUpdate}
                                    // onSuccess={onSuccess}
                                    // onError={onError}
                                    />
                                </>
                            }
                        </div>
                    </div>
                </div>
                {/*<hr />*/}
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