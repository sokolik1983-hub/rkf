import React, { useEffect, useState } from "react";
import {options} from './config.js';
import { Form, FormField, FormGroup } from "../../../../../../components/Form";
import Button from "../../../../../../components/Button";
import { Request } from "../../../../../../utils/request";

import './style.scss';


const FeedBack = ({
        blockContent,
        setShowModal,
        setErrAlert,
        setOkAlert,
}) => {
    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [subCategories, setSubCategories] = useState([]);

    const endpointGetTypes = '/api/feedback/types';
    const endpointGetCategories = '/api/feedback/categories';
    const endpointGetSubCategories = `/api/feedback/sub_categories?categoryId=${categoryId}`;
    const {fields} = options;

    useEffect(() => {
        getSelectors(endpointGetTypes);
        getSelectors(endpointGetCategories);
    }, []);

    useEffect(() => {
        setSubCategories([])
        !!categoryId &&
        getSelectors(endpointGetSubCategories);
    }, [categoryId]);

    const getSelectors = (url) => {
        Request({
                url: url
            },
            url === endpointGetTypes ? data => {setTypes([...data])} :
                url === endpointGetCategories ? data => {setCategories([...data])} :
                    data => {setSubCategories([...data])},
            error =>
                console.log(error)
        )
    };

    return (
        <Form
            {...options}
            className="feedback__form"
            onSuccess={() => {
                setOkAlert(true);
                setShowModal(false);
                blockContent(false);
            }}
            onError={() => {
                setErrAlert(true);
                blockContent(true);
            }}
        >
            <FormGroup className="feedback__form-group">
                <FormField {...fields.types}
                           options={types.map(option => ({value: option.id, label: option.name}))}
                />
                <FormField {...fields.category}
                           options={categories.map(option => ({value: option.id, label: option.name}))}
                           onChange={select => setCategoryId(select.value)}
                />
                {<FormField {...fields.subCategory}
                            disabled={!categoryId}
                            options={subCategories.map(option => ({value: option.id, label: option.name}))}
                />}
                <FormField {...fields.feedbackText} />
                <div className="feedback__form-buttons">
                    <Button
                        className="btn-cancel"
                        onClick={()=> {
                            setShowModal(false);
                            blockContent(false);
                        }}
                    >Отмена</Button>
                    <Button className="btn-submit" type="submit">Отправить</Button>
                </div>
            </FormGroup>
        </Form>
    );
};

export default FeedBack;
