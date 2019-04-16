import React from 'react'
import './style.scss'

const fakeData = [
    {
        id: 1,
        image: '/static/images/noimage/no-image.svg',
        title: 'Чипирование',
        text: 'От обычного ошейника с биркой и номером телефона владельца, татуировки или клейма до самого современного: подкожного микрочипа.'
    },
    {
        id: 2,
        image: '/static/images/noimage/no-image.svg',
        title: 'Генетический тест',
        text: 'Наследственные заболевания могут быть достаточно просто исключены, благодаря использованию ДНК-тестирования для собак и др..'
    },
    {
        id: 3,
        image: '/static/images/noimage/no-image.svg',
        title: 'Щенки',
        text: 'До сих пор не все владельцы знают, какие документы на щенка нужно иметь, что ветеринарный паспорт ничего общего с родословной не имеет.'
    }
];

const Item = ({image, title, text}) => <div className="item">
    <div style={{backgroundImage: image}} className="item__image"/>
    <div className="item__title">{title}</div>
    <div className="item_text">{text}</div>
</div>

const About = () => {
    return <div className="home-page-about">
        <div className="home-page-about__title">О нас</div>
        <div className="home-page-about__text">Мы являемся крупнейшей организацией России, посвященной защите и содействию здоровью и благополучию всех
            собак. Мы предлагаем владельцам собак и тем, кто работает с собаками:</div>
        <div className="home-page-about__items">
            {fakeData.map(data => <Item key={data.id} {...data}/>)}
        </div>
    </div>
};

export default About;