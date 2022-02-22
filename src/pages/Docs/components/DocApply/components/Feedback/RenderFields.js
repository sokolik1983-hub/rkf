import React, { useEffect, useState } from 'react';
import {connect} from 'formik';
import { options } from './config';
import SubmitError from '../SubmitError';
import Button from '../../../../../../components/Button';
import { Request } from '../../../../../../utils/request';
import { FormField, FormGroup, SubmitButton } from '../../../../../../components/Form';

const RenderFields = ({blockContent, setShowModal, formik}) => {
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
        const category = formik.values?.category_id;
        (category === 1 || category === 3 || category === 10) && setCategoryId(category);
    }, [formik.values]);

    useEffect(() => {
        setSubCategories([])
        !!categoryId &&
        getSelectors(endpointGetSubCategories);
    }, [categoryId]);

    const getSelectors = (url) => {
        Request({ url
            }, data => {
            const newData = data.map(option => ({value: option.id, label: option.name}));
            url === endpointGetTypes ? setTypes(newData) :
                url === endpointGetCategories ? setCategories(newData) :
                    setSubCategories(newData)},
            error => {
                console.log(error);
            }
        )
    };


    return (
        <FormGroup>
            <FormField {...fields.types}
                       options={types} />
            <FormField {...fields.category}
                       options={categories} />
            <FormField {...fields.subCategory}
                        disabled={!categoryId}
                        options={subCategories} />
            <FormField {...fields.feedbackText} />
            <div className="feedback__form-buttons">
                <Button className="btn-cancel"
                        onClick={() => {
                            setShowModal(false);
                            blockContent(false);
                        }}>
                    Отмена
                </Button>
                <SubmitButton className="btn-submit" type="submit" formik={formik}>Отправить</SubmitButton>
            </div>
            <SubmitError formik={formik} />
        </FormGroup>
    );
};

export default connect(RenderFields);
