import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Request } from "utils/request";
import Loading from "components/Loading";
import Alert from "components/Alert";
import Card from "components/Card";
import HideIf from "components/HideIf";
import { Form, FormGroup, FormField } from "components/Form";
import { object, string, array, number, boolean } from "yup";
import DocItemList from "../DocItemList";
import { Link } from "react-router-dom";
import CustomMenu from "components/CustomMenu";
import { endpointGetFederations } from "pages/Clubs/config";
import { emptyDeclarant } from "../../config.js"
import { DEFAULT_PHONE_INPUT_MASK } from "appConfig";
import './index.scss';

const apiEndpoint = '/api/clubs/requests/PedigreeRequest';
const apiDoctypeEndpoint = '/api/clubs/requests/PedigreeRequest/additional_document_types';
const apiBreedsEndpoint = '/api/dog/Breed';
const apiSexTypesEndpoint = '/api/dog/Breed/sex_types';
const apiPrivacyEndpoint = '/api/clubs/requests/PedigreeRequest/personal_data_document';
const apiStatusesEndpoint = '/api/clubs/requests/PedigreeRequest/status';


const reqText = 'Обязательное поле';
const reqEmail = 'Необходимо ввести email';

const validationSchema = object().shape({
    federation_id: number().required(reqText).typeError(reqText),
    last_name: string().required(reqText),
    first_name: string().required(reqText),
    second_name: string(),
    phone: string().required(reqText),
    address: string().required(reqText),
    email: string().required(reqText).email(reqEmail),
    declarants: array().of(object().shape({
        owner_first_name: string().required(reqText),
        owner_last_name: string().required(reqText),
        owner_second_name: string(),
        owner_address: string().required(reqText),
        owner_address_lat: string().required(reqText),
        owner_first_name_lat: string().required(reqText),
        owner_last_name_lat: string().required(reqText),

        breed_id: number().required(reqText).typeError(reqText),
        dog_name: string().required(reqText),
        dog_name_lat: string().required(reqText),
        dog_birth_date: string().required(reqText),
        dog_sex_type: number().required(reqText).typeError(reqText),
        stamp_number: string().required(reqText),
        color: string().required(reqText),

        father_name: string().required(reqText),
        father_pedigree_number: string().required(reqText),
        mother_name: string().required(reqText),
        mother_pedigree_number: string().required(reqText),

        breeder_first_name: string().required(reqText),
        breeder_last_name: string().required(reqText),
        breeder_second_name: string(),
        breeder_address: string().required(reqText),

        email: string().required(reqText).email(reqEmail),
        was_reviewed: boolean().required(reqText),
        litter_or_request_number: string(),
        biometric_card_document: string().required(reqText),
        personal_data_document: string().required(reqText),
        chip_number: string(),
        documents: array().of(object().shape({
            id: number(),
            document_type_id: number(),
            document: string()
        }))
    })),
    payment_document: string().required(reqText),
    payment_date: string().required(reqText),
    payment_number: string().required(reqText),
    ogrn: string()
});

const updateSchema = object().shape({
    id: number(),
    declarants: array().of(object().shape({
        id: number(),
        declarant_uid: string(),
        biometric_card_document: string(),
        personal_data_document: string(),
        documents: array().of(object().shape({
            id: number(),
            document_type_id: number(),
            document: string()
        }))
    })),
    payment_document: string(),
    payment_date: string(),
    payment_number: string(),
    payment_name: string().required(reqText)
});

const initialValues = {
    federation_id: 0,
    last_name: '',
    first_name: '',
    second_name: '',
    phone: '',
    address: '',
    email: '',
    folder_number: '',
    declarants: [emptyDeclarant],

    payment_document: '',
    payment_date: '',
    payment_number: '',
    payment_name: '',
    ogrn: ''
};

const DocApply = ({ clubAlias, history, distinction }) => {
    const [federations, setFederations] = useState([]);
    const [doctypes, setDoctypes] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [sexTypes, setSexTypes] = useState([]);
    const [privacyHref, setPrivacyHref] = useState('');
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
            fetch(apiPrivacyEndpoint)
            .then(response => response.blob())
            .then(data => setPrivacyHref(URL.createObjectURL(data))),
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
        <aside className="documents-page__left">
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
                text={`Сервер вернул ошибку`}
                okButton="true"
                onOk={() => setErrAlert(false)}
            />
        }
            <CustomMenu title="Личный кабинет">
                <Link to={`/${clubAlias}/documents`} title="Оформление документов">Оформление документов</Link>
                <Link to="/reports" title="Отчеты">Отчеты</Link>
                <Link to={`/${clubAlias}`} title="Страница клуба">Страница клуба</Link>
            </CustomMenu>
        </aside>
        <div className="documents-page__right">
            <Form
                onSuccess={e => setOkAlert(true)}
                action={apiEndpoint}
                method={update ? "PUT" : "POST"}
                validationSchema={update ? updateSchema : validationSchema}
                onSubmit={e => console.log(e)}
                transformValues={transformValues}
                initialValues={initial}
                format="multipart/form-data"
            >
                <Card>
                    <h3>Регистрация заявления на регистрацию родословной</h3>
                    {comment && <div className="alert alert-danger">
                        {comment}
                    </div>}
                    <FormGroup>
                        <FormField disabled={update} options={federations} fieldType="reactSelect" name="federation_id" label='Федерация' onChange={fedChange} placeholder="Выберите..."/>
                        <FormField disabled={update} name='first_name' label='Имя заявителя' />
                        <FormField disabled={update} name='last_name' label='Фамилия заявителя' />
                        <FormField disabled={update} name='second_name' label='Отчество заявителя (если есть)' />
                        <FormField disabled={update} name='phone' type="tel" fieldType="masked" showMask={true} mask={DEFAULT_PHONE_INPUT_MASK} label='Телефон заявителя' />
                        <FormField disabled={update} name='address' label='Адрес заявителя' />
                        <FormField disabled={update} name='email' type="email" label='Email заявителя' />
                        <HideIf cond={!update}>
                            <FormField disabled name='folder_number' label='Номер папки'/>
                        </HideIf>
                    </FormGroup>
                </Card>
                <DocItemList
                    name="declarants"
                    doctypes={doctypes}
                    breeds={breeds}
                    sexTypes={sexTypes}
                    fedName={fedName}
                    view={view}
                    update={update}
                    privacyHref={privacyHref}
                    statuses={statuses}
                    clubAlias={clubAlias}
                />
            </Form>
        </div>
    </div>
};

export default DocApply;
