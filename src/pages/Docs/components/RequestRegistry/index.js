import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "components/Loading";
import Card from "components/Card";
import StatusTable from "./components/Table";
import {Request} from "utils/request";
import "./index.scss";


const RequestRegistry = ({history, clubAlias, distinction}) => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState(null);

    useEffect(() => {
        (() => Request({
            url: distinction === 'pedigree' ?
                '/api/requests/PedigreeRequest/headers_base_info' :
                '/api/requests/LitterRequest/headers_base_info'
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
        <Loading/> :
        <Card className="club-documents-status">
            <div className="club-documents-status__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
                &nbsp;/&nbsp;
                {distinction === 'pedigree' 
                    ? 'ОФОРМЛЕНИЕ РОДОСЛОВНОЙ'
                    : 'ЗАЯВЛЕНИЕ НА РЕГИСТРАЦИЮ ПОМЕТА'}
            </div>
            <div className="club-documents-status__table">
                {documents && !!documents.length ?
                    <StatusTable documents={documents} distinction={distinction} clubAlias={clubAlias}/> :
                    <h2>Документов не найдено</h2>
                }
            </div>
        </Card>
};

export default React.memo(RequestRegistry);
