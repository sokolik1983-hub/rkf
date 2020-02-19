import React from "react";
import {Link} from "react-router-dom";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import "./index.scss";


const federations = [
    {
        id: 1,
        short_name: 'РФЛС',
        name: 'Российская Федерация Любительского Собаководства',
        address: 'г. Москва, ул. Гостиничная, д.9, каб. 3',
        contacts: 'Тел.: +7 (495) 482-15-10',
        img: '/static/images/federations/rfls.png',
        url: '/rfls'
    },
    {
        id: 2,
        short_name: 'ОАНКОО',
        name: 'Общероссийская Ассоциация Независимых Кинологических Общественных Объединений',
        address: 'г. Москва, ул. Гостиничная, д.9, каб. 7',
        contacts: 'Тел.: +7 (495) 482-15-18',
        img: '/static/images/federations/oankoo.png',
        url: '/oankoo'
    },
    {
        id: 3,
        short_name: 'РФСС',
        name: 'Российская Федерация Служебного Собаководства',
        address: 'г. Москва, ул. Гостиничная, д.9, каб. 4',
        contacts: 'E-mail: rfss.org@mail.ru',
        img: '/static/images/federations/rfss.png',
        url: '/rfss'
    },
    {
        id: 4,
        short_name: 'РФОС',
        name: 'Российская Федерация Охотничьего Собаководства',
        address: 'г. Москва, ул. Гостиничная, д.9, каб. 12',
        contacts: 'Тел.: +7 (495) 482-15-12',
        img: '/static/images/federations/rfos.png',
        url: '/rfos'
    }
];


const FederationsPage = () => (
    <Layout>
        <Container className="content federations-page">
            <ul className="federations-page__list">
                {federations.map(item =>
                    <li className="federations-page__item federation-block" key={item.id}>
                        <img src={item.img} alt="" className="federation-block__img"/>
                        <div className="federation-block__info-wrap">
                            <div className="federation-block__info">
                                <h3 className="federation-block__title">{item.short_name}</h3>
                                <p className="federation-block__description">{item.name}</p>
                                <p className="federation-block__description">{item.address}</p>
                                <p className="federation-block__description">{item.contacts}</p>
                                <Link to={item.url} className="federation-block__link">Перейти</Link>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </Container>
    </Layout>
);

export default React.memo(FederationsPage);