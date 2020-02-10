import React from "react";
import Card from "../../../../components/Card";
import "./index.scss";


const ContactsComponent = () => (
    <Card className="contacts-component">
        <h4 className="contacts-component__title">Контакты</h4>
        <div className="contacts-component__block _address">
            <h5 className="contacts-component__block-title">Адрес</h5>
            <p className="contacts-component__block-info">Бауманская 11, Москва, 105005</p>
            <a href="https://yandex.ru/maps/"
               target="_blank"
               rel="noopener noreferrer"
               className="contacts-component__block-link"
            >
                смотреть на карте
            </a>
        </div>
        <div className="contacts-component__block _person">
            <h5 className="contacts-component__block-title">Руководитель клуба</h5>
            <p className="contacts-component__block-info">Собачкин Александр Александрович</p>
        </div>
        <div className="contacts-component__block _phone">
            <h5 className="contacts-component__block-title">Контактный телефон</h5>
            <p className="contacts-component__block-info">+7 (768) 456-56-54</p>
            <h5 className="contacts-component__block-title">Менеджер выставки</h5>
            <p className="contacts-component__block-info">+7 (768) 456-56-54</p>
        </div>
        <div className="contacts-component__block _email">
            <h5 className="contacts-component__block-title">E-mail</h5>
            <a href="mailto:doggydog@mail.ru" className="contacts-component__block-link">doggydog@mail.ru</a>
        </div>
        <div className="contacts-component__block _work">
            <h5 className="contacts-component__block-title">Часы работы </h5>
            <p className="contacts-component__block-info">Будние с 10:00 до 19:00</p>
            <p className="contacts-component__block-info">Вск, субб — выходные</p>
        </div>
    </Card>
);

export default React.memo(ContactsComponent);