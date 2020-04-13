import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from "../../../../components/Card";
import Request, { getHeaders } from "utils/request";
import Loading from "components/Loading";
import Alert from "components/Alert";
import './styles.scss';

const CheckStatus = () => {
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
        <h3>Отслеживание статуса изготовления документов</h3>
        <form onSubmit={handleSubmit}>
            <input
                className="check-status__input"
                type="text"
                pattern="[0-9]{13}"
                onChange={({ target }) => setBarcode(target.value)}
                value={barcode}
                title="Введите 13-значный номер отслеживания"
                placeholder="Введите 13-значный номер отслеживания"
                disabled={loading}
                required
            />
            <div className="check-status__button">
                {loading && <Loading centered={false} />}
                <button type="submit" disabled={loading}>Отправить</button>
            </div>
        </form>
        {!!status.length && <div className="check-status__table">
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
        </div>}
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