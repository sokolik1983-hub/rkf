import React, { useState } from "react";
import ls from "local-storage";
import { Redirect, useParams } from "react-router-dom";
import Alert from "components/Alert";
import PedigreeHeader from "./forms/PedigreeHeader";
import PedigreeTable from "./forms/PedigreeTable";
import PedigreePayment from "./forms/PedigreePayment";
import NurseryPedigreeDeclarant from "./forms/PedigreeDeclarant";
import LitterHeader from "./forms/LitterHeader";
import LitterTable from "./forms/LitterTable";
import LitterPayment from "./forms/LitterPayment";
import NurseryLitterDeclarant from "./forms/LitterDeclarant";
import StageStrip from "./components/StageStrip";
import DocHead from "../DocHead";
import FooterFeedback from "../../../../components/Layouts/FooterFeedback";

import './index.scss';

const forms = {
    pedigree: {
        header: PedigreeHeader,
        table: PedigreeTable,
        payment: PedigreePayment,
        declarant: NurseryPedigreeDeclarant
    },
    litter: {
        header: LitterHeader,
        table: LitterTable,
        payment: LitterPayment,
        declarant: NurseryLitterDeclarant
    }
}

const DocApply = ({ nurseryAlias, history }) => {
    const alias = nurseryAlias;
    let distinction;
    const profileId = ls.get('profile_id') ? ls.get('profile_id') : '';

    const [errAlert, setErrAlert] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [id, setId] = useState(undefined);
    const [stage, setStage] = useState(0);

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
        url_stage = params.stage || "header";
        url_stage && stages[url_stage] && stage !== stages[url_stage] && setStage(stages[url_stage]);
    } else (setRedirect('/404'))

    const FormContent = (forms[distinction] || forms.pedigree)[url_stage] || forms.pedigree.header;

    const Title = props => <><div>
        <DocHead text={distinction === "pedigree" ? "Регистрация заявления на оформление родословной" : "Оформление заявления на регистрацию помёта"} link={`/kennel/${alias}/documents`} history={history}/>
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
        <div className="documents-page__right">
            <FormContent
                {...{alias, id, profileId, Title, update, view}}
            />
            <FooterFeedback />
        </div>
    </div>
};

export default DocApply;
