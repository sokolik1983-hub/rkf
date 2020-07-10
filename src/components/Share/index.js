import React from 'react';
import YandexShare from 'react-yandex-share';
import './index.scss';

const Share = props => <YandexShare
          theme={{ lang: 'ru', services: 'vkontakte,facebook,odnoklassniki,moimir,twitter,viber,whatsapp,telegram', limit: 0}}
          content={{ url: window.location.href }}
        />

export default Share
