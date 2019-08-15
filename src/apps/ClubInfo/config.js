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
            optionsEndpoint: '/api/exhibition/city/all'
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
    },
    validationSchema: object().shape({
        //
    })
};