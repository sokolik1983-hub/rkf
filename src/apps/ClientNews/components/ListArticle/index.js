import React from 'react'
import ClientAvatar from 'components/ClientAvatar'
import './styles.scss'
import DeleteButton from "components/DeleteButton";
import {connectListArticle} from 'apps/ClientNews/connectors'
import {formatDateTime} from 'utils/datetime'

function ListArticle({
                         id,
                         title,
                         content,
                         picture_link,
                         create_date,
                         logo_link,
                         club_name,
                         deleteArticleSuccess
                     }) {

    const getSignature = () => String(formatDateTime(create_date));

    const onDeleteSuccess = () => {
        deleteArticleSuccess(id);
    };

    return (
        <div id={`NewsStory_${id}`} className="NewsStory">
            <div className="NewsStory__Head">
                <ClientAvatar
                    avatar={logo_link}
                    size={46}
                />
                <div className="NewsStory__StoryInfo">
                    <div className="NewsStory__Title">{club_name}</div>
                    <div className="NewsStory__Signature">{getSignature()}</div>
                </div>
                <DeleteButton
                    successMessage="Новость успешно удалена"
                    onDeleteSuccess={onDeleteSuccess}
                    actionUrl={'/api/ClubArticle/' + id}
                >
                    удалить
                </DeleteButton>
            </div>
            <h3>{title}</h3>
            <div className="NewsStory__Text" dangerouslySetInnerHTML={{__html: content}}/>
            <div
                className="NewsStory__ImagePreview">
                <img src={picture_link} alt=""/>
            </div>

        </div>
    )
}

export default connectListArticle(ListArticle)