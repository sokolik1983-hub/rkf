import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Request } from "../../../../utils/request";
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

    const requestTracking = async (stamp_code) => {
        setLoading(true);

        await Request({
            url: `/api/requests/commonrequest/found_dog_information?stamp_code=${stamp_code}`
        }, data => {
            setStatus(data);
        }, error => {
            console.log(error.response);
            setStatus(false);
            setAlert(true);
        });

        setLoading(false);
    };

    return (
        <Card id="found-info-anchor">
            <div className="search-form__icon found-info" />
            <h3>Информация о найденных собаках</h3>
            <p>Если Вами была найдена собака, на теле которой проставлено клеймо - введите его код в поле на данной карточке и нажмите кнопку "Поиск". В случае если данные клейма содержатся в Базе РКФ, Вам будет показан клуб/питомник, зарегистрировавший собаку, в который Вы можете обратиться для уточнения любой интересующей Вас информации.</p>
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
                        {status.status === 1 ?
                            <>
                                <p>{status.message}</p>
                                {status.organizations.map((org, index) => {
                                    return (
                                        <CardOrganization
                                            key={index + org.name}
                                            alias={org.alias}
                                            logo={org.logo}
                                            name={org.name}
                                            user_type={org.user_type}
                                            is_active={org.is_active}
                                            is_active_member={org.is_active_member}
                                            city_name={org.city_name}
                                            city_id={org.city_id}
                                            owner_name={org.owner_name}
                                            owner_position={org.owner_position}
                                            federation_name={org.federation_name}
                                            federation_alias={org.federation_alias}
                                            content={org.content}
                                            phones={org.phones}
                                            mails={org.mails}
                                            breeds={org.breeds}
                                        />
                                    );
                                })
                                }
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