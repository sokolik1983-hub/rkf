import React from "react";
import Card from "../Card";
import Alert from "../Alert";
import {DEFAULT_IMG} from "../../appConfig";
import "./index.scss";
import {Link} from "react-router-dom";


const TopComponent = ({alias, logo, name, status, canEdit}) => {
    const share = () => {
        console.log('share click', alias);
    };

    const write = () => {
        console.log('write click', alias);
    };

    const download = () => {
        console.log('download click', alias);
    };

    return (
        <Card className="top-component">
            <Alert/>
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
                        <button type="button" className="btn__blue not-active" onClick={write}>Написать сообщение</button>
                        <button type="button" className="btn__download not-active" onClick={download}/>
                    </>
                }
            </div>
        </Card>
    )
};

export default React.memo(TopComponent);
