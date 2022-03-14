import React, { useEffect, useState } from "react";
import Alert from "components/Alert";
import DocLink from "../../components/DocLink";
import { connect, getIn } from "formik";
import { FormGroup, FormField } from "components/Form";
import genericForm from "utils/genericForm";
import SubmitError from "../../components/SubmitError";
import config from "./config.js";
import Button from "components/Button";
import Card from "components/Card";
import { Request } from "utils/request";
import HideIf from "components/HideIf";
import FormFile from "../../components/FormFile";
import UserDatePicker from "../../../kendo/DatePicker";
import moment from "moment";
import useIsMobile from "../../../../utils/useIsMobile";

import "./index.scss";


// dysplasia request
const FormFields = connect(({ formik, update, view, options, alias, setRedirect, send, initial, Title, config }) => {
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    // const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    // const statusAllowsUpdate = formik.values.status_id ? [2,4,7].includes(formik.values.status_id) : true;
    // const cash_payment = initial.cash_payment;
    const [privacyHref, setPrivacyHref] = useState('');
    const [everkAlert, setEverkAlert] = useState(false);
    const [everk, setEverk] = useState(false);
    const [init, setInit] = useState(false);
    
    const isMobile = useIsMobile(1080);

    const apiPrivacyEndpointDysplasia = config.profileType === 'kennel' ? '/api/requests/dog_health_check_request/kenneldoghealthcheckdysplasiarequest/personal_data_document' : '/api/requests/dog_health_check_request/doghealthcheckdysplasiarequest/personal_data_document';
    const apiPrivacyEndpointPatella = config.profileType === 'kennel' ? '/api/requests/dog_health_check_request/kenneldoghealthcheckpatellarequest/personal_data_document' : '/api/requests/dog_health_check_request/doghealthcheckpatellarequest/personal_data_document';

    const PromiseRequest = url => new Promise((res, rej) => Request({ url }, res, rej));

    const getEverkData = () => {
        let rfc = getIn(formik.values, 'pedigree_number');
        return PromiseRequest(`/api/dog/Dog/everk_dog/${rfc}`)
            .then(data => data && (data.name || data.name_lat))
            .then(name => {
                if (!name) {
                    throw new Error("name not set");
                }
                setEverk && setEverk(true);
                formik.setFieldValue(`dog_name`, name);
            })
            .catch(e => setEverkAlert(true));
    }
    const deleteClick = () => {
        formik.setFieldValue('pedigree_number', '');
        formik.setFieldValue('dog_name', '');
        setEverk(false);
    }

    useEffect(() => {
        let url = config.distinction === 'dysplasia' ? apiPrivacyEndpointDysplasia : apiPrivacyEndpointPatella;
        Promise.all([
            fetch(url, { headers })
                .then(response => response.blob())
                .then(data => setPrivacyHref(URL.createObjectURL(data))),
        ])
    }, []);

    const { stampCodes } = options;
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
                url: config.profileType === 'kennel' ? '/api/nurseries/nursery/nursery_federation' : '/api/Club/club_federation'
            },
                e => { e && e.id && formik.setFieldValue('federation_id', e.id) },
                e => { })
        }
    }, []);

    // let federation = options.federations.find(f => f.value === formik.values.federation_id);
    // federation = federation ? federation.label : "федерации";

    const handleDateChange = date => {
        const selectedDate = moment(date.value).format(`YYYY-MM-DD`)
        formik.setFieldValue('payment_date', selectedDate);
    };

    return <>
        {everkAlert &&
            <Alert
                title="Ошибка"
                text="Номер родословной не найден в базе ВЕРК."
                autoclose={false}
                okButton={true}
                onOk={() => setEverkAlert(false)}
            />
        }

        <Card>
            <Title />
            {formik.values.rejected_comment && <div className="alert alert-danger">{formik.values.rejected_comment}</div>}
            <div className="flex-row heading-row">
                <h4 className="caps" style={{ marginTop: '10px' }}>Добавление заявки</h4>
            </div>
            <FormGroup>
                <FormField
                    fieldType="customCheckbox"
                    name="express"
                    label='Срочное изготовление'
                    disabled={view || update}
                />
            </FormGroup>
            {(config.distinction === 'dysplasia') && !update && !view && <p style={{ marginTop: '-20px', marginBottom: '16px' }}>Только при оценке внешним специалистом</p>}
            <FormGroup inline>
                <FormField
                    disabled={update}
                    options={options.declarants.map(m => ({ value: m.id, label: m.full_name }))}
                    fieldType="reactSelect"
                    name="declarant_id"
                    label={`Ответственное лицо <span>(<a href="${config.responsibleLink(alias)}">Создать ответственное лицо</a>)</span>`}
                    placeholder="Выберите..."
                />
            </FormGroup>

            <FormGroup inline className="DocItem__xray-agreement-wrap">
                <FormFile
                    name={`veterinary_contract_document`}
                    label='Заполненный договор-заявка с печатью ветеринарного учреждения и подписью ветеринарного врача (PDF, JPEG, JPG)'
                    docId={formik.values.veterinary_contract_document_id}
                    disabled={view}
                    document_type_id={31}
                    profileType={config.profileType}
                />
                {(config.distinction !== 'patella') && <FormFile
                    name={`roentgenogram_document`}
                    label='Рентгенограмма (PDF, JPEG, JPG)'
                    docId={formik.values.roentgenogram_document_id}
                    disabled={view}
                    document_type_id={32}
                    profileType={config.profileType}
                />}
            </FormGroup>

            <FormGroup inline className={`${everk && !view && !isMobile ? "DocItem__pedigree-number_search-delete" : "DocItem__pedigree-number_search"}`}>
                <FormField disabled={view || everk} name='pedigree_number' label='№ родословной собаки' />
                {!everk && !view && <Button className='btn btn-primary' style={{ marginRight: '1em', alignSelf: 'flex-end'  }} onClick={e => getEverkData()}>Поиск</Button>}
                <FormField disabled={view || everk} name='dog_name' label='Кличка собаки' />
                {everk && !view && <Button className='btn btn-red' onClick={e => deleteClick()}>Удалить</Button>}
            </FormGroup>

            <FormGroup inline className="DocItem__pedigree-agreement-wrap">
                <FormFile
                    name={`pedigree_document`}
                    label={view && !formik.values.pedigree_document_id ? '' : `Родословная (PDF, JPEG, JPG)`}
                    docId={formik.values.pedigree_document_id}
                    disabled={view || formik.values.pedigree_document_accept}
                    document_type_id={7}
                    profileType={config.profileType}
                />
                <FormFile
                    name={`personal_data_document`}
                    label={view && !formik.values.personal_data_document_id ? '' : <>Соглашение на обработку персональных данных (PDF, JPEG, JPG)<br /><a href={privacyHref}>Скачать форму соглашения</a></>}
                    docId={formik.values.personal_data_document_id}
                    disabled={view || formik.values.personal_data_document_accept}
                    document_type_id={11}
                    profileType={config.profileType}
                />
            </FormGroup>

            <FormGroup>
                <br />
                <p className={update ? 'hidden' : ''}>Приложите квитанцию об оплате заявки и заполните информацию о платеже.</p>
                {/*<FormField disabled={view || formik.values.cash_payment_accept || !statusAllowsUpdate} fieldType="customCheckbox" name='cash_payment' label='Оплата наличными'/>*/}
                <HideIf cond={formik.values.cash_payment}>
                    <div className="flex-row heading-row">
                        <h4 className="caps">Информация о платеже</h4>
                    </div>
                    <p>Обращаем Ваше внимание, что платежи могут обрабатываться банком 2-3 дня. При формировании срочной заявки старайтесь произвести платёж заблаговременно.</p>
                    <FormGroup inline className="DocItem__payment-receipt-wrap">
                        <FormFile
                            name='payment_document'
                            label='Квитанция об оплате (PDF, JPEG, JPG)'
                            docId={formik.values.payment_document_id}
                            disabled={view || formik.values.payment_accept}
                            document_type_id={5}
                            profileType={config.profileType}
                        />
                        <div className="DocItem__dysplasia-payment-wrap">
                            <div>Дата оплаты</div>
                            <UserDatePicker
                                onChange={handleDateChange}
                                value={getIn(formik.values, 'payment_date') ?
                                    new Date(getIn(formik.values, 'payment_date')) :
                                    null
                                }
                                className="DocItem__dysplasia-payment"
                                disabled={view || formik.values.payment_accept}
                            />
                        </div>
                        <FormField disabled={view || formik.values.payment_accept} name='payment_number' label='Номер платежного документа' />
                    </FormGroup>
                    <FormGroup inline className="DocItem__payer-info-wrap">
                        <FormField disabled={view || formik.values.payment_accept} name='payment_name' label='ФИО плательщика/наименования юр. лица' />
                        <FormField disabled={view || formik.values.payment_accept} name='inn' label='ИНН (для юр. лиц)' />
                    </FormGroup>
                </HideIf>
                {!view && <FormField disabled={view} name='comment' fieldType='textarea' label='Комментарий' />}
            </FormGroup>
            {formik.values && formik.values.certificate_document_id && <>
                <h4>Сертификат</h4>
                <DocLink
                    profileType={config.profileType}
                    docId={formik.values.certificate_document_id}
                    label=""
                    showLabel={false}
                />
            </>}
        </Card>
        {!view && <div className="stage-controls flex-row">
            <SubmitError />
            <Button className="btn-green btn-condensed" onClick={e => send({
                method: formik.values.id ? "PUT" : "POST",
                action: config.url,
                button: 'next'
            }, formik)}>Отправить</Button>
        </div>}
    </>
})

const DysplasiaForm = (distinction, profileType) => React.memo(genericForm(FormFields, config(distinction, profileType)));

export default DysplasiaForm;