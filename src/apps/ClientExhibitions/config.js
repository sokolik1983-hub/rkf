//import CheckBoxOption from 'components/Form/CustomSelectOptions/CheckBox'
import {array, object, string} from "yup";

export const defaultReduxKey = 'client_exhibitions'

export const CLIENT_EXHIBITION_URL = '/api/Exhibition';

export const firstStepForm = {
    formAction: CLIENT_EXHIBITION_URL,
    fields: {
        name: {
            name: 'name',
            label: 'Название выставки',
            placeholder: 'Всероссийская выставка собак «Летний кубок — 2019»'
        },
        description: {
            name: 'description',
            label: 'Описание выставки',
            fieldType: 'textarea',
            placeholder: 'Расскажите участникам и гостям, что их ожидает на выставке. Также укажите ссылки на необходимые \n' +
                'документы: ветеринарные правила и другие... '
        },
        dignity_types: {
            name: 'dignity_types',
            label: 'Титул',
            placeholder: 'Чемпионы',
            isMulti: true,
            closeMenuOnSelect: false,
            //components: {Option: CheckBoxOption},
            fieldType: 'reactSelectAsync',
            type: 'select',
            optionsEndpoint: 'http://services.development.ueplatform.ru/api/exhibition/dignity/all'
        },
        rank_type: {
            name: 'rank_type',
            label: 'Ранг выставки',
            placeholder: 'CACIB',
            fieldType: 'reactSelectAsync',
            type: 'select',
            optionsEndpoint: 'http://services.development.ueplatform.ru/api/exhibition/rank/all'
        },
        class_types: {
            name: 'class_types',
            label: 'Класс',
            placeholder: 'Ветераны',
            fieldType: 'reactSelectAsync',
            type: 'select',
            isMulti: true,
            closeMenuOnSelect: false,
            optionsEndpoint: 'http://services.development.ueplatform.ru/api/exhibition/Caste/all'
        },
        referees_id: {
            name: 'referees_id',
            label: 'Судьи',
            placeholder: 'Выбрать',
            fieldType: 'reactSelectAsync',
            type: 'select',
            isMulti: true,
            closeMenuOnSelect: false,
            optionsEndpoint: 'http://services.development.ueplatform.ru/api/Referee/all'
        },
        breed_types: {
            name: 'breed_types',
            label: 'Порода',
            placeholder: 'Лабрадор-ретривер',
            fieldType: 'reactSelectAsync',
            type: 'select',
            isMulti: true,
            closeMenuOnSelect: false,
            optionsEndpoint: 'http://services.development.ueplatform.ru/api/dog/Breed/all'
        },
        city_id: {
            name: 'city_id',
            label: 'Город',
            placeholder: 'Москва',
            fieldType: 'reactSelectAsync',
            type: 'select',
            optionsEndpoint: 'http://services.development.ueplatform.ru/api/exhibition/city/all'
        },
        address: {
            name: 'address',
            label: 'Адрес',
            placeholder: 'Адрес проведения выставки'
        },
        // user_id: {
        //     name: 'user_id',
        //     type: "hidden",
        //     defaultValue: 0,
        // },
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
        rank_type: string()
            .required('Укажите Ранг выставки'),
        dignity_types: array()
            .required('Укажите титулы'),
        class_types: array()
            .required('Укажите Класс выставки'),
        breed_types: array()
            .required('Укажите породы'),
    }),
};

export const pictureTypes = {
    AVATAR: 3,
    MAP: 4,
};