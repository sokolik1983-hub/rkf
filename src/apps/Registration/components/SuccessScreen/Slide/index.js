import React from 'react'
import {Link} from 'react-router-dom'
import './styles.scss'

export default function Slide({title, text, image, button}) {
    return <div className="slide">
        <div className="slide__image">
            <img src={image} alt=""/>
        </div>
        <div className="slide__content">
            <div className="slide__title">
                {title}
            </div>
            <div className="slide__text">
                {text}
            </div>
            <div className="slide__controls">
                <Link to={button.action} className="btn btn-primary">{button.text}</Link>
            </div>
        </div>

    </div>
}