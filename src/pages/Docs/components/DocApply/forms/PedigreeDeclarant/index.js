import React, {useState} from "react";
import {connect} from "formik";
import {Link} from "react-router-dom";
import removeNulls from "utils/removeNulls";
import { FormGroup, FormField } from "components/Form";
import genericForm from "../../utils/genericForm";
import config from "./config.js";
import Button from "components/Button";
import HideIf from "components/HideIf";
import Card from "components/Card";
import DocItem from "../../components/DocItemPedigree";

// pedigree
const DeclarantFormFields = connect(({formik, update, options, clubAlias, setRedirect, send}) => {
    const setDeclarant = value => {
        let declarant = options.declarants.find(f => f.id === value);
        if (!declarant) return;
        Object.keys(removeNulls(declarant))
        .forEach(key => key === "id" || formik.setFieldValue(key, declarant[key]));
    }
           const {doctypes, breeds, sexTypes, statuses, stampCodes} = options;
           const isNew = formik.values.date_change === formik.values.date_create
    return <>
<Card>
            <DocItem
                i={0}
                active={true}
                {...{doctypes, breeds, sexTypes, view:false, update, statuses, stampCodes, clubAlias}}
            />
        </Card>
    <div className="stage-controls flex-row">
            <Button className="btn-condensed" onClick={e => setRedirect(`/${clubAlias}/documents/pedigree/${formik.values.pedigree_request_id}/table/form`)}>Назад</Button>
        <Button className="btn-condensed btn-green btn-light" onClick={e => send({
            method: !isNew ? "PUT" : "POST",
            action: config.url + (!isNew ? '/draft' : ''),
            button: formik.values.dog_name ? 'none' : 'save'
        }, formik)}>Сохранить</Button>
    </div>
    </>
})

const HeaderForm = genericForm(DeclarantFormFields, config)

export default React.memo(HeaderForm)
