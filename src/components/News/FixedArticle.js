import React from 'react';
import Slider from 'components/Slider';
import Card from "../Card";

const slides = [
    {
        id: 1,
        title: 'IDS «Eurasia»',
        url: 'http://rkf.org.ru/vystavochnaja-dejatelnost/eurasia/',
        img: '/static/images/exhibitions/eur-exh.jpg'
    },
    {
        id: 2,
        title: 'Мемориал А.П. Мазовера',
        url: 'http://rkf.org.ru/vystavochnaja-dejatelnost/mazover/',
        img: '/static/images/exhibitions/maz-exh.jpg'
    },
    {
        id: 3,
        title: 'IDS «Russia»',
        url: 'http://rkf.org.ru/vystavochnaja-dejatelnost/russia/',
        img: '/static/images/exhibitions/rus-exh.jpg'
    },
    {
        id: 4,
        title: 'Шоу чемпионов «Золотой ошейник»',
        url: 'http://rkf.org.ru/vystavochnaja-dejatelnost/golden_collar/',
        img: '/static/images/exhibitions/zol-exh.jpg'
    }
];

const FixedArticle = () => {
    return (
        <Card style={{ padding: '4px' }}>
            <div className="list-item__body">
                <Slider>
                    {
                        slides.map(s => {
                            return (
                                <a href={s.url} key={s.id} className="FixedArticle-link" target="_blank" rel="noreferrer noopener">
                                    <img src={s.img} alt={s.title} />
                                </a>)
                        })
                    }
                </Slider>
            </div>
        </Card>
    )
};

export default FixedArticle;