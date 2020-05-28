import React, {useEffect, useState} from "react";
import {Form, FormField, SubmitButton} from "../../../../components/Form";
import Alert from "../../../../components/Alert";
import {Request} from "../../../../utils/request";
import {LOGIN_URL} from "../../../../appConfig";
import {federationForm, nurseryForm} from "./config";
import "./index.scss";
import CustomText from "../../../../components/Form/Field/CustomText";


const NurseryRegistration = ({history}) => {
    const [federations, setFederations] = useState([]);
    const [isFederationFormSend, setIsFederationFormSend] = useState(false);
    const [isNurseryFormSend, setIsNurseryFormSend] = useState(false);
    const [nursery, setNursery] = useState(null);
    const [alert, setAlert] = useState(false);
    const [alertText, setAlertText] = useState('');

    useEffect(() => {
        (() => Request({
                url: '/api/clubs/Federation'
            }, data => {
                setFederations(data.map(option => ({label: option.short_name, value: option.id})));
            },
            error => {
                console.log(error.response);
                setAlert(true);
            }))();
    }, []);

    const federationFormSuccess = data => {
        if(data) {
            setNursery({...data, city_id: data.city ? data.city.id: ''});
            setIsFederationFormSend(true);
        } else {
            setAlertText('Питомник не найден. Проверьте правильность введенных данных. Если данные верны, воспользуйтесь формой обратной связи.');
            setAlert(true);
        }
    };

    const transformNurseryValues = data => {
        let newData = {...data};
        delete newData.city;
        delete newData.name;

        return newData;
    };

    const nurseryFormSuccess = () => {
        setIsNurseryFormSend(true);
        setAlertText(`Мы отправили Вам письмо на указанный вами адрес. Пожалуйста, зайдите в свою почту и следуйте дальнейшим инструкциям.`);
        setAlert(true);
    };

    const handleFormError = error => {
        if(error.response && error.response.data && error.response.data.errors) {
            setAlertText(error.response.data.errors.error);
        }
        setAlert(true);
    };

    return (
        <div className="nursery-registration">
            {!isFederationFormSend &&
                <Form
                    {...federationForm}
                    onSuccess={federationFormSuccess}
                    onError={handleFormError}
                    className="nursery-registration__form"
                >
                    <FormField {...federationForm.fields.federation_id} options={federations} />
                    <FormField {...federationForm.fields.folder_number} />
                    <SubmitButton type="submit" className="btn btn-primary">Отправить</SubmitButton>
                </Form>
            }
            {isFederationFormSend &&
                <div className="nursery-registration__info">
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
                            <button className="btn btn-primary" type="submit">Активировать</button>
                        </Form>
                    </div>
                </div>
            }
            {alert &&
                <Alert
                    title={isNurseryFormSend ? "Проверьте почту" : "Произошла ошибка! =("}
                    text={alertText || "Попробуйте повторить попытку позже, либо воспользуйтесь формой обратной связи."}
                    okButton={true}
                    onOk={() => {
                        setAlertText('');
                        setAlert(false);
                        if(isNurseryFormSend) {
                            history.push(LOGIN_URL);
                        }
                    }}
                />
            }
        </div>
    )
};

export default React.memo(NurseryRegistration);