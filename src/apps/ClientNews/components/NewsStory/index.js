import React from 'react'
import ClientAvatar from 'components/ClientAvatar'
import {connectNewsStory} from 'apps/ClientNews/connectors'
import './styles.scss'
import DeleteButton from "../../../../components/DeleteButton";

function NewsStory({newsStory, deleteNewsStorySuccess}) {

    const {id, title, content, picture_link} = newsStory;

    const getSignature = () => "Сегодня в 14:00";
    const onDeleteSuccess = () => deleteNewsStorySuccess(id);
    return (
        <div id={`NewsStory_${id}`} className="NewsStory">
            <div className="NewsStory__Head">
                <ClientAvatar size={46}/>
                <div className="NewsStory__StoryInfo">
                    <div className="NewsStory__Title">{title}</div>
                    <div className="NewsStory__Signature">{getSignature()}</div>
                </div>
                <DeleteButton
                    onDeleteSuccess={onDeleteSuccess}
                    //params={params}
                    actionUrl={'/api/ClubArticle/' + id}
                >
                    удалить
                </DeleteButton>
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