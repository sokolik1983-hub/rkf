import {object, string} from "yup";

export const endpointGetNews = '/api/ClubArticle';
export const endpointEditNewsText = '/api/ClubArticle'; //PUT
export const endpointAddNewsPicture = '/api/ClubArticle/image'; //POST
export const endpointDeleteNewsPicture = '/api/ClubArticle/image/'; // /id DELETE

export const formConfig = {
    action: endpointEditNewsText,
    method: 'PUT',
    fields: {
        content: {
            name: 'content',
            fieldType: 'textarea',
            placeholder: 'Напишите что-нибудь...',
        },
        file: {
            name: 'file',
            fieldType: 'image',
            type: 'file',
            placeholder: 'Загрузить фото...',
        },
    },
    validationSchema: object().shape({
        content: string().required('Поле не может быть пустым')
    })
};