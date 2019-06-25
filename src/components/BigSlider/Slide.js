import React from 'react'
import {Link} from "react-router-dom";

export default function Slide({image, link, title, text, style}) {
    const slideStyle = image ? {backgroundImage: `url(${image})`} : null; ;
        //= image ? {backgroundImage: `url(${image})`} : null;
    return (
        <div className="BigSlider__slide">
            <div style={slideStyle}
                 className="BigSlider__slide-image"/>
            <Link to={link.to} className="BigSlider__slide-link"><span
                dangerouslySetInnerHTML={{__html: link.text}}/></Link>
            <div className="BigSlider__slide-text">
                <div className="BigSlider__slide-title" dangerouslySetInnerHTML={{__html: title}}/>
                <div className="BigSlider__slide-preview" dangerouslySetInnerHTML={{__html: text}}/>
            </div>
        </div>
    )
}