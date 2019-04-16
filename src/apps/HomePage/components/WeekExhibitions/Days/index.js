import React from 'react'
import classnames from 'classnames'
import Container from 'components/Layout/Container'

import {getCurrentWeekDays, weekDays, getLocalizedMonth} from 'utils/datetime'
import './style.scss'

const Day = ({weekDay, selected, onDayChange}) => {
    const onClick = () => {
        onDayChange(weekDay.getDate())
    };
    const classNames = classnames(
        'week-day',
        {'week-day--active': weekDay.getDate() === selected}
    );
    return <div onClick={onClick} className={classNames}>
        <div className="week-day__date">{weekDay.getDate()}</div>
        <div className="week-day__wrap">
            <span className="week-day__month">{getLocalizedMonth(weekDay)}</span>
            <br/>
            <span className="week-day__week-day">{weekDays[weekDay.getDay().toString()]}</span>
        </div>
    </div>
};


const Days = ({selected, onDayChange}) => {
    const week = getCurrentWeekDays();
    return (
        <Container className="week-days">
            {
                week.map(weekDay =>
                    <Day
                        key={weekDay.toString()}
                        selected={selected}
                        weekDay={weekDay}
                        onDayChange={onDayChange}
                    />
                )
            }
        </Container>
    )
};

export default Days