import React from 'react'
import ClientAvatar from 'components/ClientAvatar'
import {connectNewsStory} from 'apps/ClientNews/connectors'
import './styles.scss'

function NewsStory({newsStory}) {

    const {title, content, image} = newsStory;

    const getSignature = () => "Сегодня в 14:00";

    return (
        <div className="NewsStory">
            <div className="NewsStory__Head">
                <ClientAvatar size={46}/>
                <div className="NewsStory__StoryInfo">
                    <div className="NewsStory__Title">{title}</div>
                    <div className="NewsStory__Signature">{getSignature()}</div>
                </div>
            </div>
            <div className="NewsStory__Text" dangerouslySetInnerHTML={{__html: content}}/>
            <div
                //style={{backgroundImage: `url(${image})`}}
                className="NewsStory__ImagePreview">
                <img src={image} alt=""/>
            </div>
        </div>
    )
}

export default connectNewsStory(NewsStory)