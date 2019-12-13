import {object, string} from "yup";

export const defaultReduxKey = 'club_news';

const NEWS_URL = '/api/ClubArticle/full';

export const GET_NEWS_ENDPOINT = '/api/ClubArticle/public?alias=';

export const newsArticleFormConfig = {
    action: NEWS_URL,
    format: "multipart/form-data",
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
        content: string()
            .required('Поле не может быть пустым'),
    })
};

export const newsArticleEditFormConfig = {
    format: "multipart/form-data",
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
        content: string()
            .required('Поле не может быть пустым'),
    })
};