import React, {useEffect, useState} from "react";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import {Form, FormField, FormGroup, SubmitButton} from "../../../../components/Form";
import Alert from "../../../../components/Alert";
import {ResponsibleFormConfig} from "./config";
import {Request} from "../../../../utils/request";
import "./index.scss";


const ResponsiblePersonForm = ({clubAlias, history}) => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [okAlert, setOkAlert] = useState(false);
    const [errAlert, setErrAlert] = useState(false);
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

    const transformValues = values => {
        console.log('values', values);
        return values;
    };

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
                        <FormField {...ResponsibleFormConfig.fields.index} />
                        <FormField {...ResponsibleFormConfig.fields.city_id} options={cities} />
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
                    onOk={() => history.push(`/${clubAlias}/documents`)}
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