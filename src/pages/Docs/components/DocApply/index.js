import React, { useState } from "react";
import ls from "local-storage";
import { Redirect, useParams } from "react-router-dom";
import Alert from "components/Alert";

import PedigreeHeader from "./forms/PedigreeHeader";
import PedigreeTable from "./forms/PedigreeTable";
import PedigreePayment from "./forms/PedigreePayment";
import PedigreeDeclarant from "./forms/PedigreeDeclarant";

import StageStrip from "./components/StageStrip";
import DocHead from "../DocHead";

import './index.scss';

const DocApply = ({ clubAlias, history }) => {
    let distinction;
    //const [draft, setDraft] = useState(false);
    const clubId = ls.get('profile_id') ? ls.get('profile_id') : '';

    const [errAlert, setErrAlert] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [id, setId] = useState(undefined);
    const [stage, setStage] = useState(0);
    //const [statusAllowsUpdate, setStatusAllowsUpdate] = useState(true);



    let update = false, view = false;

    const stages = {
        header: 0,
        table: 1,
        declarant: 1,
        payment: 2
    }
    let url_stage;//, action;
    if (history) {
        let params = useParams();
        distinction = params.distinction || "pedigree";
        params.id && id !== params.id && setId(params.id);
        //action = params.action || "form";
        url_stage = params.stage;
        url_stage && stages[url_stage] && stage !== stages[url_stage] && setStage(stages[url_stage]);
    } else (setRedirect('/404'))
        
    /*const setFormValues = values => {
        setDraft(update && !view && values && values.status_id === 7);
        setStatusAllowsUpdate(values.status_id ? [2,4,7].includes(values.status_id) : true);
    }*/
    const forms = {
        header: PedigreeHeader,
        table: PedigreeTable,
        payment: PedigreePayment,
        declarant: PedigreeDeclarant
    }

    const FormContent = forms[url_stage] || forms.header;

    const Title = props => <><div>
        <DocHead text={distinction === "pedigree" ? "Регистрация заявления на оформление родословной" : "Оформление заявления на регистрацию помёта"} link={`/${clubAlias}/documents`} history={history}/>
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


    return <div className={`documents-page__info DocApply ${errAlert ? 'view' : ''}`}>
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
                {...{clubAlias, id, clubId, Title, update, view}}
            />
        </div>
    </div>
};

export default DocApply;
