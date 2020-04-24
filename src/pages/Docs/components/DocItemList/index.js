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
import { endpointGetFederations } from "pages/Clubs/config";
import removeNulls from "utils/removeNulls";
import test from "../../test.json";
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
    apiVerkEndpoint,
    apiStatusesEndpoint,
    //apiCitiesEndpoint,
    apiLitterDogStatusEndpoint,
    apiLitterEmptyDocument,
    apiPedigreeStatusesEndpoint,
}from "../../config.js"

const DocItemList = ({formik, view, update, clubAlias, distinction, stampCodes, declarants, cash_payment, statusAllowsUpdate }) => {
    window.test = () => Object.keys(test).forEach(t => {
        formik.setFieldValue(t, test[t]);
    });
    formik.errors && Object.keys(formik.errors).length && console.log("errors",formik.errors);
    //formik.values && Object.keys(formik.values).length && console.log("values",formik.values);
    const DocItem = distinction === "pedigree" ? DocItemPedigree : DocItemLitter;
    const [active, setActive] = useState(-1);
    const [federations, setFederations] = useState([]);
    const [doctypes, setDoctypes] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [sexTypes, setSexTypes] = useState([]);
    //const [cities, setCities] = useState([]);
    const [litterStatuses, setLitterStatuses] = useState([]);
    const [privacyHref, setPrivacyHref] = useState('');
    const [litterHref, setLitterHref] = useState('');
    const [verkHref, setVerkHref] = useState('');
    const [fedName, setFedName] = useState('федерации');
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);
    
    const apiDoctypeEndpoint = distinction === "pedigree" ? apiPedigreeDoctypeEndpoint : apiLitterDoctypeEndpoint;
    const apiPrivacyEndpoint = distinction === "pedigree" ? apiPedigreePrivacyEndpoint : apiLitterPrivacyEndpoint;
    const apiDeclarantStatusesEndpoint = distinction === "pedigree" ? apiPedigreeStatusesEndpoint : apiStatusesEndpoint;
    const setDeclarant = value => {
        let declarant = declarants.find(f => f.id === value);
        if (!declarant) return;
        Object.keys(removeNulls(declarant))
        .forEach(key => key === "id" || formik.setFieldValue(key, declarant[key]));
    }
    const PromiseRequest = url => new Promise((res,rej) => Request({url},res,rej));
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    useEffect(() => {
        (() => Promise.all([
            PromiseRequest(endpointGetFederations)
            .then(data => setFederations(data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.short_name})))),
            PromiseRequest(apiDoctypeEndpoint)
            .then(data => setDoctypes(data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name_rus})))),
            PromiseRequest(apiBreedsEndpoint)
            .then(data => setBreeds(data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name})))),
            PromiseRequest(apiSexTypesEndpoint)
            .then(data => setSexTypes(data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name})))),
            PromiseRequest(apiDeclarantStatusesEndpoint)
            .then(data => setStatuses(data.sort((a,b) => a.id - b.id))),
            PromiseRequest(apiLitterDogStatusEndpoint)
            .then(data => setLitterStatuses(data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name})))),
            //PromiseRequest(apiCitiesEndpoint)
            //.then(data => setCities(data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name})))),
            fetch(apiPrivacyEndpoint, {headers})
            .then(response => response.blob())
            .then(data => setPrivacyHref(URL.createObjectURL(data))),
            fetch(apiLitterEmptyDocument, {headers})
            .then(response => response.blob())
            .then(data => setLitterHref(URL.createObjectURL(data))),
            fetch(apiVerkEndpoint, {headers})
            .then(response => response.blob())
            .then(data => setVerkHref(URL.createObjectURL(data)))
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

    const canSave = statusAllowsUpdate || formik.values.declarants.some(d => d.status_id ? [2,4,7].includes(d.status_id) : true);
    return loading ? <Loading/> : <FieldArray
        name="declarants"
        render={helpers => <>
            {redirect && <Redirect to={redirect}/>}
            <FormField disabled={update} options={federations} fieldType="reactSelect" name="federation_id" label='Федерация' onChange={e => setFedName(e.label)} placeholder="Выберите..."/>
            <FormField disabled={update} options={declarants.map(m => ({value: m.id, label:m.full_name}))} fieldType="reactSelect" name="declarant_id" label='Ответственное лицо' placeholder="Выберите..." onChange={e => setDeclarant(e.value)} />
            <Link to={`/${clubAlias}/documents/responsible/form`}>Создать заявителя</Link>
            <FormField disabled name='full_name' label='ФИО' placeholder='Заполняется автоматически' />
            <FormField disabled name='phone' label='Телефон' placeholder='Заполняется автоматически' />
            <FormField disabled name='email' label='Email' placeholder='Заполняется автоматически' />
            <FormField disabled name='address' label='Адрес' placeholder='Заполняется автоматически' />
            {/*
            <HideIf cond={!update}>
                <FormGroup>
                    <FormGroup inline>
                        <FormField disabled={update} name='last_name' label='Фамилия заявителя' />
                        <FormField disabled={update} name='first_name' label='Имя заявителя' />
                    </FormGroup>
                    <FormField disabled={update} name='second_name' label='Отчество заявителя (опционально)' />
                    <FormGroup inline>
                        <FormField disabled={update} name='phone' type="tel" fieldType="masked" showMask={true} mask={DEFAULT_PHONE_INPUT_MASK} label='Телефон заявителя' />
                        <FormField disabled={update} name='email' type="email" label='Email заявителя' />
                    </FormGroup>
                    <p>Адрес заявителя для отправки корреспонденции</p>
                    <FormGroup inline>
                        <FormField disabled={update} name="index" label="Индекс" />
                        <FormField disabled={update} name="city_id" placeholder="Начните писать..." label="Город" fieldType="reactSelect" options={cities} />
                    </FormGroup>
                    <FormGroup inline>
                        <FormField disabled={update} name="street" label="Улица" />
                        <FormField disabled={update} name="house" label="Дом" />
                        <FormField disabled={update} name="building" label="Стр." />
                        <FormField disabled={update} name="flat" label="Кв." />
                    </FormGroup>
                    <HideIf cond={!update}>
                        <FormField disabled name='folder_number' label='Номер папки'/>
                    </HideIf>
                 </FormGroup>
            </HideIf>
            */}
            <FormField disabled name='subscriber_mail' label='Абонентский ящик' placeholder={update ? '' : 'Заполняется автоматически'} />
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {formik.values.declarants.map((m, i) => <DocItem
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
                        verkHref={verkHref}
                        litterHref={litterHref}
                        statuses={statuses}
                        litterStatuses={litterStatuses}
                        stampCodes={stampCodes}
                        clubAlias={clubAlias}
                    />)}
                </tbody>
            </table>
            <div className={`flex-row ${update ? 'hidden' : ''}`}>
                {formik.errors && (typeof(formik.errors.declarants) === "string") &&
                    <p className="red">{formik.errors.declarants}</p>
                }
                <PlusButton title="Добавить еще заводчика" onClick={() => {
                    setActive(formik.values.declarants.length);
                    let stamp_code_id = stampCodes && stampCodes[0] && stampCodes[0].value;
                    console.log(stamp_code_id);
                    helpers.push(distinction === "pedigree" ? {...emptyPedigreeDeclarant, stamp_code_id} : {...emptyLitterDeclarant, stamp_code_id});
                }} />
            </div>
        </div>
        <div>
            <FormGroup>
                <p className={update ? 'hidden' : ''}><b>Приложите квитанцию об оплате {formik.values.declarants.length} заявок по тарифу {fedName} и заполните информацию о платеже.</b></p>
                <FormField disabled={view || formik.values.cash_payment_accept || !statusAllowsUpdate} fieldType="customCheckbox" name='cash_payment' label='Оплата наличными'/>
                <h4>Информация о платеже</h4>

                <HideIf cond={formik.values.cash_payment}>
                    <FormGroup inline>
                        <FormFile
                            name='payment_document'
                            label='Квитанция об оплате (PDF, JPEG, JPG, PNG)'
                            docId={formik.values.payment_document_id}
                            disabled={view || formik.values.payment_document_accept || !statusAllowsUpdate}
                            distinction={distinction}
                        />

                        <FormField disabled={view || formik.values.payment_date_accept || !statusAllowsUpdate} name='payment_date' label='Дата оплаты' readOnly={true} fieldType="formikDatePicker" />
                        <FormField disabled={view || formik.values.payment_number_accept || !statusAllowsUpdate} name='payment_number' label='Номер платежного документа' />
                    </FormGroup>
                    <FormGroup inline>
                        <FormField disabled={view || (!(statusAllowsUpdate && cash_payment && !formik.values.cash_payment_accept) && update)} name='payment_name' label='ФИО плательщика/наименования юр. лица' />
                        <FormField disabled={view || (!(statusAllowsUpdate && cash_payment && !formik.values.cash_payment_accept) && update)} name='inn' label='ИНН (для юр. лиц)' />
                    </FormGroup>
                </HideIf>
            </FormGroup>
        </div>
        <HideIf cond={view || !canSave} className="flex-row">
            <Button className="btn-green" type="link" disabled={formik.isSubmitting} onClick={e => (!update ? formik.setFieldValue('status_id',1) : false) || formik.submitForm()}>{formik.isSubmitting ? "Идет отправка..." : "Сохранить"}</Button>
            <HideIf cond={update}>
                <Button className="btn-transparent" type="link" disabled={formik.isSubmitting} onClick={e => formik.setFieldValue('status_id',7) || formik.submitForm()}>{formik.isSubmitting ? "Идет отправка..." : "Сохранить черновик"}</Button>
            </HideIf>
            <Link to={`/${clubAlias}/documents`}><Button className="btn-transparent">Закрыть</Button></Link>
        </HideIf>
    </>}
    />;
};


export default connect(React.memo(DocItemList));
