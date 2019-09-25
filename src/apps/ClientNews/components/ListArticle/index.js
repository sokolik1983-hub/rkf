import React from 'react'
import ClientAvatar from 'components/ClientAvatar'
// import ContextDropDown from 'components/ContextDropDown'
import Dropdown from 'components/Dropdown'
import './styles.scss'
import DeleteButton from "components/DeleteButton";
import { connectListArticle } from 'apps/ClientNews/connectors'
import { formatDateTime } from 'utils/datetime'
import { connectAuthVisible } from 'apps/Auth/connectors'
import { DEFAULT_CONTENT_LENGTH, DEFAULT_IMG } from 'appConfig'


function ListArticle({
    id,
    title,
    content,
    picture_link,
    create_date,
    logo_link,
    club_name,
    deleteArticleSuccess,
    onArticleClick
}) {

    const getSignature = () => String(formatDateTime(create_date));

    const onDeleteSuccess = () => {
        deleteArticleSuccess(id);
    };

    const handleClick = () => {
        if (onArticleClick) onArticleClick(id);
    }

    const cutContent = content => {
        return content.length > DEFAULT_CONTENT_LENGTH
            ? content.substring(0, 300) + '...'
            : content
    }
    const Controls = ({ isAuthenticated }) => {
        if (!isAuthenticated) return null;
        return (
            <Dropdown position="right">
                <DeleteButton
                    windowed
                    confirmMessage={`Удалить новость " ${title} "?`}
                    successMessage="Новость успешно удалена"
                    onDeleteSuccess={onDeleteSuccess}
                    actionUrl={'/api/ClubArticle/' + id}
                >
                    удалить
            </DeleteButton>
            </Dropdown>
        )
    };
    const ListArticleControls = connectAuthVisible(Controls);

    return (
        <div id={`NewsStory_${id}`} className="NewsStory">
            <div className="NewsStory__Head">
                <ClientAvatar
                    avatar={logo_link ? logo_link : DEFAULT_IMG.clubAvatar}
                    size={46}
                />
                <div className="NewsStory__StoryInfo">
                    <div className="NewsStory__Title">{club_name}</div>
                    <div className="NewsStory__Signature">{getSignature()}</div>
                </div>
                <ListArticleControls />

            </div>
            <h3 className="NewsStory__Heading" onClick={handleClick}>{title}</h3>
            <div className="NewsStory__Text" dangerouslySetInnerHTML={{ __html: cutContent(content) }} />
            <div
                className="NewsStory__ImagePreview">
                <img src={picture_link} alt="" />
            </div>

        </div>
    )
}

export default connectListArticle(ListArticle)