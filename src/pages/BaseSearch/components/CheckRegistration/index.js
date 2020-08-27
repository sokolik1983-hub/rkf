import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Request, { getHeaders } from "../../../../utils/request";
// import Loading from "components/Loading";
// import Alert from "components/Alert";
import Card from "../../../../components/Card";
import './index.scss';


const CheckRegistration = () => {
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

    return (
        <Card className="base-search__card">
            <h3>Регистрационные данные собаки</h3>
            <p>В целях получения информации о факте регистрации помета в РКФ, наличии у собаки родословной или возможности ее получения введите код и номер клейма и нажмите кнопку "Поиск". Вся необходимая информация будет отображена ниже. Просим Вас использовать данную форму перед отправкой заявки на изготовление документов</p>
            <form className="search-form" onSubmit={handleSubmit}>
            <input
                className="search-form__input"
                type="text"
                pattern="[A-Z]{3}"
                onChange={({ target }) => setBarcode(target.value)}
                value={barcode}
                title="Введите 3-буквенный код клейма"
                placeholder="код клейма"
                disabled={loading}
                required
            />
            <input
                className="search-form__input"
                type="text"
                pattern="[0-9]{4}"
                onChange={({ target }) => setBarcode(target.value)}
                value={barcode}
                title="Введите 4-значный номер клейма"
                placeholder="номер клейма"
                disabled={loading}
                required
            />
           {!status.length ? <div className="search-form__button">
                <button
                    type="submit"
                    disabled={loading}
                >
                    Поиск
                </button>
            </div>
            :
            <div className="search-form__button--clear">
                <button
                    type="button"
                    disabled={loading}
                    // onClick={setStatus([])}
                >
                <span></span>
                </button>
            </div>}
        </form>
            <p>Данный помет зарегистрирован в РКФ, на собаку может быть оформлена родословная</p>
            <p>На собаку с введенным клеймом зарегистрирована родословная</p>
            <p>Данный помет не зарегистрирован в РКФ. Для уточнения деталей обратитесь в клуб, выпустивший метрику щенка</p>
        </Card>
    );
}

export default React.memo(CheckRegistration);