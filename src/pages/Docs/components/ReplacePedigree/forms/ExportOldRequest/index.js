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

// duplicate request
const FormFields = connect(({formik, update, view, options, alias, setRedirect, send, initial, Title}) => {
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    const statusAllowsUpdate = formik.values.status_id ? [2,4,7].includes(formik.values.status_id) : true;
    const cash_payment = initial.cash_payment;
    const [privacyHref, setPrivacyHref] = useState('');
    const [init, setInit] = useState(false);
    const {stampCodes} = options;
    useEffect(() => {
        if (!init && !formik.values.id) {
            setInit(true);
            let declarant = options.declarants.find(f => f.is_default);
            let stamp = stampCodes[0];
            if (!!stamp) {
                formik.setFieldValue('stamp_code', stamp.label);
            }
            if (!!declarant) {
                formik.setFieldValue('declarant_id', declarant.id);
            }
            Request({
                url: '/api/Club/club_federation'
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
            label={`Ответственное лицо (<a href="/${alias}/documents/responsible/form">Создать ответственное лицо</a>)`}
            placeholder="Выберите..." 
        />
        </FormGroup>
        <FormGroup inline>
                <FormField disabled={view} placeholder="XXX" fieldType="reactSelectCreatable" options={stampCodes} name={`stamp_code`} label={`Код клейма (<a href="/${alias}/documents/stamps/add">Добавить клеймо</a>)`} onChange={e => formik.setFieldValue(`stamp_code`, e.toUpperCase())}/>
                <FormField disabled={view} name={`stamp_number`} label='Номер клейма' placeholder="0000"/>
        </FormGroup>
        <FormGroup inline>
            <FormField disabled={update} name={`breed_id`} label='Порода' options={options.breeds} fieldType="reactSelect" placeholder="Выберите..."/>
            <FormField disabled={view} name='dog_name' label='Кличка' />
        </FormGroup>

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
        <FormFile
            name={`copy_pedigree_document`}
            label='Поле загрузки копии родословной (PDF, JPEG, JPG, PNG)'
            docId={formik.values.copy_pedigree_document_id}
            disabled={view}
            document_type_id={30}
        />


        <FormGroup>
                <br/>
                <p className={update ? 'hidden' : ''}>Приложите квитанцию об оплате заявки по тарифу {federation} и заполните информацию о платеже.</p>
                {/*<FormField disabled={view || formik.values.cash_payment_accept || !statusAllowsUpdate} fieldType="customCheckbox" name='cash_payment' label='Оплата наличными'/>*/}
                <HideIf cond={formik.values.cash_payment}>
                <div className="flex-row heading-row">
                    <h4 className="caps">Информация о платеже</h4>
                </div>
                    <FormGroup inline>
                        <FormFile
                            name='payment_document'
                            label='Квитанция об оплате (PDF, JPEG, JPG, PNG)'
                            docId={formik.values.payment_document_id}
                            disabled={view || formik.values.payment_document_accept}
                            document_type_id={5}
                            distinction="pedigree"
                        />

                        <FormField className="special" required={false} disabled={view  || formik.values.payment_document_accept} name='payment_date' label='Дата оплаты' readOnly={true} fieldType="formikDatePicker" />
                        <FormField disabled={view || formik.values.payment_document_accept} name='payment_number' label='Номер платежного документа' />
                    </FormGroup>
                    <FormGroup inline>
                        <FormField disabled={view || formik.values.payment_document_accept} name='payment_name' label='ФИО плательщика/наименования юр. лица' />
                        <FormField disabled={view || formik.values.payment_document_accept} name='inn' label='ИНН (для юр. лиц)' />
                    </FormGroup>
                </HideIf>
                {!view && <FormField disabled={view} name='comment' fieldType='textarea' label='Комментарий' />}
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
