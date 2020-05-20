import {object, string} from "yup";


export const endpointOwner = '/api/requests/LitterRequest/litter_owner';

export const SuffixFormConfig = {
    action: endpointOwner,
    method: 'PUT',
    fields: {
        suffix: {
            name: 'suffix',
            label: 'Суффикс',
            placeholder: 'Суффикс',
            type: 'text'
        },
        prefix: {
            name: 'prefix',
            label: 'Префикс',
            placeholder: 'Префикс',
            type: 'text'
        }
    },
    validationSchema: object().shape({
        suffix: string()
            .required('Укажите cуффикс'),
        prefix: string()
            .required('Укажите префикс')
    })
};