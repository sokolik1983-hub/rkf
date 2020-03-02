import React, {useState} from "react";
import {useDictionary, getDictElementsArray} from "../../../../apps/Dictionaries";
import {getLocalizedWeekDay, transformDateSafariFriendly, timeSecondsCutter} from "../../../../utils/datetime";
import CountDown from "../../../../components/CountDown";
import Alert from "../../../../components/Alert";
import { DEFAULT_IMG } from "../../../../appConfig";
import declension from "../../../../utils/declension";
import "./index.scss";
import {Link} from "react-router-dom";


const ExhibitionInfo = ({city, dateStart, dateEnd, dates, address, rank_types, breed_types, exhibition_avatar_link, description, documents_links, schedule_link, catalog_link, club_information}) => {
    const [showAlert, setShowAlert] = useState(false);
    const { dictionary: rankDictionary } = useDictionary('rank_type');
    const { dictionary: breedDictionary } = useDictionary('breed_types');
    const rankTypes = getDictElementsArray(rankDictionary, rank_types);
    const breedTypes = getDictElementsArray(breedDictionary, breed_types);
    const timeStart = dates && dates[0].time_start;
    const avatarLink = exhibition_avatar_link ? exhibition_avatar_link : DEFAULT_IMG.exhibitionPicture;

    const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

    const clickOnLink = e => {
        e.preventDefault();
        setShowAlert(true);
    };

    return (
        <div className="exhibition-info">
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
            <div className="exhibition-info__right">
                <h4 className="exhibition-info__title">Информация о мероприятии</h4>
                {dates &&
                    <>
                        <h5 className="exhibition-info__subtitle">{`${declension(dates.length, ['Дата', 'Даты', 'Даты'])} проведения:`}</h5>
                        <div className="exhibition-info__dates">
                            {dates.map((date, i) => (
                                <p key={i} className="exhibition-info__date">
                                    {`${capitalizeFirstLetter(getLocalizedWeekDay(transformDateSafariFriendly(date)))}, ${date.day < 10 ? '0' + date.day : date.day}.${date.month < 10 ? '0' + date.month : date.month}.${date.year}`}
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
                <ul className="exhibition-info__block-list">
                    <li className="exhibition-info__block-item not-active">
                        <a href="/" onClick={clickOnLink}>Судьи</a>
                    </li>
                    <li className="exhibition-info__block-item">
                        <Link to={`/exhibitions?Alias=${club_information.club_alias}`}>Другие мероприятия организатора</Link>
                    </li>
                    <li className="exhibition-info__block-item not-active">
                        <a href="/" onClick={clickOnLink}>Платные услуги</a>
                    </li>
                </ul>
                {dates && !!dates.length &&
                    <CountDown startDate={dateStart} endDate={dateEnd} />
                }
                {showAlert &&
                    <Alert
                        title="Внимание!"
                        text="Раздел находится в разработке."
                        autoclose={1.5}
                        onOk={() => setShowAlert(false)}
                    />
                }
            </div>
        </div>
    )
};

export default React.memo(ExhibitionInfo);
