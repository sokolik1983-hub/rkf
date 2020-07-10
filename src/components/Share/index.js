import React from 'react';
import YandexShare from 'react-yandex-share';

const Share = props => <YandexShare
          theme={{ lang: 'ru', services: 'vkontakte,facebook,odnoklassniki,moimir,twitter,viber,whatsapp,telegram', limit: 3}}
          content={{ url: 'window.location.href' }}
        />

export default Share
