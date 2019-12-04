import React, {useState} from "react";
import Modal from "../Modal";
import {formatDateTime} from "../../utils/datetime";
import './index.scss';


const ListItem = ({date, photo, text, modalInner, modalClass}) => {
    const [showModal, setShowModal] = useState(false);

    text = JSON.parse(JSON.stringify(text).replace(/\\r\\n/g, '<br>'));

    return (
        <>
            <div className="list-item__head">
                <span className="list-item__date">
                    {formatDateTime(date)}
                </span>
            </div>
            <div className="list-item__body" onClick={() => setShowModal(true)}>
                {photo && <div className="list-item__photo" style={{backgroundImage: `url(${photo})`}} />}
                <div className="list-item__info">
                    <p className="list-item__text" dangerouslySetInnerHTML={{__html: text}} />
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