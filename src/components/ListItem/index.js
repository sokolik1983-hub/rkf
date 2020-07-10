import React, {useState} from "react";
import {Link} from "react-router-dom";
import Alert from "../Alert";
import {formatText} from "../../utils";
import {formatDateTime} from "../../utils/datetime";
import {DEFAULT_IMG} from "../../appConfig";
import "./index.scss";
import Share from "components/Share";


const ListItem = ({ user, id, club_name, city, date, logo_link, photo, text, url, removable, onDelete }) => {
    const [shareAlert, setShareAlert] = useState(false);

    const shareLink = () => {
        navigator.clipboard.writeText(`https://rkf.online${url}`);
        setShareAlert(true);
    };

    return (
        <div className="list-item__wrap">
            {photo && <Link to={url} className="list-item__photo" style={{ backgroundImage: `url(${photo})` }} />}
            <div className="list-item__content">
                <div className="list-item__head">
                    <div className="list-item__head-info">
                        <div className="list-item__club">
                            <div className="list-item__club-logo" style={{
                                background: `url(${logo_link
                                    ? logo_link
                                    : DEFAULT_IMG.clubAvatar}) center center/cover no-repeat`
                            }} />
                            <span className="list-item__club-name">
                                <h4>
                                    {(user === 3 || user === 4 || user === 5) &&
                                    <>
                                        <span>{user === 3 ? 'Клуб' : user === 4 ? 'Питомник' : user === 5 ? 'Федерация' : ''}</span>
                                        &nbsp;
                                    </>
                                    }
                                    {club_name}
                                </h4>
                                <span>{formatDateTime(date)}</span>
                            </span>
                        </div>
                        <span className="list-item__city">
                            {city}
                        </span>
                    </div>
                    {removable && <button className="list-item__remove" onClick={() => onDelete(id)} title="Удалить" />}
                </div>
                <div className="list-item__body">
                    <p className="list-item__text" dangerouslySetInnerHTML={{ __html: formatText(text) }} />
                    <div className="list-item__controls">
                        <Link to={url} className="list-item__show-all">Подробнее...</Link>
                        {/*<span className="list-item__share" onClick={shareLink}>Поделиться</span>*/}
                        <Share />
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
        </div>
    )
};

export default React.memo(ListItem);
