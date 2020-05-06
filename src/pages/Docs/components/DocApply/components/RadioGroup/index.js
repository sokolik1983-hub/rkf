import React, {useState} from "react";
import {connect, getIn} from "formik";
import "./index.scss";

const RadioButton = ({active}) => <svg viewBox="0 0 64 64">
    <circle className="passive" cx="32" cy="32" r="16" fill="#3366ff" transformorigin="32 32" strokeWidth="0"/>
    <circle cx="32" cy="32" r="28" fill="transparent" stroke="#3366ff" strokeWidth="3"/>
</svg>

const RadioGroup = ({formik, radios}) => {
    const [active, setActive] = useState((radios && radios.findIndex(i => getIn(formik.values, i.name)))||0);
    return <div className="FormInput">
        {radios && radios.map((radio, i) => <p key={i} onClick={e => setActive(i)} className={`radio ${active === i ? 'active' : ''}`}><RadioButton/>{radio.label}</p>)}
    </div>
}

export default connect(React.memo(RadioGroup))
