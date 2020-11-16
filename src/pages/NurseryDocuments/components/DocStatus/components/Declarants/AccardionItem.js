import React, { useState } from "react";
import { formatDateWithTime } from "../../../../../../utils";
import ReportError from './components/ReportError';
import ShareButtons from "./ShareButtons";

const formatCountTime = (str) => {
    const dateArray = str.split('.');
    const timeArray = dateArray[1].split(':');
    const days = +dateArray[0];
    const hours = +timeArray[0];
    const minutes = +timeArray[1];

    return `${days ? days + 'д. ' : ''}${hours ? hours + 'ч. ' : ''}${minutes ? minutes + 'м.' : ''}`;
}


const AccardionItem = ({ barcode, breed, date_changed, date_created, dog_name, full_name, pedigree_link, stamp, status, status_id, id, declarant_uid, count_time }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isNestedOpen, setIsNestedOpen] = useState(false);

    const isReportable = pedigree_link && (status_id === 10 || status_id === 6);

    return (
        <div className={`accordion-item${isOpen ? ' accordion-item--opened' : ''}`}>
            <div className="accordion-item__line">
                <h3 className="accordion-item__title">
                    {full_name} <br />
                    {formatDateWithTime(date_created)}
                </h3>
                <span onClick={() => setIsOpen(!isOpen)} className="accordion-item__icon" />
            </div>
            <div className="accordion-item__inner">
                <div className="accordion-item__content">
                    <p><span>Дата создания: </span>{formatDateWithTime(date_created)}</p>
                    <p><span>Дата изменения: </span>{formatDateWithTime(date_changed)}</p>
                    <p><span>ФИО владельца/заводчика: </span>{full_name}</p>
                    <p><span>Порода: </span>{breed}</p>
                    <p><span>Кличка: </span>{dog_name}</p>
                    <p><span>Клеймо: </span>{stamp}</p>
                    <p><span>Трек-номер: </span>{barcode}</p>
                    <p>
                        <span>Статус: </span>
                        {status}
                        &nbsp;
                        {isReportable && <span className="report-error" onClick={() => setIsNestedOpen(!isNestedOpen)}>сообщить об ошибке</span>}
                    </p>
                    {isReportable && <div className={`accordion-nested-item${isNestedOpen ? ' accordion-nested-item--opened' : ''}`}>
                        <div className="accordion-nested-item__inner">
                            <ReportError
                                id={id}
                                declarant_uid={declarant_uid}
                                setIsNestedOpen={setIsNestedOpen} />
                        </div>
                    </div>}
                    {count_time && <p><span>До получения родословной осталось: </span>{formatCountTime(count_time)}</p>}
                    {pedigree_link && <ShareButtons link={pedigree_link} />}
                </div>
            </div>
        </div>
    )
};

export default React.memo(AccardionItem);