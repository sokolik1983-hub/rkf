import React from 'react';
import './index.scss'

const UsefulLinks = () => {
    const links = [
        {
            name: 'rkfOrg',
            icon: '/static/images/header/rkf-logo-transparent.svg',
            link: 'RKF.ORG.RU',
            description: 'Российская кинологическая организация',
        },
        {
            name: 'helpRkf',
            icon: '/static/images/header/rkf-logo-transparent.svg',
            link: 'help.rkf.online',
            description: 'Портал поддержки пользователей',
        },
        {
            name: 'rkfAcademy',
            icon: 'static/images/about/rkf_academy.png',
            link: 'RKF.ACADEMY',
            description: 'Ообразовательный центр РКФ',
        },
        {
            name: 'fci',
            icon: 'static/images/about/FCI_logo.png',
            link: 'http://www.fci.be/en/',
            description: 'Международная Федерация кинологии',
        },
    ];

    return (
        <div className="about-page__info-section">
            <div className="useful-links-block">
                <h5 className="useful-links-block__heading">
                    Полезные ссылки
                </h5>

                <div className="useful-links-block__items">
                    {links.map(item => {
                        return (
                            <div className="useful-links-block__item" key={item.name}>
                                <a href={item.link} className="useful-links-block__link">
                                    <div className="useful-links-block__icon">
                                        <img src={item.icon} alt={item.name}/>
                                    </div>
                                    <div>
                                        {item.link}
                                    </div>
                                </a>

                                <div className="useful-links-block__description">
                                    {item.description}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default React.memo(UsefulLinks);