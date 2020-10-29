import React from "react";
import Share from "../../Share";
import { Link } from "react-router-dom";
import { DEFAULT_IMG } from "../../../appConfig";
import "./index.scss";


const UserInfo = ({ logo_link, share_link, first_name, last_name, alias, userEditPage }) => (
    <>
        <div className="user-info">
            <div className="user-info__logo-wrap">
                <img className="user-info__logo" src={logo_link ? logo_link : DEFAULT_IMG.userAvatar} alt="" />
            </div>
            <div className="user-info__info">
                {share_link ?
                    <div className="user-info__with-share">
                        <p title={first_name || 'Аноним'}>{first_name || 'Аноним'}</p>
                        <Share url={share_link} className={!first_name && !last_name ? `_no_share_name` : ``} />
                    </div> :
                    <p title={first_name || 'Аноним'}>{first_name || 'Аноним'}</p>
                }
                {last_name && <p title={last_name}>{last_name}</p>}
            </div>
        </div>
        {!userEditPage && <Link
            to={`/user/${alias}/edit`}
            className="user-info__edit-btn"
        >Редактировать профиль
        </Link>}
    </>
);

export default React.memo(UserInfo);