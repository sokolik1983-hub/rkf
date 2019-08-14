import React from 'react'
import PublicClubAvatar from 'components/ClientAvatar'
import {connectNewsStory} from 'apps/PublicClubNews/connectors'
import './styles.scss'

function NewsStory({newsStory}) {

    const {id, title, content, picture_link} = newsStory;

    const getSignature = () => "Сегодня в 14:00";
    return (
        <div id={`NewsStory_${id}`} className="NewsStory">
            <div className="NewsStory__Head">
                <PublicClubAvatar size={46}/>
                <div className="NewsStory__StoryInfo">
                    <div className="NewsStory__Title">{title}</div>
                    <div className="NewsStory__Signature">{getSignature()}</div>
                </div>
            </div>
            <div className="NewsStory__Text" dangerouslySetInnerHTML={{__html: content}}/>
            <div
                className="NewsStory__ImagePreview">
                <img src={picture_link} alt=""/>
            </div>
        </div>
    )
}

export default connectNewsStory(NewsStory)