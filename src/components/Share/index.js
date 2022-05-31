import React, {memo} from "react";
import YandexShare from "react-yandex-share";
import {DISABLE_SHARE_IN_DEV} from "../../appConfig";
import "./index.scss";


const Share = ({url, className}) => {
    //Убрать, если нужно при разработке
    // if(DISABLE_SHARE_IN_DEV) return null;

    return (
        <div className={`Share ${url ? 'has-url' : ''} ${className}`}>
            <YandexShare
                theme={{
                    lang: 'ru',
                    services: 'vkontakte,odnoklassniki,viber,whatsapp,telegram',
                    limit: 0 ,
                    popupPosition: 'outer',
                    popupDirection: 'auto'
                }}
                content={{url: url || window.location.href}}
            />
        </div>
    );
};

export default memo(Share);
