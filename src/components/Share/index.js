import React from 'react';
import YandexShare from 'react-yandex-share';
import './index.scss';

const Share = ({url}) => <span className="Share"><span className="Share__text"></span><YandexShare
          theme={{ lang: 'ru', services: 'vkontakte,facebook,odnoklassniki,moimir,twitter,viber,whatsapp,telegram', limit: 0}}
          content={{ url: url || window.location.href }}
        /></span>

export default Share
