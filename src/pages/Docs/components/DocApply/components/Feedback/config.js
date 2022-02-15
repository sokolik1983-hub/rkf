import React from "react";
import { object, string } from "yup";

const endpointGetTypes = 'api/feedback/types'
const endpointGetCategories = 'api/feedback/categories'
const endpointGetSubCategories = 'api/feedback/sub_categories'
const endpointPostFeedback = 'api/feedback/new'



export const options = {
    fields:{
        reason: {
            name: 'types',
            label: 'Причина обращения',
            placeholder: 'Выберите...',
            fieldType: 'reactSelectAsync',
            type: 'select',
            rows: 3,
            optionsEndpoint: '/api/feedback/types'
        },
        category: {
            name: 'category',
            label: 'Категория обращения',
            placeholder: 'Выберите...',
            fieldType: 'reactSelectAsync',
            type: 'select',
            optionsEndpoint: '/api/feedback/categories'
        },
        subCategory: {
            name: 'subCategory',
            label: 'Подкатегория',
            placeholder: 'Выберите...',
            fieldType: 'reactSelectAsync',
            type: 'select',
        },
        feedbackText: {
            name: "feedbackText",
            label: "Напишите Ваше обращение",
            fieldType: 'textarea',
            rows: 6,
            maxLength: '1500'
        },
    },
}





const config = () => {
    return (
        <div>

        </div>
    );
};

export default config;
