import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import {useResourceAndStoreToRedux} from "../../../../shared/hooks";
import {endpointReportsList} from "../../config";
import {connectReportsList} from "../../connectors";
import "./styles.scss";


const ExhibitionsList = ({reportsList, path, fetchReportsSuccess}) => {
    const [reports, setReports] = useState(reportsList);
    const {loading} = useResourceAndStoreToRedux(endpointReportsList, fetchReportsSuccess);

    useEffect(() => {
        setReports(reportsList);
    }, [reportsList]);

    return loading ?
        <Loading /> :
        <Card className="reports-page__list">
            <h2 className="reports-page__list-title">Прошедшие выставки</h2>

            {reports && !!reports.length ?
                <>
                    <div className="reports-page__list-controls">
                        <button
                            className="reports-page__list-button"
                            type="button"
                            onClick={() => setReports(reportsList)}
                        >Все</button>
                        <button
                            className="reports-page__list-button _red"
                            type="button"
                            onClick={() => setReports(reportsList.filter(item => item.report_header_status === 1))}
                        >Отчёт не был отправлен, либо требует доработки</button>
                        <button
                            className="reports-page__list-button _yellow"
                            type="button"
                            onClick={() => setReports(reportsList.filter(item => item.report_header_status === 2))}
                        >Отчёт ожидает проверки администратором</button>
                        <button
                            className="reports-page__list-button _green"
                            type="button"
                            onClick={() => setReports(reportsList.filter(item => item.report_header_status === 3))}
                        >Отчёт принят</button>
                    </div>
                    <ul className="ExhibitionsList">
                        {reports.map(item =>
                            <li key={item.exhibition_id}>
                                {item.report_header_status === 1 ?
                                    <Link
                                        to={`${path}/${item.exhibition_id}`}
                                        className={`ExhibitionsList__item _red${item.is_expaired_report ? ' _expire' : ''}`}>
                                        Выставка: {`${item.exhibition_name} (${new Date(item.date).toLocaleDateString()})`}
                                        <span className="ExhibitionsList__item--last-date">{item.report_status_description}</span>
                                    </Link> :
                                    <p className={`ExhibitionsList__item${item.report_header_status === 3 ? ' _green' : ''}${item.is_expaired_report ? ' _expire' : ''}`}>
                                        Выставка: {`${item.exhibition_name} (${new Date(item.date).toLocaleDateString()})`}
                                        <span className="ExhibitionsList__item--last-date">{item.report_status_description}</span>
                                    </p>
                                }
                            </li>
                        )}
                    </ul>
                </> :
                <h3>Выставок не найдено</h3>
            }
        </Card>
};

export default connectReportsList(React.memo(ExhibitionsList));