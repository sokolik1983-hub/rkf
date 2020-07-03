import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Alert from "../../../../components/Alert";
import {formatDateCommon} from "../../../../utils/datetime";
import './styles.scss';


const ExhibitionCard = ({ club_name, id, city_name, exhibition_name, exhibition_picture_link, date, date_end, user_type, ranks }) => {
    // const [shareAlert, setShareAlert] = useState(false);
    const ranksString = ranks && ranks.length ? ranks.map(rank => rank.name).join(', ') : 'Не указан';

    // const shareLink = () => {
    //     navigator.clipboard.writeText(`https://rkf.online/exhibitions/${id}`);
    //     setShareAlert(true);
    // };

    return (
        <div className="ExhibitionCard">
            <div className="ExhibitionCard__image" style={{ background: `url(${exhibition_picture_link ? exhibition_picture_link : '/static/images/exhibitions/default.png'}) center center/cover no-repeat` }} />
            <div className="ExhibitionCard__content">
                <div className="ExhibitionCard__info">
                    <Link className="ExhibitionCard__link" to={`/exhibitions/${id}`} title={exhibition_name}>{exhibition_name}</Link>
                    <p className="ExhibitionCard__info-item">
                        <span>Организатор:</span>
                        <span title={club_name}>
                            {(user_type === 3 || user_type === 4 || user_type === 5) &&
                                <>
                                    <span style={{color: '#72839c'}}>{user_type === 3 ? 'Клуб' : user_type === 4 ? 'Питомник' : user_type === 5 ? 'Федерация' : ''}</span>
                                    &nbsp;
                                </>
                            }
                            {club_name}
                        </span>
                    </p>
                    <p className="ExhibitionCard__info-item _date">
                        <span>Дата:</span>
                        <span>
                            {date === date_end ?
                                formatDateCommon(new Date(date)) :
                                `${formatDateCommon(new Date(date))} - ${formatDateCommon(new Date(date_end))}`
                            }
                        </span>
                    </p>
                    <p className="ExhibitionCard__info-item">
                        <span>Ранг:</span>
                        <span title={ranksString}>{ranksString}</span>
                    </p>
                    <p className="ExhibitionCard__info-item">
                        <span>Город:</span>
                        <span title={city_name}>{city_name}</span>
                    </p>
                </div>
                <div className="ExhibitionCard__controls">
                    <Link className="ExhibitionCard__show-all" to={`/exhibitions/${id}`}>Подробнее...</Link>
                    {/*<span className="ExhibitionCard__share" onClick={shareLink}>Поделиться</span>*/}
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

export default ExhibitionCard;