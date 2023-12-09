import React from "react";
import { connect, getIn } from "formik";
import { FormGroup, FormField } from "components/Form";
import genericForm from "utils/genericForm";
import config from "./config.js";
import Button from "components/Button";
import HideIf from "components/HideIf";
import Card from "components/Card";
import FormFile from "../../components/FormFile";
import SubmitError from "../../components/SubmitError";
import UserDatePicker from "../../../../../../components/kendo/DatePicker";
import moment from "moment";
import "./index.scss";

const PaymentFormFields = connect(({ formik, update, view, options, alias, setRedirect, send, initial, Title }) => {
    const statusAllowsUpdate = formik.values.status_id ? [2, 4, 7].includes(formik.values.status_id) : true;
    const cash_payment = initial.cash_payment;

    const handleDateChange = date => {
        const selectedDate = moment(date.value).format(`YYYY-MM-DD`)
        formik.setFieldValue('payment_date', selectedDate);
    };

    return <>
        <Card>
            <Title />
            <FormGroup>
                <p className={update ? 'hidden' : ''}>Приложите квитанцию об оплате {formik.values.declarants.length} заявок по тарифу {options.federations.find(f => f.value === formik.values.federation_id).label} и заполните информацию о платеже.</p>
                {/*<FormField disabled={view || formik.values.cash_payment_accept || !statusAllowsUpdate} fieldType="customCheckbox" name='cash_payment' label='Оплата наличными'/>*/}
                <HideIf cond={formik.values.cash_payment}>
                    <h4 className="caps">Информация о платеже</h4>

                    <FormGroup inline className="DocItem__payment-receipt-wrap">
                        <FormFile
                            name='payment_document'
                            label='Квитанция об оплате (PDF, JPEG, JPG)'
                            docId={formik.values.payment_document_id}
                            disabled={view || formik.values.payment_document_accept || !statusAllowsUpdate}
                            document_type_id={5}
                            distinction="litter"
                        />
                        <div className="DocItem__litter-payment-wrap">
                            <div>Дата оплаты</div>
                            <UserDatePicker
                                onChange={handleDateChange}
                                value={getIn(formik.values, 'payment_date') ?
                                    new Date(getIn(formik.values, 'payment_date')) :
                                    null
                                }
                                className="DocItem__litter-payment"
                                disabled={view || formik.values.payment_date_accept || !statusAllowsUpdate}
                            />
                        </div>
                        <FormField disabled={view || formik.values.payment_number_accept || !statusAllowsUpdate} name='payment_number' label='Номер платежного документа' />
                    </FormGroup>
                    <FormGroup inline className="DocItem__payer-info-wrap">
                        <FormField disabled={view || (!(statusAllowsUpdate && cash_payment && !formik.values.cash_payment_accept) && update)} name='payment_name' label='ФИО плательщика/наименования юр. лица' />
                        <FormField disabled={view || (!(statusAllowsUpdate && cash_payment && !formik.values.cash_payment_accept) && update)} name='inn' label='ИНН (для юр. лиц)' />
                    </FormGroup>
                </HideIf>
            </FormGroup>
        </Card>
        <div className="stage-controls flex-row">
            <Button className="btn-condensed" onClick={e => setRedirect(`/club/${alias}/documents/litter/${formik.values.id}/table/form`)}>Назад</Button>
            <SubmitError />
            <Button className="btn-condensed btn-green btn-light" onClick={e => send({
                method: formik.values.id ? "PUT" : "POST",
                action: config.url,
                button: formik.values.id ? 'none' : 'save'
            }, formik)}>Сохранить</Button>
            <HideIf>
                <Button className="btn-green btn-condensed" onClick={e => send({
                    method: formik.values.id ? "PUT" : "POST",
                    action: config.url,
                    button: 'next'
                }, formik)}>Отправить</Button>
            </HideIf>
        </div>
    </>
})

const PaymentForm = genericForm(PaymentFormFields, config);

export default React.memo(PaymentForm);