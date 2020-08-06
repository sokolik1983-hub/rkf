import React from "react";
import {Link} from "react-router-dom";
import {formatDateCommon} from "../../utils/datetime";
import {DEFAULT_IMG} from "../../appConfig";
import "./index.scss";


const ExhibitionCard = ({club_name, id, city_name, exhibition_name, exhibition_picture_link, date, date_end, ranks, user_type}) => {
    // const [shareAlert, setShareAlert] = useState(false);
    const ranksString = ranks && ranks.length ? ranks.map(rank => rank.name).join(', ') : 'Не указан';

    // const shareLink = () => {
    //     navigator.clipboard.writeText(`https://rkf.online/exhibitions/${id}`);
    //     setShareAlert(true);
    // };

    return (
        <div className="exhibition-card">
            <div className="exhibition-card__image"
                 style={{background: `url(${exhibition_picture_link
                         ? exhibition_picture_link
                         : DEFAULT_IMG.exhibitionPicture}) center center/cover no-repeat`}}
            />
            <div className="exhibition-card__content">
                <div className="exhibition-card__info">
                    <Link className="exhibition-card__link" to={`/exhibitions/${id}`}>{exhibition_name}</Link>
                    <p className="exhibition-card__info-item">
                        {/* <span>Организатор:</span> */}
                        <span title={club_name} style={{color: '#253c5e',fontSize:'14px'}}>
                            {(user_type === 3 || user_type === 4 || user_type === 5) &&
                                <>
                                    <span style={{color: '#72839c',fontSize:'14px'}}>{user_type === 3 ? 'Клуб' : user_type === 4 ? 'Питомник' : user_type === 5 ? 'Федерация' : ''}</span>
                                    &nbsp;
                                </>
                            }
                            {club_name}
                        </span>
                    </p>
                    <p className="exhibition-card__info-item _date">
                        <span>Дата</span>
                        <span>
                            {date === date_end ?
                                formatDateCommon(new Date(date)) :
                                `${formatDateCommon(new Date(date))} - ${formatDateCommon(new Date(date_end))}`
                            }
                        </span>
                    </p>
                    <p className="exhibition-card__info-item">
                        <span>Ранг</span>
                        <span title={ranksString}>{ranksString}</span>
                    </p>
                    <p className="exhibition-card__info-item">
                        <span>Город</span>
                        <span title={city_name}>{city_name}</span>
                    </p>
                </div>
                <div className="exhibition-card__controls">
                    <Link className="exhibition-card__button" to={`/exhibitions/${id}`}>Подробнее</Link>
                    {/* <Link className="exhibition-card__show-all" to={`/exhibitions/${id}`}>Подробнее...</Link> */}
                    {/*<span className="exhibition-card__share" onClick={shareLink}>Поделиться</span>*/}
                </div>
            </div>
            {/*shareAlert &&
                <Alert
                    title="Поделиться"
                    text="Ссылка скопирована в буфер обмена"
                    autoclose={1.5}
                    onOk={() => setShareAlert(false)}
                />
            */}
        </div>
    )
};

export default React.memo(ExhibitionCard);