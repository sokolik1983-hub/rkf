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
        type_id: {
            name: 'type_id',
            label: 'type',
            placeholder: 'CACIB',
            //components: {Option: CheckBoxOption},
            fieldType: 'reactSelectAsync',
            type: 'select',
            optionsEndpoint: '/api/exhibition/type'
        },
        rank_types: {
            name: 'rank_types',
            label: 'rank',
            placeholder: 'ЧРКФ',
            fieldType: 'reactSelectAsync',
            type: 'select',
            isMulti: true,
            closeMenuOnSelect: false,
            optionsEndpoint: '/api/exhibition/rank'
        },
        class_types: {
            name: 'class_types',
            label: 'Класс',
            placeholder: 'Ветераны',
            fieldType: 'reactSelectAsync',
            type: 'select',
            isMulti: true,
            closeMenuOnSelect: false,
            optionsEndpoint: '/api/exhibition/Caste'
        },
        referees_id: {
            name: 'referees_id',
            label: 'Судьи',
            placeholder: 'Выбрать',
            fieldType: 'reactSelectAsync',
            type: 'select',
            isMulti: true,
            closeMenuOnSelect: false,
            optionsEndpoint: '/api/Referee'
        },
        breed_types: {
            name: 'breed_types',
            label: 'Порода',
            placeholder: 'Лабрадор-ретривер',
            fieldType: 'reactSelectAsync',
            type: 'select',
            isMulti: true,
            closeMenuOnSelect: false,
            optionsEndpoint: '/api/dog/Breed'
        },
        city_id: {
            name: 'city_id',
            label: 'Город',
            placeholder: 'Москва',
            fieldType: 'reactSelectDict',
            type: 'select',
            dictName: 'cities'
            //optionsEndpoint: '/api/exhibition/city'
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
        rank_types: array()
            .required('Укажите Ранг выставки'),
        type_id: string()
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