import React, {memo} from "react";
import YandexShare from "react-yandex-share";
import "./index.scss";


const Share = ({url, className}) => {
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
