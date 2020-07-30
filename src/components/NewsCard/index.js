import React, {useState} from "react";
import {Link} from "react-router-dom";
import Card from "../Card";
import Alert from "../Alert";
import {getLocalizedMonth} from "../../utils/datetime";
import {formatText} from "../../utils";
import {DEFAULT_IMG} from "../../appConfig";
import "./index.scss";
import Share from "components/Share";


const NewsCard = ({user_type, id, name, fact_city_name, create_date, alias, logo_link, picture_link, content, canEdit, onDelete}) => {
    const [shareAlert, setShareAlert] = useState(false);

    const shareLink = () => {
        navigator.clipboard.writeText(`https://rkf.online/news/${id}`);
        setShareAlert(true);
    };

    return (
        <Card className="news-card">
            {picture_link &&
                <Link to={`/news/${id}`} className="news-card__photo" style={{backgroundImage: `url(${picture_link})`}}/>
            }
            <div className="news-card__content">
                <div className="news-card__head">
                    <Link to={alias} className="news-card__club">
                        <div className="news-card__club-logo" style={{
                            background: `url(${logo_link
                                ? logo_link
                                : DEFAULT_IMG.clubAvatar}) center center/cover no-repeat`
                        }}/>
                        <div className="news-card__club-info">
                            <p className="news-card__club-name">
                                {(user_type === 3 || user_type === 4 || user_type === 5) &&
                                <>
                                    <span>{user_type === 3 ? 'Клуб' : user_type === 4 ? 'Питомник' : user_type === 5 ? 'Федерация' : ''}</span>
                                    &nbsp;
                                </>
                                }
                                {name}
                            </p>
                            <p className="news-card__date">
                                {`${new Date(create_date).getDate()} ${getLocalizedMonth(new Date(create_date))} ${new Date(create_date).getFullYear()}`}
                            </p>
                        </div>
                    </Link>
                    {fact_city_name &&
                    <p className="news-card__city">
                        {fact_city_name}
                    </p>
                    }
                    {canEdit && <button className="news-card__delete" onClick={() => onDelete(id)} title="Удалить"/>}
                </div>
                <div className="news-card__body">
                    <p className="news-card__text" dangerouslySetInnerHTML={{ __html: formatText(content) }} />
                    <div className="news-card__controls">
                        <Link to={`/news/${id}`} className="news-card__show-all">Подробнее...</Link>
                        <Share url={`https://rkf.online/news/${id}`} />
                    </div>
                </div>
            </div>
            {shareAlert &&
                <Alert
                    title="Поделиться"
                    text="Ссылка скопирована в буфер обмена"
                    autoclose={1.5}
                    onOk={() => setShareAlert(false)}
                />
            }
        </Card>
    )
};

export default React.memo(NewsCard);
