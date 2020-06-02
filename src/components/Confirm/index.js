import React from "react";
import { createPortal } from "react-dom";
import Cross from "./Cross.js";
import Button from "../Button";
import "./styles.scss";

const Confirm = ({
    title,
    text,
    agreeButtonText = "Подтвердить",
    disagreeButtonText = "Отмена",
    agreeFunction,
    disagreeFunction
}) => {
    const ref = React.useRef(null);

    const onDisagreeClick = () => {
        ref.current && ref.current.classList.add("exit");
        disagreeFunction && disagreeFunction();
    }

    const onAgreeClick = () => {
        ref.current && ref.current.classList.add("exit");
        agreeFunction && agreeFunction();
    }

    return createPortal((
        <div className="Confirm" ref={ref}>
            <div>
                <div className="Confirm__title">{title}</div>
                <div className="Confirm__text">{text}</div>
            </div>
            <div className="Confirm__buttons">
                <Button secondary onClick={onDisagreeClick}>{disagreeButtonText}</Button>
                <Button primary onClick={onAgreeClick}>{agreeButtonText}</Button>
            </div>
            <div className="Confirm__cross" onClick={onDisagreeClick}>
                <Cross />
            </div>
        </div>
    ), document.body)
};

export default React.memo(Confirm);
