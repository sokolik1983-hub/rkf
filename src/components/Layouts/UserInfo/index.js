import React from "react";
import Share from "../../Share";
import {DEFAULT_IMG} from "../../../appConfig";
import "./index.scss";


const UserInfo = ({logo_link, share_link, first_name, second_name, last_name}) => (
    <div className="user-info">
        <div className="user-info__logo-wrap">
            <div
                className="user-info__logo"
                style={logo_link ?
                    {backgroundImage: `url(${logo_link})`} :
                    {backgroundImage: `url(${DEFAULT_IMG.userAvatar})`, width: '100px', minWidth: '100px'}
                }
            />
        </div>
        <div className="user-info__info">
            {last_name && <p title={last_name}>{last_name}</p>}
            {share_link ?
                <div className="user-info__with-share">
                    <p title={first_name || 'Аноним'}>{first_name || 'Аноним'}</p>
                    <Share url={share_link}/>
                </div> :
                <p title={first_name || 'Аноним'}>{first_name || 'Аноним'}</p>
            }
            {second_name && <p title={second_name}>{second_name}</p>}
        </div>
    </div>
);

export default React.memo(UserInfo);