import React, { useState, useEffect } from 'react';
import Share from 'components/Share';
import { SvgIcon } from '@progress/kendo-react-common';
import {filePdf, trash} from '@progress/kendo-svg-icons';
import { getHeaders} from '../../../../utils/request';
import LightTooltip from 'components/LightTooltip';
import moment from 'moment';
import 'moment/locale/ru';

import './styles.scss';

moment.locale('ru');

const DocumentItem = (props) => {
    const {id, name, date_create, setModal, isPrivate} = props;
    const headers = getHeaders();
    const [url, setUrl] = useState('');

    const handleClick = async (id) => {
        await fetch(`/api/document/document/private?id=` + id, {
            headers: getHeaders()
        })
            .then(response => response.blob())
            .then(blob => {
                let url = window.URL.createObjectURL(blob),
                    a = document.createElement('a');
                a.href = url;
                a.download = `Документ ${id}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            });
    };

    const getUrl = () => {
        if (!id)
            return;
        setUrl('');
        fetch(`/api/document/document/private?id=` + id, {headers})
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => setUrl(url));
    };

    useEffect(() => {
        getUrl();
    }, [])

    return (
        <div className="document-item__wrap" >
            <div className="document-item__inner" >
                <div className="document-item__name-wrap">
                    <a href={url} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center">
                        <SvgIcon icon={filePdf} size="default" />
                        <div className="d-flex flex-column">
                            <span className="document-item__name">
                                {name}
                            </span>
                            <span className="document-item__date">
                                {`Добавлено ${moment(date_create).format('D MMMM YYYY')} в ${moment(date_create).format('HH:mm')}`}
                            </span>
                        </div>
                    </a>
                </div>
                <div className="document-item__box">
                    {!isPrivate && <div className="">
                        <Share url={`//${window.location.host}/docs/${id}`}/>
                    </div>}
                    <div className="">
                        <LightTooltip title="Скачать документ" enterDelay={200} leaveDelay={200}>
                            <button
                                className="document-item__download"
                                onClick={() => handleClick(id)}
                            >
                            </button>
                        </LightTooltip>
                    </div>
                    <div className="">
                        <button
                            className="document-item__delete-btn"
                            type="button"
                            onClick={() => setModal({ type: 'deleteDocument', documentId: id })}
                        >
                            <SvgIcon icon={trash} size="default" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default React.memo(DocumentItem);