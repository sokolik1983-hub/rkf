import {object, string} from "yup";
export const defaultReduxKey='client_profile';

export const clientProfileForm = {
    fields: {
        company_name: {
            name: 'company_name',
            label: 'Наименование ИП',
        },
        company_type: {
            name: 'company_type',
            type: 'select',
            label: 'Статус',
            placeholder: 'Региональный или федеральный',
            fieldType: 'reactSelect',
            options: [
                {label: "Федеральный", value: 1},
                {label: "Региональный", value: 2}
            ]
        },
        company_region:{
            name: 'company_region',
            label: 'Регион',
        },
        company_head:{
            name: 'company_head',
            label: 'Реководство',
        },
        company_date_egrul:{
            name: 'company_date_egrul',
            label: 'Дата ЕГРЮЛ',
        },
        company_date_registration:{
            name: 'company_date_registration',
            label: 'Дата регистрации',
        },
        company_iin:{
            name: 'company_iin',
            label: 'ИНН',
        },
        company_kpp:{
            name: 'company_kpp',
            label: 'КПП',
        },
        company_ogrn:{
            name: 'company_ogrn',
            label: 'ОРГН / ОГРНИП',
        },
        company_okpo:{
            name: 'company_okpo',
            label: 'ОКПО / ОКПО ИП',
        },
        company_dog_stamp:{
            name: 'company_dog_stamp',
            label: 'Клеймо клуба',
        },
    },
    validationSchema: object().shape({
        date: string()
            .required('Укажите дату'),
    })
};
export const clientContactsForm = {
    fields: {
        email: {
            name: 'email',
            label: 'E-mail',
        },
        phone_number: {
            name: 'phone_number',
            label: 'E-mail',
        },
        country:{
            name: 'country',
            label: 'Страна',
        },
        city:{
            name: 'city',
            label: 'Город',
        },
        address:{
            name: 'address',
            label: 'Адрес клуба',
        },
        legal_address:{
            name: 'legal_address',
            label: 'Юридический адрес',
        },
    },
    validationSchema: object().shape({
        date: string()
            .required('Укажите дату'),
    })
};

export const clientSocialForm = {
    fields: {
        web_site: {
            name: 'web_site',
            label: 'Веб-сайт',
        },
        facebook: {
            name: 'facebook',
            label: 'Facebook',
        },
        vk:{
            name: 'vk',
            label: 'Вконтакте',
        },

        instagram:{
            name: 'instagram',
            label: 'Instagram',
        },
    },
    validationSchema: object().shape({
        date: string()
            .required('Укажите дату'),
    })
};