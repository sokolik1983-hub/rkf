import React, {useState,useEffect} from "react";
import {object} from "yup";
import moment from "moment";
import Alert from "components/Alert";
import { Request } from "utils/request";
import {Form} from "components/Form";
import {Redirect} from "react-router-dom";
import Loading from "components/Loading";
import filterBySchema from "./filterBySchema";
import removeNulls from "utils/removeNulls";
import deepMap from "../utils/deepMap";

const PromiseRequest = url => new Promise((res,rej) => Request({url},res,rej));

const addNulls = o => {
    if (o === null || o === undefined) return null;
    Object.keys(o).forEach(k => {
        if (o[k] === '') o[k] = null;
        if (typeof(o[k]) === 'object') addNulls(o[k]);
    });
    return o;
}

const transform = values => deepMap(values, v => {
    let t = typeof v;
    if (t !== 'object') return v;

    if (v instanceof Date) return moment(v).format("YYYY-MM-DD");

    return v;
})

const genericForm = (Component, config) => {
    return ({update, view, alias, profileId, id, prevStage, nextStage, Title}) => {
        const [values, setValues] = useState({}),
              //[statusAllowsUpdate, setStatusAllowsUpdate] = useState(true),
              [redirect, setRedirect] = useState(''),
              [options, setOptions] = useState(null),
              [okAlert, setOkAlert] = useState(false),
              [errAlert, setErrAlert] = useState(false),
              [loading, setLoading] = useState(true),
              [action, setAction] = useState(config.url),
              [method, setMethod] = useState(update ? "PUT" : "POST"),
              [button, setButton] = useState('save'),
              [target_id, setTargetId] = useState(undefined);
        const setFormValues = values => {
            setValues(removeNulls(config.hooks && config.hooks.values ? config.hooks.values(values) : values));
            //setStatusAllowsUpdate(values.status_id ? [2,4,7].includes(values.status_id) : true);
        }
        useEffect(() => {
            (() => Promise.all(
                [Promise.all(config.options ? Object.keys(config.options).map(k =>
                    PromiseRequest(typeof(config.options[k].url) === "function" ? config.options[k].url(profileId) : config.options[k].url)
                    .then(data => ({[k]:!!config.options[k].mapping ? config.options[k].mapping(data) : data})))
                : [new Promise()])
                .then(options => options.reduce((a,b) => ({...a, ...b}), {}))
                .then(options => setOptions(options)),
                (id && config.get) ? PromiseRequest(config.get + '?id=' + id).then(values => values ? setFormValues(values) : setRedirect('/404')) : new Promise(res => res())
            ]).then(() => setLoading(false))
            .catch(error => {
                console.log(error);
                setRedirect('');
                if (error.response) alert(`Ошибка: ${error.response.status}`);
                setLoading(false);
            }))();
        }, []);

        const send = (params, formik) => {
            params.action && setAction(params.action);
            params.method && setMethod(params.method);
            params.button && setButton(params.button);
            params.target_id && setTargetId(params.target_id);
            formik.submitForm();
        }

        //let initialValues = {...config.initialValues, ...values, id};
        //initialValues = config.hooks && config.hooks.initialValues ? config.hooks.initialValues(initialValues) : initialValues;

        return loading ? <Loading/> : redirect ? <Redirect push to={redirect}/> : <Form
                onSuccess={e => config.onSuccess && config.onSuccess[button] ? config.onSuccess[button](e, setRedirect, alias, target_id||values.litter_request_id||values.pedigree_request_id||id) : setOkAlert(true)}
                onError={e => console.log(e)||setErrAlert((e && e.response && e.response.data && e.response.data.errors && e.response.data.errors.CommonRequest)||(true))}
                action={action}
                method={method}
                initialValues={{...config.initialValues, ...values, id}}
                validationSchema={update ? config.updateSchema : object().shape(config.validationSchema)}
                noEnter={true}
                //onSubmit={e => console.log(e)}
                transformValues={values => addNulls(transform(filterBySchema(values, (update ? config.updateSchema : config.validationSchema))||{}))}
                //format="multipart/form-data"
                format="application/json"
        >
        <input type="hidden" name="id" />
        {okAlert &&
            <Alert
                title="Сохранение"
                text="Форма успешно сохранена"
                autoclose={2.5}
                okButton="true"
                //onOk={() => setRedirect(`/${clubAlias}/documents`)}
                onOk={() => {setOkAlert(false);setRedirect(window.location.pathname);}}
            />
        }
        {redirect && <Redirect push to={redirect}/>}
        {errAlert &&
            <Alert
                title="Ошибка отправки"
                text={(typeof errAlert === "string") ? errAlert : `Пожалуйста, проверьте правильность заполнения всех полей`}
                autoclose={(typeof errAlert === "string") ? false : 2.5}
                okButton="true"
                onOk={() => setErrAlert(false)}
            />
        }

                {/*<div className="club-documents-status__head">
                    <Link className="btn-backward" to={`/${clubAlias}/documents`}>Личный кабинет</Link>
                </div>*/}
            {!!options && <Component {...{update, view, options, alias, Title, config, setRedirect, send, initial:{...config.initialValues, ...values, id}}}/>}
            </Form>
    }
}

export default genericForm;
