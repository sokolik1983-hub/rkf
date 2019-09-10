import {object} from "yup";

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
        //
    })
};