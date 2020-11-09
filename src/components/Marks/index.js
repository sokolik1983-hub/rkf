import React from "react";
import LightTooltip from "../LightTooltip";
import "./index.scss";


export const FederationChoiceMark = () => (
    <LightTooltip title="Выбор федерации" enterDelay={200} leaveDelay={200}>
        <img
            className="mark federation-choice-mark"
            src="/static/icons/footprint.svg"
            alt="Выбор федерации"
        />
    </LightTooltip>
);

export const ActiveUserMark = () => (
    <LightTooltip
        title={
            <>
                <p>Для получения статуса "Активный пользователь RKF.Online" профиль должен соответствовать следующим условиям:</p>
                <p>1) Загружен аватар</p>
                <p>2) Загружен баннер</p>
                <p>3) Добавлено не менее 3 новостей</p>
                <p>4) Добавлено не менее 12 фотографий</p>
                <p>5) Описание содержит не менее 100 символов</p>
            </>
        }
        enterDelay={200}
        leaveDelay={200}
    >
        <img
            className="mark active-user-mark"
            src="/static/icons/icon-medal.svg"
            alt="Активный пользователь rkf.online"
        />
    </LightTooltip>
);