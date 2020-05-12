import React, {useEffect, useState} from "react";
// import Loading from "../../../../components/Loading";
import {Form, FormField} from "../../../../components/Form";
import Alert from "../../../../components/Alert";
import {emailForm, kennelForm} from "./config";
import "./index.scss";


const defaultKennel = {
    kennel_name: 'Питомник №1',
    kennel_address: 'Москва, ул. Ленина, д. 1',
    owner_name: 'Пупкин Василий Иванович'
}

const KennelRegistration = ({history}) => {
    const [kennel, setKennel] = useState(null);
    const [code, setCode] = useState(null);
    const [errorAlert, setErrorAlert] = useState(false);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        setKennel(defaultKennel);
    }, []);

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
                        <div></div>
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