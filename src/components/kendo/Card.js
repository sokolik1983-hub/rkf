
import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardBody, CardImage, CardActions } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { DEFAULT_IMG } from "appConfig";
import { formatDateCommon } from "utils/datetime";
import './Card.scss';

const KendoCard = ({ club_name, id, city_name, exhibition_name, exhibition_picture_link, date, date_end, ranks, user_type }) => {
    const history = useHistory();
    const ranksString = ranks && ranks.length ? ranks.map(rank => rank.name).join(', ') : 'Не указан';

    const handleClick = () => {
        history.push(`/exhibitions/${id}`);
    };

    return (
        <Card className="KendoCard">
            <CardImage src={exhibition_picture_link ? exhibition_picture_link : DEFAULT_IMG.exhibitionPicture} style={{ objectFit: 'cover', height: '207px' }} />
            <div>
                <CardHeader>
                    <CardTitle>
                        <Link className="KendoCard__link" to={`/exhibitions/${id}`}>{exhibition_name}</Link>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <div className="KendoCard__line" title={club_name}>
                        {(user_type === 3 || user_type === 4 || user_type === 5) &&
                            <>
                                <span>{user_type === 3 ? 'Клуб' : user_type === 4 ? 'Питомник' : user_type === 5 ? 'Федерация' : ''}</span>&nbsp;
                                </>
                        }
                        <span>{club_name}</span>
                    </div>
                    <div className="KendoCard__line">
                        <span>Дата</span>&nbsp;
                        <span>{date === date_end ?
                            formatDateCommon(new Date(date)) :
                            `${formatDateCommon(new Date(date))} - ${formatDateCommon(new Date(date_end))}`
                        }</span>
                    </div>
                    <div className="KendoCard__line" >
                        <span>Ранг</span>&nbsp;
                        <span title={ranksString}>{ranksString}</span>
                    </div>
                    <div className="KendoCard__line" >
                        <span>Город</span>&nbsp;
                        <span title={city_name}>{city_name}</span>
                    </div>
                </CardBody>
                <CardActions>
                    <Button className="KendoCard__button" onClick={handleClick}>Подробнее</Button>
                </CardActions>
            </div>
        </Card>
    );
}

export default KendoCard;