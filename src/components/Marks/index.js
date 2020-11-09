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
        title='Для получения статуса "Активный пользователь RKF.Online" профиль должен соответствовать следующим условиям:
               1) Загружен аватар
               2) Загружен баннер
               3) Добавлено не менее 3 новостей
               4) Добавлено не менее 12 фотографий
               5) Описание содержит не менее 100 символов'
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