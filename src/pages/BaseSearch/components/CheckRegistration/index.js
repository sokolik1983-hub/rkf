import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Request, { getHeaders } from "../../../../utils/request";
import Loading from "../../../../components/Loading";
import Alert from "../../../../components/Alert";
import Card from "../../../../components/Card";
import CardOrganization from "../../../../components/CardOrganization";
import '../FoundInfo/index.scss';


const CheckRegistration = () => {
    const [stamp_number, setStampNumber] = useState('');
    const [stamp_code, setStampCode] = useState('');
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const { query, params } = useParams();

    useEffect(() => {
        if (query && query.length === 4) {
            setStampNumber(query);
        }
    }, [query]);

    useEffect(() => {
        if (params && params.length === 3) {
            setStampCode(params);
        }
    }, [params]);

    const handleSubmit = e => {
        e.preventDefault();
        requestTracking(stamp_number, stamp_code);
    };

    const handleReset = e => {
        e.preventDefault();
        setStatus(false);
        setStampCode('');
        setStampNumber('');
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
            <div className="search-form__icon" />
            <h3>Регистрационные данные собаки</h3>
            <p>В целях получения информации о факте регистрации помета в РКФ, наличии у собаки родословной или возможности ее получения введите код и номер клейма и нажмите кнопку "Поиск". Вся необходимая информация будет отображена ниже. Просим Вас использовать данную форму перед отправкой заявки на изготовление документов.</p>
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
                    pattern="[0-9]{1,4}"
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
                            onClick={handleReset}
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
                            <span></span>
                        </button>
                    </div>}
            </form>
            {
                loading
                    ? <Loading centered={false} />
                    : status && <div className="search-form__result">
                        {status.status === 1 ? <p>{status.message}</p> : ``}
                        {status.status === 2 ? <p>{status.message}</p> : ``}
                        {status.status === 3 ? 
                            <>
                                <p>{status.message}</p>
                                <CardOrganization
                                    alias={status.everk_information ? `` : status.alias}
                                    logo={status.logo}
                                    name={status.name}
                                    user_type={status.user_type}
                                    is_active={status.is_active}
                                    is_active_member={status.is_active_member}
                                    city_name={status.city_name}
                                    city_id={status.city_id}
                                    owner_name={status.owner_name}
                                    owner_position={status.owner_position}
                                    federation_name={status.federation_name}
                                    federation_alias={status.federation_alias}
                                    content={status.content}
                                    phones={status.phones}
                                    mails={status.mails}
                                    breeds={status.breeds}
                                />
                            </>
                        : ``}
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