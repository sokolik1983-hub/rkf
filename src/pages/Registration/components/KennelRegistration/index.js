import React, {useEffect, useState} from "react";
import {Form, FormField} from "../../../../components/Form";
import Alert from "../../../../components/Alert";
import {emailForm, kennelForm, codeForm} from "./config";
import "./index.scss";


const defaultKennel = {
    kennel_name: 'Питомник №1',
    kennel_address: 'Москва, ул. Ленина, д. 1',
    owner_name: 'Пупкин Василий Иванович'
}

const KennelRegistration = ({history}) => {
    const [kennel, setKennel] = useState(null);
    const [code, setCode] = useState(null);
    const [kennelEmail, setKennelEmail] = useState(null);
    const [errorAlert, setErrorAlert] = useState(false);

    // useEffect(() => {
    //     setKennel(defaultKennel);
    // }, []);

    const transformEmailValues = data => {
        setKennelEmail(data.email);
        return data;
    }

    return (
        <div className="kennel-registration">
            {code === null &&
                <Form
                    {...kennelForm}
                    onSuccess={data => console.log('data', data)}
                    onError={() => setErrorAlert(true)}
                    className="kennel-registration__form"
                >
                    <FormField {...kennelForm.fields.registration_number} />
                    <button type="submit" className="kennel-registration__search"/>
                </Form>
            }
            {(code || kennel) &&
                <div className="kennel-registration__info">
                    {code === null && kennel &&
                        <>
                            <div className="kennel-registration__about">
                                <p>Пожалуйста, проверьте правильность указанной информации:</p>
                                <p><span>Название: </span><span>{kennel.kennel_name || 'Отсутствует'}</span></p>
                                <p><span>Адрес: </span><span>{kennel.kennel_address || 'Отсутствует'}</span></p>
                                <p><span>ФИО руководителя: </span><span>{kennel.owner_name || 'Отсутствует'}</span></p>
                            </div>
                            <div className="kennel-registration__activate-email">
                                <Form
                                    {...emailForm}
                                    transformValues={transformEmailValues}
                                    onSuccess={data => console.log('data', data)}
                                    onError={() => setErrorAlert(true)}
                                    className="kennel-registration__form-email"
                                >
                                    <FormField {...emailForm.fields.email} />
                                    <button className="btn btn-primary" type="submit">Отправить</button>
                                </Form>
                                <p className="kennel-registration__activate-warn">Если информация указана неверно, воспользуйтесь формой обратной связи</p>
                            </div>
                        </>
                    }
                    {code !== null &&
                        <>
                            <p>Мы отправили письмо с проверочным кодом на указанный вами адрес: <b>{kennelEmail || 'pupkin@mail.ru'}</b></p>
                            <p>Пожалуйста, зайдите в свою почту и введите полученный код ниже.</p>
                            <Form
                                {...codeForm}
                                onSuccess={data => console.log('data', data)}
                                onError={() => setErrorAlert(true)}
                                className="kennel-registration__form-code"
                            >
                                <FormField {...codeForm.fields.code} />
                                <button className="btn btn-primary" type="submit">Отправить</button>
                            </Form>
                        </>
                    }
                </div>
            }
            {errorAlert &&
                <Alert
                    title="Произошла ошибка! =("
                    text="Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи."
                    autoclose={7.5}
                    onOk={() => setErrorAlert(false)}
                />
            }
        </div>
    )
};

export default React.memo(KennelRegistration);