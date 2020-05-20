import React, {useEffect, useState} from "react";
import Loading from "../../../../../../components/Loading";
import {Form, FormField, FormGroup, SubmitButton} from "../../../../../../components/Form";
import {Request} from "../../../../../../utils/request";
import {endpointOwner, SuffixFormConfig} from "./config";
import "./index.scss";


const AddSuffixForm = ({puppyId, setState}) => {
    const [loading, setLoading] = useState(true);
    const [initialValues, setIniitialValues] = useState({
        suffix: '',
        prefix: ''
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
        setState({showModal: false});
    };

    const onError = () => {
        alert('Произошла ошибка, попробуйте позже');
        setState({showModal: false});
    };

    return loading ?
        <Loading/> :
        <div className="add-suffix">
            <h2 className="add-suffix__title">Суффикс и префикс</h2>
            <Form
                {...SuffixFormConfig}
                transformValues={transformValues}
                onSuccess={onSuccess}
                onError={onError}
                initialValues={initialValues}
                className="add-suffix__form"
            >
                <FormGroup>
                    <FormField {...SuffixFormConfig.fields.suffix} />
                    <FormField {...SuffixFormConfig.fields.prefix} />
                </FormGroup>
                <SubmitButton className="btn-primary add-suffix__button">Добавить</SubmitButton>
            </Form>
        </div>
};

export default React.memo(AddSuffixForm);