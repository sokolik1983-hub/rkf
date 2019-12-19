import React from "react";
import {Link} from "react-router-dom";
import Card from "../../../../components/Card";
import {DEFAULT_IMG} from "../../../../appConfig";
import {connectAuthVisible} from "../../../../apps/Auth/connectors";
import './index.scss';


const ClubHeader = ({clubLogo, clubImg, clubName, clubId, profile_id, isAuthenticated}) => (
    <Card className="club-page__header">
        {clubImg && <div className="club-page__header-img" style={{backgroundImage: `url(${clubImg})`}} />}
        <div className="club-page__header-content">
            <div className="club-page__header-info">
                <div className="club-page__header-logo" style={{backgroundImage: `url(${clubLogo ? clubLogo : DEFAULT_IMG.clubAvatar})`}} />
                <h3 className="club-page__header-name">{clubName}</h3>
            </div>
            {isAuthenticated && profile_id && profile_id === clubId &&
                <Link className="btn btn-primary" to="/client">Редактировать профиль</Link>
            }
        </div>
    </Card>
);

export default React.memo(connectAuthVisible(ClubHeader));