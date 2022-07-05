import React, { useEffect, useState } from "react";
import Loading from "../../../../../components/Loading";
import Card from "../../../../../components/Card";
import Table from "./components/Table";
import { Request } from "../../../../../utils/request";
import { DEFAULT_IMG } from "../../../../../appConfig";
import { Link } from 'react-router-dom';
import moment from "moment";
import "./index.scss";


const ExhibitionsRegistry = ({ history, clubAlias }) => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState(null);
    const [standardView, setStandardView] = useState(true);
    const [exporting, setExporting] = useState(false);
    const document_id = window.location.href.split('=')[1];

    useEffect(() => {
        (() => Request({
            url: `/api/requests/exhibition_request/clubexhibitionrequest/register_of_requests?typeId=1`,
        }, data => {
            setDocuments(data.sort(function (a, b) {
                return new Date(b.date_create) - new Date(a.date_create);
            }).map(({ date_change, date_create, date_begin, date_end, ...rest }) => ({
                date_change: moment(date_change).format('DD.MM.YY'),
                date_create: moment(date_create).format('DD.MM.YY'),
                date_begin: moment(date_begin).format('DD.MM.YY'),
                date_end: moment(date_end).format('DD.MM.YY'),
                ...rest
            })));
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return loading ?
        <Loading /> :
        !standardView ?
            <Card className="user-documents-status__popup">
                <div className="user-documents-status__controls">
                    {document_id && <button
                        className="user-documents-status__control user-documents-status__control--resetIcon"
                    >
                        <Link to={`/${clubAlias}/documents/exhibitions/application/registry`}>
                            Вернуться к списку
                        </Link>
                    </button>}
                    <button
                        className="user-documents-status__control user-documents-status__control--downloadIcon"
                        onClick={() => setExporting(true)}
                        disabled={exporting}
                    >
                        Скачать PDF
                    </button>
                    <button className="user-documents-status__control user-documents-status__control--tableIcon" onClick={() => setStandardView(true)}>
                        Уменьшить таблицу
                    </button>
                </div>
                <Table
                    documents={documents}
                    exporting={exporting}
                    setExporting={setExporting}
                    fullScreen
                />
            </Card>
            :
            <Card className="user-documents-status">
                <div className="user-documents-status__head">
                    <Link className="btn-backward" to={`/${clubAlias}/documents/exhibitions`}>Личный кабинет</Link>
                    &nbsp;/&nbsp;
                    Заявка на проведение выставки
                </div>
                {documents && !!documents.length
                    ? <div>
                        <div className="user-documents-status__controls">
                            {document_id && <button
                                className="user-documents-status__control user-documents-status__control--resetIcon"
                            >
                                <Link to={`/${clubAlias}/documents/exhibitions/application/registry`}>
                                    Вернуться к списку
                                </Link>
                            </button>}
                            <button
                                className="user-documents-status__control user-documents-status__control--downloadIcon"
                                onClick={() => setExporting(true)}
                                disabled={exporting}
                            >
                                Скачать PDF
                                </button>
                            <button className="user-documents-status__control user-documents-status__control--tableIcon" onClick={() => setStandardView(false)}>
                                Увеличить таблицу
                            </button>
                        </div>
                        <Table
                            documents={documents}
                            exporting={exporting}
                            setExporting={setExporting}
                        />
                    </div>
                    : <div className="user-documents-status__plug">
                        <h4 className="user-documents-status__text">Заявок не найдено</h4>
                        <img className="user-documents-status__img" src={DEFAULT_IMG.noNews} alt="Заявок не найдено" />
                    </div>
                }
            </Card>
};

export default React.memo(ExhibitionsRegistry);