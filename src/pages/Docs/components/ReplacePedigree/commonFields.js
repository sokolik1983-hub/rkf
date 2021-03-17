import React from 'react';
import { reqText } from "./config.js";
import { number, string, object, array } from "yup";
import { FormGroup, FormField } from "components/Form";
import { FieldArray, getIn } from "formik";
import FormFile from "./components/FormFile";
import HideIf from "components/HideIf";
import DeleteButton from "./components/DeleteButton";
import Button from "components/Button";
import UserDatePicker from "../../../../components/kendo/DatePicker";
import moment from "moment";
import "./index.scss";

const validation = {
    payment_document_id: number().required(reqText).typeError(reqText),
    payment_date: string().required(reqText),
    payment_number: string().required(reqText),
    payment_name: string().required(reqText),
    inn: string(),
    comment: string(),
    documents: array().of(object().shape({
        id: number(),
        document_type_id: number().required(reqText).typeError(reqText),
        document_id: number().required(reqText).typeError(reqText)
    }))
}

const initial = {
    payment_document_id: '',
    payment_date: '',
    payment_number: '',
    payment_name: '',
    inn: '',
    comment: '',
    documents: []
}

const options = {
    doctypes: {
        url: '/api/requests/replace_pedigree_request/replacepedigreerequest/additional_document_types',
        mapping: data => data.sort((a, b) => a.id - b.id).map(m => ({ value: m.id, label: m.name_rus })),
    }
}

const component = ({ formik, view, update, options }) => {

    const handleDateChange = date => {
        const selectedDate = moment(date.value).format(`YYYY-MM-DD`)
        formik.setFieldValue('payment_date', selectedDate);
    };

    return <>
        <div className="flex-row heading-row">
            <h4 className="caps">Информация о платеже</h4>
        </div>
        <FormGroup inline>
            <FormFile
                name='payment_document'
                label='Квитанция об оплате (PDF, JPEG, JPG)'
                docId={formik.values.payment_document_id}
                disabled={view || formik.values.payment_document_accept}
                document_type_id={5}
            />
            <div className="DocApply__payment-wrap">
                <div>Дата оплаты</div>
                <UserDatePicker
                    onChange={handleDateChange}
                    value={getIn(formik.values, 'payment_date') ?
                        new Date(getIn(formik.values, 'payment_date')) :
                        null
                    }
                    className="DocApply__payment"
                    disabled={view  || formik.values.payment_document_accept}
                />
            </div>
            <FormField disabled={view || formik.values.payment_document_accept} name='payment_number' label='Номер платежного документа' />
        </FormGroup>
        <FormGroup inline>
            <FormField disabled={view || formik.values.payment_document_accept} name='payment_name' label='ФИО плательщика/наименования юр. лица' />
            <FormField disabled={view || formik.values.payment_document_accept} name='inn' label='ИНН (для юр. лиц)' />
        </FormGroup>
        <FieldArray name={`documents`} render={({ push, remove }) => (<>
            {formik.values.documents && formik.values.documents.map((doc, j) => <FormGroup inline key={j}>
                <input type="hidden" name={`documents[${j}].id`} />
                <FormField disabled={view || doc.document_accept} options={options.doctypes} label={`Документ ${j + 1} - описание`} placeholder="Выберите..." fieldType="reactSelect" name={`documents[${j}].document_type_id`} />
                <HideIf>
                    <FormFile
                        name={`documents[${j}].document`}
                        label={`Документ ${j + 1}`}
                        docId={doc.document_id}
                        disabled={view || doc.document_accept}
                        document_type_id={doc.document_type_id}
                        fieldType="file"
                    />
                </HideIf>
                <HideIf cond={view || doc.document_accept}>
                    <DeleteButton onClick={() => remove(j)} title="Удалить" />
                </HideIf>
            </FormGroup>)}
            <HideIf cond={view || (formik.values.documents && formik.values.documents.length > 29)}>
                <div className="flex-row">
                    <Button small className="btn-primary" onClick={() => push({ document_type_id: '', document: '' })}>Добавить доп. документ</Button>
                </div>
            </HideIf>
        </>)}
        />
        {!view && <FormField disabled={view} name='comment' fieldType='textarea' label='Комментарий' />}

    </>
};

const Common = { component, validation, initial, options };

export default Common;

export { validation, component, initial, options };