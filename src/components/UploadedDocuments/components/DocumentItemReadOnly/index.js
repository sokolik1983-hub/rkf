import React, {useState} from "react";
import { SvgIcon } from "@progress/kendo-react-common";
import { filePdf } from "@progress/kendo-svg-icons";
import moment from "moment";
import "moment/locale/ru";
import DocsInFrame from "../../../DocsInFrame";
import PopupModal from "../../../PopupModal";
import "./styles.scss";

moment.locale('ru');

const DocumentItemReadOnly = ({ id, name, date_create }) => {
    const [openDoc, setOpenDoc] = useState(false);
    const [doc, setDoc] = useState(null)
    const showDoc = (id, e) => {
        e.preventDefault();
        setOpenDoc(true);
        setDoc(id);
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
        <PopupModal
            showModal={openDoc}
            handleClose={() => setOpenDoc(false)}
        >
            <div className="docsinframe__inner">
                <DocsInFrame fedDetails={doc}></DocsInFrame>
            </div>
        </PopupModal>
    </div>;
};

export default React.memo(DocumentItemReadOnly);