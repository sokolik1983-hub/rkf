import React, {PureComponent} from 'react'
import classnames from 'classnames/bind'
import style from './style.module.scss'

const cx = classnames.bind(style);

export default class CountDown extends PureComponent {
    static defaultProps = {
        eventDate: '2019-05-05 14:00'
    };

    calculateCountDown = (date) => {
        const now = new Date();
        const countDownDate = new Date(date);
        const totalSeconds = (countDownDate - now) / 1000;
        const secondsInDay = 60 * 60 * 24;
        const secondsInHour = 60 * 60;
        const secondsInMinute = 60;
        const daysLeft = parseInt(totalSeconds / (secondsInDay), 10);
        const hoursLeft = parseInt((totalSeconds - (daysLeft * secondsInDay)) / secondsInHour, 10);
        const minutesLeft = parseInt((totalSeconds - (daysLeft * secondsInDay) - (hoursLeft * secondsInHour)) / secondsInMinute, 10);
        return {
            days: daysLeft,
            hours: hoursLeft,
            minutes: minutesLeft
        }
    };

    render() {
        const countDown = this.calculateCountDown(this.props.eventDate);
        return (
            <div className={cx('count-down__wrap')}>
                <div className={cx('count-down__title')}>
                    До конца регистрации осталось:
                </div>
                <div className={cx('count-down')}>
                    <div className={cx('item', 'item--days')}>{countDown.days}</div>
                    <div className={cx('item', 'item--hours')}>{countDown.hours}</div>
                    <div className={cx('item', 'item--minutes')}>{countDown.minutes}</div>
                </div>
            </div>
        )
    }
}