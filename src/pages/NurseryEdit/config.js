import { object, string, number, array, boolean } from 'yup';
import { DEFAULT_PHONE_INPUT_MASK } from "../../appConfig"


const emptyFieldMsg = 'Поле не может быть пустым';
const lat = () => string().matches(/^[^а-я]+$/i, { message: 'Поле заполняется латиницей' })

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
    schedule: {
        id: 2,
        name: 'График работы',
        icon: 'icon-schedule'
    },
    delete: {
        id: 3,
        name: 'Удаление страницы',
        icon: 'icon-trash'
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
    action: '/api/nurseries/nursery/update_full',
    fields: {
        alias: {
            name: "alias",
            label: "rkf.online/kennel/",
            fieldType: "customAliasInput",
            baseUrl: "rkf.online/kennel/"
        },
        name: {
            name: "name",
            label: "Название питомника",
        },
        name_lat: {
            name: "name_lat",
            label: "Название питомника (на латинице)",
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
            label: "Адрес сайта",
        },
        co_owner_last_name: {
            name: "co_owner_last_name",
            label: "Фамилия совладельца",
        },
        co_owner_first_name: {
            name: "co_owner_first_name",
            label: "Имя совладельца",
        },
        co_owner_second_name: {
            name: "co_owner_second_name",
            label: "Отчество совладельца",
        },
        co_owner_mail: {
            name: "co_owner_mail",
            label: "E-mail совладельца",
            type: 'email'
        },
        address: {
            postcode: {
                name: "address.postcode",
                label: "Индекс",
                placeholder: 'Введите индекс'
            },
            city_id: {
                name: "address.city_id",
                label: "Населенный пункт",
                fieldType: 'reactSelectAsync',
                type: 'select',
                optionsEndpoint: '/api/city'
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
            accept: '.jpg, .gif'
        },
        banner: {
            name: "banner",
            label: "Баннер",
            fieldType: "image"
        },
        is_public: {
            name: "is_public",
            label: "Скрыть личную информацию",
            fieldType: "customCheckbox"
        },
        contacts: {
            phone: {
                mask: DEFAULT_PHONE_INPUT_MASK,
                label: 'phone',
                type: 'tel',
                placeholder: '+7(___)___-__-__',
                title: 'Формат номера: +7(999)999-99-99',
            },
        },
        documents: [],
        socials: [],
        work_time: []
    },
    validationSchema: object().shape({
        alias: string()
            .matches(/^\w+$/, 'Допускаются цифры, латинские буквы и нижнее подчеркивание')
            .required(emptyFieldMsg),
        name: string()
            .required(emptyFieldMsg),
        name_lat: lat()
            .required(emptyFieldMsg),
        web_site: string()
            .url('Адрес сайта должен начинаться с "http://" либо "https://"'),
        co_owner_mail: string().email('Неверный формат E-mail'),
        address: object().shape({
            city_id: string()
                .required(emptyFieldMsg),
            postcode: string()
                .required(emptyFieldMsg),
            street_type_id: string()
                .required(emptyFieldMsg),
            street_name: string()
                .required(emptyFieldMsg),
            house_type_id: string()
                .required(emptyFieldMsg),
            house_name: string()
                .required(emptyFieldMsg)

        }),
        contacts: array().of(object().shape({
            value: string().when(['contact_type_id'], {
                is: 1,
                then: string()
                    .min(16, 'Формат номера: +7(999)999-99-99')
                    .required('Введите номер телефона'),
                otherwise: string()
                    .email('Неверный формат электронного адреса')
                    .required('Введите e-mail')
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
        socials: array().of(object().shape({
            site: string()
                .url('Ссылка должна начинаться с "http://" либо "https://"')
                .required(emptyFieldMsg),
            description: string()
                .required(emptyFieldMsg)
        })),
        work_time: array().of(object().shape({
            time_from: string()
                .required(emptyFieldMsg),
            time_to: string()
                .required(emptyFieldMsg)
        }))
    })
};

export const defaultValues = {
    alias: '',
    name: '',
    name_lat: '',
    description: '',
    web_site: '',
    co_owner_last_name: '',
    co_owner_first_name: '',
    co_owner_second_name: '',
    co_owner_mail: '',
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
    socials: [{
        id: null,
        site: '',
        description: '',
        social_network_type_id: 1
    }],
    work_time: [{
        id: null,
        week_day_id: null,
        time_from: '',
        time_to: ''
    }],
    logo: '',
    logo_link: '',
    banner: '',
    banner_link: ''
};