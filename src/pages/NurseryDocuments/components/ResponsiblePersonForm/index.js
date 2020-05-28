import React, {useEffect, useState} from "react";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import {Form, FormField, FormGroup, SubmitButton} from "../../../../components/Form";
import CustomNumber from "../../../../components/Form/Field/CustomNumber";
import Alert from "../../../../components/Alert";
import {ResponsibleFormConfig} from "./config";
import {Request} from "../../../../utils/request";
import "./index.scss";


const ResponsiblePersonForm = ({nurseryAlias, history}) => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [okAlert, setOkAlert] = useState(false);
    const [errAlert, setErrAlert] = useState(false);
    const path = history.location.pathname.split('/');
    const personId = +path[path.length - 2];
    const [initialValues, setInitialValues] = useState({
        last_name: '',
        first_name: '',
        second_name: '',
        phone: '',
        email: '',
        index: '',
        city_id: '',
        street: '',
        house: '',
        building: '',
        flat: '',
        is_default: false
    });

    useEffect(() => {
        if(personId) {
            (() => Request({
                    url: `/api/clubs/Declarant/${personId}`
                },
                data => {
                    let newInitialValues = {};
                    Object.keys(data).forEach(key => newInitialValues[key] = data[key] || initialValues[key]);

                    setInitialValues(newInitialValues);
                    setLoading(false);
                },
                error => {
                    console.log(error.response);
                    setLoading(false);
                }))();
        }

        (() => Request({
                url: '/api/City'
            },
            data => {
                setCities(data.map(city => ({label: city.name, value: city.id})));
                setLoading(false);
            },
            error => {
                console.log(error.response);
                setLoading(false);
            }))();
    }, []);

    const transformValues = values => personId ? {...values, id: personId} : values;

    return loading ?
        <Loading/> :
        <Card className="responsible-person">
            <div className="responsible-person__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
            </div>
            <div className="responsible-person__body">
                <h3>Ответственное лицо</h3>
                <Form
                    {...ResponsibleFormConfig}
                    method={personId ? 'PUT' : 'POST'}
                    transformValues={transformValues}
                    onSuccess={() => setOkAlert(true)}
                    onError={() => setErrAlert(true)}
                    initialValues={initialValues}
                    className="responsible-person__form"
                >
                    <FormGroup inline>
                        <FormField {...ResponsibleFormConfig.fields.last_name} />
                        <FormField {...ResponsibleFormConfig.fields.first_name} />
                        <FormField {...ResponsibleFormConfig.fields.second_name} />
                    </FormGroup>
                    <FormGroup inline>
                        <FormField {...ResponsibleFormConfig.fields.phone} />
                        <FormField {...ResponsibleFormConfig.fields.email} />
                    </FormGroup>
                    <FormGroup inline>
                        <CustomNumber {...ResponsibleFormConfig.fields.index} />
                        <FormField {...ResponsibleFormConfig.fields.city_id} options={cities} />
                        <FormField {...ResponsibleFormConfig.fields.subscriber_mail} />
                    </FormGroup>
                    <FormGroup inline>
                        <FormField {...ResponsibleFormConfig.fields.street} />
                        <FormField {...ResponsibleFormConfig.fields.house} />
                        <FormField {...ResponsibleFormConfig.fields.building} />
                        <FormField {...ResponsibleFormConfig.fields.flat} />
                    </FormGroup>
                    <FormField {...ResponsibleFormConfig.fields.is_default} />
                    <SubmitButton className="btn btn-green responsible-person__button">Сохранить</SubmitButton>
                </Form>
            </div>
            {okAlert &&
                <Alert
                    title="Документы отправлены"
                    text="Документы отправлены на рассмотрение. Вы можете отслеживать их статус в личном кабинете."
                    autoclose={2.5}
                    okButton="true"
                    onOk={() => history.push(`/nursery/${nurseryAlias}/documents`)}
                />
            }
            {errAlert &&
                <Alert
                    title="Ошибка отправки"
                    text={`Пожалуйста, проверьте правильность заполнения всех полей`}
                    autoclose={2.5}
                    onOk={() => setErrAlert(false)}
                />
            }
        </Card>
};

export default React.memo(ResponsiblePersonForm);