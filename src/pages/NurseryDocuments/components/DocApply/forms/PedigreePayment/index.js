import React from "react";
import {connect} from "formik";
import { FormGroup, FormField } from "components/Form";
import genericForm from "utils/genericForm";
import SubmitError from "../../components/SubmitError";
import config from "./config.js";
import Button from "components/Button";
import HideIf from "components/HideIf";
import Card from "components/Card";
import FormFile from "../../components/FormFile";

// pedigree
const PaymentFormFields = connect(({formik, update, view, options, alias, setRedirect, send, initial, Title}) => {
    const statusAllowsUpdate = formik.values.status_id ? [2,4,7].includes(formik.values.status_id) : true;
    const cash_payment = initial.cash_payment;
    return <>
<Card>
<Title/>
            <FormGroup>
                <p className={update ? 'hidden' : ''}>Приложите квитанцию об оплате {formik.values.declarants.length} заявок по тарифу {options.federations.find(f => f.value === formik.values.federation_id).label} и заполните информацию о платеже.</p>
                {/*<FormField disabled={view || formik.values.cash_payment_accept || !statusAllowsUpdate} fieldType="customCheckbox" name='cash_payment' label='Оплата наличными'/>*/}
                <HideIf cond={formik.values.cash_payment}>
                <h4 className="caps">Информация о платеже</h4>

                    <FormGroup inline>
                        <FormFile
                            name='payment_document'
                            label='Квитанция об оплате (PDF, JPEG, JPG, PNG)'
                            docId={formik.values.payment_document_id}
                            disabled={view || formik.values.payment_document_accept || !statusAllowsUpdate}
                            document_type_id={5}
                            distinction="pedigree"
                        />

                        <FormField className="special" required={false} disabled={view || formik.values.payment_date_accept || !statusAllowsUpdate} name='payment_date' label='Дата оплаты' readOnly={true} fieldType="formikDatePicker" />
                        <FormField disabled={view || formik.values.payment_number_accept || !statusAllowsUpdate} name='payment_number' label='Номер платежного документа' />
                    </FormGroup>
                    <FormGroup inline>
                        <FormField disabled={view || (!(statusAllowsUpdate && cash_payment && !formik.values.cash_payment_accept) && update)} name='payment_name' label='ФИО плательщика/наименования юр. лица' />
                        <FormField disabled={view || (!(statusAllowsUpdate && cash_payment && !formik.values.cash_payment_accept) && update)} name='inn' label='ИНН (для юр. лиц)' />
                    </FormGroup>
                </HideIf>
            </FormGroup>
</Card>
    <div className="stage-controls flex-row">
        <Button className="btn-condensed" onClick={e => setRedirect(`/kennel/${alias}/documents/pedigree/${formik.values.id}/table/form`)}>Назад</Button>
        <SubmitError />
        <Button className="btn-condensed btn-green btn-light" onClick={e => send({
            method: formik.values.id ? "PUT" : "POST",
            action: config.url + (formik.values.id ? '_draft' : ''),
            button: formik.values.id ? 'none' : 'save'
        }, formik)}>Сохранить</Button>
            <Button className="btn-green btn-condensed" onClick={e => send({
                method: formik.values.id ? "PUT" : "POST",
                action: config.url + (formik.values.id ? '_draft' : ''),
                button: 'next'
            }, formik)}>Отправить</Button>
    </div>
    </>
})

const PaymentForm = genericForm(PaymentFormFields, config)

export default React.memo(PaymentForm)
