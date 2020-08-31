import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Request, { getHeaders } from "../../../../utils/request";
import Loading from "../../../../components/Loading";
import Alert from "../../../../components/Alert";
import Card from "../../../../components/Card";
import CardOrganization from "../../../../components/CardOrganization";
import './index.scss';


const FoundInfo = () => {
    const [stamp_code, setStampCode] = useState('');
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const { params } = useParams();

    useEffect(() => {
        if (params && params.length === 3) {
            setStampCode(params);
        }
    }, [params]);

    const handleSubmit = e => {
        e.preventDefault();
        requestTracking(stamp_code);
    };

    const handleReset = e => {
        e.preventDefault();
        setStatus(false);
        setStampCode('');
    };

    const handleStampCodeClear = e => {
        e.preventDefault();
        setStampCode('');
    };

    const requestTracking = (stamp_code) => {
        setLoading(true);
        Request({
            url: `/api/requests/commonrequest/found_dog_information?stamp_code=${stamp_code}`,
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
        <Card>
            <div className="search-form__icon" />
            <h3>Информация о найденных собаках</h3>
            <p>Если Вами была найдена собака, на теле которой проставлено клеймо - введите его код и номер в поля на данной карточке и нажмите кнопку "Поиск". В случае если данные клейма содержатся в Базе РКФ, Вам будет показан клуб, зарегистрировавший собаку, в который Вы можете обратиться для уточнения любой интересующей Вас информации.</p>
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-form__wrap">
                    <input
                        className="search-form__input"
                        type="text"
                        pattern="[A-Za-z]{3}"
                        onChange={({ target }) => setStampCode(target.value)}
                        value={stamp_code}
                        title="Введите 3-буквенный код клейма"
                        placeholder="код клейма"
                        disabled={loading || status ? true : false}
                        required
                    />
                    {stamp_code &&
                    <button className={`search-form__cancel ${status ? `_hide` : ``}`} onClick={handleStampCodeClear} />}
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
                            <span></span>
                        </button>
                    </div>}
            </form>
            {
                loading
                    ? <Loading centered={false} />
                    : status && <div className="search-form__result">
                    {status.status === 1 ? 
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
                        {status.status === 2 ? <p>Данные о регистрации отсутствуют</p> : ``}
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