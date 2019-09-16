import React from 'react'
import ClientAvatar from "components/ClientAvatar";
import { connectNewsStory } from 'apps/HomePage/connectors'
import './styles.scss'
import Card from 'components/Card'
import { getDateTime } from 'utils/datetime'
import { DEFAULT_CONTENT_LENGTH } from 'appConfig'

function NewsStory({ id, logo_link, club_name, create_date, title, content, picture_link, onArticleClick }) {


    const getSignature = () => getDateTime(create_date);

    const handleClick = () => {
        if (onArticleClick) onArticleClick(id);
    }

    const cutContent = content => {
        return content.length > DEFAULT_CONTENT_LENGTH
            ? content.substring(0, 300) + '...'
            : content
    }

    return (
        <Card id={`NewsStory_${id}`} className="NewsStory">
            <div className="NewsStory__Head">
                <ClientAvatar avatar={logo_link} size={46} />
                <div className="NewsStory__StoryInfo">
                    <div className="NewsStory__club_name">{club_name}</div>
                    <div className="NewsStory__Signature">{getSignature()}</div>
                </div>
            </div>
            <h3 className="NewsStory__title" onClick={handleClick} dangerouslySetInnerHTML={{ __html: title }} />
            <div className="NewsStory__Text" dangerouslySetInnerHTML={{ __html: cutContent(content) }} />
            {
                picture_link ?
                    <div className="NewsStory__ImagePreview">
                        <img src={picture_link} alt="" />
                    </div> : null
            }

        </Card>
    )
}

export default connectNewsStory(NewsStory)