import React from 'react'

export default function Card({image, title, content}) {
    return <div className="card">
        <div className="card__image">
            {image ? <img src={image} alt=""/> : null}
        </div>
        <div className="card__title">
            {title}
        </div>
        <div className="card__content" dangerouslySetInnerHTML={{__html: content}}/>
    </div>
}