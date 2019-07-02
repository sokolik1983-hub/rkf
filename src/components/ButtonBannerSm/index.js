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
        <div className="ButtonBannerSm">
            <div
                className="ButtonBannerSm__icon"
                style={{
                    backgroundImage: `url(${icon})`,
                }}
            />
            <div
                className="ButtonBannerSm__title"
                dangerouslySetInnerHTML={{__html: title}}
            />
            <div
                className="ButtonBannerSm__subTitle"
                dangerouslySetInnerHTML={{__html: subTitle}}
            />
            {button}
        </div>
    )
}