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
    const ifExpire = date => (new Date(new Date().setHours(0, 0, 0, 0)) - new Date(date)) > 2592000000 ? true : false; // 30 days in millisecs
    return (loading ?
        <Loading /> :
        <Container className="container-main">
            <Card>
                <h3>Прошедшие выставки</h3>
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
                                                className={`ExhibitionsList__item _red${ifExpire(item.date) ? ' _expire' : ''}`}>
                                                Выставка: {`${item.exhibition_name} (${new Date(item.date).toLocaleDateString()})`}
                                                <span className="ExhibitionsList__item--last-date">{item.report_status_description}</span>
                                            </Link>
                                            : <p className={`ExhibitionsList__item${item.report_header_status === 3 ? ' _green' : ''}${ifExpire(item.date) ? ' _expire' : ''}`}>
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