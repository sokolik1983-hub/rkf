import React from "react";
import { connect } from "formik";
import { FormField } from "components/Form";

const FormFile = React.forwardRef((props, ref) => <FormField {...props} ref={ref} type="file" name={`${props.name}`} errName={props.name} onChange={e => {
    props.formik.setFieldValue(props.name, e.currentTarget.files[0]);
    //props.onChange && props.onChange(e);
}} />);

export default connect(React.memo(FormFile));
