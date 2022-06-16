import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Card from "../../../../components/Card";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import CountDown from "../../../../components/CountDown";
import PropertyP from "../../../../components/PropertyP";
import declension from "../../../../utils/declension";
import {Request} from "../../../../utils/request";
import {blockContent} from "../../../../utils/blockContent";
import {
    getLocalizedWeekDay,
    timeSecondsCutter,
    transformDateSafariFriendly
} from "../../../../utils/datetime";
import {getDictElementsArray, useDictionary} from "../../../../dictionaries";
import {judgeIcon, allbreedJudgeIcon} from "../../../../components/Layouts/UserLayout/config";
import useIsMobile from "../../../../utils/useIsMobile";

import "./index.scss";


const ExhibitionInfo = ({
    breed_types,
    canEdit,
    dateEnd,
    dateStart,
    dates,
    description,
    documents_links,
    exhibitionId,
    exhibition_avatar_link,
    judges,
    national_breed_club_name,
    rank_types,
    reportsDateEnd,
    reports_link,
}) => {
    const [judge, setJudge] = useState([]);
    const [judgeSent, setJudgeSent] = useState([]);
    const [judgeIds, setJudgeIds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const {dictionary: rankDictionary} = useDictionary('rank_type');
    const {dictionary: breedDictionary} = useDictionary('breed_types');
    const rankTypes = getDictElementsArray(rankDictionary, rank_types);
    const breedTypes = getDictElementsArray(breedDictionary, breed_types);
    const isMobile = useIsMobile(1080);

    useEffect(() => {
            blockContent(showModal);
    }, [showModal]);

    const onChange = (id) => {
        setJudgeIds(
            judgeIds.includes(id) ?
                judgeIds.filter(elem => elem !== id )
                :
                [...judgeIds, id]
        );
    }

    const handleSubmit = async () => {
        await Request({
                url: `/api/exhibitions/invite`,
                method: 'POST',
                data: JSON.stringify({
                        exhibition_id : exhibitionId,
                        judge_ids: judgeIds,
                    }
                )
            }, () => {
                setJudgeSent(judgeIds);
                setJudgeIds([]);
            },
            error => {
                console.log(error);
            }
        )
    };

    const getJudgeList = async () => {
        await Request({
                url: `/api/exhibitions/common/relevant_judges?id=${exhibitionId}`,
            },
            data => setJudge(data),
            error => console.log(error));
    };

    const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

    const resolveBreeds = (ranks, breeds) => {
        if (breeds && !!breeds.length && ranks && !!ranks.length && 'Все породы' === breeds.join(', ')) {
            let a = [];
            ranks.forEach(r => {
                let match = /САС (\d+) /g.exec(r);
                match && !isNaN(match[1]) && a.push(match[1]);
            });
            if (!!a.length) {
                return `Породы ${a.join(', ')} гр.`;
            } else return breeds.join(', ');
        } else return breeds.join(', ');
    };

    return (
        <>
            <Card className="exhibition-info">
                <div className="exhibition-page__wrap" >
                    {!isMobile && <img src={exhibition_avatar_link} alt="" className="exhibition-page__img" />}
                    <div className="exhibition-page__right">
                    <h4 className="exhibition-info__title">Информация о мероприятии</h4>
                    {dates &&
                        <>
                            <h5 className="exhibition-info__subtitle">
                                {`${declension(dates.length, ['Дата', 'Даты', 'Даты'])} проведения:`}
                            </h5>
                            <div className="exhibition-info__dates">
                                {dates.map((date, i) => (
                                    <p key={i} className="exhibition-info__date">
                                        {`${capitalizeFirstLetter(getLocalizedWeekDay(transformDateSafariFriendly(date)))}, 
                                        ${date.day < 10 ? '0' + date.day : date.day}.
                                        ${date.month < 10 ? '0' + date.month : date.month}.
                                        ${date.year}${!!date.time_start ? ' c ' + timeSecondsCutter(date.time_start):''}
                                        ${!!date.time_end ? ' до ' + timeSecondsCutter(date.time_end) + ' по МСК': ''}`}
                                    </p>
                                ))}
                            </div>
                        </>
                    }
                    <div className="exhibition-info__table">
                        {rankTypes && !!rankTypes.length && <PropertyP
                            name="Ранг"
                            value={rankTypes.join(', ')}
                        />}
                        {breedTypes && !!breedTypes.length && <PropertyP
                            name="Породы"
                            value={resolveBreeds(rankTypes, breedTypes)}
                        />}
                        {national_breed_club_name && <PropertyP
                            name="НКП"
                            value={national_breed_club_name}
                        />}
                    </div>
                    <div className={reports_link.length ?
                        'exhibition-info__right reports'
                        :
                        'exhibition-info__right'}
                    >
                        {dates && !!dates.length &&
                            <CountDown
                                startDate={dateStart}
                                endDate={dateEnd}
                                reportsDateEnd={reportsDateEnd}
                                reportsLinks={reports_link}
                            />
                        }
                    </div>
                </div>
                </div>
                <div className="exhibition-page__judge-info">
                    <div className="judge-info__header-wrap">
                        <h4 className="exhibition-page__description-title">Судьи/Специалисты</h4>
                        {canEdit && new Date(dateEnd) >= new Date() &&
                        <div className="exhibition-page__judge-select">
                            <Button
                                primary={true}
                                onClick={() => {
                                    getJudgeList();
                                    setShowModal(true);
                                }}
                            >
                                Пригласить судью
                            </Button>
                        </div>}
                    </div>
                    {judges &&
                    <ul className="exhibition-page__judge-item">
                        {judges.split('\r\n').map(item => <li key={item}>{item}</li>)}
                    </ul>
                    }
                </div>
            </Card>
            <Card className="exhibition-info two">
                <div className="exhibition-page__description">
                    <h4 className="exhibition-page__description-title">Описание</h4>
                    {description ?
                        <p dangerouslySetInnerHTML={{__html: description}}/> :
                        <p>Описание отсутствует</p>
                    }
                </div>
                <div className="exhibition-page__description">
                    <h4 className="exhibition-page__documents-title">Документы</h4>
                    {documents_links && !!documents_links.length ?
                        documents_links.map(doc => (
                            <p className="exhibition-documents__doc" key={doc.id}>
                                <a href={doc.url} target="__blank">{doc.name}</a>
                            </p>
                        )) :
                        <p className="exhibition-documents__doc">Документы отсутствуют</p>
                    }
                </div>
            </Card>
            {showModal &&
                <Modal showModal={showModal}
                       handleClose={() => setShowModal(false)}
                       handleX={() => {
                           setShowModal(false)
                       }}
                       noBackdrop={true}
                       iconName="owner2-white"
                       headerName="Выбор судьи/специалиста"
                       className="exhibition-page__judge__modal"
                >
                    {judge ?
                        <>
                            <h3>Список судей/специалистов</h3>
                            <ul className="exhibition-page__judge-list">
                                {judge.map(judge_item =>
                                    <li key={judge_item.id} className="exhibition-page__judge-item judge-item">
                                        {!isMobile ?
                                            <div className="judge-item__wrap">
                                                <div className="judge-item__name">
                                                    {judge_item.owner_alias ?
                                                        <Link
                                                            className="judge-item__name-rus"
                                                            to={`/user/${judge_item.owner_alias}`}
                                                        >
                                                            <p>{judge_item.last_name && `${judge_item.last_name} `}</p>
                                                            <p>{judge_item.first_name && `${judge_item.first_name} `}
                                                                {judge_item.second_name}
                                                                {judge_item.owner_alias && judgeIcon}
                                                                {judge_item.all_breeder &&
                                                                    allbreedJudgeIcon
                                                                }
                                                            </p>
                                                        </Link>
                                                        :
                                                        <span className="judge-item__name-rus">
                                                            <p>{judge_item.last_name && `${judge_item.last_name} `}</p>
                                                            <p>{judge_item.first_name && `${judge_item.first_name} `}
                                                                {judge_item.second_name}
                                                                {judge_item.owner_alias && judgeIcon}
                                                                {judge_item.all_breeder &&
                                                                    allbreedJudgeIcon
                                                                }
                                                            </p>
                                                        </span>
                                                    }
                                                    <span className="judge-item__name-eng">
                                                        {judge_item.last_name_lat}
                                                        {judge_item.first_name_lat ? ' ' + judge_item.first_name_lat : ''}
                                                    </span>
                                                    <span className="judge-item__cert-number">
                                                        Лист судьи №{judge_item.cert_number}
                                                    </span>
                                                </div>
                                                <div className="judge-item__info">
                                                    <span>
                                                        Город:
                                                        <p>{judge_item.city_name}</p>
                                                    </span>
                                                    <span>
                                                        Телефон:
                                                        <p>{judge_item.phone}</p>
                                                    </span>
                                                    <span>
                                                        E-mail:
                                                        <p>{judge_item.email}</p>
                                                    </span>
                                                </div>
                                                <div className="judge-item__checkbox-wrap">
                                                    <input type="checkbox"
                                                           className={`judge-item__checkbox${(judge_item.is_invited || 
                                                               judgeSent.includes(judge_item.id || judgeIds.map(item=>item))) ? 
                                                                   '__disabled' 
                                                                   : 
                                                                   ''}`}
                                                           id={judge_item.id}
                                                           onChange={() => onChange(judge_item.id)}
                                                           disabled={judge_item.is_invited ||
                                                               judgeSent.includes(judge_item.id || judgeIds.map(item=>item)) ||
                                                               false}
                                                           checked={judge_item.is_invited ? true : null}
                                                    />
                                                    <label htmlFor={judge_item.id}></label>
                                                    {judge_item.is_invited &&
                                                    <span>
                                                         приглашение отправлено
                                                    </span>
                                                    }
                                                </div>
                                            </div>
                                            :
                                            <div className="judge-item__wrap">
                                                <div className="judge-item__name">
                                                    {judge_item.owner_alias ?
                                                        <Link
                                                            className="judge-item__name-rus"
                                                            to={`/user/${judge_item.owner_alias}`}
                                                        >
                                                            <p>{judge_item.last_name && `${judge_item.last_name} `}</p>
                                                            <p>{judge_item.first_name && `${judge_item.first_name} `}
                                                                {judge_item.second_name}
                                                                {judge_item.owner_alias && judgeIcon}
                                                                {judge_item.all_breeder &&
                                                                    allbreedJudgeIcon
                                                                }
                                                            </p>
                                                        </Link>
                                                        :
                                                        <span className="judge-item__name-rus">
                                                            <p>{judge_item.last_name && `${judge_item.last_name} `}</p>
                                                            <p>{judge_item.first_name && `${judge_item.first_name} `}
                                                                {judge_item.second_name}
                                                                {judge_item.owner_alias && judgeIcon}
                                                                {judge_item.all_breeder &&
                                                                    allbreedJudgeIcon
                                                                }
                                                            </p>
                                                        </span>
                                                    }
                                                    <span className="judge-item__name-eng">
                                                        {judge_item.last_name_lat}
                                                        {judge_item.first_name_lat ? ' ' + judge_item.first_name_lat : ''}
                                                    </span>
                                                    <span className="judge-item__cert-number">
                                                        Лист судьи №{judge_item.cert_number}
                                                    </span>
                                                </div>
                                                <div className="judge-item__info">
                                                    <span>
                                                        {judge_item.city_name}
                                                    </span>
                                                    <div className="judge-item__checkbox-wrap">
                                                        <input type="checkbox"
                                                               className={`judge-item__checkbox${(judge_item.is_invited || 
                                                                   judgeSent.includes(judge_item.id || judgeIds.map(item=>item))) ?
                                                                       '__disabled'
                                                                       :
                                                                       ''}`}
                                                               id={judge_item.id}
                                                               onChange={() => onChange(judge_item.id)}
                                                               disabled={judge_item.is_invited ||
                                                                   judgeSent.includes(judge_item.id || judgeIds.map(item=>item)) ||
                                                                   false}
                                                               checked={judge_item.is_invited ? true : null}
                                                        />
                                                        <label htmlFor={judge_item.id}></label>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </li>
                                )}
                            </ul>
                            <Button
                                primary={true}
                                disabled={judgeIds.length === 0}
                                onClick={handleSubmit}
                            >
                                Выбрать
                            </Button>
                        </> :
                        <p>Подходящих судей не найдено</p>
                    }
                </Modal>
            }
        </>
    )
};

export default React.memo(ExhibitionInfo);
