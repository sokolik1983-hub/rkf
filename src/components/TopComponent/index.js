import React from "react";
import Card from "../Card";
import Alert from "../Alert";
import {DEFAULT_IMG} from "../../appConfig";
import "./index.scss";
import {Link} from "react-router-dom";


const TopComponent = ({alias, logo, name, status, canEdit}) => {
    const [shareAlert, setShareAlert] = React.useState(false);

    const share = () => {
        navigator.clipboard.writeText(window.location.href);
        setShareAlert(true);
    };

    const shareOk = () => setShareAlert(false);

    const download = () => {
        console.log('download click', alias);
    };

    return (
        <Card className="top-component">
            {shareAlert && (<Alert
                title="Поделиться"
                text="Ссылка скопирована в буфер обмена"
                autoclose={1.5}
                onOk={shareOk}
            />)}
            <div className="top-component__info">
                <img src={logo || DEFAULT_IMG.clubAvatar} alt="logo" className="top-component__logo"/>
                <div className="top-component__title">
                    <h2>{name}</h2>
                    <p>{status}</p>
                </div>
            </div>
            <div className="top-component__controls">
                {canEdit ?
                    <Link className="btn__blue" to="/client">Редактировать профиль</Link> :
                    <>
                        <button type="button" className="btn__blue not-active" onClick={share}>Поделиться</button>
                        {/*<button type="button" className="btn__blue not-active">Написать сообщение</button>*/}
                        <button type="button" className="btn__download not-active" onClick={download}/>
                    </>
                }
            </div>
        </Card>
    )
};

export default React.memo(TopComponent);
