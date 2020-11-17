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
    const [standardView, setStandardView] = useState(true);
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        (() => Request({
            url: distinction === 'pedigree' ?
                '/api/requests/PedigreeRequest/register_of_requests' :
                '/api/requests/LitterRequest/register_of_requests'
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
        <Loading /> : !standardView ? <Card className="club-documents-status__popup">
            <button
                onClick={() => setStandardView(true)}
                className="club-documents-status__popup-close"
            >
            </button>
            <Table 
                documents={documents} 
                distinction={distinction}
                fullScreen
            />
        </Card> :
            <Card className="club-documents-status">
                <div className="club-documents-status__head">
                    <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
                &nbsp;/&nbsp;
                {distinction === 'pedigree'
                        ? 'ОФОРМЛЕНИЕ РОДОСЛОВНОЙ'
                        : 'ЗАЯВЛЕНИЕ НА РЕГИСТРАЦИЮ ПОМЕТА'}
                </div>
                {documents && !!documents.length ? <div className="_request_registry_wrap">
                    <div className="club-documents-status__controls _request_registry">
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
                    : <h2>Документов не найдено</h2>}
            </Card>
};

export default connectShowFilters(React.memo(RequestRegistry));