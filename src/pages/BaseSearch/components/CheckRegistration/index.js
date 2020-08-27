import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Request, { getHeaders } from "../../../../utils/request";
import Loading from "../../../../components/Loading";
import Alert from "../../../../components/Alert";
import Card from "../../../../components/Card";
import '../FoundInfo/index.scss';


const CheckRegistration = () => {
    const [stamp_number, setStampNumber] = useState('');
    const [stamp_code, setStampCode] = useState('');
    const [status, setStatus] = useState([]);
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
            url: `/api/requests/commonrequest/dog_registration_information?stamp_number=${stamp_number}&stamp_code=${stamp_code}`,
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
                    onChange={({ target }) => setStampCode(target.value)}
                    value={stamp_code}
                    title="Введите 3-буквенный код клейма в формате ABC"
                    placeholder="код клейма"
                    disabled={loading}
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
            {
                loading
                    ? <Loading centered={false} />
                    : !!status.length && <div className="search-form__result">
                        <p>Данный помет зарегистрирован в РКФ, на собаку может быть оформлена родословная</p>
                        <p>На собаку с введенным клеймом зарегистрирована родословная</p>
                        <p>Данный помет не зарегистрирован в РКФ. Для уточнения деталей обратитесь в клуб, выпустивший метрику щенка</p>

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

export default React.memo(CheckRegistration);