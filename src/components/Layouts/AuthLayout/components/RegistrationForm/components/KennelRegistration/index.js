import React, {memo, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Alert from "../../../../../../Alert";
import Confirm from "../../../../../../Confirm";
import {Form, FormField, SubmitButton} from "../../../../../../Form";
import CustomText from "../../../../../../Form/Field/CustomText";
import {Request} from "../../../../../../../utils/request";
import {federationForm, nurseryForm, createForm, codeForm} from "./config";
import "./index.scss";


const KennelRegistration = () => {
    const [federations, setFederations] = useState([]);
    const [isFederationFormSend, setIsFederationFormSend] = useState(true);
    const [isCodeFormSend, setIsCodeFormSend] = useState(false);
    const [isNurseryFound, setIsNurseryFound] = useState(false);
    const [nursery, setNursery] = useState(null);
    const [code, setCode] = useState(null);
    const [alert, setAlert] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [alertText, setAlertText] = useState('');
    const history = useHistory();

    useEffect(() => {
        (() => Request({
            url: '/api/clubs/Federation'
        }, data => {
            setFederations(data.map(option => ({label: option.short_name, value: option.id})));
        }, error => {
            console.log(error.response);
            setAlert(true);
        }))();
    }, []);

    const transformFederationValues = values => {
        setNursery({...values});
        return values;
    };

    const federationFormSuccess = data => {
        if(data) {
            setNursery({...data, city_id: data.city ? data.city.id : ''});
            setIsNurseryFound(true);
            setIsFederationFormSend(true)
        } else {
            setIsNurseryFound(false);
            setConfirm(true);
        }
    };

    const transformNurseryValues = values => {
        let newData = {...values};

        if(newData.city) delete newData.city;

        setNursery(newData);

        return {
            mail: newData.mail
        };
    };

    const nurseryFormSuccess = () => {
        setCode('');
    };

    const transformCodeValues = values => {
        const newValues = {...values, ...nursery};

        if(isNurseryFound) delete newValues.name;

        return newValues;
    };

    const codeFormSuccess = () => {
        setIsCodeFormSend(true);

        setAlertText('Мы отправили Вам письмо на указанный вами адрес. Пожалуйста, зайдите в свою почту и следуйте дальнейшим инструкциям.');

        setAlert(true);
    };

    const handleFormError = error => {
        if (error.response && error.response.data && error.response.data.errors) {
            setAlertText(`${Object.values(error.response.data.errors)}`);
        }

        setAlert(true);
    };

    const handleSkip = e => {
        e.preventDefault();

        setIsNurseryFound(false);
        setIsFederationFormSend(true);
    };

    return (
        <div className="nursery-registration">
            {!isFederationFormSend &&
                <Form
                    {...federationForm}
                    transformValues={transformFederationValues}
                    onSuccess={federationFormSuccess}
                    onError={handleFormError}
                    className="nursery-registration__form"
                >
                    <FormField {...federationForm.fields.federation_id} options={federations} />
                    <FormField {...federationForm.fields.folder_number} />
                    <div className="nursery-registration__skip-search">
                        <a href="/" onClick={handleSkip}>Не нашли свой питомник?</a>
                    </div>
                    <SubmitButton type="submit" className="btn btn-primary">Поиск</SubmitButton>
                </Form>
            }
            {isFederationFormSend &&
                <div className="nursery-registration__info">
                    {code === null && isNurseryFound &&
                        <>
                            <div className="nursery-registration__about">
                                <p>Пожалуйста, проверьте правильность указанной информации:</p>
                                <p><span>Название: </span><span>{nursery.name || 'Отсутствует'}</span></p>
                            </div>
                            <div className="nursery-registration__activate-email">
                                <Form
                                    {...nurseryForm}
                                    initialValues={nursery}
                                    transformValues={transformNurseryValues}
                                    onSuccess={nurseryFormSuccess}
                                    onError={handleFormError}
                                    className="nursery-registration__form-email"
                                >
                                    <FormField {...nurseryForm.fields.city_id} />
                                    <CustomText {...nurseryForm.fields.owner_last_name} />
                                    <CustomText {...nurseryForm.fields.owner_first_name} />
                                    <CustomText {...nurseryForm.fields.owner_second_name} />
                                    <FormField {...nurseryForm.fields.mail} />
                                    <button className="btn btn-primary" type="submit">Отправить</button>
                                </Form>
                            </div>
                        </>
                    }
                    {code === null && !isNurseryFound &&
                        <>
                            <div className="nursery-registration__activate-email">
                                <Form
                                    {...createForm}
                                    initialValues={{
                                        ...nursery,
                                        stamp_code: '',
                                        city_id: '',
                                        name: '',
                                        owner_last_name: '',
                                        owner_first_name: '',
                                        owner_second_name: '',
                                        mail: ''
                                    }}
                                    transformValues={transformNurseryValues}
                                    onSuccess={nurseryFormSuccess}
                                    onError={handleFormError}
                                    className="nursery-registration__form-email"
                                >
                                    <FormField {...createForm.fields.federation_id} options={federations} />
                                    <FormField {...createForm.fields.folder_number} />
                                    <FormField {...createForm.fields.stamp_code} />
                                    <FormField {...createForm.fields.city_id} />
                                    <FormField {...createForm.fields.name} />
                                    <CustomText {...createForm.fields.owner_last_name} />
                                    <CustomText {...createForm.fields.owner_first_name} />
                                    <CustomText {...createForm.fields.owner_second_name} />
                                    <FormField {...createForm.fields.mail} />
                                    <button className="btn btn-primary" type="submit">Отправить</button>
                                </Form>
                            </div>
                        </>
                    }
                    {code !== null &&
                        <>
                            <p>Мы отправили письмо с проверочным кодом на указанный вами адрес: <b>{nursery.mail || ''}</b></p>
                            <p>Пожалуйста, зайдите в свою почту и введите полученный код ниже.</p>
                            <Form
                                {...codeForm}
                                action={isNurseryFound ?
                                    '/api/Registration/nursery/confirm' :
                                    '/api/Registration/nursery/create_and_confirm'
                                }
                                transformValues={transformCodeValues}
                                onSuccess={codeFormSuccess}
                                onError={handleFormError}
                                className="nursery-registration__form-code"
                            >
                                <FormField {...codeForm.fields.activation_code} />
                                <button className="btn btn-primary" type="submit">Активировать</button>
                            </Form>
                        </>
                    }
                </div>
            }
            {alert &&
                <Alert
                    title={isCodeFormSend ? 'Проверьте почту' : 'Произошла ошибка! =('}
                    text={alertText || 'Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи.'}
                    okButton={true}
                    onOk={() => {
                        setAlertText('');
                        setAlert(false);
                        if (isCodeFormSend) {
                            history.push('/auth/login');
                        }
                    }}
                />
            }
            {confirm &&
                <Confirm
                    title="Внимание!"
                    text="Питомник с такими данными не найден в базе RKF.Online\nДобавить питомник?"
                    agreeButtonText="Добавить"
                    disagreeButtonText="Отмена"
                    agreeFunction={() => setIsFederationFormSend(true)}
                    disagreeFunction={() => setConfirm(false)}
                />
            }
        </div>
    )
};

export default memo(KennelRegistration);