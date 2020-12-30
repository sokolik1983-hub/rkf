import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Request } from "utils/request";
import "moment/locale/ru";
moment.locale('ru');

const NotificationItem = ({ article_id, id, profile_name, short_content, create_date, logo_link, profile_alias, user_type, is_read, redirect_link }) => {
    const profileLink = user_type === 1 ? `/user/${profile_alias}` : user_type === 3 ? `/${profile_alias}` : `/nursery/${profile_alias}`;
    const handleItemClick = async ({ target }) => {
        await Request({
            url: `/api/article/article_is_read?id=${id}`,
            method: 'POST'
        }, () => {
            const { className } = target;
            if (className !== 'NotificationItem_link' && className !== 'NotificationItem__logo') {
                window.location.href = redirect_link ? redirect_link : `/news/${article_id}`;
            }
        }, error => {
            console.log(error);
        });
    }

    return (
        <div onClick={handleItemClick} className={`NotificationItem${is_read ? '' : ' unread'}`}>
            <div className="NotificationItem__logo-wrap">
                <Link to={profileLink}>
                    <div className="NotificationItem__logo" style={{ backgroundImage: `url(${logo_link})` }} />
                </Link>
            </div>
            <div className="NotificationItem__content">
                <div className="NotificationItem__header">
                    <Link to={profileLink} className="NotificationItem_link">{profile_name}</Link>
                    <span>{`${moment(create_date).format('L')} г.`}</span>
                </div>
                <div className="NotificationItem__body">
                    {short_content}
                </div>
            </div>
        </div>
    )
};

export default React.memo(NotificationItem);