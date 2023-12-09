import React, { useState, useEffect } from "react";
import Button from "components/Button";
import { Request } from "utils/request";
import { Redirect, Link } from "react-router-dom";
import { FormGroup, FormField } from "components/Form";
import HideIf from "components/HideIf";
import { connect, FieldArray, getIn } from "formik";
import PlusButton from "components/PlusButton";
import FormFile from "../../components/FormFile";
import DocItemPedigree from "../../components/DocItemPedigree";
import DocTableItem from "../../components/DocItemTablePedigree";
import DocItemLitter from "../../components/DocItemLitter";
import { endpointGetFederations } from "pages/Clubs/config";
import removeNulls from "utils/removeNulls";
import test from "../../test.json";
import {
    emptyNurseryPedigreeDeclarant,
    emptyNurseryLitterDeclarant,
    apiPedigreeDoctypeEndpoint,
    apiLitterDoctypeEndpoint,
    apiBreedsEndpoint,
    apiSexTypesEndpoint,
    apiPedigreePrivacyEndpoint,
    apiLitterPrivacyEndpoint,
    apiVerkEndpoint,
    apiStatusesEndpoint,
    //apiCitiesEndpoint,
    apiLitterDogStatusEndpoint,
    apiLitterEmptyDocument,
    apiPedigreeStatusesEndpoint,
}from "../../config.js"

