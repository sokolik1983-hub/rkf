import React from "react";
import { connect } from "formik";
import { FormField } from "components/Form";
import transliterate from "utils/transliterate";
    
const translate = (field, formik, value) => formik.setFieldValue(`${field}_lat`,transliterate(value));

const Transliteratable = ({formik, name, onChange, ...props}) =>
    <FormField {...props} name={name}
        onChange={
            e => {
                formik.handleChange(e);
                translate(name, formik, e.currentTarget.value);
                onChange && onChange(e);
            }
        }
    />;

export default connect(Transliteratable);
