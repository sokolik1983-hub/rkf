import React, { useEffect, useState } from "react";
import Card from "../../../../components/Card";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import CountDown from "../../../../components/CountDown";
import PropertyP from "../../../../components/PropertyP";
import declension from "../../../../utils/declension";
import { Request } from "../../../../utils/request";
import { blockContent } from "../../../../utils/blockContent";
import { getLocalizedWeekDay, timeSecondsCutter, transformDateSafariFriendly } from "../../../../utils/datetime";
import { getDictElementsArray, useDictionary } from "../../../../dictionaries";

import "./index.scss";


const ExhibitionInfo = ({
    breed_types,
    canEdit,
    catalog_link,
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
    schedule_link,
}) => {
    const [judge, setJudge] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { dictionary: rankDictionary } = useDictionary('rank_type');
    const { dictionary: breedDictionary } = useDictionary('breed_types');
    const rankTypes = getDictElementsArray(rankDictionary, rank_types);
    const breedTypes = getDictElementsArray(breedDictionary, breed_types);

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
                            Подобрать судью
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
                        <p dangerouslySetInnerHTML={{ __html: description }} /> :
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
            {/*блок закоментирован по просьбе аналитика, по макету*/}
            {showModal &&
                <Modal showModal={showModal}
                       handleClose={() =>setShowModal(false)}
                       handleX={() => {setShowModal(false)}}
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
                                    <li key={data.id}>
                                        <span>
                                            №{data.cert_number}
                                        </span>
                                        <span>
                                            {data.last_name && `${data.last_name} `}
                                            {data.first_name && `${data.first_name} `}
                                            {data.second_name}
                                        </span>
                                        <span>
                                            {data.city_name}
                                        </span>
                                        <span>
                                            {data.all_breeder &&
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_2219_2838)">
                                                        <path d="M10 8.74758C10 8.74758 5.33984 8.56635 5.33984 14.4952C5.33984 18.534 8.21363 15.5825 10 15.5825" fill="#72839C"/>
                                                        <path d="M10 8.74758C10 8.74758 14.6602 8.56635 14.6602 14.4952C14.6602 18.534 11.7864 15.5825 10 15.5825" fill="#72839C"/>
                                                        <path d="M7.78245 7.86058C8.65205 7.79263 9.27212 6.65123 9.16742 5.31119C9.06271 3.97115 8.27289 2.93992 7.40329 3.00786C6.53369 3.07581 5.91361 4.21721 6.01832 5.55725C6.12302 6.89729 6.91285 7.92852 7.78245 7.86058Z" fill="#72839C"/>
                                                        <path d="M4.29515 10.1055C5.06869 9.84864 5.37435 8.67234 4.97787 7.47811C4.58138 6.28387 3.63289 5.52394 2.85935 5.78076C2.08582 6.03757 1.78015 7.21388 2.17664 8.40811C2.57312 9.60234 3.52161 10.3623 4.29515 10.1055Z" fill="#72839C"/>
                                                        <path d="M13.983 5.54655C14.0877 4.20651 13.4676 3.06511 12.598 2.99717C11.7284 2.92922 10.9386 3.96046 10.8339 5.3005C10.7292 6.64054 11.3492 7.78193 12.2188 7.84988C13.0884 7.91782 13.8783 6.88659 13.983 5.54655Z" fill="#72839C"/>
                                                        <path d="M17.8208 8.41997C18.2172 7.22573 17.9116 6.04943 17.138 5.79261C16.3645 5.5358 15.416 6.29573 15.0195 7.48996C14.623 8.6842 14.9287 9.8605 15.7022 10.1173C16.4758 10.3741 17.4243 9.6142 17.8208 8.41997Z" fill="#72839C"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_2219_2838">
                                                            <rect width="16" height="13.6181" fill="white" transform="translate(2 3)"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            }
                                        </span>
                                    </li>
                                )}
                            </ul>
                            <Button primary={true}>         // кнопка скрыто до появления соответствующего функционала
                                Выбрать
                            </Button>
                        </>:
                        <p>Подходящих судей не найдено</p>
                    }
                </Modal>
            }
        </>
    )
};

export default React.memo(ExhibitionInfo);
