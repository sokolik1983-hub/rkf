import {object, string} from "yup";

export const endpointGetClubInfo = '/api/Club/public/';
export const endpointGetExhibitions = '/api/exhibitions/Exhibition/featured';
export const endpointGetSocials = '/api/clubs/SocialNetwork/list/';
export const endpointGetNews = '/api/ClubArticle/public';
export const endpointDeleteArticle = '/api/ClubArticle/';

export const newsArticleFormConfig = {
    action: '/api/ClubArticle/full',
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
        }
    },
    validationSchema: object().shape({
        content: string().required('Поле не может быть пустым'),
    })
};