import React, { useState, useEffect } from "react";
import ls from "local-storage";
import { Redirect, Link, useParams } from "react-router-dom";
import { Request } from "utils/request";
import Loading from "components/Loading";
import Alert from "components/Alert";
import Card from "components/Card";
import { Form } from "components/Form";

import PedigreeHeader from "./forms/PedigreeHeader";
import PedigreeTable from "./forms/PedigreeTable";
import PedigreePayment from "./forms/PedigreePayment";
import PedigreeDeclarant from "./forms/PedigreeDeclarant";

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


const DocApply = ({ clubAlias, history }) => {
    let distinction;
    const [draft, setDraft] = useState(false);
    const clubId = ls.get('profile_id') ? ls.get('profile_id') : '';

    const [okAlert, setOkAlert] = useState(false);
    const [errAlert, setErrAlert] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [id, setId] = useState(undefined);
    const [statusId, setStatusId] = useState(1);
    const [stage, setStage] = useState(0);
    const [statusAllowsUpdate, setStatusAllowsUpdate] = useState(true);



    let update = false, view = false;

    const stages = {
        header: 0,
        table: 1,
        declarant: 1,
        payment: 2
    }
    let url_stage, action;
    if (history) {
        let params = useParams();
        distinction = params.distinction || "pedigree";
        params.id && id !== params.id && setId(params.id);
        action = params.action || "form";
        url_stage = params.stage;
        url_stage && stages[url_stage] && stage !== stages[url_stage] && setStage(stages[url_stage]);
    } else (setRedirect('/404'))
        
    const setFormValues = values => {
        setDraft(update && !view && values && values.status_id === 7);
        setStatusAllowsUpdate(values.status_id ? [2,4,7].includes(values.status_id) : true);
    }
    const forms = {
        header: PedigreeHeader,
        table: PedigreeTable,
        payment: PedigreePayment,
        declarant: PedigreeDeclarant
    }

    const FormContent = forms[url_stage] || forms.header;
    //const onSuccess = values => {values && values.id && !id && setRedirect(`/${clubAlias}/documents/${distinction}/${values.id}/header/form`)}

    const Title = props => <><div className="documents-page__title">
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
            ]} active={stage}/></>


    return <div className={`documents-page__info DocApply ${okAlert ? 'view' : ''}`}>
        {okAlert &&
            <Alert
                {...(statusId === 7 ? draftAlertProps : sendAlertProps)}
                autoclose={2.5}
                okButton="true"
                onOk={() => setRedirect(`/${clubAlias}/documents`)}
            />
        }
        {redirect && <Redirect push to={redirect}/>}
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
            <FormContent
                {...{clubAlias, id, clubId, Title}}
            />
        </div>
    </div>
};

export default DocApply;
