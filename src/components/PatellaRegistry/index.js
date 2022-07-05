import React, {memo, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ls from "local-storage";
import moment from "moment";
import Card from "../Card";
import Modal from "../Modal";
import Loading from "../Loading";
import Table from "./components/Table";
import ReportError from "./components/ReportError";
import TableModal from "./components/TableModal";
import useIsMobile from "../../utils/useIsMobile";
import {Request} from "../../utils/request";
import {blockContent} from "../../utils/blockContent";
import {DEFAULT_IMG} from "../../appConfig";
import "./index.scss";


const ReplaceRegistry = ({distinction, profileType}) => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState(null);
    const [registry, setRegistry] = useState(null);
    const [standardView, setStandardView] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [errorReport, setErrorReport] = useState(null);
    const [needUpdateTable, setNeedUpdateTable] = useState(false);
    const alias = ls.get('user_info') ? ls.get('user_info').alias : '';
    const isMobile = useIsMobile(1200);

    useEffect(() => {
        (() => Request({
            url: `/api/requests/dog_health_check_request/${profileType === "kennel" ? 'kennel' : ''}doghealthcheckrequest/register_of_requests`,
            method: 'POST',
            data: {type_id: distinction === 'dysplasia' ? 1 : 2}
        }, data => {
            setDocuments(data.sort((a, b) => new Date(b.date_create) - new Date(a.date_create))
                .map(({date_change, date_create, ...rest}) => ({
                    date_change: moment(date_change).format('DD.MM.YY'),
                    date_create: moment(date_create).format('DD.MM.YY'),
                    ...rest
                }))
            );
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();

        (() => Request({
            url: '/api/requests/commonrequest/completed_requests_registry',
        }, data => {
            setRegistry(data.sort((a, b) => new Date(b.rkf_creation_date) - new Date(a.rkf_creation_date))
                .map(({complition_date, rkf_creation_date, ...rest}) => ({
                    complition_date: moment(complition_date).format('DD.MM.YY'),
                    rkf_creation_date: moment(rkf_creation_date).format('DD.MM.YY'),
                    ...rest
                }))
            );
        }, error => {
            console.log(error.response);
        }))();
    }, [needUpdateTable]);

    const closeModal = () => {
        setShowModal(false);
        blockContent(false);
    };

    return (loading ?
        <Loading/> :
        <>
            {!standardView ?
                <Card className="club-documents-status__popup">
                    <div className="club-documents-status__controls">
                        {registry && !isMobile &&
                            <button
                                className="club-documents-status__control club-documents-status__control--registryIcon"
                                onClick={() => setShowModal(true)}
                                disabled={exporting}
                            >
                                Реестр
                            </button>
                        }
                        <button
                            className="club-documents-status__control club-documents-status__control--downloadIcon"
                            onClick={() => setExporting(true)}
                            disabled={exporting}
                        >
                            Скачать PDF
                        </button>
                        <button className="club-documents-status__control club-documents-status__control--tableIcon"
                                onClick={() => setStandardView(true)}>
                            Уменьшить таблицу
                        </button>
                    </div>
                    <Table
                        documents={documents}
                        profileType={profileType}
                        exporting={exporting}
                        setExporting={setExporting}
                        setErrorReport={setErrorReport}
                        fullScreen
                        setNeedUpdateTable={setNeedUpdateTable}
                    />
                    {errorReport &&
                        <ReportError
                            setNeedUpdateTable={setNeedUpdateTable}
                            id={errorReport}
                            onErrorReport={id => setErrorReport(id)}
                            profileType={profileType}
                        />
                    }
                </Card>
                :
                <Card className="club-documents-status">
                    <div className="club-documents-status__head">
                        <Link
                            className="btn-backward"
                            to={profileType === 'kennel' ? `/kennel/${alias}/documents` : `/club/${alias}/documents`}
                        >
                            Личный кабинет
                        </Link>
                        &nbsp;/&nbsp;
                        {distinction === 'dysplasia' ?
                            'СЕРТИФИКАТ О ПРОВЕРКЕ НА ДИСПЛАЗИЮ'
                            :
                            'СЕРТИФИКАТ КЛИНИЧЕСКОЙ ОЦЕНКИ КОЛЕННЫХ СУСТАВОВ (PL) (ПАТЕЛЛА)'}
                    </div>
                    {documents && !!documents.length ?
                        <div className="club-documents-status__inner">
                            <div className="club-documents-status__controls _patella_controls">
                                {registry && !isMobile &&
                                    <button
                                        className="club-documents-status__control club-documents-status__control--registryIcon"
                                        onClick={() => setShowModal(true)}
                                        disabled={exporting}
                                    >
                                        Реестр
                                    </button>
                                }
                                <button
                                    className="club-documents-status__control club-documents-status__control--downloadIcon"
                                    onClick={() => setExporting(true)}
                                    disabled={exporting}
                                >
                                    Скачать PDF
                                </button>
                                <button
                                    className="club-documents-status__control club-documents-status__control--tableIcon"
                                    onClick={() => setStandardView(false)}>
                                    Увеличить таблицу
                                </button>
                            </div>
                            <Table
                                documents={documents}
                                profileType={profileType}
                                exporting={exporting}
                                setExporting={setExporting}
                                distinction={distinction}
                                setErrorReport={setErrorReport}
                                setNeedUpdateTable={setNeedUpdateTable}
                            />
                        </div>
                        :
                        <div className="club-documents-status__plug">
                            <h4 className="club-documents-status__text">Заявок не найдено</h4>
                            <img className="club-documents-status__img"
                                 src={DEFAULT_IMG.noNews}
                                 alt="Заявок не найдено"
                            />
                        </div>
                    }
                    {errorReport &&
                        <ReportError
                            setNeedUpdateTable={setNeedUpdateTable}
                            id={errorReport}
                            onErrorReport={id => setErrorReport(id)}
                            profileType={profileType}
                        />
                    }
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

export default memo(ReplaceRegistry);
