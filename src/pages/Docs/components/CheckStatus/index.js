import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Card from "../../../../components/Card";
import CustomMenu from "../../../../components/CustomMenu";
import Request, { getHeaders } from "utils/request";
import Loading from "components/Loading";
import Alert from "components/Alert";
import './styles.scss';

const CheckStatus = ({ clubAlias }) => {
    const [barcode, setBarcode] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        Request({
            url: `/api/clubs/requests/PedigreeRequest/request_tracking?Barcode=${barcode}`,
            options: {
                method: "GET",
                headers: getHeaders(),
            }
        }).then(data => {
            if (data.result[0]) {
                setStatus(data.result[0].Status);
            } else {
                setStatus(null);
                setAlert(true);
            }
            setLoading(false);
        });
    };

    return <div className="documents-page__info">
        <aside className="documents-page__left">
            <CustomMenu title="Личный кабинет">
                <Link to={`/${clubAlias}/documents`} title="Оформление документов">Оформление документов</Link>
                <Link to={`/${clubAlias}/documents/check-status`} title="Отслеживание статуса">Отслеживание статуса</Link>
                <Link to="/reports" title="Отчеты">Отчеты</Link>
                <Link to={`/${clubAlias}`} title="Страница клуба">Страница клуба</Link>
            </CustomMenu>
        </aside>
        <div className="documents-page__right">
            <Card className="check-status">
                <h3>Отслеживание статуса изготовления документов</h3>
                <form onSubmit={handleSubmit}>
                    <div className="check-status__field">
                        <input
                            type="text"
                            pattern="[0-9]{13}"
                            onChange={({ target }) => setBarcode(target.value)}
                            title="Введите 13-значный номер отслеживания"
                            placeholder="Введите 13-значный номер отслеживания"
                            required
                        />
                        <button type="submit">Отправить</button>
                        {loading && <Loading centered={false} />}
                    </div>
                    {status && <div className="check-status__response">Статус заявки: <span>{status}</span></div>}
                </form>
                {alert &&
                    <Alert
                        text="Номер не найден"
                        autoclose={1.5}
                        onOk={() => setAlert(false)}
                    />
                }
            </Card>
        </div>
    </div>
};

export default CheckStatus;