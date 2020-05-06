import React, {useState,useEffect} from "react";
import Alert from "components/Alert";
import { Request } from "utils/request";
import Button from "components/Button";
import {Form} from "components/Form";
import {Redirect} from "react-router-dom";
import Loading from "components/Loading";
import filterBySchema from "./filterBySchema";
import deepInitial from "./deepInitial";

const PromiseRequest = url => new Promise((res,rej) => Request({url},res,rej));

const genericForm = (Component, config) => {
    return ({update, clubAlias, clubId, id, prevStage, nextStage, onSuccess}) => {
        const [values, setValues] = useState({}),
              [statusAllowsUpdate, setStatusAllowsUpdate] = useState(true),
              [redirect, setRedirect] = useState(''),
              [options, setOptions] = useState(null),
              [okAlert, setOkAlert] = useState(false),
              [errAlert, setErrAlert] = useState(false),
              [loading, setLoading] = useState(true);
        const setFormValues = values => {
            setValues(values);
            setStatusAllowsUpdate(values.status_id ? [2,4,7].includes(values.status_id) : true);
        }
        useEffect(() => {
            (() => Promise.all(
                [Promise.all(config.options ? Object.keys(config.options).map(k =>
                    PromiseRequest(config.options[k].url)
                    .then(data => ({[k]:config.options[k].mapping ? config.options[k].mapping(data) : data})))
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

        return loading ? <Loading/> : redirect ? <Redirect to={redirect}/> : <Form
                onSuccess={e => onSuccess ? onSuccess(e) : setOkAlert(true)}
                onError={e => console.log(e)||setErrAlert(true)}
                action={config.url}
                method={update  ? "PUT" : "POST"}
                initialValues={{...config.initialValues, ...values, id}}
                validationSchema={update ? config.updateSchema : config.validationSchema}
                //onSubmit={e => console.log(e)}
                transformValues={values => filterBySchema(values, (update ? config.updateSchema : config.validationSchema))}
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
            />
        }
        {redirect && <Redirect push to={redirect}/>}
        {errAlert &&
            <Alert
                title="Ошибка отправки"
                text={`Пожалуйста, проверьте правильность заполнения всех полей`}
                autoclose={2.5}
                onOk={() => setErrAlert(false)}
            />
        }

                {/*<div className="club-documents-status__head">
                    <Link className="btn-backward" to={`/${clubAlias}/documents`}>Личный кабинет</Link>
                </div>*/}
            {!!options && <Component {...{update, options, clubAlias, setRedirect}}/>}
            </Form>
    }
}

export default genericForm;
