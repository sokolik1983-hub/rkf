import {object, string} from "yup";

export const defaultReduxKey = 'client_exhibition_documents';
export const API_ENDPOINT = '/api/exhibitions/ExhibitionDocument';


export const exhibitionDocumentFormConfig = {
    action: API_ENDPOINT,
    fields: {
        name: {
            name: 'name',
            label: 'Описание'

        },
        url: {
            name: 'url',
            label: 'Ссылка',
        },
    },
    validationSchema: object().shape({
        name: string()
            .required('Укажите значение'),
        url: string()
            .required('Укажите значение')
    })
};