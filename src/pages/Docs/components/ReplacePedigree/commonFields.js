import React from 'react';
import {reqText, numbersOnly} from "./config.js";
import {number,string,boolean} from "yup";
import { FormGroup, FormField } from "components/Form";
import FormFile from "./components/FormFile";

const validation = {
    payment_document_id: number().required(reqText).typeError(reqText),
    payment_date: string().required(reqText),
    payment_number: string().required(reqText),
    payment_name: string().required(reqText),
    inn: string(),
    comment: string()
}

const initial = {
    payment_document_id: '',
    payment_date: '',
    payment_number: '',
    payment_name: '',
    inn: '',
    comment: ''
}

const component = ({formik, view, update}) => <>
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
                {!view && <FormField disabled={view} name='comment' fieldType='textarea' label='Комментарий' />}
</>

const Common = { component, validation, initial }

export default Common

export { validation, component, initial }
