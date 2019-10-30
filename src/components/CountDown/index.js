import React from 'react'
import classnames from 'classnames/bind'
import declension from 'utils/declension';
import style from './style.module.scss'

const cx = classnames.bind(style);

export default function CountDown({ eventDate = '2019-05-05 17:00' }) {

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
            {
                checkTimeIsOver()
                    ? <div className={cx('CountDown__timeIsOver')}>Регистрация окончена</div>
                    : (
                        <>
                            <div className={cx('CountDown__title')}>До конца регистрации осталось:</div>
                            <div className={cx('CountDown')}>
                                <div className={cx('item', `${declension(countDown.days, ['item--days', 'item--days2', 'item--days3'])}`)}>{countDown.days}</div>
                                <div className={cx('item', `${declension(countDown.hours, ['item--hours', 'item--hours2', 'item--hours3'])}`)}>{countDown.hours}</div>
                                <div className={cx('item', `${declension(countDown.minutes, ['item--minutes', 'item--minutes2', 'item--minutes3'])}`)}>{countDown.minutes}</div>
                            </div>
                        </>
                    )
            }
        </div>
    )
}