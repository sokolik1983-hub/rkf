import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Card from "../../components/Card";
import StatusTable from "./components/Table";
import "./index.scss";


const defaultResult = {
    documents: [
        {
            id: 1,
            registration_date: '2020-03-23T15:32:41.723041',
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
            registration_date: '2020-03-23T15:32:41.723041',
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
            registration_date: '2020-03-23T15:32:41.723041',
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
            registration_date: '2020-03-23T15:32:41.723041',
            federation: 'РФЛС',
            status: 'Зарегистрирован',
            status_id: 4,
            document_number: '1405612856783',
            declarant_name: 'Пупкин Василий Иванович',
            documents_count: 5,
            cost: 3000
        },{
            id: 5,
            registration_date: '2020-03-23T15:32:41.723041',
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
            registration_date: '2020-03-23T15:32:41.723041',
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
    ],
    documents_count: 7
};

const ClubDocumentsStatus = ({history, match}) => {
    const ClubId = match.params.id;
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState(null);

    useEffect(() => {
        setDocuments(defaultResult.documents);
        setLoading(false);
    }, []);

    return loading ?
        <Loading/> :
        <Layout>
            <Container className="content club-documents-status">
                <Card>
                    <div className="club-documents-status__head"></div>
                    <div className="club-documents-status__table">
                        <StatusTable documents={documents}/>
                    </div>
                    <div className="club-documents-status__bottom">
                        <p>В соответствии с требованиями РКФ, с заявлением на регистрацию помета, так же при наличии
                            принимаются акт вязки, акт обследования помета, копии свидетельств о происхождении производителей,
                            копии сертификатов всех титулов и рабочих испытаний, заключения по дисплазии, и однократно -
                            оригинал диплома с сертификатной выставки РКФ, копию Свидетельства о регистрации заводской приставки FCI.</p>
                        <Link to="/" className="btn-add">+</Link>
                    </div>
                </Card>
            </Container>
        </Layout>
};

export default React.memo(ClubDocumentsStatus);