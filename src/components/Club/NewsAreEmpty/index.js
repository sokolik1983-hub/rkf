import React from 'react'
import './styles.scss'

const NewsAreEmpty = () => (
    <div className="news-are-empty">
        <h4 className="news-are-empty__text">Новости не найдены</h4>
        <img className="news-are-empty__img" src="/static/images/news/empty_list.png" alt="У вас нет новостей"/>
    </div>
);

export default React.memo(NewsAreEmpty);