const DocItemList = ({formik, view, update, alias, distinction, stampCodes, declarants, cash_payment, statusAllowsUpdate, stage, setStage }) => {
    window.test = () => Object.keys(test).forEach(t => {
        formik.setFieldValue(t, test[t]);
    });
    formik.errors && Object.keys(formik.errors).length && console.log("errors",formik.errors);
    //formik.values && Object.keys(formik.values).length && console.log("values",formik.values);
    const DocItem = distinction === "pedigree" ? DocItemPedigree : DocItemLitter;
    const [_editing, set_Editing] = useState(false);
    const [federations, setFederations] = useState([]);
    const [doctypes, setDoctypes] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [sexTypes, setSexTypes] = useState([]);
    //const [cities, setCities] = useState([]);
    const [litterStatuses, setLitterStatuses] = useState([]);
    const [privacyHref, setPrivacyHref] = useState('');
    const [litterHref, setLitterHref] = useState('');
    const [verkHref, setVerkHref] = useState('');
    const [fedName, setFedName] = useState('федерации');
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);
    
    const apiDoctypeEndpoint = distinction === "pedigree" ? apiPedigreeDoctypeEndpoint : apiLitterDoctypeEndpoint;
    const apiPrivacyEndpoint = distinction === "pedigree" ? apiPedigreePrivacyEndpoint : apiLitterPrivacyEndpoint;
    const apiDeclarantStatusesEndpoint = distinction === "pedigree" ? apiPedigreeStatusesEndpoint : apiStatusesEndpoint;
        const PromiseRequest = url => new Promise((res,rej) => Request({url},res,rej));
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    useEffect(() => {
        (() => Promise.all([
            PromiseRequest(endpointGetFederations)
            .then(data => setFederations(data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.short_name})))),
            PromiseRequest(apiDoctypeEndpoint)
            .then(data => setDoctypes(data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name_rus})))),
            PromiseRequest(apiBreedsEndpoint)
            .then(data => setBreeds(data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name})))),
            PromiseRequest(apiSexTypesEndpoint)
            .then(data => setSexTypes(data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name})))),
            PromiseRequest(apiDeclarantStatusesEndpoint)
            .then(data => setStatuses(data.sort((a,b) => a.id - b.id))),
            PromiseRequest(apiLitterDogStatusEndpoint)
            .then(data => setLitterStatuses(data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name})))),
            //PromiseRequest(apiCitiesEndpoint)
            //.then(data => setCities(data.sort((a,b) => a.id - b.id).map(m => ({value: m.id, label:m.name})))),
            fetch(apiPrivacyEndpoint, {headers})
            .then(response => response.blob())
            .then(data => setPrivacyHref(URL.createObjectURL(data))),
            fetch(apiLitterEmptyDocument, {headers})
            .then(response => response.blob())
            .then(data => setLitterHref(URL.createObjectURL(data))),
            fetch(apiVerkEndpoint, {headers})
            .then(response => response.blob())
            .then(data => setVerkHref(URL.createObjectURL(data)))
        ]).then(() => {
            setDeclarant(getIn(formik.values, 'declarant_id'));
            setLoading(false);
        })
        .catch(error => {
            console.log(error.response);
            setRedirect('/404');
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
        }))();
    }, []);

    const canSave = statusAllowsUpdate || formik.values.declarants.some(d => d.status_id ? [2,4,7].includes(d.status_id) : true);
    return loading ? <Loading/> : <FieldArray
        name="declarants"
        render={helpers => <>
            {redirect && <Redirect to={redirect}/>}
            <HideIf cond={stage !== 0}>
            </HideIf>
            {/*
            <HideIf cond={!update}>
                <FormGroup>
                    <FormGroup inline>
                        <FormField disabled={update} name='last_name' label='Фамилия заявителя' />
                        <FormField disabled={update} name='first_name' label='Имя заявителя' />
                    </FormGroup>
                    <FormField disabled={update} name='second_name' label='Отчество заявителя (опционально)' />
                    <FormGroup inline>
                        <FormField disabled={update} name='phone' type="tel" fieldType="masked" showMask={true} mask={DEFAULT_PHONE_INPUT_MASK} label='Телефон заявителя' />
                        <FormField disabled={update} name='email' type="email" label='Email заявителя' />
                    </FormGroup>
                    <p>Адрес заявителя для отправки корреспонденции</p>
                    <FormGroup inline>
                        <FormField disabled={update} name="index" label="Индекс" />
                        <FormField disabled={update} name="city_id" placeholder="Начните писать..." label="Город" fieldType="reactSelect" options={cities} />
                    </FormGroup>
                    <FormGroup inline>
                        <FormField disabled={update} name="street" label="Улица" />
                        <FormField disabled={update} name="house" label="Дом" />
                        <FormField disabled={update} name="building" label="Стр." />
                        <FormField disabled={update} name="flat" label="Кв." />
                    </FormGroup>
                    <HideIf cond={!update}>
                        <FormField disabled name='folder_number' label='Номер папки'/>
                    </HideIf>
                 </FormGroup>
            </HideIf>
            */}

            
        <HideIf cond={stage !== 1 || _editing}>
        <div>
                                    <div className={`flex-row ${update ? 'hidden' : ''}`}>
                {formik.errors && (typeof(formik.errors.declarants) === "string") &&
                    <p className="red">{formik.errors.declarants}</p>
                }
                            </div>
        </div>
        </HideIf>
        <HideIf cond={![1].includes(stage) || !_editing}>
            <DocItem
                i={0}
                active={true}
                {...{doctypes, breeds, sexTypes, view, update, privacyHref, verkHref, litterHref, statuses, litterStatuses, stampCodes, alias, stage}}
            />
        </HideIf>
        <HideIf cond={stage !== 2}>
        <div>
                    </div>
        <HideIf cond={true||view || !canSave} className="flex-row">
            <Button className="btn-green" type="link" disabled={formik.isSubmitting} onClick={e => (!update ? formik.setFieldValue('status_id',1) : false) || formik.submitForm()}>{formik.isSubmitting ? (formik.values && formik.values.status_id !== 7 ? "Идет отправка..." : "Сохранение...") : "Отправить"}</Button>
            <HideIf cond={update}>
                <Button className="btn-transparent" type="link" disabled={formik.isSubmitting} onClick={e => formik.setFieldValue('status_id',7) || formik.submitForm()}>Сохранить черновик</Button>
            </HideIf>
            <Link to={`/kennel/${alias}/documents`}><Button className="btn-transparent">Закрыть</Button></Link>
        </HideIf>
        </HideIf>
    </>}
    />;
};


export default connect(React.memo(DocItemList));
