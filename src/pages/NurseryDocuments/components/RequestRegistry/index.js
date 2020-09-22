import React, { useEffect, useState } from "react";
import Loading from "components/Loading";
import Card from "components/Card";
import { Request } from "utils/request";
import Table from './components/Table';
import { connectShowFilters } from "components/Layouts/connectors";
import "./index.scss";

const RequestRegistry = ({ history, distinction }) => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState(null);

    useEffect(() => {
        (() => Request({
            url: distinction === 'pedigree' ?
                '/api/requests/NurseryPedigreeRequest/register_of_requests' :
                '/api/requests/NurseryLitterRequest/register_of_requests'
        },
            data => {
                setDocuments(data);
                setLoading(false);
            },
            error => {
                console.log(error.response);
                setLoading(false);
            }))();
    }, []);

    return loading ?
        <Loading /> :
        <Card className="nursery-documents-status">
            <div className="nursery-documents-status__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
                &nbsp;/&nbsp;
                {distinction === 'pedigree'
                    ? 'ОФОРМЛЕНИЕ РОДОСЛОВНОЙ'
                    : 'ЗАЯВЛЕНИЕ НА РЕГИСТРАЦИЮ ПОМЕТА'}
            </div>
            {documents && !!documents.length ? <Table documents={documents} distinction={distinction} /> : <h2>Документов не найдено</h2>}
        </Card>
};

export default connectShowFilters(React.memo(RequestRegistry));
