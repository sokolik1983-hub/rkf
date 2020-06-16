import React, {useEffect, useState } from "react";
import {connect} from "formik";
import removeNulls from "utils/removeNulls";
import { FormGroup, FormField } from "components/Form";
import genericForm from "utils/genericForm";
import SubmitError from "../../components/SubmitError";
import config from "./config.js";
import Button from "components/Button";
import Card from "components/Card";
import { Request } from "utils/request";

// pedigree
const HeaderFormFields = connect(({formik, update, options, alias, setRedirect, send, Title}) => {
    const setDeclarant = value => {
        let declarant = options.declarants.find(f => f.id === value);
        if (!declarant) return;
        Object.keys(removeNulls(declarant))
        .forEach(key => key === "id" || formik.setFieldValue(key, declarant[key]));
    }
    const [init, setInit] = useState(false);
    const [folder, _setFolder] = useState('');
    const setFolder = e => {
        if (!e) return;
        formik.setFieldValue('folder_number', e);
        _setFolder(e);
    }
    useEffect(() => {
        if (!init && !formik.values.id) {
            setInit(true);
            let declarant = options.declarants.find(f => f.is_default);
            if (!!declarant) {
                formik.setFieldValue('declarant_id', declarant.id);
                setDeclarant(declarant.id);
            }
            Request({
                url: '/api/nurseries/Nursery/nursery_federation'
            },
            e => {e && e.id && formik.setFieldValue('federation_id', e.id)},
            e => {})
        }
            Request({
                url: '/api/requests/CommonRequest/folder_number'
            },
            setFolder,
            e => {})
    }, []);

    return <>
<Card>
    <Title/>
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
            disabled={update || folder}
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
            label={`Ответственное лицо (<a href="/nursery/${alias}/documents/responsible/form">Создать ответственное лицо</a>)`}
            placeholder="Выберите..." onChange={e => setDeclarant(e.value)} />
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
            <Button className="btn-condensed" onClick={e => window.confirm("Не сохраненные данные будут утеряны, вы уверены что хотите вернуться?") && setRedirect(`/nursery/${alias}/documents/`)}>Назад</Button>
            <SubmitError />
        <Button className="btn-condensed btn-green btn-light" onClick={e => send({
            method: formik.values.id ? "PUT" : "POST",
            action: config.url + (formik.values.id ? '/draft' : ''),
            button: formik.values.id ? 'none' : 'save'
        }, formik)}>Сохранить</Button>
            <Button className="btn-green btn-condensed" onClick={e => send({
                method: formik.values.id ? "PUT" : "POST",
                action: config.url + (formik.values.id ? '/draft' : ''),
                button: 'next'
            }, formik)}>Сохранить и продолжить</Button>
    </div>
    </>
})

const HeaderForm = genericForm(HeaderFormFields, config)

export default React.memo(HeaderForm)
