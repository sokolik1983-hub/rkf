import React from "react";
import { DropDownButton } from '@progress/kendo-react-buttons';
import { Request } from "utils/request";
import "./styles.scss";

const UserActions = ({ userType, subscribed_id, subscribed, member, onSubscriptionUpdate, onSuccess, onError }) => {

    const handleItemClick = ({ itemIndex }) => {
        if (itemIndex === 1) { // Subscription
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
    }

    return <div className="UserActions">
        <DropDownButton
            text="Действия"
            onItemClick={handleItemClick}
            popupSettings={{ popupClass: 'UserActions__dropdown' }}
            items={[
                { text: 'Написать сообщение', disabled: true },
                { text: subscribed ? 'Подписки' : 'Подписаться', icon: subscribed ? 'check' : '', disabled: member ? true : false },
                { text: 'Пожаловаться на страницу', disabled: true }
            ]}
        />
    </div>
}

export default React.memo(UserActions);