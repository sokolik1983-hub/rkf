import React from "react";
import {Link} from "react-router-dom";
import {judgeIcon} from "../UserLayout/config.js";
import Avatar from "../Avatar";
import Share from "../../Share";
import UserActionControls from "../../../components/UserActionControls";
import {connectAuthVisible} from "../../../pages/Login/connectors";
import useIsMobile from "../../../utils/useIsMobile";

import "./index.scss";


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

    return (
        <>
            <div className="user-info">
                <Avatar
                    canEdit={canEdit}
                    card="profile"
                    data="canEdit"
                    logo={logo_link}
                    name={`${first_name} ${last_name}`}
                    updateInfo={updateInfo}
                />
                <div className="user-info__info">
                    {share_link 
                        ?
                            <div className="user-info__with-share" >
                                <div className="user-info__name-wrap">
                                    <p>
                                        <span>{first_name || 'Аноним'}&nbsp;</span>
                                        <span>{last_name ? last_name : ''}</span>
                                    </p>
                                    {(!!judgeInfo?.length && judgeInfo[0].description !== null) && judgeIcon}
                                </div>
                                <Share url={share_link}
                                        className={!first_name && !last_name
                                                        ? '_no_share_name'
                                                        : ''
                                                    }
                                />
                            </div> 
                        :
                        <p title={first_name || 'Аноним'}>{first_name || 'Аноним'}</p>
                    }
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
        </>
    )
};

export default React.memo(connectAuthVisible(UserInfo));