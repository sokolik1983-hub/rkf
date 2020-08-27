import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from "../../../../components/Card";
import Request, { getHeaders } from "../../../../utils/request";
// import Loading from "components/Loading";
// import Alert from "components/Alert";
import './index.scss';


const FoundInfo = () => {
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
        <h3>Информация о найденных собаках</h3>
        <p>Если Вами была найдена собака, на теле которой проставлено клеймо - введите его код и номер в поля на данной карточке и нажмите кнопку "Поиск". В случае если данные клейма содержатся в Базе РКФ, Вам будет показан клуб, зарегистрировавший собаку, в который Вы можете обратиться для уточнения любой интересующей Вас информации.</p>
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
        <p>Данная собака зарегистрирована в РКФ</p>
    </Card>
    );
}

export default React.memo(FoundInfo);