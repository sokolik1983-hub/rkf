import React from "react";
import { Link } from "react-router-dom";

const NotificationCategories = ({ setCategory }) => {
    return (
        <div className="NotificationCategories">
            <Link to={'#'} className="NotificationItem_link">Notification Title</Link>

        </div>
    )
};

export default React.memo(NotificationCategories);