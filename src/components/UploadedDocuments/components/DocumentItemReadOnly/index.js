import React, {useState} from "react";
import { SvgIcon } from "@progress/kendo-react-common";
import { filePdf } from "@progress/kendo-svg-icons";
import moment from "moment";
import "moment/locale/ru";
import Modal from "../../../Modal";
import "./styles.scss";

moment.locale('ru');

const DocumentItemReadOnly = ({ id, name, date_create }) => {
    const [openDoc, setOpenDoc] = useState(false);
    const [url, setUrl] = useState('');

    const get = () => {
        if (isNaN(id) || !id)
            return;
        setUrl('');
        fetch(`/api/document/publicdocument?id=${id}`)
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => setUrl(url));
    }


    const showDoc = (id, e) => {
        e.preventDefault();
        setOpenDoc(true);
        get();
    }
    return <div className="mb-3">
        <a href="#" className="d-flex align-items-center" onClick={(e) => showDoc(id, e)}>
            <SvgIcon icon={filePdf} size="default" />
            <div className="d-flex flex-column">{name}
                <span className="DocumentItem__date">
                    {`Добавлено ${moment(date_create).format('D MMMM YYYY')} в ${moment(date_create).format('HH:mm')}`}
                </span>
            </div>
        </a>
        <Modal
            showModal={openDoc}
            handleClose={() => setOpenDoc(false)}
        >
            <embed src={url}/>
        </Modal>
    </div>;
};

export default React.memo(DocumentItemReadOnly);