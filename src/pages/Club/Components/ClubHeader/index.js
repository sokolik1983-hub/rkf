import React from "react";
import {Link} from "react-router-dom";
import Card from "../../../../components/Card";
import {DEFAULT_IMG} from "../../../../appConfig";
import './index.scss';


const ClubHeader = ({clubLogo, clubImg, clubName, federationName, federationAlias, canEdit}) => (
    <Card className="club-page__header">
        {clubImg && <div className="club-page__header-img" style={{backgroundImage: `url(${clubImg})`}} />}
        <div className="club-page__header-content">
            <div className="club-page__header-info">
                <div className="club-page__header-logo" style={{backgroundImage: `url(${clubLogo || DEFAULT_IMG.clubAvatar})`}} />
                <div className="club-page__header-wrap">
                    <h3 className="club-page__header-name">{clubName || 'Название клуба отсутствует'}</h3>
                    {federationName && federationAlias &&
                        <Link to={`/${federationAlias}`} className="club-page__header-federation">{federationName}</Link>
                    }
                </div>
            </div>
            {canEdit &&
                <Link className="btn btn-primary" to="/client">Редактировать профиль</Link>
            }
        </div>
    </Card>
);

export default React.memo(ClubHeader);