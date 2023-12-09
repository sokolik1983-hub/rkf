import React from 'react';
import './index.scss'

const RKFToday = () => {

    const members = [
        {
            name: 'rfss',
            icon: '/static/images/federations/logo/rfss.png',
            fullName: 'Российская федерация служебного собаководства ',
            shortName: '(РФСС)',
        },
        {
            name: 'rfls',
            icon: '/static/images/federations/logo/rfls.png',
            fullName: 'Российская федерация любительского собаководства ',
            shortName: '(РФЛС)',
        },
        {
            name: 'rfos',
            icon: '/static/images/federations/logo/rfos.png',
            fullName: 'Российская федерация охотничьего собаководства ',
            shortName: '(РФОС)',
        },
        {
            name: 'oankoo',
            icon: '/static/images/federations/logo/oankoo.png',
            fullName: 'Общероссийская ассоциация независимых кинологических общественных объединений ',
            shortName: '(ОАНКОО)',
        },
    ];

    return (
        <div className="about-page__info-section">
            <div className="rkf-today-block">
                <h3 className="rkf-today-block__heading">
                    РКФ сегодня
                </h3>

                <div className="rkf-today-block__text">
                    Российская кинологическая федерация (РКФ) создана в 1991 году. РКФ — одно из крупнейших в России общественных объединений, представляющее интересы 7 миллионов владельцев собак по всей стране, 4 миллиона из которых активно вовлечены в научную, племенную или дрессировочную работу РКФ.
                </div>

                <h5 className="rkf-today-block__little-heading">
                    Членами РКФ являются:
                </h5>

                <div className="rkf-today-block__members">
                    {members.map(member => {
                        return (
                            <div className="rkf-today-block__member" key={member.name}>
                                <div className={`rkf-today-block__member-icon rkf-today-block__member-icon_${member.name}`}>
                                    <img src={member.icon} alt={member.fullName}/>
                                </div>

                                <div className="rkf-today-block__member-name">
                                    {member.fullName}
                                     <div className="rkf-today-block__member-name_bold">
                                         {member.shortName}
                                     </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default React.memo(RKFToday);