import React from 'react';
import Loading from 'components/Loading';
import { connect } from "formik";
import { SubmitButton } from 'components/Form';

const SubmitButtonWithLoading = ({ formik }) => {
    return <div className="SubmitButton">
        {formik.isSubmitting && <Loading centered={false} inline={true} />}
        <SubmitButton className="btn btn-green" type="submit">Отправить</SubmitButton>
    </div >
};

export default connect(SubmitButtonWithLoading);