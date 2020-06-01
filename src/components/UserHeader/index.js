import React, {useState} from "react";
import {Link} from "react-router-dom";
import Card from "../Card";
import Alert from "../Alert";
import {DEFAULT_IMG} from "../../appConfig";
import "./index.scss";


const UserHeader = ({logo, banner, name, federationName, federationAlias, canEdit, editLink}) => {
    const [shareAlert, setShareAlert] = useState(false);

    const share = () => {
        navigator.clipboard.writeText(window.location.href);
        setShareAlert(true);
    };

    const shareOk = () => setShareAlert(false);

    return (
        <Card className="user-header">
            {banner && <div className="user-header__img" style={{backgroundImage: `url(${banner})`}} />}
            <div className="user-header__content">
                <div className="user-header__info">
                    <div className="user-header__logo" style={{backgroundImage: `url(${logo || DEFAULT_IMG.clubAvatar})`}} />
                    <div className="user-header__wrap">
                        <h3 className="user-header__name">{name}</h3>
                        {federationName && federationAlias &&
                            <Link to={`/${federationAlias}`} className="user-header__federation">{federationName}</Link>
                        }
                    </div>
                    <div onClick={share} className="share-mobile">
                        <img width="20" src="/static/icons/icon-share-2.svg" alt=""/>
                    </div>
                </div>
                <button type="button" className="btn btn-primary share-desktop" onClick={share}>Поделиться</button>
                {canEdit &&
                    <Link className="btn btn-primary" to={editLink}>Редактировать профиль</Link>
                }
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