import React, {useState} from "react";
import {Prompt} from "react-router-dom";
import {Form, Field, FormElement} from "@progress/kendo-react-form";
import {Button} from "@progress/kendo-react-buttons";
import { getter } from '@progress/kendo-react-common';
import ls from "local-storage";
import Loading from "../../../../components/Loading";
import Alert from "../../../../components/Alert";
import FormInput from "../../components/FormInput";
import ModalConfirmEmail from "../../components/ModalConfirmEmail";
import ModalPasswordSuccess from "../../components/ModalPasswordSucces";
import {aliasValidator, emailValidator, passwordValidator, requiredValidator} from "../../validators";
import {Request} from "../../../../utils/request";
import "./index.scss";


const Security = ({alias, login, setFormTouched, getInfo, history}) => {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [aliasError, setAliasError] = useState('');
    const [newLogin, setNewLogin] = useState('');
    const [modalType, setModalType] = useState('');

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

        await Request({
            url: '/api/owners/owner/alias',
            method: 'PUT',
            data: JSON.stringify(data.alias)
        }, () => {
            ls.set('user_info', {...ls.get('user_info'), alias: data.alias});
            getInfo().then(() => {
                history.replace(`/user/${data.alias}/edit`);
                setLoading(false);
                setAlert({
                    title: "Информация сохранена!",
                    autoclose: 2,
                    onOk: () => setAlert(null)
                });
            });
        }, error => {
            handleError(error);

            if(error.response && error.response.data.errors && error.response.data.errors.alias) {
                setAliasError(error.response.data.errors.alias);
            }

            setLoading(false);
        });
    };

    const submitLoginForm = async data => {
        setLoading(true);

        await Request({
            url: '/api/registration/change_user_mail',
            method: 'POST',
            data: JSON.stringify(data.login)
        }, () => {
            setNewLogin(data.login);
            setModalType('confirmLogin');
            setLoading(false);
        }, error => {
            handleError(error);
            setLoading(false);
        });
    };

    const submitPasswordForm = async data => {
        console.log('submitPasswordForm', data);
        setLoading(true);

        await Request({
            url: '/api/registration/change_user_password',
            method: 'POST',
            data: JSON.stringify({
                old_password: data.old_password,
                new_password: data.new_password
            })
        }, () => {
            setModalType('passwordSuccess');
            setLoading(false);
        }, error => {
            handleError(error);
            //тут записать все ошибки и занести их в форму
            setLoading(false);
        });
    };

    const secureLogin = login => login.split('@')[0].slice(0, 2) + '***@' + login.split('@')[1];

    const validateConfirmPassword = values => {
        const newPassword = getter('new_password');
        const confirmPassword = getter('confirm_password');

        if (newPassword(values) && confirmPassword(values) && newPassword(values) === confirmPassword(values)) {
            return {};
        }

        return {
            ['confirm_password']: 'Пароль не совпадает'
        };
    };

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
                                        validator={emailValidator}
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
                validator={validateConfirmPassword}
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
                                            type="password"
                                            component={FormInput}
                                            validator={requiredValidator}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <Field
                                            id="new_password"
                                            name="new_password"
                                            placeholder="Новый пароль"
                                            type="password"
                                            component={FormInput}
                                            validator={passwordValidator}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <Field
                                            id="confirm_password"
                                            name="confirm_password"
                                            placeholder="Повторите пароль"
                                            type="password"
                                            component={FormInput}
                                            validator={passwordValidator}
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
            {modalType && modalType === 'confirmLogin' &&
                <ModalConfirmEmail
                    email={newLogin}
                    closeModal={() => setModalType('')}
                    updateInfo={getInfo}
                />
            }
            {modalType && modalType === 'passwordSuccess' &&
                <ModalPasswordSuccess
                    closeModal={() => setModalType('')}
                />
            }
            {alert && <Alert {...alert} />}
        </div>
};

export default React.memo(Security);