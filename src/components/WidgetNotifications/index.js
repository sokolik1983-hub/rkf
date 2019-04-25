import React, {PureComponent} from 'react'
import AuthVisible from 'apps/Auth/containers/AuthVisible'
import {RingBell} from './RingBell'
import './index.scss'

export default class WidgetNotifications extends PureComponent {
    static defaultProps = {
        notifications: ['some notification']
    };
    state = {
        showNotifications: false
    };

    toggleShowNotifications = () => {
        this.setState(prevState => ({showNotifications: !prevState.showNotifications}))
    };

    render() {
        const {notifications} = this.props;
        return <AuthVisible>
            <div onClick={this.toggleShowNotifications} className="notifications-widget">
                <RingBell notifications={notifications.length > 0}

                />
                {
                    (notifications && this.state.showNotifications) ?
                        <div className="notifications-widget__notifications">
                            {
                                notifications.map(notification =>
                                    <div
                                        key={notification.id}
                                        className="notifications-widget__notification"
                                    >{notification.text}</div>
                                )
                            }
                        </div>
                        : null
                }
            </div>
        </AuthVisible>
    }
}