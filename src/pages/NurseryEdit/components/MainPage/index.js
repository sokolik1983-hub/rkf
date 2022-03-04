import React from 'react';
import Documents from '../Documents';
import Card from '../../../../components/Card';
import Transliteratable from '../Transliteratable';
import {FormField, FormGroup} from '../../../../components/Form';
import SubmitButton from '../../../../components/Form/SubmitButton';
import UploadDocsEditPage from '../../../../components/UploadDocsEditPage/UploadDocsEditPage';
import {withRouter} from 'react-router-dom';

const MyComponent = ({
        name,
        alias,
        formik,
        coOwner,
        working,
        name_lat,
        web_site,
        documents,
        description,
        co_owner_mail,
        co_owner_last_name,
        co_owner_first_name,
        co_owner_second_name,
        history,
}) => {
    return (
        <Card>
            <h3>Основная информация</h3>
            <div className="nursery-edit__main-info">
                <Transliteratable {...name} />
                <FormField {...name_lat} />
                <FormField {...description} />
                <FormField {...co_owner_last_name} disabled={!!coOwner.lastName}/>
                <FormField {...co_owner_first_name} disabled={!!coOwner.firstName}/>
                <FormField {...co_owner_second_name} disabled={!!coOwner.secondName}/>
                <FormField {...co_owner_mail} disabled={!!coOwner.mail}/>
            </div>
            <FormGroup inline>
                <FormField {...web_site} />
            </FormGroup>
            <Documents documents={documents}/>
            <SubmitButton>Сохранить</SubmitButton>
            {formik.errors && !!Object.keys(formik.errors).length
                && <div className="nursery-edit__is-valid">Не все необходимые поля заполнены</div>}
            {working && <div className="nursery-edit__is-valid">Идёт загрузка файла...</div>}
            <div className="main-info">
                <UploadDocsEditPage
                    clubAlias={alias}
                    history={history}
                />
            </div>

        </Card>
    );
};

export default withRouter(MyComponent);
