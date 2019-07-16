import * as actiontypes from './actiontypes';
import {normalizeNewList} from './normalize'

const newsArr = [
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
const {entities, result: newsIds} = normalizeNewList(newsArr);
const clientInitialState = {
    loadingApi: false,
    news: entities.news,
    newsIds: newsIds,
};

export default function clientRootReducer(state = clientInitialState, action) {

    switch (action.type) {


        default:
            return state;
    }
}
