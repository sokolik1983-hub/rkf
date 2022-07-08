import React, { useEffect, useState } from "react";
import Loading from "components/Loading";
import Card from "components/Card";
import { PromiseRequest } from "utils/request";
import { setOverflow } from "utils";
import ClickGuard from "components/ClickGuard";
import Table from './components/Table';
import ReportError from './components/ReportError';
import { connectShowFilters } from "components/Layouts/connectors";
import { DEFAULT_IMG } from "../../../../appConfig";
import { Link } from "react-router-dom";
import ls from "local-storage";
import moment from "moment";

import "./index.scss";

const ReplaceRegistry = ({ history, isOpenFilters, setShowFilters }) => {
    const [loading, setLoading] = useState(true);
    const [reqTypes, setReqTypes] = useState([]);
    const [checkedTypes, setCheckedTypes] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [errorReport, setErrorReport] = useState(null);
    const [standardView, setStandardView] = useState(true);
    const [exporting, setExporting] = useState(false);
    const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
    const document_id = window.location.href.split('=')[1];
    const [needUpdateTable, setNeedUpdateTable] = useState(false);

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
            setDocuments(data[0].sort(function (a, b) {
                return new Date(b.date_create) - new Date(a.date_create);
            }).map(({ date_change, date_create, ...rest }) => ({
                date_change: moment(date_change).format('DD.MM.YY'),
                date_create: moment(date_create).format('DD.MM.YY'),
                ...rest
            })));
            setReqTypes(data[1]);
            setCheckedTypes(data[1].map(({ id }) => id));
            setLoading(false);
        }).catch(
            error => {
                console.log(error.response);
                setLoading(false);
            }))();
    }, [needUpdateTable]);

    return loading
        ? <Loading /> : !standardView ? <Card className="nursery-documents-status__popup">
            <div className="nursery-documents-status__controls _replace_registry">
                {document_id && <button
                    className="nursery-documents-status__control nursery-documents-status__control--resetIcon"
                >
                    <Link to={`/kennel/${alias}/documents/replace-pedigree/registry`}>
                        Вернуться к списку
                    </Link>
                </button>}
                <button
                    className="nursery-documents-status__control nursery-documents-status__control--downloadIcon"
                    onClick={() => setExporting(true)}
                    disabled={exporting}
                >
                    Скачать PDF
                </button>
                <button className="nursery-documents-status__control nursery-documents-status__control--tableIcon" onClick={() => setStandardView(true)}>
                    Уменьшить таблицу
                </button>
            </div>
            <Table
                documents={documents
                    .sort((a, b) => new Date(b.date_create).getTime() - new Date(a.date_create).getTime())
                    .filter(x => x && checkedTypes.includes(x.type_id) && [1, 2, 3, 4, 8].includes(x.status_id))}
                reqTypes={reqTypes}
                checkedTypes={checkedTypes}
                checkType={checkType}
                isOpenFilters={isOpenFilters}
                setErrorReport={setErrorReport}
                exporting={exporting}
                setExporting={setExporting}
                fullScreen
                setNeedUpdateTable={setNeedUpdateTable}
            />
        </Card>
            :
            <Card className="club-documents-status">
                <ClickGuard value={isOpenFilters} callback={() => setShowFilters({ isOpenFilters: false })} />
                <div className="club-documents-status__head">
                    <Link className="btn-backward" to={`/kennel/${alias}/documents`}>Личный кабинет</Link>
                &nbsp;/&nbsp;
                ЗАМЕНА РОДОСЛОВНОЙ
            </div>
                {documents && !!documents.length
                    ? <div style={{ position: 'relative' }}>
                        <div className="nursery-documents-status__controls _replace_registry">
                            {document_id && <button
                                className="nursery-documents-status__control nursery-documents-status__control--resetIcon"
                            >
                                <Link to={`/kennel/${alias}/documents/replace-pedigree/registry`}>
                                    Вернуться к списку
                                </Link>
                            </button>}
                            <button
                                className="nursery-documents-status__control nursery-documents-status__control--downloadIcon"
                                onClick={() => setExporting(true)}
                                disabled={exporting}
                            >
                                Скачать PDF
                                </button>
                            <button className="nursery-documents-status__control nursery-documents-status__control--tableIcon" onClick={() => setStandardView(false)}>
                                Увеличить таблицу
                            </button>
                        </div>
                        <Table
                            documents={documents
                                .sort((a, b) => new Date(b.date_create).getTime() - new Date(a.date_create).getTime())
                                .filter(x => x && checkedTypes.includes(x.type_id) && [1, 2, 3, 4, 8].includes(x.status_id))}
                            reqTypes={reqTypes}
                            checkedTypes={checkedTypes}
                            checkType={checkType}
                            isOpenFilters={isOpenFilters}
                            setErrorReport={setErrorReport}
                            exporting={exporting}
                            setExporting={setExporting}
                            setNeedUpdateTable={setNeedUpdateTable}
                        />
                    </div>
                    : <div className="nursery-documents-status__plug">
                        <h4 className="nursery-documents-status__text">Заявок не найдено</h4>
                        <img className="nursery-documents-status__img" src={DEFAULT_IMG.noNews} alt="Заявок не найдено" />
                    </div>}
                {errorReport && <ReportError setNeedUpdateTable={setNeedUpdateTable} id={errorReport} onErrorReport={id => setErrorReport(id)} />}
            </Card>
};

export default connectShowFilters(React.memo(ReplaceRegistry));