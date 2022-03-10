import React from "react";
import { connect } from "formik";
import "./style.scss";

const text = 'Заполнены не все обязательные поля';

const check = value => value && typeof value === 'object' && Object.keys(value).length;

const SubmitError = ({formik}) => {
    return (
        <div className="SubmitError">
            {check(formik.errors) && check(formik.touched) && check(formik.touched) === check(formik.values) ? text : ""}
        </div>
    );
};

export default connect(SubmitError);
