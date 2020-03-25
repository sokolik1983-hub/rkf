import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import StatusTable from "./components/Table";
import {Request} from "../../../../utils/request";
import "./index.scss";


const defaultResult = {
    documents: [
        {
            id: 1,
            registration_date: '2020-03-01T15:32:41.723041',
            federation: 'РФЛС',
            status: 'Выдано',
            status_id: 1,
            document_number: '1405612856781',
            declarant_name: 'Пупкин Василий Иванович',
            documents_count: 100,
            cost: 58500
        },
        {
            id: 2,
            registration_date: '2020-03-01T14:02:41.723041',
            federation: 'РФЛС',
            status: 'Изготавливается',
            status_id: 2,
            document_number: '1405612856780',
            declarant_name: 'Пупкин Василий Иванович',
            documents_count: 45,
            cost: 23000
        },
        {
            id: 3,
            registration_date: '2020-03-21T15:32:41.723041',
            federation: 'РФЛС',
            status: 'Отклонено',
            status_id: 3,
            document_number: '1405612856782',
            declarant_name: 'Пупкин Василий Иванович',
            documents_count: 10,
            cost: 8500
        },
        {
            id: 4,
            registration_date: '2020-03-02T15:32:41.723041',
            federation: 'РФЛС',
            status: 'Зарегистрирован',
            status_id: 4,
            document_number: '1405612856783',
            declarant_name: 'Пупкин Василий Иванович',
            documents_count: 5,
            cost: 3000
        },{
            id: 5,
            registration_date: '2020-03-22T15:32:41.723041',
            federation: 'РФЛС',
            status: 'Выдано',
            status_id: 1,
            document_number: '1405612856784',
            declarant_name: 'Пупкин Василий Иванович',
            documents_count: 65,
            cost: 35800
        },
        {
            id: 6,
            registration_date: '2020-03-12T15:32:41.723041',
            federation: 'РФЛС',
            status: 'Выдано',
            status_id: 1,
            document_number: '1405612856784',
            declarant_name: 'Пупкин Василий Иванович',
            documents_count: 65,
            cost: 35800
        },
        {
            id: 7,
            registration_date: '2020-03-23T15:32:41.723041',
            federation: 'РФЛС',
            status: 'Выдано',
            status_id: 1,
            document_number: '1405612856784',
            declarant_name: 'Пупкин Василий Иванович',
            documents_count: 65,
            cost: 35800
        }
    ]
};

const ClubDocumentsStatus = ({history, clubAlias, distinction}) => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState(null);

    useEffect(() => {
        if(distinction === 'pedigree') {
            (() => Request({url: '/api/clubs/requests/PedigreeRequest/headers_base_info'},
            data => {
                setDocuments(data);
                setLoading(false);
            },
            error => {
                console.log(error.response);
                setLoading(false);
            }))();
        } else {
            setDocuments(defaultResult.documents);
            setLoading(false);
        }
    }, []);

    return loading ?
        <Loading/> :
        <Card className="club-documents-status">
            <div className="club-documents-status__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
            </div>
            <div className="club-documents-status__table">
                {documents.length ?
                    <StatusTable documents={documents}/> :
                    <h2>Документов не найдено</h2>
                }
            </div>
            <div className="club-documents-status__bottom">
                <p>В соответствии с требованиями РКФ, с заявлением на регистрацию помета так же принимаются:
                    акт вязки, акт обследования помета, копии свидетельств о происхождении производителей,
                    копии сертификатов всех титулов и рабочих испытаний, заключения по дисплазии, и однократно -
                    оригинал диплома с сертификатной выставки РКФ, копию Свидетельства о регистрации заводской приставки FCI.</p>
                <Link to={`/${clubAlias}/documents/apply-${distinction}`} className="btn-add">+</Link>
            </div>
        </Card>
};

export default React.memo(ClubDocumentsStatus);