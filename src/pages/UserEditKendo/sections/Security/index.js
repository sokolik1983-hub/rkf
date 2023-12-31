import React, {useEffect, useState} from "react";
import {Prompt} from "react-router-dom";
import {Form, Field, FormElement} from "@progress/kendo-react-form";
import {Button} from "@progress/kendo-react-buttons";
import { getter } from '@progress/kendo-react-common';
import ls from "local-storage";
import Loading from "../../../../components/Loading";
import FormInput from "../../components/FormInput";
import ModalConfirmEmail from "../../components/ModalConfirmEmail";
import ModalPasswordSuccess from "../../components/ModalPasswordSucces";
import {aliasValidator, emailValidator, passwordValidator, requiredValidator} from "../../validators";
import {Request} from "../../../../utils/request";
import "./index.scss";


const Security = ({setFormModified, history, handleSuccess, handleError}) => {
    const [loading, setLoading] = useState(true);
    const [alias, setAlias] = useState('');
    const [login, setLogin] = useState('');
    const [newLogin, setNewLogin] = useState('');
    const [modalType, setModalType] = useState('');

    useEffect(() => {
        (() => getInfo())();
    }, []);

    const getInfo = async () => {
        setLoading(true);

        await Request({
            url: '/api/owners/owner/owner_edit_safety_information'
        }, data => {
            setAlias(data.alias);
            setLogin(data.login);
            setLoading(false);
        }, error => {
            handleError(error);
            setLoading(false);
        });
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
                handleSuccess();
            });
        }, error => {
            handleError(error);
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
        const oldPassword = getter('old_password');
        const confirmPassword = getter('confirm_password');

        if (newPassword(values) && oldPassword(values) === newPassword(values)) {
            return {
                confirm_password: "Новый пароль совпадает со старым"
            };
        }

        if (newPassword(values) && confirmPassword(values) && newPassword(values) === confirmPassword(values)) {
            return {};
        }

        return {
            confirm_password: 'Пароль не совпадает'
        };
    };

    return loading ?
        <Loading centered={false}/> :
        <div className="ue-security k-form">
            <legend className="k-form-legend">Безопасность</legend>
            <Form
                onSubmit={submitAliasForm}
                initialValues={{alias}}
                render={formRenderProps => {
                    setFormModified(formRenderProps.modified);
                    return (
                        <FormElement>
                            <Prompt
                                when={formRenderProps.modified}
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
                                        validator={value => aliasValidator(value, 40)}
                                        maxLength="40"
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
                    setFormModified(formRenderProps.modified);
                    return (
                        <FormElement>
                            <Prompt
                                when={formRenderProps.modified}
                                message="Вы уверены, что хотите покинуть эту страницу? Все несохраненные изменения будут потеряны."
                            />
                            <div className="ue-security__row form-row">
                                <div className="col-md-3">
                                    <p className="ue-security__label">Логин</p>
                                </div>
                                <div className="col-md-4">
                                    <p className="ue-security__label-second">
                                        {login ? secureLogin(login) : ''}
                                    </p>
                                </div>
                                <div className="col-md-5">
                                    <Field
                                        id="login"
                                        name="login"
                                        placeholder="Введите новый логин"
                                        component={FormInput}
                                        validator={value => emailValidator(value, 40)}
                                        maxLength="40"
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
                    setFormModified(formRenderProps.modified);
                    return (
                        <FormElement>
                            <Prompt
                                when={formRenderProps.modified}
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
                                            validator={value => passwordValidator(value, 20)}
                                            maxLength="20"
                                            passwordField
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <Field
                                            id="confirm_password"
                                            name="confirm_password"
                                            placeholder="Повторите пароль"
                                            type="password"
                                            component={FormInput}
                                            validator={value => passwordValidator(value, 20)}
                                            maxLength="20"
                                            passwordField
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
        </div>
};

export default React.memo(Security);