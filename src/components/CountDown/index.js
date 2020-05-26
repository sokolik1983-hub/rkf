import React, { useEffect, useState } from "react";
import { calculateCountDown } from "../../utils";
import declension from "../../utils/declension";
import "./index.scss";


const CountDown = ({ startDate, endDate, reportsDateEnd, reportsLinks }) => {
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
        if (isCount) {
            let interval, delay;

            delay = setTimeout(() => {
                setCountDown(getEndDate());
                interval = setInterval(() => Date.now() < +new Date(reportsDateEnd) ?
                    setCountDown(getEndDate()) :
                    setIsCount(false),
                    60000);
            }, (60 - new Date().getSeconds()) * 1000);

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
                <table className="countdown__reports">
                    <tbody>
                        {reportsLinks && !!reportsLinks.length
                            ? reportsLinks.map(({ id, name, url, date, date_send }) => {
                                const isFCI = date_send ? true : false;
                                const reportDate = isFCI ? date_send : date;

                                return <tr key={id}>
                                    <td>
                                        <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
                                    </td>
                                    <td>
                                        {reportDate &&
                                            <span>
                                                {` ${new Date(reportDate).getDate() < 10
                                                    ? '0' + new Date(reportDate).getDate()
                                                    : new Date(reportDate).getDate()}.${new Date(reportDate).getMonth() + 1 < 10
                                                        ? '0' + (new Date(reportDate).getMonth() + 1)
                                                        : new Date(reportDate).getMonth() + 1}.${new Date(reportDate).getFullYear()} ${isFCI ? '(Передача в FCI)' : '(Поступление в РКФ)'}`
                                                }
                                            </span>
                                        }
                                    </td>
                                </tr>
                            })
                            : <tr>
                                <td colSpan="2">Отчёты не найдены</td>
                            </tr>
                        }
                    </tbody>
                </table>
            }
        </div>
    )
};

export default React.memo(CountDown);