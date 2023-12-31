import React, { useState, useEffect } from "react";
import Button from "components/Button";
import { Request } from "utils/request";
import { Redirect, Link } from "react-router-dom";
import { FormGroup, FormField } from "components/Form";
import HideIf from "components/HideIf";
import { connect, FieldArray, getIn } from "formik";
import PlusButton from "components/PlusButton";
import FormFile from "../../components/FormFile";
import DocItemPedigree from "../../components/DocItemPedigree";
import DocItemLitter from "../../components/DocItemLitter";
import ResponsibleContactInfo from "../../components/ResponsibleContactInfo";
import removeNulls from "utils/removeNulls";
import Loading from "components/Loading";
import {
    emptyPedigreeDeclarant,
    emptyLitterDeclarant,
    apiPedigreeDoctypeEndpoint,
    apiLitterDoctypeEndpoint,
    apiBreedsEndpoint,
    apiSexTypesEndpoint,
    apiPedigreePrivacyEndpoint,
    apiLitterPrivacyEndpoint,
    apiStatusesEndpoint,
    apiLitterDogStatusEndpoint,
    apiLitterEmptyDocument,
    apiPedigreeStatusesEndpoint,
    endpointGetFederations,
} from "../../config.js";

const DocItemList = ({ formik, view, update, clubAlias, distinction, stampCodes, declarants, cash_payment, statusAllowsUpdate }) => {
    const DocItem = distinction === "pedigree" ? DocItemPedigree : DocItemLitter;
    const [active, setActive] = useState(-1);
    const [federations, setFederations] = useState([]);
    const [doctypes, setDoctypes] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [sexTypes, setSexTypes] = useState([]);
    const [litterStatuses, setLitterStatuses] = useState([]);
    const [privacyHref, setPrivacyHref] = useState('');
    const [litterHref, setLitterHref] = useState('');
    const [fedName, setFedName] = useState('федерации');
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    const apiDoctypeEndpoint = distinction === "pedigree" ? apiPedigreeDoctypeEndpoint : apiLitterDoctypeEndpoint;
    const apiPrivacyEndpoint = distinction === "pedigree" ? apiPedigreePrivacyEndpoint : apiLitterPrivacyEndpoint;
    const apiDeclarantStatusesEndpoint = distinction === "pedigree" ? apiPedigreeStatusesEndpoint : apiStatusesEndpoint;
    const setDeclarant = value => {
        let declarant = declarants.find(item => item.id === value);
        if (!declarant) return;
        Object.keys(removeNulls(declarant))
            .forEach(key => key === "id" || formik.setFieldValue(key, declarant[key]));
    }
    const PromiseRequest = url => new Promise((res, rej) => Request({ url }, res, rej));
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    useEffect(() => {
        (() => Promise.all([
            PromiseRequest(endpointGetFederations)
                .then(data => setFederations(data.sort((a, b) => a.id - b.id).map(m => ({ value: m.id, label: m.short_name })))),
            PromiseRequest(apiDoctypeEndpoint)
                .then(data => setDoctypes(data.sort((a, b) => a.id - b.id).map(m => ({ value: m.id, label: m.name_rus })))),
            PromiseRequest(apiBreedsEndpoint)
                .then(data => setBreeds(data.sort((a, b) => a.id - b.id).map(m => ({ value: m.id, label: m.name })))),
            PromiseRequest(apiSexTypesEndpoint)
                .then(data => setSexTypes(data.sort((a, b) => a.id - b.id).map(m => ({ value: m.id, label: m.name })))),
            PromiseRequest(apiDeclarantStatusesEndpoint)
                .then(data => setStatuses(data.sort((a, b) => a.id - b.id))),
            PromiseRequest(apiLitterDogStatusEndpoint)
                .then(data => setLitterStatuses(data.sort((a, b) => a.id - b.id).map(m => ({ value: m.id, label: m.name })))),
            fetch(apiPrivacyEndpoint, { headers })
                .then(response => response.blob())
                .then(data => setPrivacyHref(URL.createObjectURL(data))),
            fetch(apiLitterEmptyDocument, { headers })
                .then(response => response.blob())
                .then(data => setLitterHref(URL.createObjectURL(data))),
        ]).then(() => {
            setDeclarant(getIn(formik.values, 'declarant_id'));
            setLoading(false);
        })
            .catch(error => {
                console.log(error.response);
                setRedirect('/404');
                if (error.response) alert(`Ошибка: ${error.response.status}`);
                setLoading(false);
            }))();
    }, []);
    const statusArray = distinction === "pedigree" ? [2, 4, 7, 11] : [2, 4, 7, 8, 9];
    const canSave = statusAllowsUpdate || formik.values.declarants.some(d => d.status_id ? statusArray.includes(d.status_id) : true);
    return loading ?
        <Loading /> :
        <FieldArray
        name="declarants"
        render={helpers => <>
            {redirect && <Redirect to={redirect} />}
            <FormGroup inline className="DocItem__two-inline-columns">
                <FormField disabled={update} options={federations} fieldType="reactSelect" name="federation_id" label='Федерация' onChange={e => setFedName(e.label)} placeholder="Выберите..." />
                {formik.values.folder_number && (distinction === "pedigree") && <FormField disabled name="folder_number" label='Номер папки' />}
            </FormGroup>
            <FormField disabled={update} options={declarants.map(m => ({ value: m.id, label: m.full_name }))} fieldType="reactSelect" name="declarant_id" label='Ответственное лицо' placeholder="Выберите..." onChange={e => setDeclarant(e.value)} />
            <Link to={`/${clubAlias}/documents/responsible/form`}>Создать заявителя</Link>
            <ResponsibleContactInfo>
                <FormField disabled name='full_name' label='ФИО' placeholder='Заполняется автоматически' />
                <FormField disabled name='phone' label='Телефон' placeholder='Заполняется автоматически' />
                <FormField disabled name='email' label='Email' placeholder='Заполняется автоматически' />
                <FormField disabled name='address' label='Адрес' placeholder='Заполняется автоматически' />
                <FormField disabled name='subscriber_mail' label='Абонентский ящик' placeholder={update ? '' : 'Заполняется автоматически'} />
            </ResponsibleContactInfo>
            <div>
                <h4>{distinction === "pedigree" ? "Владельцы" : "Заводчики"}</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Дата регистрации</th>
                            <th>Статус</th>
                            <th>Номер док-та</th>
                            <th>ФИО {distinction === "pedigree" ? "владельца" : "заводчика"}</th>
                            <th>Эл. почта</th>
                            <th>Кол-во док.</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {formik.values.declarants && formik.values.declarants.map((m, i) => <DocItem
                            key={i}
                            closeClick={() => {
                                helpers.remove(i);
                                if (active > formik.values.declarants.length - 1) {
                                    setActive(formik.values.declarants.length - 1);
                                }
                            }}
                            i={i}
                            active={i === active}
                            activateClick={() => setActive(i === active ? -1 : i)}
                            doctypes={doctypes}
                            breeds={breeds}
                            sexTypes={sexTypes}
                            view={view}
                            update={update}
                            privacyHref={privacyHref}
                            litterHref={litterHref}
                            statuses={statuses}
                            litterStatuses={litterStatuses}
                            stampCodes={stampCodes}
                            clubAlias={clubAlias}
                        />)}
                    </tbody>
                </table>
                <div className={`flex-row ${update ? 'hidden' : ''}`}>
                    {formik.errors && (typeof (formik.errors.declarants) === "string") &&
                        <p className="red">{formik.errors.declarants}</p>
                    }
                    <PlusButton title="Добавить еще заводчика" onClick={() => {
                        setActive(formik.values.declarants.length);
                        let stamp_code_id = stampCodes && stampCodes[0] && stampCodes[0].value;
                        helpers.push(distinction === "pedigree" ? { ...emptyPedigreeDeclarant, stamp_code_id } : { ...emptyLitterDeclarant, stamp_code_id });
                    }} />
                </div>
            </div>
            <div>
                <FormGroup>
                    <p className={update ? 'hidden' : ''}>
                        <b>Приложите квитанцию об оплате {formik.values.declarants && formik.values.declarants.length} заявок по тарифу {fedName} и заполните информацию о платеже.</b>
                    </p>
                    <h4>Информация о платеже</h4>

                    <HideIf cond={formik.values.cash_payment}>
                        <FormGroup inline className="DocItem__litter-payment-wrap">
                            <FormFile
                                name="payment_document"
                                label='Квитанция об оплате (PDF, JPEG, JPG)'
                                docId={formik.values.payment_document_id}
                                disabled={view || formik.values.payment_document_accept || !statusAllowsUpdate}
                                distinction={distinction}
                            />
                            <FormField disabled={view || formik.values.payment_date_accept || !statusAllowsUpdate} name='payment_date' label='Дата оплаты' readOnly={true} fieldType="formikDatePicker" required={false} />
                            <FormField disabled={view || formik.values.payment_number_accept || !statusAllowsUpdate} name='payment_number' label='Номер платежного документа' />
                        </FormGroup>
                        <FormGroup inline className="DocItem__two-inline-columns">
                            <FormField disabled={view || (!(statusAllowsUpdate && cash_payment && !formik.values.cash_payment_accept) && update)} name='payment_name' label='ФИО плательщика/наименования юр. лица' />
                            <FormField disabled={view || (!(statusAllowsUpdate && cash_payment && !formik.values.cash_payment_accept) && update)} name='inn' label='ИНН (для юр. лиц)' />
                        </FormGroup>
                    </HideIf>
                </FormGroup>
            </div>
            <HideIf cond={view || !canSave} className="flex-row">
                <Button
                    className="btn-green"
                    type="link"
                    disabled={formik.isSubmitting}
                    onClick={e => (!update ? formik.setFieldValue('status_id', 1) : false) || formik.submitForm()}>
                    {
                        formik.isSubmitting
                            ? (formik.values && formik.values.status_id !== 7 ? "Идет отправка..." : "Сохранение...")
                            : "Отправить"
                    }
                </Button>
                <HideIf cond={update}>
                    <Button className="btn-transparent" type="link" disabled={formik.isSubmitting} onClick={e => formik.setFieldValue('status_id', 7) || formik.submitForm()}>Сохранить черновик</Button>
                </HideIf>
                <Link to={`/${clubAlias}/documents`}><Button className="btn-transparent">Закрыть</Button></Link>
            </HideIf>
        </>}
    />;
};


export default connect(React.memo(DocItemList));
