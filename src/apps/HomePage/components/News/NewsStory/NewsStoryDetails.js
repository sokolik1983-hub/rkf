import React from 'react'
import ClientAvatar from "components/ClientAvatar";
import {connectNewsStory} from 'apps/HomePage/connectors'
import './styles.scss'
import Card from 'components/Card'
import {getDateTime} from 'utils/datetime'

function NewsStory({id, logo_link, club_name, create_date, title, content, picture_link}) {


    const getSignature = () => getDateTime(create_date);

    return (
        <Card id={`NewsStory_${id}`} className="NewsStory">
            <div className="NewsStory__Head">
                <ClientAvatar avatar={logo_link} size={46}/>
                <div className="NewsStory__StoryInfo">
                    <div className="NewsStory__club_name">{club_name}</div>
                    <div className="NewsStory__Signature">{getSignature()}</div>
                </div>
            </div>
            <h3 className="NewsStory__title" dangerouslySetInnerHTML={{__html: title}}/>
            <div className="NewsStory__Text" dangerouslySetInnerHTML={{__html: content}}/>
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