import React from 'react';
import { connect, getIn } from 'formik';


const FieldError = props => {
  // All FormikProps available on props.formik!
  const error = getIn(props.formik.errors, props.name);
  const touch = getIn(props.formik.touched, props.name);
  return touch && error ? <div className="FormInput__feedback">{error}</div> : null;
};

export default connect(FieldError);