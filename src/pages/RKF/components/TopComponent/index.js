import React from "react";
import Card from "../../../../components/Card";
import "./index.scss";


const TopComponent = () => {

    const share = () => {
        console.log('share click');
    };

    const write = () => {
        console.log('write click');
    };

    const download = () => {
        console.log('download click');
    };

    return (
        <Card className="rkf-page__top top-component">
            <div className="top-component__info">
                <img src="/static/images/header/rkf-logo-transparent.svg" alt="logo" className="top-component__logo"/>
                <div className="top-component__title">
                    <h2>Российская Кинологическая Федерация</h2>
                    <p>текущий статус</p>
                </div>
            </div>
            <div className="top-component__controls">
                <button type="button" className="btn__blue not-active" onClick={share}>Поделиться</button>
                <button type="button" className="btn__blue not-active" onClick={write}>Написать сообщение</button>
                <button type="button" className="btn__download not-active" onClick={download}/>
            </div>
        </Card>
    )
};

export default React.memo(TopComponent);