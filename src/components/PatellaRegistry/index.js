import React, { useEffect, useState } from "react";
import Loading from "components/Loading";
import Card from "components/Card";
import Table from './components/Table';
import { PromiseRequest } from "utils/request";
import { DEFAULT_IMG } from "../../appConfig";
import { Link } from 'react-router-dom';
import ls from "local-storage";
import moment from "moment";
import "./index.scss";

const ReplaceRegistry = ({ history, distinction, profileType }) => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState(null);
    const [standardView, setStandardView] = useState(true);
    const [exporting, setExporting] = useState(false);
    const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
    const document_id = window.location.href.split('=')[1];

    useEffect(() => {
        (() => PromiseRequest({
            url: `/api/requests/dog_health_check_request/${profileType === "kennel" ? 'kennel' : ''}doghealthcheckrequest/register_of_requests`,
            method: 'POST',
            data: { type_id: distinction === "dysplasia" ? 1 : 2 }
        }).then(
            data => {
                setDocuments(data.sort(function (a, b) {
                    return new Date(b.date_create) - new Date(a.date_create);
                }).map(({ date_change, date_create, production_department_date, ...rest }) => ({
                    date_change: moment(date_change).format('DD.MM.YY'),
                    date_create: moment(date_create).format('DD.MM.YY'),
                    ...rest
                })));
                setLoading(false);
            }).catch(
                error => {
                    console.log(error.response);
                    setLoading(false);
                }))();
    }, []);

    return loading ? <Loading /> : !standardView ? <Card className="club-documents-status__popup">
        <div className="club-documents-status__controls" style={{ position: 'relative', top: '29px' }}>
            {document_id && <button
                className="club-documents-status__control club-documents-status__control--resetIcon"
            >
                <Link to={profileType === "kennel" ? `/kennel/${alias}/documents/${distinction === 'dysplasia' ? 'dysplasia' : 'patella'}/registry` : `/${alias}/documents/${distinction === 'dysplasia' ? 'dysplasia' : 'patella'}/registry`}>
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
            profileType={profileType}
            exporting={exporting}
            setExporting={setExporting}
            fullScreen
        />
    </Card>
        :
        <Card className="club-documents-status">
            <div className="club-documents-status__head">
                <Link className="btn-backward" to={profileType === "kennel" ? `/kennel/${alias}/documents` : `/${alias}/documents`}>Личный кабинет</Link>
                &nbsp;/&nbsp;
                {distinction === "dysplasia" ? "СЕРТИФИКАТ О ПРОВЕРКЕ НА ДИСПЛАЗИЮ" : "СЕРТИФИКАТ КЛИНИЧЕСКОЙ ОЦЕНКИ КОЛЕННЫХ СУСТАВОВ (PL) (ПАТЕЛЛА)"}
            </div>
            {documents && !!documents.length
                ? <div>
                    <div className="club-documents-status__controls _patella_controls">
                        {document_id && <button
                            className="club-documents-status__control club-documents-status__control--resetIcon"
                        >
                            <Link to={profileType === "kennel" ? `/kennel/${alias}/documents/${distinction === 'dysplasia' ? 'dysplasia' : 'patella'}/registry` : `/${alias}/documents/${distinction === 'dysplasia' ? 'dysplasia' : 'patella'}/registry`}>
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
                        profileType={profileType}
                        exporting={exporting}
                        setExporting={setExporting}
                        distinction={distinction}
                    />
                </div>
                : <div className="club-documents-status__plug">
                    <h4 className="club-documents-status__text">Заявок не найдено</h4>
                    <img className="club-documents-status__img" src={DEFAULT_IMG.noNews} alt="Заявок не найдено" />
                </div>}
        </Card>
};

export default React.memo(ReplaceRegistry);