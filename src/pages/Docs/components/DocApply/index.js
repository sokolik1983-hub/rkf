import React, { useState, useEffect } from "react";
import ls from "local-storage";
import { Redirect, Link } from "react-router-dom";
import { Request } from "utils/request";
import Loading from "components/Loading";
import Alert from "components/Alert";
import Card from "components/Card";
import { Form } from "components/Form";

import PedigreeHeader from "./forms/PedigreeHeader";
import PedigreeTable from "./forms/PedigreeTable";

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
    PedigreeHeader,
    PedigreeTable
]

const DocApply = ({ clubAlias, history, distinction }) => {
    const [draft, setDraft] = useState(false);
    const clubId = ls.get('profile_id') ? ls.get('profile_id') : '';

    const [loading, setLoading] = useState(true);
    const [okAlert, setOkAlert] = useState(false);
    const [errAlert, setErrAlert] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [id, setId] = useState(undefined);
    const [statusId, setStatusId] = useState(1);
    const [stage, setStage] = useState(0);
    const [statusAllowsUpdate, setStatusAllowsUpdate] = useState(true);

    let update = false, view = false;
    if (history) {
        let path = history.location.pathname.split('/');
        let x = path.pop();
        let hist_id = isNaN(x) ? path.pop() : x;
        if (hist_id !== id) setId(hist_id);
        update = true;
        view = x !== 'edit';
    }
        
    const setFormValues = values => {
        setDraft(update && !view && values && values.status_id === 7);
        setStatusAllowsUpdate(values.status_id ? [2,4,7].includes(values.status_id) : true);
    }
    draft && (update = false);
    
    const FormContent = forms[stage];
    const nextStage = values => {values.id && setId(values.id);stage++}
    const prevStage = values => {stage--}

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
            <FormContent
                {...{clubAlias, id, nextStage}}
            />
        </div>
    </div>
};

export default DocApply;
