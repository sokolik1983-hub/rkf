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
                            comments,
                            dateEnd,
                            dateStart,
                            dates,
                            description,
                            documents_links,
                            exhibitionId,
                            judges,
                            national_breed_club_name,
                            rank_types,
                            reportsDateEnd,
                            reports_link,
                        }) => {
    const [judge, setJudge] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const {dictionary: rankDictionary} = useDictionary('rank_type');
    const {dictionary: breedDictionary} = useDictionary('breed_types');
    const rankTypes = getDictElementsArray(rankDictionary, rank_types);
    const breedTypes = getDictElementsArray(breedDictionary, breed_types);
    const isMobile = useIsMobile(990);

    useEffect(() => {
        if (showModal) {
            blockContent(true);
        } else {
            blockContent(false);
        }
    }, [showModal]);

    const getJudgeList = async () => {
        await Request({
                url: `/api/exhibitions/common/relevant_judges?id=${exhibitionId}`,
            },
            data => setJudge(data),
            error => console.log(error));
    };

    const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

    // костыль, а че делать?
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
            <Card className="exhibition-info two main-info">
                <div className="exhibition-info__left">
                    <h4 className="exhibition-info__title">Информация о мероприятии</h4>
                    {dates &&
                        <>
                            <h5 className="exhibition-info__subtitle">{`${declension(dates.length, ['Дата', 'Даты', 'Даты'])} проведения:`}</h5>
                            <div className="exhibition-info__dates">
                                {dates.map((date, i) => (
                                    <p key={i} className="exhibition-info__date">
                                        {`${capitalizeFirstLetter(getLocalizedWeekDay(transformDateSafariFriendly(date)))}, ${date.day < 10 ? '0' + date.day : date.day}.${date.month < 10 ? '0' + date.month : date.month}.${date.year}${date.time_start ? ' c ' + timeSecondsCutter(date.time_start) : ''}${date.time_end ? ' до ' + timeSecondsCutter(date.time_end) + ' по МСК' : ''}`}
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
                </div>
                <div className={reports_link.length ? 'exhibition-info__right reports' : 'exhibition-info__right'}>
                    {dates && !!dates.length &&
                        <CountDown
                            startDate={dateStart}
                            endDate={dateEnd}
                            reportsDateEnd={reportsDateEnd}
                            reportsLinks={reports_link}
                        />
                    }
                </div>
            </Card>
            <Card className="exhibition-info two">
                <div className="exhibition-page__description">
                    <h4 className="exhibition-page__description-title">Судьи</h4>
                    {judges && <p>{judges}</p>}
                    {canEdit &&
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
                <div className="exhibition-page__description">
                    <h4 className="exhibition-page__description-title">Комментарий</h4>
                    {comments && <p>{comments}</p>}
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
            {/*блок закоментирован по просьбе аналитика, по макету*/}
            {/*            <Card className="exhibition-info">
                <div className="exhibition-page__schedule">
                    <h4 className="exhibition-page__schedule-title">Расписание</h4>
                    <p className="exhibition-documents__doc">
                        {schedule_link ?
                            <a href={schedule_link.url} target="__blank">{schedule_link.name}</a> :
                            'Расписание отсутствует'
                        }
                    </p>
                </div>
            </Card>
            <Card className="exhibition-info">
                <div className="exhibition-page__catalog">
                    <h4 className="exhibition-page__catalog-title">Каталог</h4>
                    <p className="exhibition-documents__doc">
                        {catalog_link ?
                            <a href={catalog_link.url} target="__blank">{catalog_link.name}</a> :
                            'Каталог отсутствует'
                        }
                    </p>
                </div>
            </Card>*/}
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
                                {judge.map(data =>
                                    <li key={data.id} className="exhibition-page__judge-item judge-item">
                                        {!isMobile ?
                                            <div className="judge-item__wrap">
                                                <div className="judge-item__name">
                                                    {data.owner_alias ?
                                                        <Link
                                                            className="judge-item__name-rus"
                                                            to={`/user/${data.owner_alias}`}
                                                        >
                                                            <p>{data.last_name && `${data.last_name} `}</p>
                                                            <p>{data.first_name && `${data.first_name} `}
                                                                {data.second_name}
                                                                {data.owner_alias && judgeIcon}
                                                                {data.all_breeder &&
                                                                    allbreedJudgeIcon
                                                                }
                                                            </p>
                                                        </Link>
                                                        :
                                                        <span className="judge-item__name-rus">
                                                            <p>{data.last_name && `${data.last_name} `}</p>
                                                            <p>{data.first_name && `${data.first_name} `}
                                                                {data.second_name}
                                                                {data.owner_alias && judgeIcon}
                                                                {data.all_breeder &&
                                                                    allbreedJudgeIcon
                                                                }
                                                            </p>
                                                        </span>
                                                    }
                                                    <span className="judge-item__name-eng">
                                                        {data.last_name_lat}{data.first_name_lat ? ' ' + data.first_name_lat : ''}
                                                    </span>
                                                    <span className="judge-item__cert-number">
                                                        Лист судьи №{data.cert_number}
                                                    </span>
                                                </div>
                                                <div className="judge-item__info">
                                                    <span>
                                                        Город:
                                                        <p>{data.city_name}</p>
                                                    </span>
                                                    <span>
                                                        Телефон:
                                                        <p>{data.phone}</p>
                                                    </span>
                                                    <span>
                                                        E-mail:
                                                        <p>{data.email}</p>
                                                    </span>
                                                </div>
                                                <div className="judge-item__checkbox-wrap">
                                                    <input type="checkbox"
                                                           className="judge-item__checkbox"
                                                           id={data.id}
                                                    />
                                                    <label htmlFor={data.id}></label>
                                                </div>
                                            </div>
                                            :
                                            <div className="judge-item__wrap">
                                                <div className="judge-item__name">
                                                    {data.owner_alias ?
                                                        <Link
                                                            className="judge-item__name-rus"
                                                            to={`/user/${data.owner_alias}`}>

                                                            <p>{data.last_name && `${data.last_name} `}</p>
                                                            <p>{data.first_name && `${data.first_name} `}
                                                                {data.second_name}
                                                                {data.owner_alias && judgeIcon}
                                                                {data.all_breeder &&
                                                                    allbreedJudgeIcon
                                                                }
                                                            </p>
                                                        </Link>
                                                        :
                                                        <span className="judge-item__name-rus">
                                                            <p>{data.last_name && `${data.last_name} `}</p>
                                                            <p>{data.first_name && `${data.first_name} `}
                                                                {data.second_name}
                                                                {data.owner_alias && judgeIcon}
                                                                {data.all_breeder &&
                                                                    allbreedJudgeIcon
                                                                }
                                                            </p>
                                                        </span>
                                                    }
                                                    <span className="judge-item__name-eng">
                                                        {data.last_name_lat}{data.first_name_lat ? ' ' + data.first_name_lat : ''}
                                                    </span>
                                                    <span className="judge-item__cert-number">
                                                        Лист судьи №{data.cert_number}
                                                    </span>
                                                </div>
                                                <div className="judge-item__info">
                                                    <span>
                                                        {data.city_name}
                                                    </span>
                                                    <div className="judge-item__checkbox-wrap">
                                                        <input type="checkbox"
                                                               className="judge-item__checkbox"
                                                               id={data.id}
                                                        />
                                                        <label htmlFor={data.id}></label>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </li>
                                )}
                            </ul>
                            {/*Кнопка закомментирована дл появления функционала*/}
                            {/*<Button*/}
                            {/*    primary={true}*/}
                            {/*>*/}
                            {/*    Выбрать*/}
                            {/*</Button>*/}
                        </> :
                        <p>Подходящих судей не найдено</p>
                    }
                </Modal>
            }
        </>
    )
};

export default React.memo(ExhibitionInfo);
