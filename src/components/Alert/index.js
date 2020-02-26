import React from "react";
import {createPortal} from "react-dom";
import Button from "../Button";
import Cross from "./Cross.js";
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
    const timer = (f, t) => {
        (time != null) && clearTimeout(time);
        setTime(setTimeout(f, t));
    }
    React.useEffect(() => {!time && auto && onOk && timer(okClick, 500 + auto * 1000)});
    
    const okClick = () => {
        ref.current && ref.current.classList.add("exit");
        onOk && timer(onOk, 500);
    }

    return createPortal((
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
), document.body)
};

export default React.memo(Alert);
