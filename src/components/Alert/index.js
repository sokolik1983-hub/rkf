import React, {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import Button from "../Button";
import Cross from "./Cross.js";
import { blockContent } from '../../utils/blockContent';
import "./styles.scss";

const Alert = ({
    title,
    text,
    autoclose,
    okButton,
    onOk
}) => {
    const ref = React.useRef(null);
    const auto = autoclose ? Number(autoclose) === autoclose ? autoclose : 1 : false;
    const [time, setTime] = React.useState(null);
    const [showModal, setShowModal] = useState(true);

    const timer = (f, t) => {
        (time != null) && clearTimeout(time);
        setTime(setTimeout(f, t));
    }
    React.useEffect(() => {!time && auto && onOk && timer(okClick, 500 + auto * 1000)});

    const okClick = () => {
        ref.current && ref.current.classList.add("exit");
        onOk && timer(onOk, 500);
        setShowModal(false);
    }

    useEffect(() => {
        if(showModal) {
            blockContent(true)
        } else {
            blockContent(false)
        }
    }, [showModal])

    return createPortal((
        <div className="Alert__wrap">
            <div className="Alert" ref={ref}>
                <div className="Alert__title">{title}</div>
                <div className="Alert__text">{text}</div>
                {okButton && (<div className="Alert__bt">
                    <Button primary onClick={okClick}>OK</Button>
                </div>)}
                <div className="Alert__cross" onClick={okClick}>
                    <Cross/>
                </div>
            </div>
         </div>
), document.body)
};

export default React.memo(Alert);
