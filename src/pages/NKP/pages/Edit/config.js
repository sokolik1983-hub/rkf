import React from "react";
import {object, string, number, array, boolean} from "yup";
import {DEFAULT_PHONE_INPUT_MASK} from "../../../../appConfig";


const emptyFieldMsg = 'Поле не может быть пустым';

export const sections = [
    {
        id: 0,
        name: 'Основная информация',
        icon: <svg width="20" height="18" viewBox="0 0 20 20" fill="current" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 19C5.04182 19 1 14.9582 1 10C1 5.04182 5.04182 1 10 1C14.9582 1 19 5.04182 19 10C19 14.9582 14.9582 19 10 19ZM10 2.63636C5.94182 2.63636 2.63636 5.94182 2.63636 10C2.63636 14.0582 5.94182 17.3636 10 17.3636C14.0582 17.3636 17.3636 14.0582 17.3636 10C17.3636 5.94182 14.0582 2.63636 10 2.63636Z"
                fill="#8F989D"/>
            <path
                d="M9.99982 6.51454C10.4517 6.51454 10.818 6.14823 10.818 5.69636C10.818 5.24449 10.4517 4.87817 9.99982 4.87817C9.54795 4.87817 9.18164 5.24449 9.18164 5.69636C9.18164 6.14823 9.54795 6.51454 9.99982 6.51454Z"
                fill="#8F989D"/>
            <path
                d="M9.99982 15.9564C9.54164 15.9564 9.18164 15.58 9.18164 15.1382V8.44544C9.18164 7.98726 9.54164 7.62726 9.99982 7.62726C10.458 7.62726 10.818 8.00362 10.818 8.44544V15.1218C10.818 15.58 10.458 15.9564 9.99982 15.9564Z"
                fill="#8F989D"/>
        </svg>
    },
    {
        id: 1,
        name: 'Контакты',
        icon: <svg width="20" height="18" viewBox="0 0 20 20" fill="current" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15.6 19H5.12727C3.94909 19 3 18.0182 3 16.8236V3.17636C3 1.98182 3.94909 1 5.12727 1H15.6C16.7782 1 17.7273 1.98182 17.7273 3.17636V16.8073C17.7273 18.0182 16.7782 19 15.6 19ZM5.12727 2.63636C4.84909 2.63636 4.63636 2.88182 4.63636 3.17636V16.8073C4.63636 17.1182 4.84909 17.3636 5.12727 17.3636H15.6C15.8782 17.3636 16.0909 17.1182 16.0909 16.8236V3.17636C16.0909 2.88182 15.8782 2.63636 15.6 2.63636H5.12727Z"
                fill="#8F989D"/>
            <path
                d="M10.3636 16.2506C10.8335 16.2506 11.2145 15.8697 11.2145 15.3997C11.2145 14.9298 10.8335 14.5488 10.3636 14.5488C9.89366 14.5488 9.5127 14.9298 9.5127 15.3997C9.5127 15.8697 9.89366 16.2506 10.3636 16.2506Z"
                fill="#8F989D"/>
            <path
                d="M16.9091 13.5509H3.81818C3.36 13.5509 3 13.1746 3 12.7327C3 12.2909 3.36 11.9146 3.81818 11.9146H16.9091C17.3673 11.9146 17.7273 12.2746 17.7273 12.7327C17.7273 13.1909 17.3673 13.5509 16.9091 13.5509Z"
                fill="#8F989D"/>
        </svg>
    },
    {
        id: 2,
        name: 'Банковские реквизиты',
        icon: <svg width="20" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 19C5.04182 19 1 14.9582 1 10C1 5.04182 5.04182 1 10 1C14.9582 1 19 5.04182 19 10C19 14.9582 14.9582 19 10 19ZM10 2.63636C5.94182 2.63636 2.63636 5.94182 2.63636 10C2.63636 14.0582 5.94182 17.3636 10 17.3636C14.0582 17.3636 17.3636 14.0582 17.3636 10C17.3636 5.94182 14.0582 2.63636 10 2.63636Z"
                fill="#8F989D"/>
            <path
                d="M6.90705 13.9109C6.69432 13.9109 6.48159 13.8291 6.33432 13.6655C6.00705 13.3382 6.00705 12.8309 6.33432 12.5037L9.18159 9.65638V5.63093C9.18159 5.17274 9.54159 4.81274 9.99978 4.81274C10.458 4.81274 10.818 5.17274 10.818 5.63093V10.3437L7.49614 13.6655C7.3325 13.8291 7.11978 13.9109 6.90705 13.9109Z"
                fill="#8F989D"/>
        </svg>
    }
];

export const editForm = {
    method: 'PUT',
    action: '/api/NationalBreedClub/update',
    validationSchema: object().shape({
        alias: string()
            .matches(/^\w+$/, 'Допускаются цифры, латинские буквы и нижнее подчеркивание')
            .required(emptyFieldMsg),
        name: string()
            .required(emptyFieldMsg),
        web_site: string()
            .url('Адрес сайта должен начинаться с "http://" либо "https://"'),
        bank_comment: string(),
        phones: array().of(object().shape({
            value: string().min(16, 'Формат номера: +7(999)999-99-99').required('Введите номер телефона'),
            comment: string(),
            contact_type_id: number(),
            is_main: boolean()
        })),
        emails: array().of(object().shape({
            value: string().email('Неверный формат электронного адреса'),
            comment: string(),
            contact_type_id: number(),
            is_main: boolean()
        })),
        social_networks: array().of(object().shape({
            site: string()
                .url('Ссылка должна начинаться с "http://" либо "https://"'),
            description: string()
        })),
    })
};

export const editFormFields = {
    name: {
        name: "name",
        disabled: true,
        label: "Название НКП",
    },
    alias: {
        name: "alias",
        disabled: true,
        label: "rkf.online/nbc/",
    },
    comment: {
        name: "comment",
        label: "Краткая информация о НКП",
        fieldType: 'textarea',
        rows: 6,
        maxLength: '1500'
    },
    web_site: {
        name: "web_site",
        label: "Адрес сайта",
    },
    bank_comment: {
        name: "bank_comment",
        fieldType: 'textarea',
        rows: 6,
        maxLength: '1500'
    },
    phones: [
        {
            mask: DEFAULT_PHONE_INPUT_MASK,
            label: 'Телефон',
            type: 'tel',
            placeholder: '+7(___)___-__-__',
            title: 'Формат номера: +7(999)999-99-99',
        }
    ],
    emails: [
        {
            label: 'E-mail',
            type: 'email',
            placeholder: 'Введите e-mail',
        }
    ],
    social_networks: [],
    documents: []
};

export const defaultValues = {
    name: '',
    alias: '',
    comment: '',
    web_site: '',
    bank_comment: '',
    phones: [{
        value: '',
        description: '',
        is_main: false,
        contact_type_id: 1
    }],
    emails: [{
        value: '',
        description: '',
        is_main: false,
        contact_type_id: 2
    }],
    social_networks: [{
        site: '',
        description: '',
        social_network_type_id: 1
    }],
    documents: [{
        id: null,
        name: '',
        url: ''
    }]
};