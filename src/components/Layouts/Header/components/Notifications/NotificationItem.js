import React from "react";
import { Link } from "react-router-dom";

const NotificationItem = (props) => {
    return (
        <div className="NotificationItem">
            <div className="NotificationItem__header">
                <Link to={'#'} className="NotificationItem_link">Notification Title</Link>
                <span>Date</span>
            </div>
            <div className="NotificationItem__body">
                Notification Text Notification Text Notification Text Notification Text
            </div>
        </div>
    )
};

export default React.memo(NotificationItem);