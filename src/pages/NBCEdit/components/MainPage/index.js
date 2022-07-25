import React from 'react';
import Card from '../../../../components/Card';
import {FormField, FormGroup} from '../../../../components/Form';
import SubmitButton from '../../../../components/Form/SubmitButton';
import {withRouter} from 'react-router-dom';
import UploadDocsEditPage from "../../../../components/UploadDocsEditPage/UploadDocsEditPage";

const MyComponent = ({
        name,
        alias,
        formik,
        web_site,
        comment
}) => {

    return (
        <Card>
            <h3>Основная информация</h3>
            <div className="nursery-edit__main-info">
                <FormField {...name} />
                <FormField {...alias} disabled />
                <FormField {...comment} />
            </div>
            <FormGroup inline>
                <FormField {...web_site} />
            </FormGroup>
            <div className="main-info">
                <UploadDocsEditPage />
            </div>
            <SubmitButton>Сохранить</SubmitButton>
            {formik.errors && !!Object.keys(formik.errors).length
                && <div className="nursery-edit__is-valid">Не все необходимые поля заполнены</div>}
        </Card>
    );
};

export default withRouter(MyComponent);
