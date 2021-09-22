import React, { useState, useEffect } from "react";
import ls from "local-storage";
import { Redirect, Link } from "react-router-dom";
import { Request } from "utils/request";
import Loading from "components/Loading";
import Alert from "components/Alert";
import Card from "components/Card";
import { Form } from "components/Form";
import DocItemList from "../DocItemList";
import removeNulls from "utils/removeNulls";
import './index.scss';

import {
    emptyNurseryPedigreeDeclarant,
    emptyNurseryLitterDeclarant,
    pedigreeValidationSchema,
    litterValidationSchema,
    pedigreeUpdateSchema,
    litterUpdateSchema,
    apiStampCodesEndpoint,
    apiNurseryDeclarantsEndpoint,
    apiPedigreeEndpoint,
    apiLitterEndpoint
} from "../../config.js";

const sendAlertProps = {
    title: "Документы отправлены",
    text: "Документы отправлены на рассмотрение. Вы можете отслеживать их статус в личном кабинете."
}

const sendAlertEmptyProps = {
    title: "Вы не внесли никаких изменений",
    text: "Необходимо внести изменения перед отправкой"
}

const draftAlertProps = {
    title: "Заявка сохранена",
    text: "Заявка сохранена. Вы можете отредактировать ее в личном кабинете."
}

