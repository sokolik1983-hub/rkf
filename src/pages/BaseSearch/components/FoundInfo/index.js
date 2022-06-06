import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Request } from "../../../../utils/request";
import Loading from "../../../../components/Loading";
import Alert from "../../../../components/Alert";
import Card from "../../../../components/Card";
import CardOrganization from "../../../../components/CardOrganization";
import Button from "../../../../components/Button";
import './index.scss';


const FoundInfo = ({cardClicked}) => {
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
        <Card id="found-info-anchor" className={cardClicked === 1 && `_active_card`}>
            <div className="search-form__image found-info"/>
            <div className="search-form__text_wrap">
            <h3>Информация о найденных собаках</h3>
            <p className="search-form__text">Если Вами была найдена собака, на теле которой проставлено клеймо - введите его код в поле на данной карточке и нажмите кнопку "Поиск". В случае если данные клейма содержатся в Базе РКФ, Вам будет показан клуб/питомник, зарегистрировавший собаку, в который Вы можете обратиться для уточнения любой интересующей Вас информации.</p>
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-form__wrap">
                    <input
                        id="found-info-anchor-mark"
                        className="search-form__input"
                        type="text"
                        pattern="[A-Za-z]{3}"
                        onChange={({ target }) => setStampCode(target.value.slice(0, 3).replace(/[^A-Za-z]/ig, ''))}
                        value={stamp_code}
                        title="Введите 3 латинских символа"
                        placeholder="Код клейма"
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
                        <Button
                            className="btn-primary"
                            type="submit"
                            disabled={loading}
                        >
                            Поиск
                        </Button>
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
            </div>
        </Card>
    );
}

export default React.memo(FoundInfo);
