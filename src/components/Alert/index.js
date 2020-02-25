import React from "react";
import {createPortal} from "react-dom";
import Button from "../Button";
import "./styles.scss";

const Alert = ({
    title,
    text,
    autoclose,
    okbt
}) => createPortal((
    <div className="Alert">
        <div className="Alert__title">Поделиться</div>
        <div className="Alert__text">Ссылка скопирована в буфер обмена</div>
        <div className="Alert__bt">
            <Button>OK</Button>
        </div>
    </div>
), document.querySelector("body"));

export default React.memo(Alert);
