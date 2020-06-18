import React from "react";
import {connect, getIn} from "formik";
import {FormField} from "components/Form";

const WithDefault = props => {
    if (getIn(props.formik.values, props.name) === undefined) {
        props.formik.setFieldValue(props.name, props.defaultValue || '');
    }
    return <FormField {...props} />
}

export default connect(WithDefault)
