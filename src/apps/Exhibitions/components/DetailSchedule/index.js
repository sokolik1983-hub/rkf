import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss';

const cx=classnames.bind(styles);

const ScheduleEvent = ({event}) =>
    <div className={cx('event')}>
        <div className={cx('start')}>{event.start}</div>
        <div>{event.title}</div>
    </div>;

const Schedule = ({schedule = []}) => schedule.map(day =>
    <div className={cx('day')}>
        <div>{day.date}</div>
        {
            day.events &&
            day.events.map(event => <ScheduleEvent event={event}/>)
        }
    </div>
);


export default Schedule;