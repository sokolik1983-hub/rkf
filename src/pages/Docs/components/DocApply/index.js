import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Request } from "utils/request";
import Loading from "components/Loading";
import Alert from "components/Alert";
import Card from "components/Card";
import HideIf from "components/HideIf";
import { Form, FormGroup, FormField } from "components/Form";
import DocItemList from "../DocItemList";
//import { Link } from "react-router-dom";
//import CustomMenu from "components/CustomMenu";
import { endpointGetFederations } from "pages/Clubs/config";
import {
    emptyPedigreeDeclarant,
    emptyLitterDeclarant,
    pedigreeValidationSchema,
    litterValidationSchema,
    pedigreeUpdateSchema,
    litterUpdateSchema,
    apiPedigreeEndpoint,
    apiLitterEndpoint,
    apiPedigreeDoctypeEndpoint,
    apiLitterDoctypeEndpoint,
    apiBreedsEndpoint,
    apiSexTypesEndpoint,
    apiPedigreePrivacyEndpoint,
    apiLitterPrivacyEndpoint,
    apiVerkEndpoint,
    apiStatusesEndpoint,
    apiCitiesEndpoint,
    apiLitterDogStatusEndpoint
}from "../../config.js"
import { DEFAULT_PHONE_INPUT_MASK } from "appConfig";
import './index.scss';

