import React from "react";
import {DEFAULT_IMG} from "../../../../appConfig";
import "./index.scss";


const UserInfo = ({logo_link, personal_information}) => (
    <div className="user-info">
        <div className="user-info__logo-wrap">
            <div
                className="user-info__logo"
                style={logo_link ?
                    {backgroundImage: `url(${logo_link})`} :
                    {backgroundImage: `url(${DEFAULT_IMG.clubAvatar})`, borderRadius: '50%', border: '1px solid #c0d3f9', width: '100px'}
                }
            />
        </div>
        <div className="user-info__info">
            {personal_information && !!Object.keys(personal_information).length ?
                <>
                    {personal_information.last_name && <p title={personal_information.last_name}>{personal_information.last_name}</p>}
                    {personal_information.first_name && <p title={personal_information.first_name}>{personal_information.first_name}</p>}
                    {personal_information.second_name && <p title={personal_information.second_name}>{personal_information.second_name}</p>}
                </> :
                <p>Аноним</p>
            }
        </div>
    </div>
);

export default React.memo(UserInfo);