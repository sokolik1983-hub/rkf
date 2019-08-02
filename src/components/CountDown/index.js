import React from 'react'
import classnames from 'classnames/bind'
import style from './style.module.scss'

const cx = classnames.bind(style);

export default function CountDown({eventDate = '2019-05-05 14:00'}) {

    const checkTimeIsOver = () => {
        return (new Date() > new Date(eventDate))
    };

    const calculateCountDown = (date) => {
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
            days: daysLeft > 0 ? daysLeft : 0,
            hours: hoursLeft > 0 ? hoursLeft : 0,
            minutes: minutesLeft > 0 ? minutesLeft : 0,
        }
    };

    const countDown = calculateCountDown(eventDate);
    return (
        <div className={cx('CountDown__wrap')}>
            <div className={cx('CountDown__title')}>
                До конца регистрации осталось:
            </div>
            {
                checkTimeIsOver() ?
                    <div>Время вышло</div> : null
            }
            <div className={cx('CountDown')}>
                <div className={cx('item', 'item--days')}>{countDown.days}</div>
                <div className={cx('item', 'item--hours')}>{countDown.hours}</div>
                <div className={cx('item', 'item--minutes')}>{countDown.minutes}</div>
            </div>
        </div>
    )
}