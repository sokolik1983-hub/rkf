import React, { useEffect, useState } from "react";
import Loading from "components/Loading";
import Card from "components/Card";
import { Request } from "utils/request";
import Table from './components/Table';
import { connectShowFilters } from "components/Layouts/connectors";
import { DEFAULT_IMG } from "../../../../appConfig";
import { Link } from 'react-router-dom';
import ls from "local-storage";
import moment from "moment";
import "./index.scss";

const RequestRegistry = ({ history, distinction }) => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState(null);
    const [standardView, setStandardView] = useState(true);
    const [exporting, setExporting] = useState(false);
    const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
    const document_id = window.location.href.split('=')[1];

    useEffect(() => {
        (() => Request({
            url: distinction === 'pedigree' ?
                '/api/requests/PedigreeRequest/register_of_requests' :
                '/api/requests/LitterRequest/register_of_requests'
        },
            data => {
                setDocuments(data.sort(function (a, b) {
                    return new Date(b.date_create) - new Date(a.date_create);
                }).map(({ date_change, date_create, date_of_birth_litter, ...rest }) => ({
                    date_change: moment(date_change).format('DD.MM.YY'),
                    date_create: moment(date_create).format('DD.MM.YY'),
                    date_of_birth_litter: moment(date_of_birth_litter).format('DD.MM.YY'),
                    ...rest
                })));
                setLoading(false);
            },
            error => {
                console.log(error.response);
                setLoading(false);
            }))();
    }, []);

    return loading ?
        <Loading /> : !standardView ? <Card className="club-documents-status__popup">
            <div className="club-documents-status__controls" style={{ position: 'relative', top: '20px' }}>
                {document_id && <button
                    className="club-documents-status__control club-documents-status__control--resetIcon"
                >
                    <Link to={`/${alias}/documents/${distinction === 'pedigree' ? `pedigree` : `litter`}/requests`}>
                        Вернуться к списку
                    </Link>
                </button>}
                <button
                    className="club-documents-status__control club-documents-status__control--downloadIcon"
                    onClick={() => setExporting(true)}
                    disabled={exporting}
                >
                    Скачать PDF
                </button>
                <button className="club-documents-status__control club-documents-status__control--tableIcon" onClick={() => setStandardView(true)}>
                    Уменьшить таблицу
                </button>
            </div>
            <Table
                documents={documents}
                distinction={distinction}
                exporting={exporting}
                setExporting={setExporting}
                fullScreen
            />
        </Card>
            :
            <Card className="club-documents-status">
                <div className="club-documents-status__head">
                    <Link className="btn-backward" to={`/${alias}/documents`}>Личный кабинет</Link>
                &nbsp;/&nbsp;
                {distinction === 'pedigree'
                        ? 'ОФОРМЛЕНИЕ РОДОСЛОВНОЙ'
                        : 'ЗАЯВЛЕНИЕ НА РЕГИСТРАЦИЮ ПОМЕТА'}
                </div>
                {documents && !!documents.length ? <div className="_request_registry_wrap">
                    <div className="club-documents-status__controls _request_registry">
                        {document_id && <button
                            className="club-documents-status__control club-documents-status__control--resetIcon"
                        >
                            <Link to={`/${alias}/documents/${distinction === 'pedigree' ? `pedigree` : `litter`}/requests`}>
                                Вернуться к списку
                            </Link>
                        </button>}
                        <button
                            className="club-documents-status__control club-documents-status__control--downloadIcon"
                            onClick={() => setExporting(true)}
                            disabled={exporting}
                        >
                            Скачать PDF
                            </button>
                        <button className="club-documents-status__control club-documents-status__control--tableIcon" onClick={() => setStandardView(false)}>
                            Увеличить таблицу
                        </button>
                    </div>
                    <Table
                        documents={documents}
                        distinction={distinction}
                        exporting={exporting}
                        setExporting={setExporting}
                    />
                </div>
                    : <div className="club-documents-status__plug">
                        <h4 className="club-documents-status__text">Заявок не найдено</h4>
                        <img className="club-documents-status__img" src={DEFAULT_IMG.noNews} alt="Заявок не найдено" />
                    </div>}
            </Card>
};

export default connectShowFilters(React.memo(RequestRegistry));