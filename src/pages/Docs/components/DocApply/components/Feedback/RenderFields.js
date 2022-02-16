import React, {useEffect, useState} from 'react';
import {FormField} from "../../../../../../components/Form";
import Button from "../../../../../../components/Button";
import {Request} from "../../../../../../utils/request";
import {options} from './config.js';

const RenderFields = ({blockContent, setShowModal = true}) => {

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
        <div>
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
            <Button
                onClick={()=> {
                    setShowModal(false);
                    blockContent(false);
                }}
            >Отмена</Button>
            <Button type="submit">Отправить</Button>
        </div>
    );
};

export default RenderFields;
