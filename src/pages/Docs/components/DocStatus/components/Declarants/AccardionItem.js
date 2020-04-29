import React, {useState} from "react";
import {formatDateWithTime} from "../../../../../../utils";


const AccardionItem = ({barcode, breed, date_changed, date_created, dog_name, full_name, pedigree_link, stamp, status}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`accordion-item${isOpen ? ' accordion-item--opened' : ''}`}
             onClick={() => setIsOpen(!isOpen)}
        >
            <div className="accordion-item__line">
                <h3 className="accordion-item__title">
                    {full_name} <br/>
                    {formatDateWithTime(date_created)}
                </h3>
                <span className="accordion-item__icon"/>
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
                    <p><span>Статус: </span>{status}</p>
                    {pedigree_link && <p><a href={pedigree_link}>Ссылка на электронную копию родословной</a></p>}
                </div>
            </div>
        </div>
    )
};

export default React.memo(AccardionItem);