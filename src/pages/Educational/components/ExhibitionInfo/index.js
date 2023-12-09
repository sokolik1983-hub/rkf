import React from "react";
import Card from "../../../../components/Card";
import CountDown from "../../../../components/CountDown";
import "./index.scss";
import moment from "moment";
import "moment/locale/ru";
moment.locale('ru');


const ExhibitionInfo = ({
    date_begin,
    description,
    documents,
    city_name,
    contact_emails,
    contact_phones,
    type_name,
    payment_form_type_name,
    lecturer,
    type_id,
    link_address,
    price,
    location_address
}) => {
    const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

    return (
        <>
            <Card className="educational-info">
                <div className="educational-info__left">
                    <h4 className="educational-info__title">Информация о мероприятии</h4>
                    <h5 className="educational-info__subtitle">Дата проведения:</h5>
                    <div className="educational-info__dates">
                        <p className="educational-info__date">
                            {`${capitalizeFirstLetter(moment(date_begin).format('dddd'))}, ${moment(date_begin).format('DD.MM.YYYY')}`}
                        </p>
                    </div>
                    <h5 className="educational-info__subtitle">Тип:</h5>
                    <div>{type_name}</div>
                    <h5 className="educational-info__subtitle">Форма:</h5>
                    <div>{`${payment_form_type_name}${price ? ', стоимость участия: ' + price + ' рублей' : ''}`}</div>
                </div>
                <div className="educational-info__right">
                    <CountDown
                        startDate={date_begin}
                        //endDate={date_begin}
                        reportsDateEnd={date_begin}
                        isEducational={true}
                    />
                </div>
            </Card>
            <Card className="educational-info lecturers">
                <h4 className="educational-page__description-title">Лектор</h4>
                {lecturer.map((l, key) => {
                    return <div className="educational-page__lecturer" key={key}>
                        <div className="educational-page__lecturer-left">
                            <div style={{ backgroundImage: `url(${l.lecturer_logo})` }} alt="" className="educational-page__lecturer-logo" />
                            <div>
                                <span>{l.lecturer_full_name}</span>
                                {l.specialty.join(', ')}
                            </div>
                        </div>
                        <div className="educational-page__lecturer-right">
                            {l.description}
                        </div>
                    </div>
                })}
            </Card>
            <Card className="educational-info">
                <div className="educational-page__address-left">
                    <h4 className="educational-page__description-title">Описание</h4>
                    {description ?
                        <p dangerouslySetInnerHTML={{ __html: description }} /> :
                        <p>Описание отсутствует</p>
                    }
                </div>
                <div className="educational-page__address-right">
                    {
                        type_id === 1
                            ? <>
                                <h4 className="educational-page__address-title">Адрес проведения и контакты</h4>
                                {city_name && <p className="educational-page__address-subtitle">
                                    <span>Адрес: </span>{`г. ${city_name}${location_address ? ', ' + location_address : ''}`}
                                </p>}
                            </>
                            : <>
                                <h4 className="educational-page__address-title">Ссылка на мероприятие</h4>
                                {link_address && <p>{`${link_address}`}</p>}
                            </>
                    }
                    {!!contact_phones?.length && <p className="educational-page__address-subtitle"><span>Телефон: </span>{contact_phones.join(', ')}</p>}
                    {!!contact_emails?.length && <p className="educational-page__address-subtitle"><span>E-mail: </span>{contact_emails.join(', ')}</p>}
                </div>
            </Card>
            <Card className="educational-info">
                <div className="educational-page__documents">
                    <h4 className="educational-page__documents-title">Документы</h4>
                    {documents && !!documents.length ?
                        documents.map(doc => (
                            <p className="educational-page__document" key={doc.id}>
                                <a href={`/docs/${doc.document_id}`} target="__blank">
                                    <span className="educational-page__document-icon" />
                                    {doc.name}
                                </a>
                            </p>
                        )) :
                        <p className="educational-page__document">Документы отсутствуют</p>
                    }
                </div>
            </Card>
        </>
    )
};

export default React.memo(ExhibitionInfo);
