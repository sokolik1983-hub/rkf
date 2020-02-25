import React from "react";
import {createPortal} from "react-dom";
import Button from "../Button";
import "./styles.scss";

const {log} = console;

const Alert = ({
    title,
    text,
    autoclose,
    okbt
}) => createPortal((
    <div className="Alert">
        <div className="Alert__title">Поделиться</div>
        <div className="Alert__text">Ссылка скопирована в буфер обмена</div>
        {okbt && (<div className="Alert__bt">
            <Button primary>OK</Button>
        </div>)}
        <div className="Alert__cross">
            <svg width="10.5" height="10.5" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75 1.8075L4.9425 6L0.75 10.1925L1.8075 11.25L6 7.0575L10.1925 11.25L11.25 10.1925L7.0575 6L11.25 1.8075Z" fill="#90999E"/>
            </svg>
        </div>
    </div>
), document.body);

export default React.memo(Alert);
