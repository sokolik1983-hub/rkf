import React from 'react'
import './styles.scss'

const defaultIcon = '/static/icons/client/gayDog.png';


export default function ButtonBanner({
                                         title,
                                         subTitle,
                                         icon = defaultIcon,
                                         button //= defaultButton
                                     }) {
    return (
        <div className="ButtonBanner">
            <div
                className="ButtonBanner__icon"
                style={{
                    backgroundImage: `url(${icon})`,
                }}
            />
            <div
                className="ButtonBanner__title"
                dangerouslySetInnerHTML={{__html: title}}
            />
            <div
                className="ButtonBanner__subTitle"
                dangerouslySetInnerHTML={{__html: subTitle}}
            />
            {button}
        </div>
    )
}