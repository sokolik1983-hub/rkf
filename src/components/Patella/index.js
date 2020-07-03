import React, { useState } from "react";
import ls from "local-storage";
import { Redirect, useParams } from "react-router-dom";
import Alert from "components/Alert";

import Dysplasia from "./forms/Dysplasia";
import PatellaForm from "./forms/Dysplasia";
import DocHeadClub from "pages/Docs/components/DocHead";
import DocHeadKennel from "pages/NurseryDocuments/components/DocHead";

import './index.scss';

const forms = {
    "dysplasia": {
        form: Dysplasia,
        title: "Сертификат о проверке на дисплазию",
    },
    "patella": {
        form: PatellaForm,
        title: "Сертификат клинической оценки коленных суставов (PL) (пателла)",
    }
};

const Patella = ({ alias, history, distinction, profileType }) => {
    const DocHead = profileType === "kennel" ? DocHeadKennel : DocHeadClub;
    const profileId = ls.get('profile_id') ? ls.get('profile_id') : '';

    const [errAlert, setErrAlert] = useState(false);
    const [redirect, setRedirect] = useState(false);

    let update = false, view = false, id = undefined, reqtype = distinction ? distinction : "patella";

    if (history) {
        let params = useParams();
        update = params.action === "edit" || params.action === "view";
        view = params.action === "view";
        id = params.id;
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

export default Patella;
