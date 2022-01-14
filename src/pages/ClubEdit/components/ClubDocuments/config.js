import {object, string} from "yup";

export const defaultReduxKey = 'club_document';
export const endpointUrl = '/api/clubs/ClubDocument';

export const getlistUrl = '/api/clubs/ClubDocument/list/';


export const clubClubDocumentsConfig = {
    formAction: endpointUrl,
    fields: {
        name: {
            name: 'name',
            label: 'Название',
            placeholder: 'Название документа',
        },
        url: {
            name: 'url',
            label: 'Ссылка',
        },
    },
    validationSchema: object().shape({
        name: string()
            .required('Поле не может быть пустым'),
        url: string()
            .required('Поле не может быть пустым'),
    })
};