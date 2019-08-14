import {object, string} from "yup";

export const defaultReduxKey = 'club_document';
export const endpointUrl = '/api/club/ClubDocument';

export const getlistUrl = '/api/club/ClubDocument/list?=';


export const clubClubDocumentsConfig = {
    formAction: endpointUrl,
    fields: {
        name: {
            name: 'name',
            label: 'Название'

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