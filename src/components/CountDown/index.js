import React, {useEffect, useState} from "react";
import {calculateCountDown} from "../../utils";
import declension from "../../utils/declension";
import "./index.scss";


const CountDown = ({startDate, endDate, reportsDateEnd}) => {
    const getEndDate = () => calculateCountDown(
        Date.now() < +new Date(startDate) ?
            startDate :
            Date.now() < +new Date(endDate) ?
                endDate :
                reportsDateEnd
    );

    const [isCount, setIsCount] = useState(Date.now() < +new Date(reportsDateEnd));
    const [countDown, setCountDown] = useState(getEndDate());

    useEffect(() => {
        if(isCount) {
            let interval, delay;

            delay = setTimeout(() => {
                setCountDown(getEndDate());
                interval = setInterval(() => Date.now() < +new Date(reportsDateEnd) ?
                    setCountDown(getEndDate()) :
                    setIsCount(false),
                    60000);
            }, (60 - new Date().getSeconds())*1000);

            return () => {
                clearTimeout(delay);
                clearInterval(interval);
            }
        }
    }, [isCount]);

    return (
        <div className="countdown">
            {Date.now() < +new Date(startDate) ?
                <h4 className="countdown__title">До начала мероприятия осталось:</h4> :
                Date.now() < +new Date(endDate) ?
                    <h4 className="countdown__title">До окончания мероприятия осталось:</h4> :
                        Date.now() < +new Date(reportsDateEnd) ?
                            <h4 className="countdown__title">До окончания срока подачи отчёта осталось:</h4> :
                            <h4 className="countdown__title">Отчёты:</h4>
            }
            {isCount &&
                <div className="countdown__timer">
                    <div className={`countdown__timer-item ${declension(countDown.days, ['_days', '_days2', '_days3'])}`}>
                        {countDown.days}
                    </div>
                    <div className={`countdown__timer-item ${declension(countDown.hours, ['_hours', '_hours2', '_hours3'])}`}>
                        {countDown.hours}
                    </div>
                    <div className={`countdown__timer-item ${declension(countDown.minutes, ['_minutes', '_minutes2', '_minutes3'])}`}>
                        {countDown.minutes}
                    </div>
                </div>
            }
            {/*!isCount &&
                //отчёты
            */}
        </div>
    )
};

export default React.memo(CountDown);