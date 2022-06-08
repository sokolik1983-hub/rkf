import React, { useEffect, useState } from "react";
import Loading from "../../../../../components/Loading";
import Card from "../../../../../components/Card";
import Table from "./components/Table";
import {getHeaders, Request} from "../../../../../utils/request";
import { DEFAULT_IMG } from "../../../../../appConfig";
import { Link } from 'react-router-dom';
import moment from "moment";
import "./index.scss";


const ExhibitionsInventionsRegistry = ({ alias, userType }) => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState(null);
    const [standardView, setStandardView] = useState(true);
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        (() => Request({
            url: `/api/exhibitions/invite/register_of_requests`,
            headers: getHeaders(),
        }, data => {
            setDocuments(data.sort(function (a, b) {
                return new Date(b.date_create) - new Date(a.date_create);
            }).map(({ date_create, end_date, start_date, nbc_breed, ...rest }) => ({
                date_create: moment(date_create).format('DD.MM.YY'),
                end_date: moment(end_date).format('DD.MM.YY'),
                start_date: moment(start_date).format('DD.MM.YY'),
                nbc_breed: getBreeds(nbc_breed),
                ...rest
            })));
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    const getBreeds = breeds => {
        const breedsArray = [];
        breeds && breeds.map((breed, index) => breedsArray.push(`${index !== 0 ? ' ' : ''}${breed.name}`));
        return breedsArray;
    }

    return loading ?
        <Loading /> :
        !standardView ?
            <Card className="user-documents-status__popup">
                <div className="user-documents-status__controls">
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
                    userType={userType}
                    fullScreen
                />
            </Card>
            :
            <Card className="user-documents-status">
                <div className="user-documents-status__head">
                    <Link className="btn-backward" to={`/${alias}/documents/exhibitions`}>Личный кабинет</Link>
                    &nbsp;/&nbsp;
                    Приглашения на мероприятия
                </div>
                {documents && !!documents.length
                    ? <div>
                        <div className="user-documents-status__controls">
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
                            userType={userType}
                        />
                    </div>
                    : <div className="user-documents-status__plug">
                        <h4 className="user-documents-status__text">Заявок не найдено</h4>
                        <img className="user-documents-status__img" src={DEFAULT_IMG.noNews} alt="Заявок не найдено" />
                    </div>
                }
            </Card>
};

export default React.memo(ExhibitionsInventionsRegistry);