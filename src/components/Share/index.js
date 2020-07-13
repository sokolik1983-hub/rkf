import React from 'react';
import YandexShare from 'react-yandex-share';
import './index.scss';

const Share = ({url}) => <span className={`Share ${url ? 'has-url' : ''}`}><YandexShare
          theme={{ lang: 'ru', services: 'vkontakte,facebook,odnoklassniki,viber,whatsapp,telegram', limit: 0}}
          content={{ url: url || window.location.href }}
        /></span>

export default Share
