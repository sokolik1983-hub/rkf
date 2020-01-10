import React, {useEffect, useState} from "react";
import {useDictionary, getDictElementsArray} from "../../../../apps/Dictionaries";
import {
    getLocalizedWeekDay,
    transformDateSafariFriendly,
    timeSecondsCutter
} from "../../../../utils/datetime";
import {Request} from "../../../../utils/request";
import './index.scss';


const ExhibitionInfo = ({city, id, dates, address, rank_types, breed_types, exhibition_avatar_link, description}) => {
    const [schedule, setSchedule] = useState(null);
    const [catalog, setCatalog] = useState(null);
    const [documents, setDocuments] = useState(null);
    const {dictionary: rankDictionary} = useDictionary('rank_type');
    const {dictionary: breedDictionary} = useDictionary('breed_types');
    const rankTypes = getDictElementsArray(rankDictionary, rank_types);
    const breedTypes = getDictElementsArray(breedDictionary, breed_types);
    const timeStart = dates && dates[0].time_start;
    const avatarLink = exhibition_avatar_link ? exhibition_avatar_link : '/static/images/exhibitions/default.png';

    useEffect(() => {
        (() => Request({url: `/api/exhibitions/ExhibitionScheduleLink?id=${id}`}, data => setSchedule(data)))();
        (() => Request({url: `/api/exhibitions/ExhibitionCatalogLink?id=${id}`}, data => setCatalog(data)))();
        (() => Request({url: `/api/exhibitions/ExhibitionDocument/${id}`}, data => setDocuments(data)))();
    }, [id]);

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
                    </tbody>
                </table>
            </div>
            <div className="exhibition-info__left">
                <img src={avatarLink} alt="" className="exhibition-info__img"/>
                {description &&
                    <div className="exhibition-page__description">
                        <h3 className="exhibition-page__description-title">Описание</h3>
                        <p dangerouslySetInnerHTML={{__html: description}} />
                    </div>
                }
                {schedule &&
                    <div className="exhibition-page__schedule">
                        <h3 className="exhibition-page__schedule-title">Расписание</h3>
                        <p className="exhibition-documents__doc" key={schedule.id}>
                            <a href={schedule.url} target="__blank">{schedule.name}</a>
                        </p>
                    </div>
                }
                {catalog &&
                    <div className="exhibition-page__catalog">
                        <h3 className="exhibition-page__catalog-title">Каталог</h3>
                        <p className="exhibition-documents__doc" key={catalog.id}>
                            <a href={catalog.url} target="__blank">{catalog.name}</a>
                        </p>
                    </div>
                }
                {documents && !!documents.length &&
                    <div className="exhibition-page__documents">
                        <h3 className="exhibition-page__documents-title">Документы</h3>
                        {documents.map(doc => (
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