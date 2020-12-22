import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/ru";
moment.locale('ru');

const NotificationItem = ({ article_id, short_title, short_content, create_date, logo_link, profile_alias, user_type, is_read }) => {
    const profileLink = user_type === 1 ? `/user/${profile_alias}` : user_type === 3 ? `/${profile_alias}` : `/nursery/${profile_alias}`;
    const handleItemClick = ({ target }) => {
        const { className } = target;
        if (className !== 'NotificationItem_link' && className !== 'NotificationItem__logo') {
            window.location.href = `/news/${article_id}`;
        }
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
                    <Link to={profileLink} className="NotificationItem_link">{short_title}</Link>
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