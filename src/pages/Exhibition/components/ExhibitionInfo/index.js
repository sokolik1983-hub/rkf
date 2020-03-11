import React, {/*useState*/} from "react";
// import {Link} from "react-router-dom";
import {useDictionary, getDictElementsArray} from "../../../../apps/Dictionaries";
import {getLocalizedWeekDay, transformDateSafariFriendly, timeSecondsCutter} from "../../../../utils/datetime";
import CountDown from "../../../../components/CountDown";
// import Alert from "../../../../components/Alert";
import Card from "../../../../components/Card";
import declension from "../../../../utils/declension";
import "./index.scss";


const ExhibitionInfo = ({
                            city,
                            dateStart,
                            dateEnd,
                            reportsDateEnd,
                            dates,
                            address,
                            rank_types,
                            breed_types,
                            description,
                            documents_links,
                            schedule_link,
                            catalog_link,
                            reports_link
}) => {
    const {dictionary: rankDictionary} = useDictionary('rank_type');
    const {dictionary: breedDictionary} = useDictionary('breed_types');
    const rankTypes = getDictElementsArray(rankDictionary, rank_types);
    const breedTypes = getDictElementsArray(breedDictionary, breed_types);

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
            <Card className="exhibition-info">
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
                    {city && <p className="exhibition-info__address">{`г. ${city}${address ? ', ' + address : ''}`}</p>}
                    <table className="exhibition-info__table">
                        <tbody>
                            {rankTypes && !!rankTypes.length && <tr>
                                <td>Ранг:</td>
                                <td>{rankTypes.join(', ')}</td>
                            </tr>}
                            {breedTypes && !!breedTypes.length && <tr>
                                <td>Породы:</td>
                                <td>{resolveBreeds(rankTypes, breedTypes)}</td>
                            </tr>}
                        </tbody>
                    </table>
                </div>
                <div className="exhibition-info__right">
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
            <Card className="exhibition-info">
                <div className="exhibition-page__description">
                    <h4 className="exhibition-page__description-title">Описание</h4>
                    {description ?
                        <p dangerouslySetInnerHTML={{ __html: description }} /> :
                        <p>Описание отсутствует</p>
                    }
                </div>
            </Card>
            <Card className="exhibition-info">
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
            </Card>
            <Card className="exhibition-info">
                <div className="exhibition-page__documents">
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
        </>
    )
};

export default React.memo(ExhibitionInfo);
