import {object, string} from "yup";

export const newsArticleFormConfig = {
    action: '/api/Article/full',
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