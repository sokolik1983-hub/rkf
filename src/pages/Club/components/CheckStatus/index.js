import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from "../../../../components/Card";
import { Request } from "utils/request";
import Loading from "components/Loading";
import Alert from "components/Alert";
import Button from "../../../../components/Button";
import './styles.scss';

const CheckStatus = ({cardClicked}) => {
    const [barcode, setBarcode] = useState('');
    const [status, setStatus] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const { query } = useParams();

    useEffect(() => {
        if (query && query.length === 13) {
            setBarcode(query);
            requestTracking(query);
        }
    }, [query]);

    const handleSubmit = e => {
        e.preventDefault();
        requestTracking(barcode);
    };

    const handleReset = e => {
        e.preventDefault();
        setStatus([]);
        setBarcode('');
    };

    const handleBarcodeClear = e => {
        e.preventDefault();
        setBarcode('');
    };

    const requestTracking = async (barcode) => {
        setLoading(true);

        await Request({
            url: `/api/requests/CommonRequest/request_tracking?barcode=${barcode}`
        }, data => {
            setStatus(data);
            if (!data.length) {
                setAlert(true);
            }
        }, error => {
            console.log(error.response);
            setStatus([]);
        });

        setLoading(false);
    };

    return <Card className={`check-status ${cardClicked === 2 && `_active_card`}`} id="check-status-anchor">
        <div className="search-form__image documents-status"/>
        <div className="check-status__text_wrap">
        <h3>Статус документов</h3>
        <p className="search-form__text">Для отслеживания статуса изготовления документов по заявкам на замену и изготовление
        родословных, а также  регистрацию помета и др. документов введите 13-значный трек-номер в поле и нажмите кнопку "Поиск".
        История изменений статусов будет отображена в таблице ниже.</p>
        <form onSubmit={handleSubmit}>
            <div className="check-status__wrap">
                <input
                    id="check-status-anchor-track"
                    className="check-status__input"
                    type="text"
                    pattern="[0-9]{13}"
                    onChange={({ target }) => setBarcode(target.value.slice(0,13).replace(/[^0-9]/g, ''))}
                    value={barcode}
                    title="Введите 13-значный трек-номер"
                    placeholder="Введите трек-номер"
                    disabled={loading || !!status.length ? true : false}
                    required
                />
                {barcode &&
                    <button type="button" className={`check-status__cancel ${status.length ? `_hide` : ``}`} onClick={handleBarcodeClear} />}
            </div>
            {!status.length ? <div className="check-status__button">
                    <Button
                        className="btn-primary"
                        type="submit"
                        disabled={loading}
                    >
                        Поиск
                    </Button>
            </div>
                :
                <div className="check-status__button--clear">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={handleReset}
                    >
                        <span></span>
                    </button>
                </div>}
        </form>
        {
            loading
                ? <Loading centered={false} />
                : !!status.length && <div className="check-status__table">
                    <div className="check-status__info">
                        Дорогие друзья! Обращаем Ваше внимание, что ссылки на электронную копию родословной в данной таблице не публикуются. По завершении изготовления документа, ссылка на него будет доступна на странице "Проверить статус документа" или в реестре заявок в личном кабинете Вашего клуба. Публикация ссылки осуществляется в нормативные сроки, установленные Положением РКФ".
                    </div>
                    <table>
                        <colgroup>
                            <col width="15%" />
                            <col width="35%" />
                            <col width="50%" />
                        </colgroup>
                        <tbody>
                            <tr className="check-status__table-heading">
                                <td>Дата</td>
                                <td>Статус</td>
                                <td>Комментарий</td>
                            </tr>
                            {
                                status.map(({ status_name, date, comment }, key) => {
                                    return <tr key={key}>
                                        <td>{new Date(date).toLocaleDateString("ru-RU")}</td>
                                        <td>{status_name}</td>
                                        <td>{comment}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
        }
        {alert &&
            <Alert
                text="Номер не найден"
                autoclose={1.5}
                onOk={() => setAlert(false)}
            />
        }
        </div>
    </Card>
};

export default React.memo(CheckStatus);