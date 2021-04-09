import React, { useState } from "react";

import Card from "../Card";
import Share from "../Share";
import { DEFAULT_IMG } from "../../appConfig";
import { Request } from "../../utils/request";
import Modal from "./components/Modal";
import useIsMobile from "../../utils/useIsMobile";
import { setFiltersToUrl } from "../../pages/Specialists/utils";

import "./index.scss";


const CardSpecialist = ({
    id,
    cert_number,
    last_name,
    first_name,
    last_name_lat,
    first_name_lat,
    picture_link,
    city_id,
    city_name,
    phone,
    email,
    disciplines,
    show_details,
}) => {

    const [showModal, setShowModal] = useState(false);
    const [additionalDisciplines, setAdditionalDisciplines] = useState(null);
    const [additionalPhones, setAdditionalPhones] = useState(null);
    const [additionalEmails, setAdditionalEmails] = useState(null);
    const isMobile = useIsMobile();

    const onShowMoreClick = () => {
        (() => Request({
            url: `/api/workreferee/additional_details?JudgeId=${id}&SearchTypeId=1`
        }, data => {
            setAdditionalPhones(data.phones);
            setAdditionalEmails(data.emails);
            setAdditionalDisciplines(data.disciplines);
            setShowModal(true);
        }, error => {
            console.log(error.response);
        }))();
    };

    return (showModal ?
        <Modal
            className="full-card-modal"
            showModal={true}
            handleClose={() => setShowModal(false)}
            handleX={() => setShowModal(false)}
            headerName={""}
        >
            <div className="full-card-modal__content">
                <Card className="card-specialist _modal">
                    {isMobile && <div style={{ display: 'flex', justifyContent: 'flex-end' }}><span
                        className="card-specialist__city"
                        onClick={() => setFiltersToUrl({ CityIds: [city_id] })}
                        title={city_name}
                    >
                        {city_name}
                    </span></div>}
                    <div className="card-specialist__wrap">
                        <span className="card-specialist__photo" to={picture_link} style={{ backgroundImage: `url(${picture_link || DEFAULT_IMG.userAvatar})` }} />
                        <div className="card-specialist__info">
                            <div className="card-specialist__contacts">
                                <span className="card-specialist__name">{last_name} {first_name}&nbsp;<span className="card-specialist__sertificate">({cert_number})</span>
                                </span>
                                <span className="card-specialist__name-eng">{last_name_lat} {first_name_lat}</span>
                                <br />
                                {phone && <span className="card-specialist__subtitle">т. {phone}</span>}
                                {additionalPhones && additionalPhones.map(phone => <span className="card-specialist__subtitle" key={phone}>т. {phone}</span>)}
                                {email && <span className="card-specialist__subtitle">Email: {email}</span>}
                                {additionalEmails && additionalEmails.map(email => <span className="card-specialist__subtitle" key={email}>Email: {email}</span>)}
                            </div>
                        </div>
                        <div className="card-specialist__content">
                            <div className="card-specialist__header">
                                <div>
                                </div>
                                {!isMobile && <span
                                    className="card-specialist__city"
                                    onClick={() => setFiltersToUrl({ CityIds: [city_id] })}
                                    title={city_name}
                                >
                                    {city_name}
                                </span>}
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '70px' }}>
                        <span className="card-specialist__content-title">Разрешено судейство видов испытаний</span>
                        <div className="card-specialist__full-content">
                            <div>
                                {disciplines?.map(i => <p key={i}>{i}</p>)}
                                {additionalDisciplines?.slice(0, Math.round(additionalDisciplines?.length / 2)).map(i => <p key={i}>{i}</p>)}
                            </div>
                            <div>{additionalDisciplines?.slice(Math.round(additionalDisciplines?.length / 2)).map(i => <p key={i}>{i}</p>)}</div>
                        </div>
                    </div>
                    <div className={`card-specialist__controls _open`}>
                        <span className="card-specialist__go-back" onClick={() => setShowModal(false)}>Вернуться к списку</span>
                        <Share url={`https://rkf.online`} />
                    </div>
                </Card>
            </div>
        </Modal>
        :
        <Card className="card-specialist">
            {isMobile && <div style={{ display: 'flex', justifyContent: 'flex-end' }}><span
                className="card-specialist__city"
                onClick={() => setFiltersToUrl({ CityIds: [city_id] })}
                title={city_name}
            >
                {city_name}
            </span></div>}
            <div className="card-specialist__wrap">
                <span className="card-specialist__photo" to={picture_link} style={{ backgroundImage: `url(${picture_link || DEFAULT_IMG.userAvatar})` }} />
                <div className="card-specialist__info">
                    <div className="card-specialist__contacts">
                        <span className="card-specialist__name">{last_name} {first_name}&nbsp;<span className="card-specialist__sertificate">({cert_number})</span>
                        </span>
                        <span className="card-specialist__name-eng">{last_name_lat} {first_name_lat}</span>
                        <br />
                        {phone && <span className="card-specialist__subtitle">т. {phone}</span>}
                        {email && <span className="card-specialist__subtitle _email">Email: {email}</span>}
                    </div>
                </div>
                <div className="card-specialist__content">
                    <div className="card-specialist__header">
                        {isMobile ? <div></div> : <div><br />
                            <span className="card-specialist__content-title">Разрешено судейство видов испытаний</span>
                            <div className="card-specialist__subtitle">{disciplines?.map(i => <p key={i}>{i}</p>)}</div>
                        </div>}
                        {!isMobile && <span
                            className="card-specialist__city"
                            onClick={() => setFiltersToUrl({ CityIds: [city_id] })}
                            title={city_name}
                        >
                            {city_name}
                        </span>}
                    </div>
                    {!isMobile && show_details && <span className="card-specialist__more" onClick={onShowMoreClick}>Подробнее...</span>}
                </div>
            </div>
            {isMobile && <div>
                <span className="card-specialist__content-title">Разрешено судейство видов испытаний</span>
                <div className="card-specialist__subtitle">{disciplines?.map(i => <p key={i}>{i}</p>)}</div>
                {show_details && <span className="card-specialist__more" onClick={onShowMoreClick}>Подробнее...</span>}
            </div>}
            <div className={`card-specialist__controls`}>
                <Share url={`https://rkf.online`} />
            </div>
        </Card>
    )
};

export default React.memo(CardSpecialist);