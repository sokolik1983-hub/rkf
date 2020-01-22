import {array, object, string} from "yup";

export const endpointExhibition = '/api/exhibitions/Exhibition/with_document_links';
export const endpointEditExhibitionPicture = '/api/exhibitions/Picture/';

export const exhibitionInfoForm = {
    action: endpointExhibition,
    method: 'PUT',
    fields: {
        name: {
            name: 'name',
            label: 'Название выставки',
            placeholder: 'Название выставки'
        },
        description: {
            name: 'description',
            label: 'Описание выставки',
            fieldType: 'textarea',
            rows: 6,
            placeholder: 'Расскажите участникам и гостям, что их ожидает на выставке. Также укажите ссылки на необходимые \n' +
                'документы: ветеринарные правила и другие... '
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
            placeholder: 'Адрес проведения выставки'
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
        }
    },
    validationSchema: object().shape({
        name: string()
            .required('Введите название'),
        description: string()
            .required('Добавьте описание'),
        city_id: string()
            .required('Укажите город'),
        address: string()
            .required('Укажите адрес'),
        rank_types: array()
            .required('Укажите Ранг выставки'),
        class_types: array()
            .required('Укажите Класс выставки'),
        breed_types: array()
            .required('Укажите породы'),
        schedule_url: string()
            .required('Укажите ссылку на расписание'),
        catalog_url: string()
            .required('Укажите ссылку на каталог'),
    })
};

export const pictureTypes = {
    AVATAR: 3,
    MAP: 4,
};