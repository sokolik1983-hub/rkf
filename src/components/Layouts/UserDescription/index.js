import React, {Fragment, useState} from "react";
import {Collapse} from "react-collapse";
import Card from "../../Card";
import "./index.scss";


const UserDescription = ({city_name, birthday_date, email, phone, site, socials, description}) => {
    const [isOpen, setIsOpen] = useState(false);

    socials = [
        {
            "id": 45,
            "site": "http://elitepet.ru/pages/Zoogostinica.html",
            "description": "rthcvgv xbxv d bbd",
            "social_network_type_id": 1
        },
        {
            "id": 47,
            "site": "http://vk.com",
            "description": "vk.com",
            "social_network_type_id": 1
        },
        {
            "id": 49,
            "site": "fdsf",
            "description": "fdsfds",
            "social_network_type_id": 1
        },
        {
            "id": 50,
            "site": "https://rkf.online/",
            "description": "test",
            "social_network_type_id": 1
        },
        {
            "id": 51,
            "site": "https://rkf.online/",
            "description": "test2",
            "social_network_type_id": 1
        },
        {
            "id": 59,
            "site": "http://dev.uep24.ru/",
            "description": "ereryyr",
            "social_network_type_id": 1
        }
    ];

    description = 'Банальные, но неопровержимые выводы, а также действия представителей оппозиции, вне зависимости от их уровня, должны быть представлены в исключительно положительном свете. Равным образом, повышение уровня гражданского сознания обеспечивает широкому кругу (специалистов) участие в формировании вывода текущих активов. В рамках спецификации современных стандартов, сторонники тоталитаризма в науке описаны максимально подробно.';

    return (
        <Card className="user-description">
            <div className="user-description__head">
                <h4 className="user-description__title">О себе</h4>
                {city_name && <span className="user-description__city">{city_name}</span>}
            </div>
            <p className="user-description__item _birthday">
                <span className="user-description__item-title">Дата рождения:</span>&nbsp;
                <span>
                    {birthday_date ?
                        birthday_date === 'hidden' ?
                            'Пользователь предпочёл скрыть эту информацию' :
                            birthday_date :
                        'Не указано'
                    }
                </span>
            </p>
            <p className="user-description__item _email">
                <span className="user-description__item-title">E-mail:</span>&nbsp;
                <span>{email ? <a href={`mailto:${email}`}>{email}</a> : 'Не указано'}</span>
            </p>
            <p className="user-description__item _phone">
                <span className="user-description__item-title">Телефон:</span>&nbsp;
                <span>{phone || 'Не указано'}</span>
            </p>
            <p className="user-description__item _site">
                <span className="user-description__item-title">Сайт:</span>&nbsp;
                <span>{site || 'Не указано'}</span>
            </p>
            <p className="user-description__item _socials">
                <span className="user-description__item-title">Соцсети:</span>&nbsp;
                <span>
                    {socials.length ?
                        socials.map(item => (
                            <Fragment key={item.id}>
                                <a href={item.site}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                >
                                    {item.description}
                                </a>
                                <br />
                            </Fragment>
                        )) :
                        'Не указано'
                    }
                </span>
            </p>
            <Collapse isOpened={isOpen}>
                <p className="user-description__item _describe">
                    <span className="user-description__item-title">Описание:</span>
                    <span>{description || ''}</span>
                </p>
            </Collapse>
            <button
                className={`user-description__btn${isOpen ? ' _open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            />
        </Card>
    );
};

export default React.memo(UserDescription);