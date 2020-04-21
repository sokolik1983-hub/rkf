import React from 'react';
import Loading from 'components/Loading';
import { connect } from "formik";

const SubmitButton = ({ formik }) => {
    return <div className="SubmitButton">
        {formik.isSubmitting && <Loading centered={false} inline={true} />}
        <button className="btn btn-green" type="submit">Отправить</button>
    </div >
};

export default connect(SubmitButton);