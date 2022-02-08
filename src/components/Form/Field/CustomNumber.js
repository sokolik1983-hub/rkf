import React, {useEffect} from 'react';
import { connect, getIn, Field } from 'formik';
import Error from './Error';
import Label from './Label';

const CustomNumber = (props) => {
    const {formik, name, maxLength, cName} = props;

    const handleChange = ({ target }) => {
        formik.setFieldValue(name, target.value.replace(/\D/g, ''));
    }
    const errorFounder = () => {

    }

    return (
        // <div className={`FormInput${cName ? cName : formik.errors[name] ? ' FormInput--error'  : ''}`}>
        //
        <div className={`FormInput${cName && cName} ${document.querySelector('.BuySell .ArticleCreateForm__input-cost_new .FormInput__error') && formik.errors[name] ? ' FormInput--error'  : ''}`}>
        <Label htmlFor={name} label={props.label} />
            <Field
                value={getIn(formik.values, name)}
                onChange={handleChange}
                className="FormInput__input"
                maxLength={maxLength}
                {...props}
            />
            <Error name={name} />
        </div>
    )
}

export default connect(CustomNumber);