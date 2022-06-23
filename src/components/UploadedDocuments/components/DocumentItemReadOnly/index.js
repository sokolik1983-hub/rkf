import React, {memo, useState, useEffect} from "react";
import { SvgIcon } from "@progress/kendo-react-common";
import { filePdf } from "@progress/kendo-svg-icons";
import { getHeaders } from '../../../../utils/request';
import moment from "moment";
import "moment/locale/ru";
import "./styles.scss";

moment.locale('ru');

const DocumentItemReadOnly = ({ id, name, date_create }) => {

    const [url, setUrl] = useState('');

    const getUrl = () => {
        if (isNaN(id) || !id) return;

        const headers = getHeaders();
        setUrl('');
        fetch(`/api/document/publicdocument?id=${id}`, {headers})
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => setUrl(url));
    };

    useEffect(()=>{
        getUrl(id)
    },[id]);

    return (
        <div className="mb-3">
            <a
                className="AdditionalDocumentField__link"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
            >
                <SvgIcon icon={filePdf} size="default" />
                <div className="d-flex flex-column">
                    <p>{name}</p>
                    <span className="DocumentItem__date">
                        {`Добавлено ${moment(date_create).format('D MMMM YYYY')} в ${moment(date_create).format('HH:mm')}`}
                    </span>
                </div>
            </a>
        </div>
    );
};

export default memo(DocumentItemReadOnly);