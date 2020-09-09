import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Request from "../../../../utils/request";
import Loading from "../../../../components/Loading";
import Alert from "../../../../components/Alert";
import Card from "../../../../components/Card";
import CardOrganization from "../../../../components/CardOrganization";
import { DEFAULT_IMG } from "../../../../appConfig";
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

    const handleStampCodeClear = e => {
        e.preventDefault();
        setStampCode('');
    };

    const handleStampNumberClear = e => {
        e.preventDefault();
        setStampNumber('');
    };

    const requestTracking = (stamp_number, stamp_code) => {
        setLoading(true);
        Request({
            url: `/api/requests/commonrequest/dog_registration_information?stamp_number=${stamp_number}&stamp_code=${stamp_code}`
        }, data => {
            setStatus(data.result);
            setLoading(false);
        },
            error => {
                console.log(error.response);
                setStatus(false);
                setAlert(true);
                setLoading(false);
            }
        );
    };

    return (
        <Card id="check-registration-anchor">
            <div className="search-form__icon check-registration" />
            <h3>Регистрационные данные собаки</h3>
            <p>В целях получения информации о факте регистрации помета в РКФ, наличии у собаки родословной или возможности ее получения введите код и номер клейма и нажмите кнопку "Поиск". Вся необходимая информация будет отображена ниже. Просим Вас использовать данную форму перед отправкой заявки на изготовление документов.</p>
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-form__wrap">
                    <input
                        className="search-form__input"
                        type="text"
                        pattern="[A-Za-z]{3}"
                        onChange={({ target }) => setStampCode(target.value)}
                        value={stamp_code}
                        title="Введите 3 латинских символа"
                        placeholder="код клейма"
                        disabled={loading || status ? true : false}
                        required
                    />
                    {stamp_code &&
                        <button type="button" className={`search-form__cancel ${status ? `_hide` : ``}`} onClick={handleStampCodeClear} />}
                </div>
                <div className="search-form__wrap">
                    <input
                        className="search-form__input"
                        type="text"
                        pattern="^[0-9]+$"
                        onChange={({ target }) => setStampNumber(target.value)}
                        value={stamp_number}
                        title="Введите числовое значение номера клейма"
                        placeholder="номер клейма"
                        disabled={loading || status ? true : false}
                        required
                    />
                    {stamp_number &&
                        <button type="button" className={`search-form__cancel ${status ? `_hide` : ``}`} onClick={handleStampNumberClear} />}
                </div>
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
                            <svg width="20" height="20" viewBox="0 0 18 18" fill="#90999e" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.7106 11.0006H12.5006L16.7406 15.2606C17.1506 15.6706 17.1506 16.3406 16.7406 16.7506C16.3306 17.1606 15.6606 17.1606 15.2506 16.7506L11.0006 12.5006V11.7106L10.7306 11.4306C9.33063 12.6306 7.42063 13.2506 5.39063 12.9106C2.61063 12.4406 0.390626 10.1206 0.0506256 7.32063C-0.469374 3.09063 3.09063 -0.469374 7.32063 0.0506256C10.1206 0.390626 12.4406 2.61063 12.9106 5.39063C13.2506 7.42063 12.6306 9.33063 11.4306 10.7306L11.7106 11.0006ZM2.00063 6.50063C2.00063 8.99063 4.01063 11.0006 6.50063 11.0006C8.99063 11.0006 11.0006 8.99063 11.0006 6.50063C11.0006 4.01063 8.99063 2.00063 6.50063 2.00063C4.01063 2.00063 2.00063 4.01063 2.00063 6.50063Z" />
                            </svg>
                        </button>
                    </div>}
            </form>
            {
                loading
                    ? <Loading centered={false} />
                    : status && <div className="search-form__result">
                        {status.status === 1 ? <p>Данный помет зарегистрирован в РКФ. Вы можете подать заявку на оформление родословной.</p> : ``}
                        {status.status === 2 ? <p>{status.message}</p> : ``}
                        {status.status === 3 ?
                            <>
                                <p>Данный помет не зарегистрирован в РКФ. Для уточнения деталей обратитесь в клуб/питомник.</p>
                                <CardOrganization
                                    alias={status.alias}
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
                        {status.status === 4 ? <div className="search-form__default-content">
                            <h3>Ничего не найдено</h3>
                            <img src={DEFAULT_IMG.noNews} alt="Ничего не найдено" />
                        </div> : ``}
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