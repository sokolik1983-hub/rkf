import React, { useState } from "react";
import Modal from "../Modal";
import { formatDateTime } from "../../utils/datetime";
import './index.scss';


const ListItem = ({ date, photo, clubName, text, modalInner, modalClass }) => {
    const [showModal, setShowModal] = useState(false);
    const urlify = t => t.replace(/([^"]https?:\/\/[^\s]+)/g, l => `<a class="link" target="_blank" href="${l}">${l}</a>`);
    text = JSON.parse(JSON.stringify(text).replace(/<[^>]*>/g, '').replace(/\\r\\n/g, '<br>'));

    return (
        <>
            <div className="list-item__head">
                <h4 className="list-item__date">
                    {clubName}
                </h4>
                <span className="list-item__date">
                    {formatDateTime(date)}
                </span>
            </div>
            <div className="list-item__body" onClick={() => setShowModal(true)}>
                {photo && <div className="list-item__photo" style={{ backgroundImage: `url(${photo})` }} />}
                <div className="list-item__info">
                    <p className={photo ? 'list-item__text' : 'list-item__text-short'} dangerouslySetInnerHTML={{ __html: urlify(text) }} />
                    <button className="list-item__show-all" >Подробнее</button>
                </div>
            </div>
            <Modal showModal={showModal} handleClose={() => setShowModal(false)} className={modalClass ? modalClass : ''}>
                {modalInner}
            </Modal>
        </>
    )
};

export default ListItem;