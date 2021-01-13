import React from "react";
import { DropDownButton } from '@progress/kendo-react-buttons';
import { Request } from "utils/request";
import useIsMobile from "../../utils/useIsMobile";
import "./styles.scss";

const UserActions = ({ subscribed_id, subscribed, member, onSubscriptionUpdate, onSuccess, onError }) => {
    const isMobile = useIsMobile();

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

    const popup = {
        horizontal: isMobile ? 'right' : 'left',
        vertical: 'top'
    };

    const anchor = {
        horizontal: isMobile ? 'right' : 'left',
        vertical: 'bottom'
    };

    return <section className="UserControlsWrap">
        <button disabled>Написать сообщение</button>
        <div style={{ display: 'flex' }}>
            <button
                className="UserControlsWrap__subscribe-btn"
                disabled={member ? true : false}
                onClick={handleItemClick}
            >
                <span className={`UserControlsWrap__subscribe-text ${subscribed ? '_subscribed' : ''}`}>{subscribed ? 'Подписки' : 'Подписаться'}</span>
            </button>
            <DropDownButton
                text="..."
                popupSettings={{ popupClass: 'UserControlsWrap__dropdown', popupAlign: popup, anchorAlign: anchor}}
                items={[
                    { text: 'Пожаловаться', disabled: true }
                ]}
            />
        </div>
    </section>
}

export default React.memo(UserActions);