const DocApply = ({ clubAlias, history, distinction }) => {
    const initialValues = {
        federation_id: '',
        last_name: '',
        first_name: '',
        second_name: '',
        phone: '',
        index: '',
        city_id: '',
        street: '',
        house: '',
        building: '',
        flat: '',
        email: '',
        folder_number: '',
        declarants: [distinction === "pedigree" ? emptyPedigreeDeclarant : emptyLitterDeclarant],
    
        cash_payment: false,
        payment_document: '',
        payment_date: '',
        payment_number: '',
        payment_name: '',
        ogrn: ''
    };
    const updateSchema = distinction === "pedigree" ? pedigreeUpdateSchema : litterUpdateSchema;
    const validationSchema = distinction === "pedigree" ? pedigreeValidationSchema : litterValidationSchema;
    const apiDoctypeEndpoint = distinction === "pedigree" ? apiPedigreeDoctypeEndpoint : apiLitterDoctypeEndpoint;
    const apiPrivacyEndpoint = distinction === "pedigree" ? apiPedigreePrivacyEndpoint : apiLitterPrivacyEndpoint;
    const apiEndpoint = distinction === "pedigree" ? apiPedigreeEndpoint : apiLitterEndpoint;
    const [federations, setFederations] = useState([]);
    const [doctypes, setDoctypes] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [sexTypes, setSexTypes] = useState([]);
    const [cities, setCities] = useState([]);
    const [litterStatuses, setLitterStatuses] = useState([]);
    const [privacyHref, setPrivacyHref] = useState('');
    const [verkHref, setVerkHref] = useState('');
    const [fedName, setFedName] = useState('федерации');
    const [loading, setLoading] = useState(true);
    const [okAlert, setOkAlert] = useState(false);
    const [errAlert, setErrAlert] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [values, setValues] = useState({});
    const fedChange = e => setFedName(e.label);

    let update = false, id, view = false;
    if (history) {
        let path = history.location.pathname.split('/');
        let x = path.pop();
        id = isNaN(x) ? path.pop() : x;
        update = true;
        view = x !== 'edit';
    }
    let initial = {...initialValues, ...values};
    const filterBySchema = (values, fields) => {
        let r = {};
        Object.keys(values).filter(k => Object.keys(fields).includes(k)).forEach(k => {
            if (Array.isArray(values[k])) {
                r[k] = values[k].map(m => filterBySchema(m, fields[k]._subType.fields));
            } else {
                r[k] = values[k];
            }
        });
        return r;
    }
    const transformValues = values => {
        if (update) {
            let r = filterBySchema(values, updateSchema.fields);
            if (!(r.payment_document instanceof File)) {
                delete r.payment_document;
            }
            r.declarants.forEach(d => {
                if (!d.documents) return;
                d.documents = d.documents.filter(f => !!f.document);
            });
            return r;
        } else {
            let r = filterBySchema(values, validationSchema.fields);
            return r;
        }
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
            PromiseRequest(apiStatusesEndpoint)
            .then(data => setStatuses(data.sort((a,b) => a.id - b.id))),
            PromiseRequest(apiLitterDogStatusEndpoint)
            .then(data => setLitterStatuses(data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name})))),
            PromiseRequest(apiCitiesEndpoint)
            .then(data => setCities(data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name})))),
            fetch(apiPrivacyEndpoint, {headers})
            .then(response => response.blob())
            .then(data => setPrivacyHref(URL.createObjectURL(data))),
            fetch(apiVerkEndpoint, {headers})
            .then(response => response.blob())
            .then(data => setVerkHref(URL.createObjectURL(data))),
            update ? PromiseRequest(apiEndpoint + '?id=' + id).then(values => values ? setValues(values) : setRedirect('/404')) : new Promise(res => res())
        ]).then(() => setLoading(false))
        .catch(error => {
            console.log(error.response);
            setRedirect('/404');
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
        }))();
    }, []);

    const comment = initial.rejected_comment && initial.rejected_comment.comment;

    return loading ? <Loading/> : <div className={`documents-page__info DocApply ${okAlert ? 'view' : ''}`}>
        {okAlert &&
            <Alert
                title="Документы отправлены"
                text="Документы отправлены на рассмотрение. Вы можете отслеживать их статус в личном кабинете."
                autoclose={2.5}
                okButton="true"
                onOk={() => setRedirect(`/${clubAlias}/documents`)}
            />
        }
        {redirect && <Redirect to={redirect}/>}
        {errAlert &&
            <Alert
                title="Ошибка отправки"
                text={`Пожалуйста, проверьте правильность заполнения всех полей`}
                autoclose={2.5}
                onOk={() => setErrAlert(false)}
            />
        }
        {/*<aside className="documents-page__left">
            <CustomMenu title="Личный кабинет">
                <Link to={`/${clubAlias}/documents`} title="Оформление документов">Оформление документов</Link>
                <Link to="/reports" title="Отчеты">Отчеты</Link>
                <Link to={`/${clubAlias}`} title="Страница клуба">Страница клуба</Link>
            </CustomMenu>
        </aside>
        */}
        <div className="documents-page__right">
            <Form
                onSuccess={e => setOkAlert(true)}
                onError={e => console.log(e)||setErrAlert(true)}
                action={apiEndpoint}
                method={update ? "PUT" : "POST"}
                validationSchema={update ? updateSchema : validationSchema}
                onSubmit={e => console.log(e)}
                transformValues={transformValues}
                initialValues={initial}
                format="multipart/form-data"
            >
                <Card>
                    <h3>Регистрация заявления на регистрацию {distinction === "pedigree" ? "родословной" : "помета"}</h3>
                    {comment && <div className="alert alert-danger">
                        {comment}
                    </div>}
                    <FormGroup>
                        <FormField disabled={update} options={federations} fieldType="reactSelect" name="federation_id" label='Федерация' onChange={fedChange} placeholder="Выберите..."/>
                        <FormField disabled={update} name='first_name' label='Имя заявителя' />
                        <FormField disabled={update} name='last_name' label='Фамилия заявителя' />
                        <FormField disabled={update} name='second_name' label='Отчество заявителя (опционально)' />
                        <FormField disabled={update} name='phone' type="tel" fieldType="masked" showMask={true} mask={DEFAULT_PHONE_INPUT_MASK} label='Телефон заявителя' />
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
                        <FormField disabled={update} name='email' type="email" label='Email заявителя' />
                        <HideIf cond={!update}>
                            <FormField disabled name='folder_number' label='Номер папки'/>
                        </HideIf>
                    </FormGroup>
                    <DocItemList
                        name="declarants"
                        doctypes={doctypes}
                        breeds={breeds}
                        sexTypes={sexTypes}
                        fedName={fedName}
                        view={view}
                        update={update}
                        privacyHref={privacyHref}
                        verkHref={verkHref}
                        statuses={statuses}
                        clubAlias={clubAlias}
                        cash_payment={initial.cash_payment}
                        distinction={distinction}
                        litterStatuses={litterStatuses}
                    />
                </Card>
            </Form>
        </div>
    </div>
};

export default DocApply;
