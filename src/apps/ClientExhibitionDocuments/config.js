import {object, string} from "yup";

const DOCUMENTS_URL = '/api/exhibitions/documents/full';
export const defaultReduxKey = 'exhibition_documents';


export const documentsFormConfig = {
    formAction: DOCUMENTS_URL,
    fields: {
        title: {
            name: 'title',
            label: 'Название',
            placeholder: 'Текст ссылки на документ...',
        },
        link: {
            name: 'link',
            label: 'Ссылка',
            placeholder: 'Ссылка на документ...',
        },
    },
    validationSchema: object().shape({
        title: string()
            .required('Поле не может быть пустым'),
        link: string()
            .required('Поле не может быть пустым'),
    })
};