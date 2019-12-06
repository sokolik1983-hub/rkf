import React, { useState } from 'react'
import ClientAvatar from 'components/ClientAvatar'
// import ContextDropDown from 'components/ContextDropDown'
import Dropdown from 'components/Dropdown'
import './styles.scss'
import DeleteButton from "components/DeleteButton";
import { connectListArticle } from 'apps/ClientNews/connectors'
import { formatDateTime } from 'utils/datetime'
import { connectAuthVisible } from 'apps/Auth/connectors'
import { DEFAULT_CONTENT_LENGTH, DEFAULT_IMG } from 'appConfig'
import ArticleEditFormPublic from 'apps/ClientNews/components/Edit';


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
    const [edit, setEdit] = useState(false);
    const getSignature = () => String(formatDateTime(create_date));
    const onDeleteSuccess = () => {
        deleteArticleSuccess(id);
    };
    const handleEditCancel = () => {
        setEdit(false);
    }
    const handleClick = () => {
        if (onArticleClick) onArticleClick(id);
    }
    const cutContent = content => content.length > DEFAULT_CONTENT_LENGTH
        ? content.substring(0, DEFAULT_CONTENT_LENGTH) + '...'
        : content;
    const [collapsed, setCollapsed] = useState(content.length > DEFAULT_CONTENT_LENGTH ? true : false);
    const handleShowMore = (e) => {
        e.preventDefault();
        setCollapsed(false);
    }
    const Controls = ({ isAuthenticated }) => {
        if (!isAuthenticated) return null;
        return (
            <Dropdown position="right">
                <button className="btn EditButton" onClick={() => setEdit(true)}>Редактировать</button>
                <DeleteButton
                    windowed
                    confirmMessage={'Вы действительно хотите удалить новость?'}
                    successMessage="Новость успешно удалена"
                    onDeleteSuccess={onDeleteSuccess}
                    actionUrl={'/api/ClubArticle/' + id}
                >
                    Удалить
            </DeleteButton>
            </Dropdown>
        )
    };
    const ListArticleControls = connectAuthVisible(Controls);
    const urlify = t => t.replace(/[^"](https?:\/\/[^\s]+)/g, l => `<a class="link" target="_blank" href="${l}">${l}</a>`);
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
            {
                edit
                    ? <ArticleEditFormPublic content={content} file={picture_link} id={id} onEditCancel={handleEditCancel} />
                    : <>
                        <h3 className="NewsStory__Heading" onClick={handleClick}>{title}</h3>
                        <div className="NewsStory__Text">
                            <p dangerouslySetInnerHTML={{ __html: urlify(collapsed ? cutContent(content) : content) }} />
                            {collapsed ? <a className="NewsStory__Show-more" href="/" onClick={handleShowMore}>Подробнее</a> : null}
                        </div>
                        <div
                            className="NewsStory__ImagePreview">
                            <img src={picture_link} alt="" />
                        </div>
                    </>
            }
        </div >
    )
}

export default connectListArticle(ListArticle)