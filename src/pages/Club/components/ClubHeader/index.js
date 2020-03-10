import React, {useState} from "react";
import {Link} from "react-router-dom";
import Card from "../../../../components/Card";
import Alert from "../../../../components/Alert";
import {DEFAULT_IMG} from "../../../../appConfig";
import './index.scss';


const ClubHeader = ({clubLogo, clubImg, clubName, federationName, federationAlias, canEdit}) => {
    const [shareAlert, setShareAlert] = useState(false);

    const share = () => {
        navigator.clipboard.writeText(window.location.href);
        setShareAlert(true);
    };

    const shareOk = () => setShareAlert(false);

    return (
        <Card className="club-page__header">
            {shareAlert && (<Alert
                title="Поделиться"
                text="Ссылка скопирована в буфер обмена"
                autoclose={1.5}
                onOk={shareOk}
            />)}
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
                    <div onClick={share} className="share-mobile">
                        <img width="20" src="/static/icons/icon-share-2.svg" alt=""/>
                    </div>
                </div>
                <button type="button" className="btn btn-primary share-desktop" onClick={share}>Поделиться</button>
                {canEdit &&
                    <Link className="btn btn-primary" to="/client">Редактировать профиль</Link>
                }
            </div>
        </Card>
    )
};

export default React.memo(ClubHeader);
