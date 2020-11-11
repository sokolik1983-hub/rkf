import React, { useEffect, useState } from "react";
import Loading from "components/Loading";
import Card from "components/Card";
import Table from './components/Table';
import { PromiseRequest } from "utils/request";
import "./index.scss";

const ReplaceRegistry = ({ history, distinction, profileType }) => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState(null);
    const [standardView, setStandardView] = useState(true);
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        (() => PromiseRequest({
            url: `/api/requests/dog_health_check_request/${profileType === "kennel" ? 'kennel' : ''}doghealthcheckrequest/register_of_requests`,
            method: 'POST',
            data: { type_id: distinction === "dysplasia" ? 1 : 2 }
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

    return loading ? <Loading /> : !standardView ? <Card className="club-documents-status__popup">
        <button
            onClick={() => setStandardView(true)}
            className="club-documents-status__popup-close"
        >
        </button>
        <Table
            documents={documents}
            profileType={profileType}
            fullScreen
        />
    </Card>
        :
        <Card className="club-documents-status">
            <div className="club-documents-status__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
                &nbsp;/&nbsp;
                {distinction === "dysplasia" ? "СЕРТИФИКАТ О ПРОВЕРКЕ НА ДИСПЛАЗИЮ" : "СЕРТИФИКАТ КЛИНИЧЕСКОЙ ОЦЕНКИ КОЛЕННЫХ СУСТАВОВ (PL) (ПАТЕЛЛА)"}
            </div>
            {documents && !!documents.length
                ? <>
                    <div className="club-documents-status__controls">
                        {standardView &&
                            <button
                                className="club-documents-status__control club-documents-status__control--downloadIcon"
                                onClick={() => setExporting(true)}
                                disabled={exporting}
                            >
                                Скачать PDF
                            </button>
                        }
                        <button className="club-documents-status__control club-documents-status__control--tableIcon" onClick={() => setStandardView(false)}>
                            Открыть на всю ширину окна
                        </button>
                    </div>
                    <Table
                        documents={documents}
                        profileType={profileType}
                        exporting={exporting}
                        setExporting={setExporting}
                    />
                </>
                : <h2>Документов не найдено</h2>}
        </Card>
};

export default React.memo(ReplaceRegistry);