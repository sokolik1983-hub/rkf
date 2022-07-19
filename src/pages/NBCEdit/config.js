import { object, string, number, array, boolean } from 'yup';
import { DEFAULT_PHONE_INPUT_MASK } from "../../appConfig"


const emptyFieldMsg = 'Поле не может быть пустым';

export const sections = {
    general: {
        id: 0,
        name: 'Основная информация',
        icon: 'icon-information'
    },
    contacts: {
        id: 1,
        name: 'Контакты',
        icon: 'icon-contacts'
    },
    bank: {
        id: 2,
        name: 'Банковские реквизиты',
        icon: 'icon-schedule'
    }
};

export const days = [
    {
        id: 1,
        name: 'Пн',
        fullName: 'Понедельник'
    },
    {
        id: 2,
        name: 'Вт',
        fullName: 'Вторник'
    },
    {
        id: 3,
        name: 'Ср',
        fullName: 'Среда'
    },
    {
        id: 4,
        name: 'Чт',
        fullName: 'Четверг'
    },
    {
        id: 5,
        name: 'Пт',
        fullName: 'Пятница'
    },
    {
        id: 6,
        name: 'Сб',
        fullName: 'Суббота'
    },
    {
        id: 7,
        name: 'Вс',
        fullName: 'Воскресенье'
    }];

export const editForm = {
    method: 'PUT',
    action: '/api/NationalBreedClub/update',
    fields: {
        name: {
            name: "name",
            disabled: true,
            label: "Название НКП",
        },
        alias: {
            name: "alias",
            disabled: true,
            label: "rkf.online/",
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
        phones: {
            phone: {
                mask: DEFAULT_PHONE_INPUT_MASK,
                label: 'phone',
                type: 'tel',
                placeholder: '+7(___)___-__-__',
                title: 'Формат номера: +7(999)999-99-99',
            },
        },
        emails: {
            email: {
                label: 'email',
                type: 'email',
                placeholder: 'Введите электронную почту',
            },
        },
        social_networks: [],
        documents: [],
    },
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

export const defaultValues = {
    // name: '',
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
    }],
};