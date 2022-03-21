import { object, string } from "yup";
export const defaultReduxKey = 'club_info';
export const endpointUrl = '/api/club';

export const clubInfoFormConfig = {
    formAction: endpointUrl,
    fields: {
        name: {
            name: "name",
            label: "Название клуба",
            maxLength: '100'
        },
        nameFed: {
            name: "name",
            label: "Название федерации",
            maxLength: '100'
        },
        description: {
            name: "description",
            label: "Краткая информация о&nbsp;клубе",
            fieldType: 'textarea',
            rows: 6,
            maxLength: '1500'
        },
        descriptionFed: {
            name: "description",
            label: "Краткая информация о федерации",
            fieldType: 'textarea',
            rows: 6,
            maxLength: '1500'
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
            .min(20, 'Введите информацию длиной не менее 20 символов')
    })
};