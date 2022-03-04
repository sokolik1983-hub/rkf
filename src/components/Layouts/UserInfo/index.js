import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SvgIcon } from '@progress/kendo-react-common';
import { pencil, trash } from '@progress/kendo-svg-icons';
import { CSSTransition } from 'react-transition-group';
import Share from '../../Share';
import ModalDeleteAvatar from './ModalDeleteAvatar';
import { DEFAULT_IMG } from '../../../appConfig';
import LightTooltip from '../../LightTooltip';
import UserActionControls from 'components/UserActionControls';
import { connectAuthVisible } from 'pages/Login/connectors';
import EditAvatar from '../../EditAvatar';
import { judgeIcon } from '../UserLayout/config.js';

import './index.scss';

const UserInfo = ({
    isAuthenticated,
    logo_link,
    share_link,
    first_name,
    last_name,
    canEdit,
    updateInfo,
    alias,
    subscribed_id,
    subscribed,
    onSubscriptionUpdate,
    onSuccess,
    onError,
    judgeInfo,
}) => {
    const [hover, setHover] = useState(false);
    const [modalType, setModalType] = useState('');

    return (
        <>
            <div className="user-info">
                <div
                    className={logo_link ? 'user-info__logo-wrap' : 'user-info__logo-wrap empty'}
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
                                <LightTooltip title="Редактировать" enterDelay={200} leaveDelay={200}>
                                    <button
                                        className="user-info__edit-btn"
                                        type="button"
                                        onClick={() => setModalType('edit')}
                                    >
                                        <SvgIcon icon={pencil} size="default" />
                                    </button>
                                </LightTooltip>
                            </CSSTransition>
                            {logo_link &&
                                <CSSTransition
                                    in={hover}
                                    timeout={350}
                                    classNames="user-info__transition"
                                    unmountOnExit
                                >
                                    <LightTooltip title="Удалить" enterDelay={200} leaveDelay={200}>
                                        <button
                                            className="user-info__delete-btn"
                                            type="button"
                                            onClick={() => setModalType('delete')}
                                        >
                                            <SvgIcon icon={trash} size="default" />
                                        </button>
                                    </LightTooltip>
                                </CSSTransition>
                            }
                        </>
                    }
                    <img className="user-info__logo" src={logo_link ? logo_link : DEFAULT_IMG.userAvatar} alt="" />
                </div>
                <div className="user-info__info">
                    {share_link 
                        ?
                            <div className="user-info__with-share" >
                                <p title={first_name || 'Аноним'}>{first_name || 'Аноним'}</p>
                                <Share url={share_link} 
                                        className={!first_name && !last_name 
                                                        ? `_no_share_name` 
                                                        : ``
                                                    } 
                                />
                            </div> 
                        :
                        <p title={first_name || 'Аноним'}>{first_name || 'Аноним'}</p>
                    }
                    {last_name && <p title={last_name}>{last_name}</p>}
                    {!!judgeInfo?.length && judgeIcon}
                </div>
            </div>
            {
                canEdit
                    ? <Link to={`/user/${alias}/edit`} className="user-info__edit-profile">Редактировать профиль</Link>
                    : isAuthenticated && <UserActionControls
                        userType={1}
                        subscribed_id={subscribed_id}
                        subscribed={subscribed}
                        onSubscriptionUpdate={onSubscriptionUpdate}
                        onSuccess={onSuccess}
                        onError={onError}
                    />
            }
            {modalType === 'edit' && <EditAvatar
                setModalType={setModalType}
                avatar={logo_link}
                pageBanner={false}
            />}
            {modalType === 'delete' &&
                    <ModalDeleteAvatar closeModal={() => setModalType('')} updateInfo={updateInfo} pageBanner={false} />
            }
        </>
    )
};

export default React.memo(connectAuthVisible(UserInfo));