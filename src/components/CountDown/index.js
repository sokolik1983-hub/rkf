import React, {useEffect, useState} from "react";
import {calculateCountDown} from "../../utils";
import declension from "../../utils/declension";
import "./index.scss";


const CountDown = ({startDate, endDate, reportsDateEnd, reportsLinks}) => {
    const getEndDate = () => calculateCountDown(
        Date.now() < +new Date(startDate) ?
            startDate :
            Date.now() < +new Date(endDate) ?
                endDate :
                reportsDateEnd
    );

    const [isCount, setIsCount] = useState(reportsLinks && reportsLinks.length ? false : Date.now() < +new Date(reportsDateEnd));
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
                <h4 className="countdown__title">До начала мероприятия осталось</h4> :
                Date.now() < +new Date(endDate) ?
                    <h4 className="countdown__title">До окончания мероприятия осталось</h4> :
                        isCount ?
                            <h4 className="countdown__title">До окончания срока подачи отчёта осталось</h4> :
                            <h4 className="countdown__title">Отчёты</h4>
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
            {!isCount &&
                <ul className="countdown__reports">
                    {reportsLinks && !!reportsLinks.length ?
                        reportsLinks.map(link =>
                            <li className="countdown__reports-link" key={link.id}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
                                {link.date_send &&
                                    <p>Дата подачи отчёта:
                                        <span>
                                            {`${new Date(link.date_send).getDate() < 10 ? '0' + new Date(link.date_send).getDate() : new Date(link.date_send).getDate()}.${new Date(link.date_send).getMonth() + 1 < 10 ? '0' + (new Date(link.date_send).getMonth() + 1) : new Date(link.date_send).getMonth() + 1}.${new Date(link.date_send).getFullYear()}`}
                                        </span>
                                    </p>
                                }
                            </li>
                        ) :
                        <li className="countdown__reports-link">
                            Отчёты не найдены
                        </li>
                    }
                </ul>
            }
        </div>
    )
};

export default React.memo(CountDown);