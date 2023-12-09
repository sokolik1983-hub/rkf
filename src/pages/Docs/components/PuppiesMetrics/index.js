import React, {useEffect, useState} from "react";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import {Request} from "../../../../utils/request";
import PuppiesTable from "./components/Table";
import {connectShowFilters} from "../../../../components/Layouts/connectors";
import {Link} from "react-router-dom";
import {DEFAULT_IMG} from "../../../../appConfig";
import moment from "moment";

import "./index.scss";


const PuppiesMetrics = ({history, clubAlias, distinction}) => {
    const [loading, setLoading] = useState(true);
    const [puppies, setPuppies] = useState(null);
    const [exporting, setExporting] = useState(false);
    const document_id = window.location.href.split('=')[1];

    useEffect(() => {
        getPuppiesCards();
    }, []);

    const getPuppiesCards = () => {
        (() => Request({
                url: '/api/document/documentdog/puppy_cards_registry'
            },
            data => {
                setPuppies(data.sort(function (a, b) {
                        return new Date(b.date_create) - new Date(a.date_create);
                    }).map(({ date_change, date_create, date_of_birth_litter, ...rest }) => ({
                        date_change: moment(date_change).format('DD.MM.YY'),
                        date_create: moment(date_create).format('DD.MM.YY'),
                        date_of_birth_litter: moment(date_of_birth_litter).format('DD.MM.YY'),
                        ...rest
                    }))


                );
                setLoading(false);
            },
            error => {
                console.log(error.response);
                setLoading(false);
            }))();
    }

    const CheckUpdateNewMetrics = () => {
        (() => Request({
                url: '/api/document/documentdog/check_and_generate_puppy_cards'
            },
            data => {
                setLoading(false);

                if (data.length) {
                    window.alert(`Добавлено новых метрик щенка: ${data.length}.`)
                    getPuppiesCards();
                } else {
                    window.alert('Новых метрик щенка не найдено.')
                }
            },
            error => {
                console.log(error.response);
                setLoading(false);
            }))();
    }

    const handleMetricsUpdate = () => {
        CheckUpdateNewMetrics()
    }


    return loading ?
        <Loading /> :
            <Card className="club-documents-status">
                <div className="club-documents-status__head --puppies">
                    <div>
                        <Link className="btn-backward" to={`/${clubAlias}/documents`}>Личный кабинет</Link>
                        &nbsp;/&nbsp;
                        Метрики&nbsp;щенка
                    </div>

                    <div className="club-documents-status --puppies-update-button"
                         onClick={handleMetricsUpdate}
                    >
                        Обновить
                    </div>
                </div>

                <div className="Card Card--message">
                    <h3>Уважаемые пользователи!</h3>
                    <h3>Раздел работает в тестовом режиме</h3>
                    <p>
                        Если вы не находите в интерфейсе свои метрики, которые создаются по обработанным
                        (выполненным) заявкам на регистрацию пометов, необходимо нажать на кнопку "Обновить",
                        она находится в правой, верхней части интерфейса.
                    </p>
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

                            {/*<button*/}
                            {/*    style={{ zIndex: '2' }}*/}
                            {/*    className="club-documents-status__control club-documents-status__control--tableIcon"*/}
                            {/*    onClick={() => setStandardView(false)}*/}
                            {/*>*/}
                            {/*    Увеличить таблицу*/}
                            {/*</button>*/}
                        </div>
                        <PuppiesTable
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