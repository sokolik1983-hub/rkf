import {object, string} from "yup";
export const defaultReduxKey='client_profile';

export const clientProfileForm = {
    fields: {
        name: {
            name: 'name',
            label: 'Наименование клуба',
        },
        federation: {
            name: 'federation',
            label: 'Федерация',
            type: 'select',
            placeholder: 'ОАНКОО',
            fieldType: 'reactSelectAsync',
            optionsEndpoint: 'http://services.development.ueplatform.ru/api/club/federation/all'
        },
        status: {
            name: 'status',
            label: 'Статус',
            type: 'select',
            placeholder: 'Региональный',
            fieldType: 'reactSelectAsync',
            optionsEndpoint: 'http://services.development.ueplatform.ru/api/club/status/all'
        },
        company_region:{
            name: 'company_region',
            label: 'Регион',
        },
        owner_name:{
            name: 'owner_name',
            label: 'Реководство',
        },
        company_date_egrul:{
            name: 'company_date_egrul',
            label: 'Дата ЕГРЮЛ',
        },
        registration_date:{
            name: 'registration_date',
            label: 'Дата регистрации',
        },
        iin:{
            name: 'iin',
            label: 'ИНН',
        },
        kpp:{
            name: 'kpp',
            label: 'КПП',
        },
        ogrn:{
            name: 'ogrn',
            label: 'ОРГН / ОГРНИП',
        },
        okpo:{
            name: 'okpo',
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