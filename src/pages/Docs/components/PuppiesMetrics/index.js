import React, {useEffect, useState} from "react";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import PuppiesTable from "./components/Table";
import {Request} from "../../../../utils/request";
import "./index.scss";
import Table from "../RequestRegistry/components/Table";
import {connectShowFilters} from "../../../../components/Layouts/connectors";
import {Link} from "react-router-dom";
import {DEFAULT_IMG} from "../../../../appConfig";
import moment from "moment";


const PuppiesMetrics = ({history, clubAlias, distinction}) => {
    const [loading, setLoading] = useState(true);
    const [puppies, setPuppies] = useState(null);
    const [exporting, setExporting] = useState(false);
    const [standardView, setStandardView] = useState(true);
    const document_id = window.location.href.split('=')[1];

    console.log("documents", puppies)
    useEffect(() => {
        (() => Request({
            url: '/api/requests/LitterRequest/register_of_metrics'
        },
        data => {
            setPuppies(data.sort(function (a, b) {
                return new Date(b.date_create) - new Date(a.date_create);
            }).map(({ date_change, date_create, date_of_birth_litter, ...rest }) => ({
                date_change: moment(date_change).format('DD.MM.YY'),
                date_create: moment(date_create).format('DD.MM.YY'),
                date_of_birth_litter: moment(date_of_birth_litter).format('DD.MM.YY'),
                ...rest
            })));
            setLoading(false);
        },
        error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return loading ?
        <Loading /> : !standardView ? <Card className="club-documents-status__popup">
                <div className="club-documents-status__controls" style={{ position: 'relative', top: '20px' }}>
                    {document_id && <button
                        className="club-documents-status__control club-documents-status__control--resetIcon"
                    >
                        <Link to={`/${clubAlias}/documents/${distinction === 'pedigree' ? `pedigree` : `litter`}/requests`}>
                            Вернуться к списку
                        </Link>
                    </button>}
                    <button
                        className="club-documents-status__control club-documents-status__control--downloadIcon"
                        onClick={() => setExporting(true)}
                        disabled={exporting}
                        style={{ zIndex: '2' }}
                    >
                        Скачать PDF
                    </button>
                    <button
                        className="club-documents-status__control club-documents-status__control--tableIcon"
                        onClick={() => setStandardView(true)}
                        style={{ zIndex: '2' }}
                    >
                        Уменьшить таблицу
                    </button>
                </div>
                <Table
                    documents={puppies}
                    distinction={distinction}
                    exporting={exporting}
                    setExporting={setExporting}
                    fullScreen
                />
            </Card>
            :
            <Card className="club-documents-status">
                <div className="club-documents-status__head">
                    <Link className="btn-backward" to={`/${clubAlias}/documents`}>Личный кабинет</Link>
                    &nbsp;/&nbsp;
                    {distinction === 'pedigree'
                        ? 'Оформление родословной'
                        : distinction === 'metrics' ? 'Метрики щенка'
                            : 'Заявление на регистрацию помета'}
                </div>
                {puppies && !!puppies.length ? <div className="_request_registry_wrap">
                        <div className="club-documents-status__controls _request_registry">
                            {document_id && <button
                                className="club-documents-status__control club-documents-status__control--resetIcon"
                            >
                                <Link to={`/${clubAlias}/documents/${distinction === 'pedigree' ? `pedigree` : `litter`}/requests`}>
                                    Вернуться к списку
                                </Link>
                            </button>}
                            <button
                                className="club-documents-status__control club-documents-status__control--downloadIcon"
                                onClick={() => setExporting(true)}
                                disabled={exporting}
                                style={{ zIndex: '2' }}
                            >
                                Скачать PDF
                            </button>
                            <button
                                style={{ zIndex: '2' }}
                                className="club-documents-status__control club-documents-status__control--tableIcon"
                                onClick={() => setStandardView(false)}
                            >
                                Увеличить таблицу
                            </button>
                        </div>
                        <Table
                            documents={puppies}
                            distinction={distinction}
                            exporting={exporting}
                            setExporting={setExporting}
                        />

                    </div>
                    : <div className="club-documents-status__plug">
                        <h4 className="club-documents-status__text">Заявок не найдено</h4>
                        <img className="club-documents-status__img" src={DEFAULT_IMG.noNews} alt="Заявок не найдено" />
                    </div>}
            </Card>
};

export default connectShowFilters(React.memo(PuppiesMetrics));