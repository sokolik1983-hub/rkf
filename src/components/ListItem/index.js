import React, {useState} from "react";
import {Link} from "react-router-dom";
import Modal from "../Modal";
import {formatDateTime, formatDateWithLocaleStringFull} from "../../utils/datetime";
import './index.scss';


const ListItem = ({title, date, isFullDate = true, alias, photo, text, url, modalInner, modalClass}) => {
    const [showModal, setShowModal] = useState(false);
    const urlify = t => t.replace(/([^"]https?:\/\/[^\s]+)/g, l => `<a class="link" target="_blank" href="${l}">${l}</a>`);
    text = JSON.parse(JSON.stringify(text).replace(/<[^>]*>/g, '').replace(/\\r\\n/g, '<br>'));

    return (
        <>
            <div className="list-item__head">
                {title && <h4 className="list-item__author"><a href={`/${alias}`}>{title}</a></h4>}
                <span className="list-item__date">
                    {isFullDate ? formatDateTime(date) : formatDateWithLocaleStringFull(new Date(date))}
                </span>
            </div>
            {url &&
                <div className="list-item__body">
                    {photo && <div className="list-item__photo" style={{ backgroundImage: `url(${photo})` }} />}
                    <div className="list-item__info">
                        <p className={photo ? 'list-item__text' : 'list-item__text-short'} dangerouslySetInnerHTML={{__html: urlify(text)}} />
                        <Link to={url} className="list-item__show-all">Подробнее</Link>
                    </div>
                </div>
            }
            {modalInner &&
                <>
                    <div className="list-item__body _pointer" onClick={() => setShowModal(true)}>
                        {photo && <div className="list-item__photo" style={{ backgroundImage: `url(${photo})` }} />}
                        <div className="list-item__info">
                            <p className={photo ? 'list-item__text' : 'list-item__text-short'} dangerouslySetInnerHTML={{__html: urlify(text)}} />
                            <button className="list-item__show-all">Подробнее</button>
                        </div>
                    </div>
                    <Modal showModal={showModal} handleClose={() => setShowModal(false)} className={modalClass ? modalClass : ''}>
                        {modalInner}
                    </Modal>
                </>
            }
        </>
    )
};

export default ListItem;