import {object, string, array} from "yup";

export const endpointExhibition = '/api/exhibitions/Exhibition/with_document_links';
export const endpointEditExhibitionPicture = '/api/exhibitions/Picture/';

export const exhibitionInfoForm = {
    action: endpointExhibition,
    method: 'PUT',
    fields: {
        name: {
            name: 'name',
            label: 'Название мероприятия',
            placeholder: 'Название мероприятия',
            disabled: true
        },
        description: {
            name: 'description',
            label: 'Описание мероприятия',
            fieldType: 'textarea',
            rows: 6,
            placeholder: 'Расскажите участникам и гостям, что их ожидает на мероприятии'
        },
        rank_types: {
            name: 'rank_types',
            label: 'Ранг',
            placeholder: 'Ранг',
            fieldType: 'reactSelectAsync',
            type: 'select',
            isMulti: true,
            closeMenuOnSelect: false,
            optionsEndpoint: '/api/exhibitions/rank'
        },
        class_types: {
            name: 'class_types',
            label: 'Класс',
            placeholder: 'Класс',
            fieldType: 'reactSelectAsync',
            type: 'select',
            isMulti: true,
            closeMenuOnSelect: false,
            optionsEndpoint: '/api/exhibitions/Caste'
        },
        breed_types: {
            name: 'breed_types',
            label: 'Порода',
            placeholder: 'Порода',
            fieldType: 'reactSelectAsync',
            type: 'select',
            isMulti: true,
            closeMenuOnSelect: false,
            optionsEndpoint: '/api/dog/Breed'
        },
        city_id: {
            name: 'city_id',
            label: 'Город',
            placeholder: 'Город',
            fieldType: 'reactSelectAsync',
            type: 'select',
            optionsEndpoint: '/api/city'
        },
        address: {
            name: 'address',
            label: 'Адрес',
            placeholder: 'Адрес проведения мероприятия'
        },
        schedule_name: {
            name: 'schedule_name',
            label: 'Название расписания',
            placeholder: 'Расписание'
        },
        schedule_url: {
            name: 'schedule_url',
            label: 'Ссылка на расписание',
            placeholder: 'https://'
        },
        catalog_name: {
            name: 'catalog_name',
            label: 'Название каталога',
            placeholder: 'Каталог'
        },
        catalog_url: {
            name: 'catalog_url',
            label: 'Ссылка на каталог',
            placeholder: 'https://'
        },
        additional_info: {
            name: 'additional_info',
            label: 'Дополнительная информация',
            fieldType: 'textarea',
            rows: 6,
            placeholder: 'Укажите дополнительную информацию о мероприятии'
        },
        address_additional_info: {
            name: 'address_additional_info',
            label: 'Дополнительная информация для адреса',
            fieldType: 'textarea',
            rows: 6,
            placeholder: 'Укажите дополнительную информацию по адресу'
        }
    },
    validationSchema: object().shape({
        name: string()
            .required('Введите название'),
        city_id: string()
            .required('Укажите город'),
        address: string()
            .required('Укажите адрес'),
        phones: array().of(object().shape({
            value: string()
            .max(16, 'Формат номера: +7(999)999-99-99')
            .matches(/[+][7]{1}[(]\d{3}[)]\d{3}[-]\d{2}[-]\d{2}/, 'Формат номера: +7(999)999-99-99')
            .required('Введите номер телефона'),
            description: string(),
        })),
        emails: array().of(object().shape({
            value: string().email('Неверный формат электронного адреса')
            .required('Введите e-mail')
            }),
        ),
    })
};

export const pictureTypes = {
    AVATAR: 3,
    MAP: 4,
};