import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'components/Card';
import Loading from 'components/Loading';
import { useResourceAndStoreToRedux } from "shared/hooks";
import { endpointReportsList } from '../../config';
import { connectReportsList } from 'apps/Reports/connectors';
import './styles.scss';
import Container from "../../../../components/Layout/Container";

const ExhibitionsList = (props) => {
    const { reportsList, path, fetchReportsSuccess } = props;
    const { loading } = useResourceAndStoreToRedux(endpointReportsList, fetchReportsSuccess);

    return (loading ?
        <Loading /> :
        <Container className="container-main">
            <Card>
                <h3>Прошедшие выставки</h3>
                <p className="colors-memo">
                    <span className="_red">Отчёт не был отправлен, либо требует доработки</span>
                    <span className="_yellow">Отчёт ожидает проверки администратором</span>
                    <span className="_green">Отчёт принят</span>
                </p>
                <ul className="ExhibitionsList">
                    {
                        reportsList
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .reverse()
                            .map((item) =>
                                <li key={item.exhibition_id}>
                                    {
                                        item.report_header_status === 1
                                            ? <Link
                                                to={`${path}/${item.exhibition_id}`}
                                                className={`ExhibitionsList__item _red${item.is_expaired_report ? ' _expire' : ''}`}>
                                                Выставка: {`${item.exhibition_name} (${new Date(item.date).toLocaleDateString()})`}
                                                <span className="ExhibitionsList__item--last-date">{item.report_status_description}</span>
                                            </Link>
                                            : <p className={`ExhibitionsList__item${item.report_header_status === 3 ? ' _green' : ''}${item.is_expaired_report ? ' _expire' : ''}`}>
                                                Выставка: {`${item.exhibition_name} (${new Date(item.date).toLocaleDateString()})`}
                                                <span className="ExhibitionsList__item--last-date">{item.report_status_description}</span>
                                            </p>
                                    }
                                </li>
                            )
                    }
                </ul>
            </Card>
        </Container>
    );
};

export default connectReportsList(ExhibitionsList);