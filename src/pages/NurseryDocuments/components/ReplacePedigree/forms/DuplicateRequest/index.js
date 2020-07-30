import React, {useEffect, useState } from "react";
import {connect} from "formik";
import removeNulls from "utils/removeNulls";
import { FormGroup, FormField } from "components/Form";
import genericForm from "utils/genericForm";
import SubmitError from "../../components/SubmitError";
import config from "./config.js";
import Button from "components/Button";
import Card from "components/Card";
import { Request } from "utils/request";
import HideIf from "components/HideIf";
import FormFile from "../../components/FormFile";
import Common from "../../commonFields.js";
import DogInfo from "../../dogInfo.js";

// duplicate request
const FormFields = connect(({formik, update, view, options, alias, setRedirect, send, initial, Title}) => {
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    const statusAllowsUpdate = formik.values.status_id ? [2,4,7].includes(formik.values.status_id) : true;
    const cash_payment = initial.cash_payment;
    const [privacyHref, setPrivacyHref] = useState('');
    const [init, setInit] = useState(false);
    useEffect(() => {
        if (!init && !formik.values.id) {
            setInit(true);
            let declarant = options.declarants.find(f => f.is_default);
            if (!!declarant) {
                formik.setFieldValue('declarant_id', declarant.id);
            }
            Request({
                url: '/api/nurseries/nursery/nursery_federation'
            },
            e => {e && e.id && formik.setFieldValue('federation_id', e.id)},
            e => {})
        }
        Promise.all([
            fetch('/api/requests/PedigreeRequest/personal_data_document', {headers})
            .then(response => response.blob())
            .then(data => setPrivacyHref(URL.createObjectURL(data)))
        ])

    }, []);

    let federation = options.federations.find(f => f.value === formik.values.federation_id);
    federation = federation ? federation.label : "федерации";

    return <>
    <Card>
        <Title/>
        {formik.values.rejected_comment && <div className="alert alert-danger">{formik.values.rejected_comment}</div>}
        <div className="flex-row heading-row">
            <h4 className="caps">Добавление заявки</h4>
            <FormField disabled={update} className="inline-checkbox" fieldType="customCheckbox" name={`express`} label='Срочное изготовление'/>
        </div>
        <FormGroup inline>
        <FormField
            disabled
            options={options.federations}
            fieldType="reactSelect"
            name="federation_id"
            label='Федерация'
            placeholder="Выберите федерацию"
        />
        <FormField
            disabled={update}
            options={options.declarants.map(m => ({value: m.id, label:m.full_name}))}
            fieldType="reactSelect"
            name="declarant_id"
            label={`Ответственное лицо (<a href="/kennel/${alias}/documents/responsible/form">Создать ответственное лицо</a>)`}
            placeholder="Выберите..." 
        />
        </FormGroup>

        <DogInfo.component {...{options, view, update, formik, alias}}/>
        <FormGroup inline>
            <FormFile
                name={`personal_data_document`}
                label='Соглашение на обработку персональных данных (PDF, JPEG, JPG, PNG)'
                docId={formik.values.personal_data_document_id}
                disabled={view}
                document_type_id={11}
                form={{filename:"privacy.docx", href: privacyHref, linkText: 'Скачать форму соглашения'}}
            />
            <FormFile
                name={`duplicate_application`}
                label='Заявление на выдачу дубликата (PDF, JPEG, JPG, PNG)'
                docId={formik.values.duplicate_application_id}
                disabled={view}
                document_type_id={28}
            />

        </FormGroup>

        <FormGroup>
                <br/>
                <p className={update ? 'hidden' : ''}>Приложите квитанцию об оплате заявки по тарифу {federation} и заполните информацию о платеже.</p>
                {/*<FormField disabled={view || formik.values.cash_payment_accept || !statusAllowsUpdate} fieldType="customCheckbox" name='cash_payment' label='Оплата наличными'/>*/}
                <HideIf cond={formik.values.cash_payment}>
                    <Common.component {...{view, formik, update, options}} />
                </HideIf>
            </FormGroup>
    </Card>
    {!view && <div className="stage-controls flex-row">
            {/*<Button className="btn-condensed" onClick={e => window.confirm("Не сохраненные данные будут утеряны, вы уверены что хотите вернуться?") && setRedirect(`/${alias}/documents/`)}>Назад</Button>*/}
            <SubmitError />
            <Button className="btn-green btn-condensed" onClick={e => send({
                method: formik.values.id ? "PUT" : "POST",
                action: config.url,
                button: 'next'
            }, formik)}>Отправить</Button>
    </div>}
    </>
})

const DuplicateForm = genericForm(FormFields, config)

export default React.memo(DuplicateForm)
