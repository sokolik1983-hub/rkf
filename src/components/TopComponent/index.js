import React, {useState} from "react";
import {Link} from "react-router-dom";
import Card from "../Card";
import Alert from "../Alert";
import {DEFAULT_IMG} from "../../appConfig";
import "./index.scss";


const TopComponent = ({logo, name, canEdit, banner_link}) => {
    const [shareAlert, setShareAlert] = useState(false);

    const share = () => {
        navigator.clipboard.writeText(window.location.href);
        setShareAlert(true);
    };

    return (
        <Card className="top-component">
            {banner_link &&
                <div className="top-component__banner" style={{backgroundImage: `url(${banner_link})`}} />
            }
            <div className="top-component__content">
                <div className="top-component__info">
                    <div style={{backgroundImage: `url(${logo || DEFAULT_IMG.clubAvatar})`}} alt="logo" className="top-component__logo"/>
                    <div className="top-component__title">
                        <h2>{name}</h2>
                    </div>
                    <div onClick={share} className="share-mobile">
                        <img width="20" src="/static/icons/icon-share-2.svg" alt=""/>
                    </div>
                </div>
                <div className="top-component__controls">
                    <button type="button" className="btn__blue share-desktop" onClick={share}>Поделиться</button>
                    {canEdit &&
                    <Link className="btn__blue" to={typeof(canEdit) === "string" ? canEdit : "/client"}>Редактировать</Link>
                    }
                </div>
            </div>
            {shareAlert &&
                <Alert
                    title="Поделиться"
                    text="Ссылка скопирована в буфер обмена"
                    autoclose={1.5}
                    onOk={() => setShareAlert(false)}
                />
            }
        </Card>
    )
};

export default React.memo(TopComponent);
