import React, { useEffect, useState } from "react";
import Loading from "components/Loading";
import Card from "components/Card";
import Table from './components/Table';
import { PromiseRequest } from "utils/request";
import "./index.scss";

const ReplaceRegistry = ({ history, distinction, profileType }) => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState(null);

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

    return loading ?
        <Loading /> :
        <Card className="club-documents-status">
            <div className="club-documents-status__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
                &nbsp;/&nbsp;
                {distinction === "dysplasia" ? "СЕРТИФИКАТ О ПРОВЕРКЕ НА ДИСПЛАЗИЮ" : "СЕРТИФИКАТ КЛИНИЧЕСКОЙ ОЦЕНКИ КОЛЕННЫХ СУСТАВОВ (PL) (ПАТЕЛЛА)"}
            </div>
            {documents && !!documents.length
                ? <Table documents={documents} profileType={profileType} />
                : <h2>Документов не найдено</h2>}
        </Card>
};

export default React.memo(ReplaceRegistry);
