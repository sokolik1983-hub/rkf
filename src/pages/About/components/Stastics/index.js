import React from 'react';
import './index.scss'

const Statistics = () => {
    const sections = [
        {
            count: '7 МЛН',
            description: 'владельцев собак объединяет РКФ',
        },
        {
            count: '5,5 МЛН',
            description: 'миллионов собак зарегистрировано в племенной книге РКФ',
        },
        {
            count: '1 427',
            description: 'кинологических клубов зарегистрировано в племенной книге РКФ',
        },
        {
            count: '22 358',
            description: 'питомников из всех регионов страны зарегистрировано в племенной книге РКФ',
        },
    ];

    return (
        <div className="about-page__info-section">
            <div className="statistics-block">
                {sections.map((section, key) => {
                    return (
                        <div className="statistics-block__section" key={key}>
                            <div className="statistics-block__count">
                                {section.count}
                            </div>

                            <div className="statistics-block__description">
                                {section.description}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default React.memo(Statistics);