import React, {useEffect, useState} from "react";
import Tabs, {TabContent} from "../../../../components/Tabs";
import {useDictionary, getDictElementsArray} from "../../../../apps/Dictionaries";
import {
    getLocalizedWeekDay,
    transformDateSafariFriendly,
    timeSecondsCutter,
    formatDateWithLocaleString,
    transformDate
} from "../../../../utils/datetime";
import {Request} from "../../../../utils/request";
import './index.scss';


const ExhibitionInfo = ({city, id, dates, address, rank_types, breed_types, exhibition_avatar_link, description}) => {
    const [schedule, setSchedule] = useState(null);
    const [documents, setDocuments] = useState(null);
    const {dictionary: rankDictionary} = useDictionary('rank_type');
    const {dictionary: breedDictionary} = useDictionary('breed_types');
    const rankTypes = getDictElementsArray(rankDictionary, rank_types);
    const breedTypes = getDictElementsArray(breedDictionary, breed_types);
    const timeStart = dates && dates[0].time_start;
    const avatarLink = exhibition_avatar_link ? exhibition_avatar_link : '/static/images/exhibitions/default.png';

    useEffect(() => {
        (() => Request({url: `/api/Schedule/${id}`}, data => setSchedule(data)))();
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
                                    `${getLocalizedWeekDay(transformDateSafariFriendly(date))}, ${date.day}.${date.month}.${date.year}`
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
                <Tabs>
                    <TabContent label="Описание">
                        {description && <p dangerouslySetInnerHTML={{__html: description}} />}
                    </TabContent>
                    <TabContent label="Расписание">
                        {schedule && !!schedule.length && schedule.map((item, i) => (
                            <div key={item.id} className="exhibition-schedule">
                                <p className="exhibition-schedule__date">
                                    <span>{i + 1} день:</span>
                                    &nbsp;
                                    {formatDateWithLocaleString(transformDate({
                                        year: item.year,
                                        month: item.month,
                                        day: item.day
                                    }))}
                                </p>
                                {!!item.items.length && item.items.map(event => (
                                    <p key={event.id} className="exhibition-schedule__event">
                                        {`${timeSecondsCutter(event.time_start)}-${timeSecondsCutter(event.time_end)} ${event.name}`}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </TabContent>
                    <TabContent label="Документы">
                        {documents && !!documents.length && documents.map(doc => (
                            <p className="exhibition-documents__doc" key={doc.id}>
                                <a href={doc.url} target="__blank">{doc.name}</a>
                            </p>
                        ))}
                    </TabContent>
                </Tabs>
            </div>
        </div>
    )
};

export default React.memo(ExhibitionInfo);