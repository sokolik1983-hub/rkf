import React, { useEffect, useState } from "react";
import Loading from "components/Loading";
import Card from "components/Card";
import { PromiseRequest } from "utils/request";
import { setOverflow } from "utils";
import ClickGuard from "components/ClickGuard";
import Table from './components/Table';
import ReportError from './components/ReportError';
import { connectShowFilters } from "components/Layouts/connectors";
import "./index.scss";

const categories = [
    { "status_id": 1, "StatusName": "Отклоненные" },
    { "status_id": 2, "StatusName": "В работе" },
    { "status_id": 3, "StatusName": "Выполненные" },
    { "status_id": 4, "StatusName": "Не отправленные" },
];

const ReplaceRegistry = ({ history, isOpenFilters, setShowFilters }) => {
    const [loading, setLoading] = useState(true);
    const [reqTypes, setReqTypes] = useState([]);
    const [checkedTypes, setCheckedTypes] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [errorReport, setErrorReport] = useState(null);
    const checkType = i => setCheckedTypes(checkedTypes.includes(i)
        ? checkedTypes.filter(x => x !== i)
        : checkedTypes.concat(i));

    useEffect(() => {
        setOverflow(isOpenFilters);
        window.addEventListener('resize', () => setOverflow(isOpenFilters));
        return () => window.removeEventListener('resize', () => setOverflow(isOpenFilters));
    }, [isOpenFilters]);

    useEffect(() => {
        (() => Promise.all([
            PromiseRequest({
                url: '/api/requests/replace_pedigree_request/nurseryreplacepedigreerequest/register_of_requests',
                method: 'POST',
                data: {}
            }),
            PromiseRequest({ url: '/api/requests/commonrequest/replace_pedigree_type' })
        ]).then(data => {
            setDocuments(data[0]);
            setReqTypes(data[1]);
            setCheckedTypes(data[1].map(({ id }) => id));
            setLoading(false);
        }).catch(
            error => {
                console.log(error.response);
                setLoading(false);
            }))();
    }, []);

    return loading
        ? <Loading />
        : <Card className="club-documents-status">
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({ isOpenFilters: false })} />
            <div className="club-documents-status__head">
                <button className="btn-backward" onClick={() => history.goBack()}>Личный кабинет</button>
                &nbsp;/&nbsp;
                ЗАМЕНА РОДОСЛОВНОЙ
            </div>
            {documents && !!documents.length
                ? <Table
                    documents={documents
                        .sort((a, b) => new Date(b.date_create).getTime() - new Date(a.date_create).getTime())
                        .filter(x => x && checkedTypes.includes(x.type_id) && [1, 2, 3, 4].includes(x.status_id))}
                    categories={categories}
                    reqTypes={reqTypes}
                    checkedTypes={checkedTypes}
                    checkType={checkType}
                    isOpenFilters={isOpenFilters}
                    setErrorReport={setErrorReport}
                />
                : <h2>Документов не найдено</h2>}
            {errorReport && <ReportError id={errorReport} onErrorReport={id => setErrorReport(id)} />}
        </Card>
};

export default connectShowFilters(React.memo(ReplaceRegistry));
