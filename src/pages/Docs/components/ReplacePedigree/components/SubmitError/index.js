import React from 'react';
import {connect } from 'formik';
import './index.scss';

const text = 'Заполнены не все обязательные поля';

const check = v => v && typeof v === 'object' && Object.keys(v).length;

const SubmitError = ({formik}) => <div className="SubmitError">{check(formik.errors) && check(formik.touched) && check(formik.touched) === check(formik.values) ? text : ''}</div>;

export default connect(SubmitError);
