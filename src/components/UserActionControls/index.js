import React, { useState } from "react";
import { DropDownButton } from "@progress/kendo-react-buttons";
import { Request } from "utils/request";
import useIsMobile from "../../utils/useIsMobile";

import "./styles.scss";

const UserActionControls = ({ subscribed_id, subscribed, member, onSubscriptionUpdate, onSuccess, onError, isTopComponent }) => {
    const [open, setOpen] = useState(false);
    const isMobile = useIsMobile();

    const popup = {
        horizontal: isMobile || isTopComponent ? 'right' : 'left',
        vertical: 'top'
    };

    const anchor = {
        horizontal: isMobile || isTopComponent ? 'right' : 'left',
        vertical: 'bottom'
    };

    const handleItemClick = () => {
        if (subscribed) {
            Request({
                url: '/api/article/unsubscribe',
                method: 'PUT',
                data: JSON.stringify({ "subscription_profile_id": subscribed_id })
            }, () => {
                onSubscriptionUpdate(false);
                onSuccess ? onSuccess('Подписка отменена!') : alert('Подписка отменена!');
            }, e => onError ? onError(e) : alert(e?.response?.data?.errors ? Object.values(e.response.data.errors).join(', ') : 'Произошла ошибка'));
        } else {
            Request({
                url: '/api/article/subscribe',
                method: 'POST',
                data: JSON.stringify({ "subscription_profile_id": subscribed_id })
            }, () => {
                onSubscriptionUpdate(true);
                onSuccess ? onSuccess('Подписка оформлена!') : alert('Подписка оформлена!');
            }, e => onError ? onError(e) : alert(e?.response?.data?.errors ? Object.values(e.response.data.errors).join(', ') : 'Произошла ошибка'));
        }
    }

    return <section className="UserActionControls">
        <button disabled className="UserActionControls__message-btn">Написать сообщение</button>
        <div className="_flex">
            <button
                className="UserActionControls__subscribe-btn"
                disabled={!!member}
                onClick={handleItemClick}
            >
                <span className={`UserActionControls__subscribe-text ${subscribed ? '_subscribed' : ''}`}>
                    {subscribed ? 'Подписка' : 'Подписаться'}
                </span>
            </button>
            <DropDownButton
                text="Ещё&nbsp;&nbsp;&nbsp;&nbsp;"
                icon={`k-icon ${open ? 'k-i-arrow-chevron-up' : 'k-i-arrow-chevron-down'}`}
                popupSettings={{ popupClass: 'UserActionControls__dropdown', popupAlign: popup, anchorAlign: anchor }}
                items={[
                    { text: 'Пожаловаться', disabled: true }
                ]}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
            />
        </div>
    </section>
}

export default React.memo(UserActionControls);