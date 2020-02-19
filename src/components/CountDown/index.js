import React, {useEffect, useState} from "react";
import {calculateCountDown} from "../../utils";
import declension from "../../utils/declension";
import "./index.scss";


const CountDown = ({startDate, endDate}) => {
    const [countDown, setCountDown] = useState(calculateCountDown(startDate));

    useEffect(() => {
        if(Date.now() < +new Date(startDate)) {
            let interval;

            const delay = setTimeout(() => {
                setCountDown(calculateCountDown(startDate));
                interval = setInterval(() => setCountDown(calculateCountDown(startDate)), 60000);
            }, (60 - new Date().getSeconds())*1000);

            return () => {
                clearTimeout(delay);
                clearInterval(interval);
            }
        }
    }, []);

    return (
        <div className="countdown">
            {Date.now() > +new Date(endDate) ?
                <h4 className="countdown__title">Выставка завершена</h4> :
                Date.now() > +new Date(startDate) && Date.now() < +new Date(endDate) ?
                    <h4 className="countdown__title">Выставка началась</h4> :
                    <>
                        <h4 className="countdown__title">До начала выставки осталось:</h4>
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
                    </>
            }
        </div>
    )
};

export default React.memo(CountDown);