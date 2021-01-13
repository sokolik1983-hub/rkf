import React, { useState } from "react";
import { DropDownButton } from '@progress/kendo-react-buttons';
import { Request } from "utils/request";
import useIsMobile from "../../utils/useIsMobile";
import "./styles.scss";

const UserActions = ({ subscribed_id, subscribed, member, onSubscriptionUpdate, onSuccess, onError }) => {
    const [open, setOpen] = useState(false);
    const isMobile = useIsMobile();

    const popup = {
        horizontal: isMobile ? 'right' : 'left',
        vertical: 'top'
    };

    const anchor = {
        horizontal: isMobile ? 'right' : 'left',
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

    return <section className="UserControlsWrap">
        <button disabled>Написать сообщение</button>
        <div style={{ display: 'flex' }}>
            <button
                className="UserControlsWrap__subscribe-btn"
                disabled={member ? true : false}
                onClick={handleItemClick}
            >
                <span className={`UserControlsWrap__subscribe-text ${subscribed ? '_subscribed' : ''}`}>
                    {subscribed ? 'Подписка' : 'Подписаться'}
                </span>
            </button>
            <DropDownButton
                text="Ещё&nbsp;&nbsp;&nbsp;&nbsp;"
                icon={`k-icon ${open ? `k-i-arrow-chevron-up` : `k-i-arrow-chevron-down`}`}
                popupSettings={{ popupClass: 'UserControlsWrap__dropdown', popupAlign: popup, anchorAlign: anchor }}
                items={[
                    { text: 'Пожаловаться', disabled: true }
                ]}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
            />
        </div>
    </section>
}

export default React.memo(UserActions);