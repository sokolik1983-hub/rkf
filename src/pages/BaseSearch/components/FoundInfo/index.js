import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Request, { getHeaders } from "../../../../utils/request";
import Loading from "../../../../components/Loading";
import Alert from "../../../../components/Alert";
import Card from "../../../../components/Card";
import './index.scss';


const FoundInfo = () => {
    const [stamp_number, setStampNumber] = useState('');
    const [stamp_code, setStampCode] = useState('');
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const { query, params } = useParams();

    useEffect(() => {
        if (query && query.length === 4) {
            setStampNumber(query);
            requestTracking(query);
        }
    }, [query]);

    useEffect(() => {
        if (params && params.length === 3) {
            setStampCode(params);
            requestTracking(params);
        }
    }, [params]);

    const handleSubmit = e => {
        e.preventDefault();
        requestTracking(stamp_number, stamp_code);
    };

    const requestTracking = (stamp_number, stamp_code) => {
        setLoading(true);
        Request({
            url: `/api/requests/commonrequest/found_dog_information?stamp_number=${stamp_number}&stamp_code=${stamp_code}`,
            options: {
                method: "GET",
                headers: getHeaders(),
            }
        }).then(data => {
            if (data.result) {
                setStatus(data.result);
            } else {
                setStatus(false);
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
                    onChange={({ target }) => setStampCode(target.value)}
                    value={stamp_code}
                    title="Введите 3-буквенный код клейма в формате ABC"
                    placeholder="код клейма"
                    disabled={loading || status ? true : false}
                    required
                />
                <input
                    className="search-form__input"
                    type="text"
                    pattern="[0-9]{4}"
                    onChange={({ target }) => setStampNumber(target.value)}
                    value={stamp_number}
                    title="Введите 4-значный номер клейма. Пример: 1234"
                    placeholder="номер клейма"
                    disabled={loading || status ? true : false}
                    required
                />
                {status ? <div className="search-form__button--clear">
                        <button
                            type="button"
                            disabled={loading}
                        // onClick={setStatus([])}
                        >
                            <span></span>
                        </button>
                    </div>
                    :
                    <div className="search-form__button">
                        <button
                            type="submit"
                            disabled={loading}
                        >
                            Поиск
                        </button>
                    </div>}
            </form>
            {
                loading
                    ? <Loading centered={false} />
                    : status && <div className="search-form__result">
                        <p>Данная собака зарегистрирована в РКФ</p>
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
    );
}

export default React.memo(FoundInfo);