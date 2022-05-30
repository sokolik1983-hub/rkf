import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Card from '../../../../components/Card';
import Share from '../../../../components/Share';
import Alert from '../../../../components/Alert';
import UserActionControls from '../../../../components/UserActionControls';
import {ActiveUserMark, FederationChoiceMark} from '../../../../components/Marks';

import './style.scss';


const UserHeader = ({
        logo,
        user,
        name,
        alias,
        member,
        canEdit,
        profileId,
        subscribed,
        active_member,
        federationName,
        active_rkf_user,
        isAuthenticated,
        federationAlias,
        onSubscriptionUpdate,
        isFederation = false
}) => {
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
                <img className="user-header__logo" src={logo} alt=""/>
            </div>
            <div className="user-header__content">
                <div className="user-header__info">
                    <div className="user-header__wrap">
                        <div className="user-header__inner">
                            <section
                                className={`user-header__name-wrap${setUserType(user, alias) === 'Федерация' && canEdit ? ' _editable' : ''}`}>
                                <div className="user-header__user-wrap">
                                    {setUserType(user, alias) === 'Федерация' &&
                                        <div className="user-header__federation"/>}
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
                                    <div className="user-header__container">
                                        <h3 className="user-header__name">{name}</h3>
                                        <Share/>
                                    </div>
                                    <div className="user-header__user-org">
                                        <p className="user-header__user">
                                            {setUserType(user, alias)}
                                        </p>
                                        <div className="user-header__user">
                                            {active_rkf_user &&
                                                <ActiveUserMark/>
                                            }
                                            {active_member &&
                                                <FederationChoiceMark/>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {
                                canEdit &&
                                <div className="widget-login__button-wrap">
                                    <Link
                                        to={`/${
                                            setUserType(user, alias) === 'Питомник' ?
                                                'kennel' :
                                                setUserType(user, alias) === 'НКП' ?
                                                    'nbc' : 'client'
                                        }/${alias}/edit`
                                        }
                                        className="widget-login__button"
                                    >
                                        Редактировать профиль
                                    </Link>
                                </div>
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
        </Card>
    )
};

export default React.memo(UserHeader);