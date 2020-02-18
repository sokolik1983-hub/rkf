import React from "react";
import { useDictionary, getDictElementsArray } from "../../../../apps/Dictionaries";
import {
    getLocalizedWeekDay,
    transformDateSafariFriendly,
    timeSecondsCutter
} from "../../../../utils/datetime";
import CountDown from 'components/CountDown';
import Card from 'components/Card';
import './index.scss';


const ExhibitionInfo = ({ city, dates, address, rank_types, breed_types, exhibition_avatar_link, description, documents_links, schedule_link, catalog_link }) => {
    const { dictionary: rankDictionary } = useDictionary('rank_type');
    const { dictionary: breedDictionary } = useDictionary('breed_types');
    const rankTypes = getDictElementsArray(rankDictionary, rank_types);
    const breedTypes = getDictElementsArray(breedDictionary, breed_types);
    const timeStart = dates && dates[0].time_start;
    const avatarLink = exhibition_avatar_link ? exhibition_avatar_link : '/static/images/exhibitions/default.png';

    return (
        <div className="exhibition-info">
            <div className="exhibition-info__right">
                {dates &&
                    <>
                        <div className="exhibition-info__dates">
                            {dates.map((date, i) => (
                                <p key={i} className="exhibition-info__date">
                                    {`${getLocalizedWeekDay(transformDateSafariFriendly(date))}, ${date.day < 10 ? '0' + date.day : date.day}.${date.month < 10 ? '0' + date.month : date.month}.${date.year}`}
                                </p>
                            ))}
                        </div>
                        {timeStart &&
                            <p className="exhibition-info__time">Начало в {timeSecondsCutter(timeStart)} по МСК</p>
                        }
                    </>
                }
                {city && <p className="exhibition-info__address">{`г. ${city}${address ? ', ' + address : ''}`}</p>}
                <table className="exhibition-info__table">
                    <tbody>
                        {rankTypes && !!rankTypes.length && <tr>
                            <td>Ранг:</td>
                            <td>{rankTypes.join(', ')}</td>
                        </tr>}
                        {breedTypes && !!breedTypes.length && <tr>
                            <td>Породы:</td>
                            <td>{breedTypes.join(', ')}</td>
                        </tr>}

                        <tr>
                            <td colspan="2">
                                <Card className="exhibition-info__block">
                                    <h4>Информация о мероприятии</h4>
                                    <a href="/">Расписание</a> <br />
                                    <a href="/">Судьи</a> <br />
                                    <a href="/">Другие мероприятия организатора</a> <br />
                                    <a href="/">Платные услуги</a> <br />
                                    <div className="exhibition-info__block-countdown">
                                        <CountDown />
                                        <div className="exhibition-info__block-button">
                                            <button className="btn btn-simple">Принять участие</button>
                                        </div>
                                    </div>
                                </Card>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="exhibition-info__left">
                <img src={avatarLink} alt="" className="exhibition-info__img" />
                {description &&
                    <div className="exhibition-page__description">
                        <h3 className="exhibition-page__description-title">Описание</h3>
                        <p dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
                }
                {schedule_link &&
                    <div className="exhibition-page__schedule">
                        <h3 className="exhibition-page__schedule-title">Расписание</h3>
                        <p className="exhibition-documents__doc">
                            <a href={schedule_link.url} target="__blank">{schedule_link.name}</a>
                        </p>
                    </div>
                }
                {catalog_link &&
                    <div className="exhibition-page__catalog">
                        <h3 className="exhibition-page__catalog-title">Каталог</h3>
                        <p className="exhibition-documents__doc">
                            <a href={catalog_link.url} target="__blank">{catalog_link.name}</a>
                        </p>
                    </div>
                }
                {documents_links && !!documents_links.length &&
                    <div className="exhibition-page__documents">
                        <h3 className="exhibition-page__documents-title">Документы</h3>
                        {documents_links.map(doc => (
                            <p className="exhibition-documents__doc" key={doc.id}>
                                <a href={doc.url} target="__blank">{doc.name}</a>
                            </p>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
};

export default React.memo(ExhibitionInfo);