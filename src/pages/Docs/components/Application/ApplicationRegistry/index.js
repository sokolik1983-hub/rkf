import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ls from "local-storage";
import moment from "moment";
import Table from "./components/Table";
import ReportError from "./components/ReportError";
import Card from "../../../../../components/Card";
import Modal from "../../../../../components/Modal";
import Loading from "../../../../../components/Loading";
import TableModal from "../../../../../components/PatellaRegistry/components/TableModal";
import useIsMobile from "../../../../../utils/useIsMobile";
import { blockContent } from "../../../../../utils/blockContent";
import { PromiseRequest, Request } from "../../../../../utils/request";
import { DEFAULT_IMG } from "../../../../../appConfig";

import "./index.scss";


const ApplicationRegistry = () => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState(null);
    const [standardView, setStandardView] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [registry, setRegistry] = useState(null);
    const [exporting, setExporting] = useState(false);
    const [errorReport, setErrorReport] = useState(null);
    const [needUpdateTable, setNeedUpdateTable] = useState(false);
    const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
    const document_id = window.location.href.split('=')[1];
    const isMobile = useIsMobile(1200);

    useEffect(() => {
        (() => Request({
            url: `/api/requests/get_rkf_document_request/clubgetrkfdocumentrequest/register_of_requests`,
            method: 'GET'
        }, data => {
            setDocuments(data.sort(function (a, b) {
                return new Date(b.date_create) - new Date(a.date_create);
            }).map(({ date_change, date_create, ...rest }) => ({
                date_change: moment(date_change).format('DD.MM.YY'),
                date_create: moment(date_create).format('DD.MM.YY'),
                ...rest
            })));
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();

        (() => PromiseRequest({
            url: '/api/requests/commonrequest/completed_requests_registry',
            method: 'GET',
        }).then(
            data => {
                setRegistry(data.sort(function (a, b) {
                    return new Date(b.rkf_creation_date) - new Date(a.rkf_creation_date);
                }).map(({complition_date, rkf_creation_date, ...rest}) => ({
                    complition_date: moment(complition_date).format('DD.MM.YY'),
                    rkf_creation_date: moment(rkf_creation_date).format('DD.MM.YY'),
                    ...rest
                })));
            }).catch(
            error => {
                console.log(error.response);
            }))();
    }, [needUpdateTable]);

    const closeModal = () => {
        setShowModal(false);
        blockContent(false);
    };

    return (loading ?
        <Loading /> :
        <>
            {!standardView ?
                <Card className="user-documents-status__popup">
                    <div className="user-documents-status__controls">
                        {document_id &&
                            <Link className="user-documents-status__control user-documents-status__control--resetIcon"
                                  to={`/${alias}/documents/application/registry`}
                            >
                                Вернуться к списку
                            </Link>
                        }
                        <button
                            className="user-documents-status__control user-documents-status__control--downloadIcon"
                            onClick={() => setExporting(true)}
                            disabled={exporting}
                        >
                            Скачать PDF
                        </button>
                        <button className="user-documents-status__control user-documents-status__control--tableIcon"
                                onClick={() => setStandardView(true)}>
                            Уменьшить таблицу
                        </button>
                    </div>
                    <Table
                        documents={documents}
                        exporting={exporting}
                        setExporting={setExporting}
                        setErrorReport={setErrorReport}
                        fullScreen
                        setNeedUpdateTable={setNeedUpdateTable}
                    />
                </Card>
                :
                <Card className="user-documents-status">
                    <div className="user-documents-status__head">
                        <Link className="btn-backward" to={`/${alias}/documents`}>Личный кабинет</Link>
                        &nbsp;/&nbsp;
                        Заявка на получение документов РКФ
                    </div>
                    {documents && !!documents.length
                        ? <div>
                            <div className="user-documents-status__controls">
                                {document_id &&
                                    <Link
                                        className="user-documents-status__control user-documents-status__control--resetIcon"
                                        to={`/${alias}/documents/application/registry`}
                                    >
                                        Вернуться к списку
                                    </Link>
                                }
                                {registry && !isMobile && <button
                                    className="club-documents-status__control club-documents-status__control--registryIcon"
                                    onClick={() => setShowModal(true)}
                                    disabled={exporting}
                                >
                                    Реестр
                                </button>}
                                <button
                                    className="user-documents-status__control user-documents-status__control--downloadIcon"
                                    onClick={() => setExporting(true)}
                                    disabled={exporting}
                                >
                                    Скачать PDF
                                </button>
                                <button
                                    className="user-documents-status__control user-documents-status__control--tableIcon"
                                    onClick={() => setStandardView(false)}
                                >
                                    Увеличить таблицу
                                </button>
                            </div>
                            <Table
                                documents={documents}
                                exporting={exporting}
                                setExporting={setExporting}
                                setErrorReport={setErrorReport}
                                setNeedUpdateTable={setNeedUpdateTable}
                            />
                        </div>
                        : <div className="user-documents-status__plug">
                            <h4 className="user-documents-status__text">Заявок не найдено</h4>
                            <img className="user-documents-status__img" src={DEFAULT_IMG.noNews} alt="Заявок не найдено"/>
                        </div>
                    }
                    {errorReport && <ReportError
                        id={errorReport}
                        onErrorReport={id => setErrorReport(id)}
                        setNeedUpdateTable={setNeedUpdateTable}
                    />}
                </Card>
            }
            {showModal &&
                <Modal
                    className="club-documents-status__modal"
                    showModal={showModal}
                    handleClose={closeModal}
                    handleX={closeModal}
                    headerName="Реестр"
                >
                    <TableModal
                        documents={registry}
                        fullScreen
                    />
                </Modal>
            }
        </>
    )
};

export default React.memo(ApplicationRegistry);
