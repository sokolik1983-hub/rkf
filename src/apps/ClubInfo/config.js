import {object, /*string*/} from "yup";

export const defaultReduxKey = 'club_info';
export const endpointUrl = '/api/club';

export const clubInfoFormConfig = {
    formAction: endpointUrl,
    fields: {
        name: {
            name: "name",
            label: "Название клуба"
        },
        correspondence_address: {
            name: "correspondence_address",
            label: "Адрес для кореспонденции",
            fieldType: 'textarea',
        },
        address: {
            name: "address",
            label: "Адрес клуба (улица, дом)",
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
        description: {
            name: "description",
            label: "Краткая информация о клубе",
            fieldType: 'textarea',
        },

        site: {
            name: "site",
            label: "Адрес сайта",
        },
        status_id: {
            name: "description",
            label: "Краткая информация о клубе",
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
    },
    validationSchema: object().shape({
        //
    })
};