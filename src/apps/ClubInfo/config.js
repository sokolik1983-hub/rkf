import {object, string} from "yup";
export const defaultReduxKey = 'club_info';
export const endpointUrl = '/api/club';

export const clubInfoFormConfig = {
    formAction: endpointUrl,
    fields: {
        name: {
            name: "name",
            label: "Название клуба"
        },
        description: {
            name: "description",
            label: "Краткая информация о клубе",
            fieldType: 'textarea',
        },
        city_id: {
            name: 'city_id',
            label: 'Город',
            placeholder: 'Выберите город',
            fieldType: 'reactSelectAsync',
            type: 'select',
            optionsEndpoint: '/api/city'
        },
        address: {
            name: "address",
            label: "Адрес клуба (улица, дом)",
            fieldType: 'textarea',
        },
        work_time_from: {
            name: "work_time_from",
            label: "Время работы С",
            type: 'time'
        },
        work_time_to: {
            name: "work_time_to",
            label: "Время работы До",
            type: 'time'
        },
        site: {
            name: "site",
            label: "Адрес сайта",
        }
    },
    validationSchema: object().shape({
        name: string()
            .required('Поле не может быть пустым')
            .nullable(),
        description: string()
            .nullable()
            .required('Поле не может быть пустым')
            .min(20, 'коротко от 20'),
        city_id: string()
            .required('Поле не может быть пустым')
            .nullable(),
        address: string()
            .required('Поле не может быть пустым')
            .nullable(),
    })
};