import React, {useState} from "react";
import {connect} from "formik";
import {Link} from "react-router-dom";
import removeNulls from "utils/removeNulls";
import { FormGroup, FormField } from "components/Form";
import genericForm from "../../utils/genericForm";
import config from "./config.js";
// pedigree
const HeaderFormFields = connect(({formik, update, options, clubAlias}) => {
    const setDeclarant = value => {
        let declarant = options.declarants.find(f => f.id === value);
        if (!declarant) return;
        Object.keys(removeNulls(declarant))
        .forEach(key => key === "id" || formik.setFieldValue(key, declarant[key]));
    }
    return <>
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
    </>
})

const HeaderForm = genericForm(HeaderFormFields, config)

export default React.memo(HeaderForm)
