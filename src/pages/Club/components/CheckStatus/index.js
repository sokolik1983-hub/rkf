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
        <h3>Статус документов</h3>
        {isBaseSearch && <p>Для отслеживания статуса изготовления документов по заявкам на замену и изготовление 
        родословных, а также  регистрацию помета и др. документов введите 13-значный трек-номер в поле и нажмите кнопку "Поиск". 
        История изменений статусов будет отображена в таблице ниже.</p>}
        <form onSubmit={handleSubmit}>
            <input
                className="check-status__input"
                type="text"
                pattern="[0-9]{13}"
                onChange={({ target }) => setBarcode(target.value)}
                value={barcode}
                title="Введите 13-значный номер отслеживания"
                placeholder="введите трек-номер"
                disabled={loading}
                required
            />
            <div className="check-status__button">
                <button type="submit" disabled={loading}>Поиск</button>
            </div>
            {isBaseSearch && <div className="check-status__button">
                <button type="button" className="_clear-btn">
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