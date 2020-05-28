import React, {useEffect, useState} from "react";
import Loading from "../../../../../../components/Loading";
import {Form, FormField, FormGroup, SubmitButton} from "../../../../../../components/Form";
import {Request} from "../../../../../../utils/request";
import {OwnerFormConfig, endpointOwner} from "./config";
import "./index.scss";


const AddOwnerForm = ({puppyId, setState}) => {
    const [loading, setLoading] = useState(true);
    const [initialValues, setIniitialValues] = useState({
        id: puppyId,
        last_name: '',
        first_name: '',
        second_name: '',
        email: '',
        address: '',
        // suffix: '',
        // prefix: ''
    });

    useEffect(() => {
        (() => Request({
                url: `${endpointOwner}?id=${puppyId}`
            },
            data => {
                let values = {};
                Object.keys(data).forEach(key => values[key] = data[key] || initialValues[key]);

                setIniitialValues(values);
                setLoading(false);
            },
            error => {
                console.log(error.response);
                setLoading(false);
            }))();
    }, []);

    const transformValues = values => {
        let newValues = {};
        Object.keys(values).forEach(key => newValues[key] = values[key] || null);
        return newValues;
    };

    const onSuccess = () => {
        alert('Владелец добавлен');
        setState({showModal: false});
    };

    const onError = () => {
        alert('Произошла ошибка, попробуйте позже');
        setState({showModal: false});
    };

    return loading ?
        <Loading/> :
        <div className="add-owner">
            <h2 className="add-owner__title">Владелец</h2>
            <Form
                {...OwnerFormConfig}
                transformValues={transformValues}
                onSuccess={onSuccess}
                onError={onError}
                initialValues={initialValues}
                className="add-owner__form"
            >
                <FormGroup>
                    <FormField {...OwnerFormConfig.fields.last_name} />
                    <FormField {...OwnerFormConfig.fields.first_name} />
                    <FormField {...OwnerFormConfig.fields.second_name} />
                    <FormField {...OwnerFormConfig.fields.email} />
                    <FormField {...OwnerFormConfig.fields.address} />
                    {/*<FormField {...OwnerFormConfig.fields.suffix} />*/}
                    {/*<FormField {...OwnerFormConfig.fields.prefix} />*/}
                </FormGroup>
                <SubmitButton className="btn-primary add-owner__button">Добавить</SubmitButton>
            </Form>
        </div>
};

export default React.memo(AddOwnerForm);