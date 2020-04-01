import React, { useState, useEffect } from "react";
import { Request } from "utils/request";
import PlusButton from "components/PlusButton";
import Loading from "components/Loading";
import Alert from "components/Alert";
import Card from "components/Card";
import Button from "components/Button";
import { Form, FormGroup, FormField } from "components/Form";
import FormFile from "../../components/FormFile";
import { FieldArray } from "formik";
import { object, string, array, number, boolean } from "yup";
import DocItemList from "../DocItemList";
import { Link } from "react-router-dom";
import CustomMenu from "components/CustomMenu";
import { endpointGetFederations } from "pages/Clubs/config";
import { emptyDeclarant } from "../../config.js"
import './index.scss';

const apiEndpoint = '/api/clubs/requests/PedigreeRequest';
const apiDoctypeEndpoint = '/api/clubs/requests/LitterRequest/additional_document_types';
const apiBreedsEndpoint = '/api/dog/Breed';
const apiSexTypesEndpoint = '/api/dog/Breed/sex_types';

const reqText = 'Обязательное поле';
const reqEmail = 'Необходимо ввести email';

const validationSchema = object().shape({
    federation_id: number().required(reqText).typeError(reqText),
    last_name: string().required(reqText),
    first_name: string().required(reqText),
    second_name: string().required(reqText),
    phone: string().required(reqText),
    address: string().required(reqText),
    email: string().required(reqText).email(reqEmail),
    declarants: array().of(object().shape({
        owner_first_name: string().required(reqText),
        owner_last_name: string().required(reqText),
        owner_second_name: string().required(reqText),
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
        breeder_second_name: string().required(reqText),
        breeder_address: string().required(reqText),

        email: string().required(reqText).email(reqEmail),
        folder_number: string().required(reqText),
        was_reviewed: boolean().required(reqText),
        litter_or_request_number: string().required(reqText),
        biometric_card_document: string().required(reqText),
        personal_data_document: string().required(reqText)
    })),
    payment_document: string().required(reqText),
    payment_date: string().required(reqText),
    payment_number: string().required(reqText),
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
    declarants: [emptyDeclarant],

    payment_document: '',
    payment_date: '',
    payment_number: '',
    payment_name: ''
};

const DocApply = ({ clubAlias, history, distinction }) => {
    const [docItems, setDocItems] = useState([0]);
    const [federations, setFederations] = useState([]);
    const [doctypes, setDoctypes] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [sexTypes, setSexTypes] = useState([]);
    const [fedName, setFedName] = useState('федерации');
    const [loading, setLoading] = useState(true);
    const [force, setForce] = useState(false);
    const [okAlert, setOkAlert] = useState(false);
    const [errAlert, setErrAlert] = useState(false);
    const [formValid, setFormValid] = useState({});
    const [res, setResponse] = useState({});
    const [moreItems, setMoreItems] = useState(1);
    const [values, setValues] = useState({});
    const fedChange = e => setFedName(e.label);
    const clearClick = e => {
        setDocItems([]);
    }
    const submit = () => {
        let fd = new FormData(document.getElementsByTagName('form')[0]);
        setForce(true);
        let valid = Object.values(formValid).every(x=>x);
        valid && Request({url: apiEndpoint, method: 'POST', data: fd},
            data => {
                setOkAlert(true);
            }, error => {
            setResponse(error.response);
            setErrAlert(true);
        });
    }

    const update = !!history;
    const id = update && history.location.pathname.split('/').pop();
    let initial = {...initialValues, ...values};
    
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
            update ? PromiseRequest(apiEndpoint + '?id=' + id).then(setValues) : new Promise(res => res())
        ]).then(() => setLoading(false))
        .catch(error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
        }))();
    }, []);

    return loading ? <Loading/> : <div className="documents-page__info DocApply">
        <aside className="documents-page__left">
        {okAlert &&
            <Alert
                title="Документы отправлены"
                text="Документы отправлены на рассмотрение. Вы можете отслеживать их статус в личном кабинете."
                autoclose={1.5}
                onOk={() => setOkAlert(false)}
            />
        }
        {errAlert &&
            <Alert
                title="Ошибка отправки"
                text={`Сервер вернул ошибку: ${res.status} - ${res.statusText}`}
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
                onSuccess={() => setErrAlert(true)}
                action={apiEndpoint}
                method={update ? "PUT" : "POST"}
                validationSchema={validationSchema}
                transformValues={v => console.log(v)||v}
                initialValues={initial}
                format="multipart/form-data"
            >
                <Card>
                    <h3>Регистрация заявления на регистрацию родословной</h3>
                    <FormGroup>
                        <FormField options={federations} fieldType="reactSelect" name="federation_id" label='Федерация' onChange={fedChange} placeholder="Выберите..."/>
                        <FormField name='first_name' label='Имя заявителя' />
                        <FormField name='last_name' label='Фамилия заявителя' />
                        <FormField name='second_name' label='Отчество заявителя' />
                        <FormField name='phone' type="tel" label='Телефон заявителя' />
                        <FormField name='address' label='Адрес заявителя' />
                        <FormField name='email' type="email" label='Email заявителя' />
                    </FormGroup>
                </Card>
                <DocItemList name="declarants" doctypes={doctypes} breeds={breeds} sexTypes={sexTypes} />
                <Card>
                    <FormGroup>
                        <p><b>Приложите квитанцию об оплате {docItems.length} заявок по тарифу {fedName} и заполните информацию о платеже.</b></p>
                        <FormFile name='payment_document' label='Квитанция об оплате' accept="application/pdf" />
                        <FormField name='payment_date' label='Дата оплаты' fieldType="reactDayPicker" />
                        <FormField name='payment_number' label='Номер платежного документа' />
                        <FormField name='payment_name' label='ФИО плательщика / юр. лица' />
                    </FormGroup>
                </Card>
                <div className="flex-row">
                    <Button className="btn-green" type="submit">Сохранить</Button>
                    <Link to={`/${clubAlias}/documents`}><Button className="btn-transparent">Закрыть</Button></Link>
                </div>
            </Form>
        </div>
    </div>
};

export default DocApply;
