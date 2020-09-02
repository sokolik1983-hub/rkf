import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from "../../../../components/Card";
import Request, { getHeaders } from "utils/request";
import Loading from "components/Loading";
import Alert from "components/Alert";
import './styles.scss';

const CheckStatus = ({ isBaseSearch }) => {
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

    const requestTracking = barcode => {
        setLoading(true);
        Request({
            url: `/api/requests/CommonRequest/request_tracking?barcode=${barcode}`,
            options: {
                method: "GET",
                headers: getHeaders(),
            }
        }).then(data => {
            if (data.result.length) {
                setStatus(data.result);
            } else {
                setStatus([]);
                setAlert(true);
            }
            setLoading(false);
        });
    };

    return <Card className="check-status">
        {isBaseSearch && <div className="check-status__icon" />}
        <h3>Статус документов</h3>
        {isBaseSearch && <p>Для отслеживания статуса изготовления документов по заявкам на замену и изготовление 
        родословных, а также  регистрацию помета и др. документов введите 13-значный трек-номер в поле и нажмите кнопку "Поиск". 
        История изменений статусов будет отображена в таблице ниже.</p>}
        <form onSubmit={handleSubmit}>
            <div className="check-status__wrap">
                <input
                    className="check-status__input"
                    type="text"
                    pattern="[0-9]{13}"
                    onChange={({ target }) => setBarcode(target.value)}
                    value={barcode}
                    title="Введите 13-значный номер отслеживания"
                    placeholder="введите трек-номер"
                    disabled={loading || !!status.length ? true : false}
                    required
                />
                {barcode &&
                    <button type="button" className={`check-status__cancel ${status.length ? `_hide` : ``}`} onClick={handleBarcodeClear}/>}
            </div>
           {!status.length ? <div className="check-status__button">
                <button
                    type="submit"
                    disabled={loading}
                >
                    <svg width="20" height="20" viewBox="0 0 18 18" fill="#90999e" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7106 11.0006H12.5006L16.7406 15.2606C17.1506 15.6706 17.1506 16.3406 16.7406 16.7506C16.3306 17.1606 15.6606 17.1606 15.2506 16.7506L11.0006 12.5006V11.7106L10.7306 11.4306C9.33063 12.6306 7.42063 13.2506 5.39063 12.9106C2.61063 12.4406 0.390626 10.1206 0.0506256 7.32063C-0.469374 3.09063 3.09063 -0.469374 7.32063 0.0506256C10.1206 0.390626 12.4406 2.61063 12.9106 5.39063C13.2506 7.42063 12.6306 9.33063 11.4306 10.7306L11.7106 11.0006ZM2.00063 6.50063C2.00063 8.99063 4.01063 11.0006 6.50063 11.0006C8.99063 11.0006 11.0006 8.99063 11.0006 6.50063C11.0006 4.01063 8.99063 2.00063 6.50063 2.00063C4.01063 2.00063 2.00063 4.01063 2.00063 6.50063Z" />
                    </svg>
                </button>
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
    </Card>
};

export default React.memo(CheckStatus);