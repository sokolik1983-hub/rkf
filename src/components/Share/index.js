import React, { useEffect, useRef } from 'react';
import YandexShare from 'react-yandex-share';
import './index.scss';


const Share = ({ url, className }) => {
  // useEffect(() => {
  //   const el = shareRef.current;
  //   const hoverListener = () => {
  //     if (window.innerWidth > 990 && !el.getElementsByClassName('ya-share2__popup_visible').length) {
  //       el.getElementsByClassName('ya-share2__link_more')[0].click();
  //     }
  //   };
  //   el.addEventListener("mouseenter", hoverListener);
  //   return () => el.removeEventListener("mouseenter", hoverListener);
  // }, []);

  return <div className={`Share ${url ? 'has-url' : ''} ${className}`}><YandexShare
    theme={{ lang: 'ru', services: 'vkontakte,facebook,odnoklassniki,viber,whatsapp,telegram', limit: 0 , popupPosition: 'outer', popupDirection: 'auto'}}
    content={{ url: url || window.location.href }}
  /></div>;
}

export default Share;
