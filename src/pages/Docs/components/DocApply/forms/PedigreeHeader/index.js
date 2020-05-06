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

// pedigree
const HeaderFormFields = connect(({formik, update, options, clubAlias, setRedirect, send}) => {
    const setDeclarant = value => {
        let declarant = options.declarants.find(f => f.id === value);
        if (!declarant) return;
        Object.keys(removeNulls(declarant))
        .forEach(key => key === "id" || formik.setFieldValue(key, declarant[key]));
    }
    return <>
<Card>
        <FormGroup inline>
        <FormField
            disabled={update}
            options={options.federations}
            fieldType="reactSelect"
            name="federation_id"
            label='Федерация'
            placeholder="Выберите федерацию"
        />
        <FormField
            disabled={update}
            name="folder_number"
            label="Номер папки"
            placeholder="0000"
        />
        </FormGroup>
        <FormField
            disabled={update}
            options={options.declarants.map(m => ({value: m.id, label:m.full_name}))}
            fieldType="reactSelect"
            name="declarant_id"
            label='Ответственное лицо'
            placeholder="Выберите..." onChange={e => setDeclarant(e.value)} />
        <Link to={`/${clubAlias}/documents/responsible/form`}>Создать ответственное лицо</Link>
        {/*<FormField disabled name='full_name' label='ФИО' placeholder='Заполняется автоматически' />*/}
        <FormGroup inline>
            <FormField
                disabled
                name='phone'
                label='Телефон'
                placeholder='Заполняется автоматически'
            />
            <FormField
                disabled
                name='email'
                label='Email'
                placeholder='Заполняется автоматически'
            />
        </FormGroup>
        <FormField
            disabled
            name='address'
            label='Адрес'
            placeholder='Заполняется автоматически'
        />
        <FormField
            disabled
            name='subscriber_mail'
            label='Абонентский ящик'
            placeholder={update ? '' : 'Заполняется автоматически'}
        />
</Card>
    <div className="stage-controls flex-row">
        <Button className="btn-condensed btn-green btn-light" onClick={e => send({
            method: formik.values.id ? "PUT" : "POST",
            action: config.url + (formik.values.id ? '/draft' : ''),
            button: formik.values.id ? 'none' : 'save'
        }, formik)}>Сохранить</Button>
        <HideIf>
            <Button className="btn-green btn-condensed" onClick={e => send({
                method: formik.values.id ? "PUT" : "POST",
                action: config.url + (formik.values.id ? '/draft' : ''),
                button: 'next'
            }, formik)}>Продолжить</Button>
        </HideIf>
    </div>
    </>
})

const HeaderForm = genericForm(HeaderFormFields, config)

export default React.memo(HeaderForm)