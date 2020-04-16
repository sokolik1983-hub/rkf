import {object, string} from "yup";


export const endpointOwner = '/api/requests/LitterRequest/litter_owner';

export const OwnerFormConfig = {
    action: endpointOwner,
    method: 'PUT',
    fields: {
        last_name: {
            name: 'last_name',
            label: 'Фамилия',
            placeholder: 'Фамилия',
            type: 'text'
        },
        first_name: {
            name: 'first_name',
            label: 'Имя',
            placeholder: 'Имя',
            type: 'text'
        },
        second_name: {
            name: 'second_name',
            label: 'Отчество',
            placeholder: 'Отчество',
            type: 'text'
        },
        email: {
            name: 'email',
            label: 'Email',
            placeholder: 'Email',
            type: 'email'
        },
        address: {
            name: 'address',
            label: 'Адрес',
            placeholder: 'Адрес',
            type: 'text'
        }
    },
    validationSchema: object().shape({
        last_name: string()
            .required('Укажите фамилию'),
        first_name: string()
            .required('Укажите имя')
    })
};