import React from "react";
import {connect} from "formik";
import genericForm from "utils/genericForm";
import config from "./config.js";
import Button from "components/Button";
import Card from "components/Card";
import DocItem from "../../components/DocItemLitter";
import SubmitError from "../../components/SubmitError";

// litter
const DeclarantFormFields = connect(({formik, update, options, alias, setRedirect, send, initial, Title}) => {
    const {doctypes, breeds, sexTypes, statuses, stampCodes, litterStatuses} = options;
    const isNew = !initial.first_name;
    return <>
<Card>
<Title/>
            <DocItem
                i={0}
                active={true}
                {...{doctypes, breeds, sexTypes, view:false, update, statuses, stampCodes, alias, litterStatuses}}
            />
        </Card>
    <div className="stage-controls flex-row">
            <Button className="btn-condensed" onClick={e => window.confirm("Не сохраненные данные будут утеряны, вы уверены что хотите вернуться?") && setRedirect(`/${alias}/documents/litter/${formik.values.litter_request_id}/table/form`)}>Назад</Button>
        <SubmitError />
        <Button className="btn-condensed btn-green btn-light" onClick={e => send({
            method: !isNew ? "PUT" : "POST",
            action: config.url + (!isNew ? '/draft' : ''),
            button: 'none',
        }, formik)}>Сохранить</Button>
        <Button className="btn-condensed btn-green" onClick={e => send({
            method: !isNew ? "PUT" : "POST",
            action: config.url + (!isNew ? '/draft' : ''),
            button: 'next'
        }, formik)}>Сохранить и продолжить</Button>
    </div>
    </>
})

const HeaderForm = genericForm(DeclarantFormFields, config)

export default React.memo(HeaderForm)
