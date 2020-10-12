import { object, string, number, array, boolean } from 'yup';

const emptyFieldMsg = 'Поле не может быть пустым';
// const lat = () => string().matches(/^[^а-я]+$/i, { message: 'Поле заполняется латиницей' })

export const editForm = {
    method: 'PUT',
    action: '/api/owners/owner/update_full',
    fields: {
        alias: {
            name: "alias",
            label: "Адрес страницы",
            fieldType: "customAliasInput",
            baseUrl: "rkf.online/user/"
        },
        description: {
            name: "description",
            label: "Краткая информация о питомнике",
            fieldType: 'textarea',
            rows: 6,
            maxLength: '1500'
        },
        web_site: {
            name: "web_site",
            placeholder: 'Введите ссылку на сайт',
            label: "Ссылка на сайт",
        },
        personal_information: {
            first_name: {
                name: "personal_information.first_name",
                label: "Имя",
            },
            first_name_lat: {
                name: "personal_information.first_name_lat",
                label: "Name",
            },
            last_name: {
                name: "personal_information.last_name",
                label: "Фамилия",
            },
            last_name_lat: {
                name: "personal_information.last_name_lat",
                label: "Surname",
            },
            second_name: {
                name: "personal_information.second_name",
                label: "Отчество",
            },
            birth_date: {
                name: "personal_information.birth_date",
                label: "Дата рождения",
                type: 'date'
            },
            is_hidden: {
                name: "personal_information.is_hidden",
                label: "Скрыть информацию на моей странице",
                fieldType: "customCheckbox"
            },
            description: {
                name: 'personal_information.description',
                label: 'Общая информация о себе',
                type: 'text',
                fieldType: 'textarea'
            },
        },
        address: {
            city_id: {
                name: "address.city_id",
                label: "Город",
                fieldType: 'reactSelectAsync',
                type: 'select',
                optionsEndpoint: '/api/city'
            },
            postcode: {
                name: "address.postcode",
                label: "Индекс",
                placeholder: 'Введите индекс'
            },
            street_type_id: {
                name: "address.street_type_id",
                label: "Тип улицы",
                placeholder: 'Тип улицы',
                fieldType: 'reactSelect',
                type: 'select'
            },
            street_name: {
                name: "address.street_name",
                label: "Улица",
                placeholder: 'Введите название'
            },
            house_type_id: {
                name: "address.house_type_id",
                label: "Тип здания",
                placeholder: 'Тип здания',
                fieldType: 'reactSelect',
                type: 'select'
            },
            house_name: {
                name: "address.house_name",
                label: "Здание",
                placeholder: 'Введите номер'
            },
            flat_type_id: {
                name: "address.flat_type_id",
                label: "Тип помещения",
                placeholder: 'Тип помещения',
                fieldType: 'reactSelect',
                type: 'select'
            },
            flat_name: {
                name: "address.flat_name",
                label: "Помещение",
                placeholder: 'Введите номер'
            },
        },
        logo: {
            name: 'logo',
            accept: '.jpg, .png, .gif'
        },
        banner: {
            name: "banner",
            label: "Баннер",
            fieldType: "image"
        },
        contacts: [],
        documents: [],
        social_networks: [],
        web_sites: []
    },
    validationSchema: object().shape({
        alias: string()
            .matches(/^\w+$/, 'Допускаются цифры, латинские буквы и нижнее подчеркивание')
            .required(emptyFieldMsg),
        web_site: string()
            .url('Адрес сайта должен начинаться с "http://" либо "https://"'),
        co_owner_mail: string().email('Неверный формат E-mail'),
        address: object().shape({
            city_id: string()
                .required(emptyFieldMsg)
        }),
        personal_information: object().shape({
            first_name: string().required(emptyFieldMsg),
            last_name: string().required(emptyFieldMsg),
            sex_type_id: string().required('Укажите пол')
        }),
        contacts: array().of(object().shape({
            value: string().when(['contact_type_id'], {
                is: 1,
                then: string()
                    .matches(/[+][7]{1}[(]\d{3}[)]\d{3}[-]\d{2}[-]\d{2}/, 'Формат номера: +7(999)999-99-99')
                    .required(emptyFieldMsg),
                otherwise: string()
                    .email('Неверный формат электронного адреса')
                    .required(emptyFieldMsg)
            }),
            description: string(),
            contact_type_id: number(),
            is_main: boolean()
        })),
        documents: array().of(object().shape({
            name: string()
                .required(emptyFieldMsg),
            url: string()
                .url('Ссылка должна начинаться с "http://" либо "https://"')
                .required(emptyFieldMsg)
        })),
        social_networks: array().of(object().shape({
            site: string()
                .url('Ссылка должна начинаться с "http://" либо "https://"')
                .required(emptyFieldMsg),
            description: string()
                .required(emptyFieldMsg)
        })),
        // web_sites: array().of(object().shape({
        //     value: string()
        //         .url('Ссылка должна начинаться с "http://" либо "https://"')
        //         .required(emptyFieldMsg),
        // }))
    })
};

export const defaultValues = {
    alias: '',
    description: '',
    personal_information: {
        first_name: '',
        first_name_lat: '',
        last_name: '',
        last_name_lat: '',
        second_name: '',
        birth_date: '',
        sex_type_id: '',
        is_hidden: true,
        description: '',
    },
    address: {
        postcode: '',
        city_id: '',
        street_type_id: '',
        street_name: '',
        house_type_id: '',
        house_name: '',
        flat_type_id: '',
        flat_name: null,
    },
    contacts: [{
        id: null,
        value: '',
        description: '',
        is_main: false,
        contact_type_id: 1
    }],
    documents: [{
        id: null,
        name: '',
        url: ''
    }],
    social_networks: [{
        id: null,
        site: '',
        description: '',
        social_network_type_id: 1
    }],
    // web_sites: [{
    //     id: null,
    //     value: '',
    //     description: '',
    //     is_main: false,
    //     contact_type_id: 1
    // }],
    web_site: '',
    logo: '',
    logo_link: '',
    banner: '',
};