const DocApply = ({ nurseryAlias, history, distinction }) => {
    const [draft, setDraft] = useState(false);
    const apiEndpoint = (distinction === "pedigree" ? apiPedigreeEndpoint : apiLitterEndpoint) + (draft ? '/draft/' : '');
    const updateSchema = distinction === "pedigree" ? pedigreeUpdateSchema : litterUpdateSchema;
    const validationSchema = distinction === "pedigree" ? pedigreeValidationSchema : litterValidationSchema;
    const [stampCodes, setStampCodes] = useState([]);
    const [declarants, setDeclarants] = useState([]);
    const nurseryId = ls.get('profile_id') ? ls.get('profile_id') : '';
    let stamp_code_id = stampCodes && stampCodes[0] && stampCodes[0].value;
    let stamp_code_name = (stampCodes && stampCodes[0]) ? stampCodes[0].label : '';
    let declarant_id = declarants && declarants[0] && declarants[0].id;
    const initialValues = {
        express: false,
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
        declarants: [distinction === "pedigree" ? { ...emptyNurseryPedigreeDeclarant, stamp_code_name } : { ...emptyNurseryLitterDeclarant, stamp_code_id }],
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
    const [noChangeAlert, setNoChangeAlert] = useState(false);
    const [errAlert, setErrAlert] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [values, setValues] = useState({});
    const [statusId, setStatusId] = useState(1);
    const [statusAllowsUpdate, setStatusAllowsUpdate] = useState(true);

    let update = false, id, view = false;
    if (history) {
        let path = history.location.pathname.split('/');
        let x = path.pop();
        id = isNaN(x) ? path.pop() : x;
        update = true;
        view = x !== 'edit';
    }
    let initial = { ...initialValues, ...removeNulls(values) };
    values.declarants &&
        (initial = {
            ...initial,
            declarants: values.declarants &&
                values.declarants
                    .filter(d => !!d.declarant)
                    .map(d => ({
                        ...d.declarant,
                        status_id: d.status_id,
                        documents: d.documents,
                        barcode: d.barcode,
                        litters: d.litters,
                        rejected_comment: d.rejected_comment,
                        comment: ''
                    }))
        });
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
        //if (update) {
        setStatusId(values.status_id);
        let r = filterBySchema(values, (update ? updateSchema : validationSchema).fields);
        if (!(r.payment_document instanceof File)) {
            delete r.payment_document;
        }
        r.declarants.forEach(d => {
            Object.keys(d).forEach(k => {
                if (d[k] === '') {
                    delete d[k];
                }
            });
            if (!d.documents) return;
            d.documents.forEach(doc => {
                if (!doc.document) {
                    delete doc.document;
                }
            });
        });
        return r;
        //} else {
        //    let r = filterBySchema(values, validationSchema.fields);
        //    return r;
        //}
    }

    const setFormValues = values => {
        setValues(values);
        setDraft(update && !view && values && values.status_id === 7);
        setStatusAllowsUpdate(values.status_id ? [2, 4, 7].includes(values.status_id) : true);
    }
    draft && (update = false);

    const PromiseRequest = url => new Promise((res, rej) => Request({ url }, res, rej));
    useEffect(() => {
        (() => Promise.all([
            PromiseRequest(apiNurseryDeclarantsEndpoint)
                .then(data => setDeclarants(data.sort((a, b) => Number(b.is_default) - Number(a.is_default)))),
            PromiseRequest(`${apiStampCodesEndpoint}?id=${nurseryId}`)
                .then(data => setStampCodes(data.sort((a, b) => Number(b.is_default) - Number(a.is_default)).map(m => ({ value: m.stamp_code_id, label: m.stamp_code })))),
            update ? PromiseRequest(apiEndpoint + '?id=' + id).then(values => values ? setFormValues(values) : setRedirect('/404')) : new Promise(res => res())
        ]).then(() => setLoading(false))
            .catch(error => {
                console.log(error.response);
                setRedirect('/404');
                if (error.response) alert(`Ошибка: ${error.response.status}`);
                setLoading(false);
            }))();
    }, []);

    const getErrorText = e => {
        if (e.response) {
            return e.response.data.errors
                ? Object.values(e.response.data.errors)
                : `${e.response.status} ${e.response.statusText}`;
        } else {
            return 'Пожалуйста, проверьте правильность заполнения всех полей'
        }
    };

    const comment = initial.rejected_comment && initial.rejected_comment.comment;

    const showAlert = () => {
        window.alert("Заявка отправлена на рассмотрение");
        setRedirect(`/kennel/${nurseryAlias}/documents`);
    }

    return loading ? <Loading /> : <div className={`documents-page__info DocApply ${okAlert ? 'view' : ''}`}>

         {/*{noChangeAlert && console.log('noChangeAlert') &&
             <Alert
                 {...(sendAlertEmptyProps)}
                 autoclose={2.5}
                 okButton="true"
                 onOk={() => setRedirect(`/kennel/${nurseryAlias}/documents`)}
             />
         }
        {okAlert && console.log('okAlert') &&
            <Alert
                {...(statusId === 7 ? draftAlertProps : sendAlertProps)}
                // title="Заявка отправлена на рассмотрение"
                autoclose="false"
                okButton="true"
                onOk={() => setRedirect(`/kennel/${nurseryAlias}/documents`)}
            />
        }*/}
        {redirect && <Redirect to={redirect} />}
        {errAlert && console.log('errAlert') &&
            <Alert
                title="Ошибка отправки"
                text={getErrorText(errAlert)}
                autoclose={2.5}
                onOk={() => setErrAlert(false)}
            />
        }
        <div className="documents-page__right">
            <Form
                onSuccess={showAlert}
                onError={e => console.log(e) || setErrAlert(true)}
                action={apiEndpoint}
                method={update || draft ? "PUT" : "POST"}
                validationSchema={update ? updateSchema : validationSchema}
                onSubmit={e => console.log(e)}
                transformValues={transformValues}
                initialValues={initial}
                format="multipart/form-data"
                noEnter={true}
            >
                <Card>
                    <div className="nursery-documents-status__head">
                        <Link className="btn-backward" to={`/kennel/${nurseryAlias}/documents`}>Личный кабинет</Link>
                    </div>
                    <h3>{distinction === "pedigree" ? "Регистрация заявления на оформление родословной" : "Оформление на регистрацию помёта"}</h3>
                    {comment && <div className="alert alert-danger">
                        {comment}
                    </div>}
                    <DocItemList
                        name="declarants"
                        {...{ view, update, distinction, stampCodes, declarants, cash_payment, statusAllowsUpdate, nurseryAlias }}
                    />
                </Card>
            </Form>
        </div>
    </div>
};

export default DocApply;
