import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'components/Card';
import Img from 'components/Img'
import ClientAvatar from 'components/ClientAvatar';
import { formatDateWithLocaleStringFull } from 'utils/datetime';
import { DEFAULT_CONTENT_LENGTH } from 'appConfig';
import'./Exhibition.scss'

export default function FeaturedExhibition({
    club_name,
    club_logo,
    id,
    exhibition_name,
    exhibition_picture_link='/static/images/exhibitions/default.png',
    exhibition_description,
    date
}) {
    const getSignature = () => formatDateWithLocaleStringFull(new Date(date));
    const cutContent = content => {
        return content.length > DEFAULT_CONTENT_LENGTH
            ? content.substring(0, DEFAULT_CONTENT_LENGTH) + '...'
            : content;
    };
    return (
        <div id={`HP_Exhibition_${id}`} className="HP_Exhibition">
            <div className="HP_Exhibition__Head">
                <ClientAvatar avatar={club_logo} size={46} />
                <div className="HP_Exhibition__StoryInfo">
                    <div className="HP_Exhibition__club_name">{club_name}</div>
                    <div className="HP_Exhibition__Signature">{getSignature()}</div>
                </div>
            </div>
            <Link
                to={`exhibitions/${id}/details`}
                className="HP_Exhibition__title"
                dangerouslySetInnerHTML={{ __html: exhibition_name }}
            />
            <div
                className="HP_Exhibition__Text"
                dangerouslySetInnerHTML={{
                    __html: cutContent(exhibition_description)
                }}
            />
            {exhibition_picture_link ? (
                <div className="HP_Exhibition__ImagePreview">
                    <Img src={exhibition_picture_link} alt="" />
                </div>
            ) : null}
        </div>
    );
}
