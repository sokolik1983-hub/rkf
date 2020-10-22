import React, {useState} from "react";
import {Prompt} from "react-router-dom";
import {Form, Field, FormElement} from "@progress/kendo-react-form";
import {Button} from "@progress/kendo-react-buttons";
import ls from "local-storage";
import Loading from "../../../../components/Loading";
import Alert from "../../../../components/Alert";
import FormInput from "../../components/FormInput";
import {aliasValidator} from "../../validators";
import {Request} from "../../../../utils/request";
import "./index.scss";


const Security = ({alias, login, setFormTouched, getInfo}) => {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleError = e => {
        if (e.response) {
            const errorText = e.response.data.errors ?
                Object.values(e.response.data.errors) :
                `${e.response.status} ${e.response.statusText}`;

            setAlert({
                title: `Ошибка!`,
                text: errorText,
                autoclose: 7.5,
                onOk: () => setAlert(null)
            });
        }
    };

    const submitAliasForm = async data => {
        setLoading(true);
        console.log(data);
        await Request({
            url: '/api/owners/owner/alias',
            method: 'PUT',
            data: JSON.stringify(data.alias)
        }, () => {
            ls.set('user_info', {...ls.get('user_info'), alias: data.alias});
            getInfo().then(() => {
                setLoading(false);
                setAlert({
                    title: "Информация сохранена!",
                    autoclose: 2,
                    onOk: () => setAlert(null)
                });
            });
        }, error => {
            handleError(error);
            setLoading(false);
        });
    };

    const submitLoginForm = data => {
        console.log('submitAliasForm', data);
    };

    const submitPasswordForm = data => {
        console.log('submitAliasForm', data);
    };

    const secureLogin = login => login.split('@')[0].slice(0, 2) + '***@' + login.split('@')[1];

    return loading ?
        <Loading centered={false}/> :
        <div className="ue-security k-form">
            <h2 className="k-form-legend">Безопасность</h2>
            <Form
                onSubmit={submitAliasForm}
                initialValues={{alias}}
                render={formRenderProps => {
                    setFormTouched(formRenderProps.touched);
                    return (
                        <FormElement>
                            <Prompt
                                when={formRenderProps.touched}
                                message="Вы уверены, что хотите покинуть эту страницу? Все несохраненные изменения будут потеряны."
                            />
                            <div className="ue-security__row form-row">
                                <div className="col-md-3">
                                    <p className="ue-security__label">Адрес страницы</p>
                                </div>
                                <div className="col-md-4">
                                    <p className="ue-security__label-second">https://rkf.online/user/</p>
                                </div>
                                <div className="col-md-5">
                                    <Field
                                        id="alias"
                                        name="alias"
                                        component={FormInput}
                                        validator={aliasValidator}
                                    />
                                </div>
                            </div>
                            <div className="k-form-buttons k-buttons-end">
                                <Button
                                    primary={true}
                                    type="submit"
                                    disabled={!formRenderProps.allowSubmit}
                                >
                                    Изменить
                                </Button>
                            </div>
                        </FormElement>
                    )}}
            />
            <Form
                onSubmit={submitLoginForm}
                render={formRenderProps => {
                    setFormTouched(formRenderProps.touched);
                    return (
                        <FormElement>
                            <Prompt
                                when={formRenderProps.touched}
                                message="Вы уверены, что хотите покинуть эту страницу? Все несохраненные изменения будут потеряны."
                            />
                            <div className="ue-security__row form-row">
                                <div className="col-md-3">
                                    <p className="ue-security__label">Логин</p>
                                </div>
                                <div className="col-md-4">
                                    <p className="ue-security__label-second">
                                        {secureLogin(login)}
                                    </p>
                                </div>
                                <div className="col-md-5">
                                    <Field
                                        id="login"
                                        name="login"
                                        placeholder="Введите новый логин"
                                        component={FormInput}
                                        // validator={requiredValidator}
                                    />
                                </div>
                            </div>
                            <div className="k-form-buttons k-buttons-end">
                                <Button
                                    primary={true}
                                    type="submit"
                                    disabled={!formRenderProps.allowSubmit}
                                >
                                    Изменить
                                </Button>
                            </div>
                        </FormElement>
                    )}}
            />
            <Form
                onSubmit={submitPasswordForm}
                render={formRenderProps => {
                    setFormTouched(formRenderProps.touched);
                    return (
                        <FormElement>
                            <Prompt
                                when={formRenderProps.touched}
                                message="Вы уверены, что хотите покинуть эту страницу? Все несохраненные изменения будут потеряны."
                            />
                            <div className="ue-security__row">
                                <p className="ue-security__label">Пароль</p>
                                <div className="form-row">
                                    <div className="col-md-4">
                                        <Field
                                            id="old_password"
                                            name="old_password"
                                            placeholder="Старый пароль"
                                            component={FormInput}
                                            // validator={requiredValidator}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <Field
                                            id="new_password"
                                            name="new_password"
                                            placeholder="Новый пароль"
                                            component={FormInput}
                                            // validator={requiredValidator}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <Field
                                            id="confirm_password"
                                            name="confirm_password"
                                            placeholder="Повторите пароль"
                                            component={FormInput}
                                            // validator={requiredValidator}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="k-form-buttons k-buttons-end">
                                <Button
                                    primary={true}
                                    type="submit"
                                    disabled={!formRenderProps.allowSubmit}
                                >
                                    Изменить
                                </Button>
                            </div>
                        </FormElement>
                    )}}
            />
            {alert && <Alert {...alert} />}
        </div>
};

export default React.memo(Security);