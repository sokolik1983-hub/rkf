import React, { useState, useEffect } from "react";
import ls from "local-storage";
import { Redirect, Link } from "react-router-dom";
import { Request } from "utils/request";
import Loading from "components/Loading";
import Alert from "components/Alert";
import Card from "components/Card";
import { Form } from "components/Form";
import DocItemList from "../DocItemList";
//import { Link } from "react-router-dom";
//import CustomMenu from "components/CustomMenu";
import removeNulls from "utils/removeNulls";
import './index.scss';

import {
    emptyPedigreeDeclarant,
    emptyLitterDeclarant,
    pedigreeValidationSchema,
    litterValidationSchema,
    pedigreeUpdateSchema,
    litterUpdateSchema,
    apiStampCodesEndpoint,
    apiClubDeclarantsEndpoint,
    apiPedigreeEndpoint,
    apiLitterEndpoint
} from "../../config.js";

const DocApply = ({ clubAlias, history, distinction }) => {
    const apiEndpoint = distinction === "pedigree" ? apiPedigreeEndpoint : apiLitterEndpoint;
    const updateSchema = distinction === "pedigree" ? pedigreeUpdateSchema : litterUpdateSchema;
    const validationSchema = distinction === "pedigree" ? pedigreeValidationSchema : litterValidationSchema;
    const [stampCodes, setStampCodes] = useState([]);
    const [declarants, setDeclarants] = useState([]);
    const clubId = ls.get('profile_id') ? ls.get('profile_id') : '';
    let stamp_code_id = stampCodes && stampCodes[0] && stampCodes[0].value;
    let declarant_id = declarants && declarants[0] && declarants[0].id;
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
        declarants: [distinction === "pedigree" ? {...emptyPedigreeDeclarant, stamp_code_id} : {...emptyLitterDeclarant, stamp_code_id}],
    
        cash_payment: false,
        payment_document: '',
        payment_date: '',
        payment_number: '',
        payment_name: '',
        inn: '',

        full_name: '',
        address: '',
        subscriber_mail: '',
        declarant_id
    };
    const [loading, setLoading] = useState(true);
    const [okAlert, setOkAlert] = useState(false);
    const [errAlert, setErrAlert] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [values, setValues] = useState({});

    let update = false, id, view = false;
    if (history) {
        let path = history.location.pathname.split('/');
        let x = path.pop();
        id = isNaN(x) ? path.pop() : x;
        update = true;
        view = x !== 'edit';
    }
    let initial = {...initialValues, ...removeNulls(values)};
    let cash_payment = initial.cash_payment;
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
            PromiseRequest(apiClubDeclarantsEndpoint)
            .then(data => setDeclarants(data.sort((a,b) => Number(b.is_default) - Number(a.is_default)))),
            PromiseRequest(`${apiStampCodesEndpoint}?id=${clubId}`)
            .then(data => setStampCodes(data.sort((a,b) => Number(b.is_default) - Number(a.is_default)).map(m => ({value: m.id, label:m.stamp_code})))),
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
                    <div className="club-documents-status__head">
                        <Link className="btn-backward" to={`/${clubAlias}/documents`}>Личный кабинет</Link>
                    </div>
                    <h3>{distinction === "pedigree" ? "Регистрация заявления на оформление родословной" : "Оформление на регистрацию помёта"}</h3>
                    {comment && <div className="alert alert-danger">
                        {comment}
                    </div>}
                    <DocItemList
                        name="declarants"
                        {...{view, update, distinction, stampCodes, declarants, cash_payment}}
                    />
                </Card>
            </Form>
        </div>
    </div>
};

export default DocApply;
