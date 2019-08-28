import React from 'react'
import './styles.scss'

export default function NewsAreEmpty() {
    return (
        <div className="NewsAreEmpty">
            <div className="NewsAreEmpty__text">У вас нет новостей</div>
            <img className="NewsAreEmpty__img" src="/static/images/news/empty_list.png" alt="У вас нет новостей"/>
        </div>
    )
}