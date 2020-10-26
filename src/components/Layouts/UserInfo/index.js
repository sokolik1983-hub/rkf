import React from "react";
import Share from "../../Share";
import { DEFAULT_IMG } from "../../../appConfig";
import "./index.scss";


const UserInfo = ({ logo_link, share_link, first_name, last_name }) => (
    <div className="user-info">
        <div className="user-info__logo-wrap">
            <img className="user-info__logo" src={logo_link ? logo_link : DEFAULT_IMG.userAvatar} alt="" />
        </div>
        <div className="user-info__info">
            {share_link ?
                <div className="user-info__with-share">
                    <p title={first_name || 'Аноним'}>{first_name || 'Аноним'}</p>
                    <Share url={share_link} />
                </div> :
                <p title={first_name || 'Аноним'}>{first_name || 'Аноним'}</p>
            }
            {last_name && <p title={last_name}>{last_name}</p>}
        </div>
    </div>
);

export default React.memo(UserInfo);