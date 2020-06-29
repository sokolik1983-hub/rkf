import React, { useState } from "react";
import ls from "local-storage";
import { Redirect, useParams } from "react-router-dom";
import Alert from "components/Alert";

import ExportOldRequest from "./forms/ExportOldRequest";
import InnerOldRequest from "./forms/InnerOldRequest";
import DuplicateRequest from "./forms/DuplicateRequest";
import ReplacePedigreeOwner from "./forms/ReplacePedigreeOwner";
import ReplacePedigreeOutRKFFCI from "./forms/ReplacePedigreeOutRKFFCI";
import ReplacePedigreeForeign from "./forms/ReplacePedigreeForeign";
import ReplaceDeclarantError from "./forms/DeclarantError";
import DocHead from "../DocHead";

import './index.scss';

const forms = {
    "1": {
        form: ExportOldRequest,
        title: "Регистрация заявления на замену родословной по экспортной родословной старого образца",
    },
    "2": {
        form: InnerOldRequest,
        title: "Регистрация заявления на замену родословной по внутренней родословной старого образца",
    },
    "3": {
        form: DuplicateRequest,
        title: "Регистрация заявления на замену родословной по заявлению о выдаче дубликата",
    },
    "4": {
        form: ReplacePedigreeOwner,
        title: "Регистрация заявления на замену родословной по заявлению на смену владельца",
    },
    "5": {
        form: ReplacePedigreeOutRKFFCI,
        title: "Регистрация заявления на замену родословной по родословной выданной вне системы РКФ/FCI",
    },
    "6": {
        form: ReplacePedigreeForeign,
        title: "Регистрация иностранной родословной",
    },
    "7": {
        form: ReplaceDeclarantError,
        title: "Замена родословной по ошибке заявителя",
    },
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

    const FormContent = (forms[reqtype] || forms[3]).form;
    const FormTitle = (forms[reqtype] || forms[3]).title;

    const Title = props => <div>
        <DocHead text={FormTitle} link={`/${alias}/documents`} history={history}/>
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
