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
    <LightTooltip title="Активный пользователь rkf.online" enterDelay={200} leaveDelay={200}>
        <img
            className="mark active-user-mark"
            src="/static/icons/icon-medal.svg"
            alt="Активный пользователь rkf.online"
        />
    </LightTooltip>
);