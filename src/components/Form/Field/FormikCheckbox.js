import React from "react"
import { connect, getIn } from "formik"
import CustomCheckbox from "components/Form/CustomCheckbox"

const FormikCheckbox = ({formik, name, onChange, ...props}) => 
    <CustomCheckbox {...props} checked={getIn(formik.values, name)} onChange={e => {
        formik.setFieldValue(name, e.currentTarget.checked);
        onChange && onChange(e);
    }} />

export default connect(FormikCheckbox)
