import {object, string} from "yup";

export const defaultReduxKey = 'club_news';

const NEWS_URL = '/api/ClubArticle/full';

export const GET_NEWS_ENDPOINT = '/api/ClubArticle/public?alias=';

export const newsArticleFormConfig = {
    action: NEWS_URL,
    format: "multipart/form-data",
    fields: {
        title: {
            name: 'title',
            label: 'Заголовок',
            placeholder: 'Добавьте заголвок...',
        },
        content: {
            name: 'content',
            fieldType: 'textarea',
            label: 'Содержание',
            placeholder: 'Текст новости...',
        },
        file: {
            name: 'file',
            label: 'Фото',
            fieldType: 'image',
            type: 'file',
            placeholder: 'Загрузить фото...',
        },
    },
    validationSchema: object().shape({
        title: string()
            .required('Укажите заголовок'),
        content: string()
            .required('Добавьте сожержание'),
    })
};

// TODO delete after API connection
export const newsArr = [
    {
        id: 1,
        title: 'Кинологический клуб DoggyDog ',
        published: '2019-07-16',
        content: '<p>But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social.</p><p>But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social.</p>',
        image: '/static/images/client/news/defaultListImagePreview.png'
    },
    {
        id: 2,
        title: 'Кинологический клуб DoggyDog ',
        published: '2019-07-16',
        content: '<p>But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social.</p><p>But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social.</p>',
        image: '/static/images/client/news/defaultListImagePreview.png'
    },
    {
        id: 3,
        title: 'Кинологический клуб DoggyDog ',
        published: '2019-07-16',
        content: '<p>But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social.</p><p>But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social.</p>',
        image: '/static/images/client/news/defaultListImagePreview.png'
    },
    {
        id: 4,
        title: 'Кинологический клуб DoggyDog ',
        published: '2019-07-16',
        content: '<p>But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social.</p><p>But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social.</p>',
        image: '/static/images/client/news/defaultListImagePreview.png'
    },
    {
        id: 5,
        title: 'Кинологический клуб DoggyDog ',
        published: '2019-07-16',
        content: '<p>But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social.</p><p>But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social.</p>',
        image: '/static/images/client/news/defaultListImagePreview.png'
    },
    {
        id: 6,
        title: 'Кинологический клуб DoggyDog ',
        published: '2019-07-16',
        content: '<p>But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social.</p><p>But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social.</p>',
        image: '/static/images/client/news/defaultListImagePreview.png'
    },
    {
        id: 7,
        title: 'Кинологический клуб DoggyDog ',
        published: '2019-07-16',
        content: '<p>But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social.</p><p>But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social. But Brooke Chaffin and Catherine Connors are looking to change that with the introduction of Maverick, a social.</p>',
        image: '/static/images/client/news/defaultListImagePreview.png'
    },
];