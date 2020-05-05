import React, { useState, useEffect } from "react";
import ls from "local-storage";
import { Redirect, Link } from "react-router-dom";
import { Request } from "utils/request";
import Loading from "components/Loading";
import Alert from "components/Alert";
import Card from "components/Card";
import { Form } from "components/Form";
import PedigreeHeader from "./forms/PedigreeHeader";
import HideIf from "components/HideIf";
import Button from "components/Button";
import StageStrip from "./components/StageStrip";
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
} from "./config.js";

const sendAlertProps = {
    title: "Документы отправлены",
    text: "Документы отправлены на рассмотрение. Вы можете отслеживать их статус в личном кабинете."
}

const draftAlertProps = {
    title: "Заявка сохранена",
    text: "Заявка сохранена. Вы можете отредактировать ее в личном кабинете."
}

const forms = [
    PedigreeHeader
]

const DocApply = ({ clubAlias, history, distinction }) => {
    const [draft, setDraft] = useState(false);
    const apiEndpoint = (distinction === "pedigree" ? apiPedigreeEndpoint : apiLitterEndpoint) + (draft ? '/draft/' : '');
    //console.log(apiEndpoint);
    const updateSchema = distinction === "pedigree" ? pedigreeUpdateSchema : litterUpdateSchema;
    const validationSchema = distinction === "pedigree" ? pedigreeValidationSchema : litterValidationSchema;
    const [stampCodes, setStampCodes] = useState([]);
    const [declarants, setDeclarants] = useState([]);
    const clubId = ls.get('profile_id') ? ls.get('profile_id') : '';
    let stamp_code_id = stampCodes && stampCodes[0] && stampCodes[0].value;
    let stamp_code_name = (stampCodes && stampCodes[0]) ? stampCodes[0].label : '';
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
        declarants: [distinction === "pedigree" ? {...emptyPedigreeDeclarant, stamp_code_name} : {...emptyLitterDeclarant, stamp_code_id}],
    
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
    const [statusId, setStatusId] = useState(1);
    const [stage, setStage] = useState(0);
    const [statusAllowsUpdate, setStatusAllowsUpdate] = useState(true);

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
        
    const setFormValues = values => {
        setValues(values);
        setDraft(update && !view && values && values.status_id === 7);
        setStatusAllowsUpdate(values.status_id ? [2,4,7].includes(values.status_id) : true);
    }
    draft && (update = false);
    
    const PromiseRequest = url => new Promise((res,rej) => Request({url},res,rej));
    useEffect(() => {
        (() => Promise.all([
            PromiseRequest(apiClubDeclarantsEndpoint)
            .then(data => setDeclarants(data.sort((a,b) => Number(b.is_default) - Number(a.is_default)))),
            PromiseRequest(`${apiStampCodesEndpoint}?id=${clubId}`)
            .then(data => setStampCodes(data.sort((a,b) => Number(b.is_default) - Number(a.is_default)).map(m => ({value: m.stamp_code_id, label:m.stamp_code})))),
            update ? PromiseRequest(apiEndpoint + '?id=' + id).then(values => values ? setFormValues(values) : setRedirect('/404')) : new Promise(res => res())
        ]).then(() => setLoading(false))
        .catch(error => {
            console.log(error.response);
            setRedirect('/404');
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
        }))();
    }, []);

    const comment = initial.rejected_comment && initial.rejected_comment.comment;
    const FormContent = forms[stage];

    return loading ? <Loading/> : <div className={`documents-page__info DocApply ${okAlert ? 'view' : ''}`}>
        {okAlert &&
            <Alert
                {...(statusId === 7 ? draftAlertProps : sendAlertProps)}
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
            <div className="documents-page__title">
                <h3>{distinction === "pedigree" ? "Регистрация заявления на оформление родословной" : "Оформление заявления на регистрацию помёта"}</h3>
                <div className="divider"/>
            </div>
            <StageStrip items={[
                {
                    icon: 'pen-opaque',
                    text: 'Основная информация'
                },
                {
                    icon: 'pen-opaque',
                    text: 'Заявки'
                },
                {
                    icon: 'pen-opaque',
                    text: 'Информация об оплате'
                }
            ]} active={stage}/>
            <FormContent />
        </div>
    </div>
};

export default DocApply;
