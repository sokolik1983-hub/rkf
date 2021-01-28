import React, { useEffect, useState } from "react";
import Loading from "components/Loading";
import Card from "components/Card";
import Table from "./components/Table";
import { PromiseRequest } from "utils/request";
import { DEFAULT_IMG } from "../../../../../appConfig";
import { Link } from 'react-router-dom';
import ls from "local-storage";
import "./index.scss";

const ApplicationRegistry = ({ history }) => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState(null);
    const [standardView, setStandardView] = useState(true);
    const [exporting, setExporting] = useState(false);
    const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
    const document_id = window.location.href.split('=')[1];

    useEffect(() => {
        (() => PromiseRequest({
            url: `/api/requests/get_rkf_document_request/ownergetrkfdocumentrequest/register_of_requests`,
            method: 'GET'
        }).then(
            data => {
                setDocuments(data);
                setLoading(false);
            }).catch(
                error => {
                    console.log(error.response);
                    setLoading(false);
                }))();
    }, []);

    return loading ? <Loading /> : !standardView ? <Card className="user-documents-status__popup">
        <div className="user-documents-status__controls" style={{ position: 'relative', top: '43px' }}>
            {document_id && <button
                className="user-documents-status__control user-documents-status__control--resetIcon"
            >
                <Link to={`/user/${alias}/documents`}>
                    Вернуться к списку
                </Link>
            </button>}
            <button
                className="user-documents-status__control user-documents-status__control--downloadIcon"
                onClick={() => setExporting(true)}
                disabled={exporting}
            >
                Скачать PDF
            </button>
            <button className="user-documents-status__control user-documents-status__control--tableIcon" onClick={() => setStandardView(true)}>
                Уменьшить таблицу
            </button>
        </div>
        <Table
            documents={documents}
            exporting={exporting}
            setExporting={setExporting}
            fullScreen
        />
    </Card>
        :
        <Card className="user-documents-status">
            <div className="user-documents-status__head">
                <Link className="btn-backward" to={`/user/${alias}/documents`}>Личный кабинет</Link>
                &nbsp;/&nbsp;
                Заявка на получение документов РКФ
            </div>
            {documents && !!documents.length
                ? <div className="user-documents-status__controls-wrap">
                    <div className="user-documents-status__controls">
                        {document_id && <button
                            className="user-documents-status__control user-documents-status__control--resetIcon"
                        >
                            <Link to={`/user/${alias}/documents/application/registry`}>
                                Вернуться к списку
                            </Link>
                        </button>}
                        <button
                            className="user-documents-status__control user-documents-status__control--downloadIcon"
                            onClick={() => setExporting(true)}
                            disabled={exporting}
                        >
                            Скачать PDF
                            </button>
                        <button className="user-documents-status__control user-documents-status__control--tableIcon" onClick={() => setStandardView(false)}>
                            Увеличить таблицу
                        </button>
                    </div>
                    <Table
                        documents={documents}
                        exporting={exporting}
                        setExporting={setExporting}
                    />
                </div>
                : <div className="user-documents-status__plug">
                    <h4 className="user-documents-status__text">Заявок не найдено</h4>
                    <img className="user-documents-status__img" src={DEFAULT_IMG.noNews} alt="Заявок не найдено" />
                </div>}
        </Card>
};

export default React.memo(ApplicationRegistry);