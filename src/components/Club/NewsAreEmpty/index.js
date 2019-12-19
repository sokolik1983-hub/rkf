import React from 'react'
import './styles.scss'

const NewsAreEmpty = () => (
    <div className="NewsAreEmpty">
        <h4 className="NewsAreEmpty__text">Новости не найдены</h4>
        <img className="NewsAreEmpty__img" src="/static/images/news/empty_list.png" alt="У вас нет новостей"/>
    </div>
);

export default React.memo(NewsAreEmpty);