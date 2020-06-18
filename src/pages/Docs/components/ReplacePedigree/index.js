import React, { useState } from "react";
import ls from "local-storage";
import { Redirect, useParams } from "react-router-dom";
import Alert from "components/Alert";

import DuplicateRequest from "./forms/DuplicateRequest";
import DocHead from "../DocHead";

import './index.scss';

const forms = {
    duplicate: DuplicateRequest
};

const ReplacePedigree = ({ alias, history }) => {
    let distinction;
    const profileId = ls.get('profile_id') ? ls.get('profile_id') : '';

    const [errAlert, setErrAlert] = useState(false);
    const [redirect, setRedirect] = useState(false);

    let update = false, view = false, id = undefined, reqtype = "duplicate";

    if (history) {
        let params = useParams();
        update = params.action === "edit" || params.action === "view";
        view = params.action === "view";
        id = params.id;
        reqtype = params.reqtype || reqtype;
    } else (setRedirect('/404'))

    const FormContent = forms[reqtype] || forms.duplicate;

    const Title = props => <div>
        <DocHead text={"Регистрация заявления на замену родословной по заявлению о выдаче дубликата"} link={`/${alias}/documents`} history={history}/>
            </div>;


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
        <div className="documents-page__right">
            <FormContent
                {...{alias, id, profileId, Title, update, view}}
            />
        </div>
    </div>
};

export default ReplacePedigree;
