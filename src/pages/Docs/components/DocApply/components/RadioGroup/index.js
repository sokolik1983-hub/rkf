import React, {useState} from "react";
import {FormGroup} from "components/Form";
import {connect, getIn} from "formik";
import "./index.scss";

const RadioButton = ({active}) => <svg viewBox="0 0 64 64">
    <circle className="passive" cx="32" cy="32" r="16" fill="#3366ff" transformorigin="32 32" strokeWidth="0"/>
    <circle cx="32" cy="32" r="28" fill="transparent" stroke="#3366ff" strokeWidth="3"/>
</svg>

const RadioGroup = ({formik, radios, disabled}) => {
    const [active, setActive] = useState((radios && radios.findIndex(i => getIn(formik.values, i.name)))||0);
    return <FormGroup inline className={`${disabled ? 'disabled' : ''}`}>
        {radios && radios.map((radio, i) => <div key={i} onClick={e => {setActive(i);radios.forEach((r,j) => formik.setFieldValue(r.name, i === j))}} className={`FormInput radio ${active === i ? 'active' : ''}`}><RadioButton/>{radio.label}</div>)}
    </FormGroup>
}

export default connect(React.memo(RadioGroup))
