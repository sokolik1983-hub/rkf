import React, { useState } from "react";

import Card from "../Card";
import Share from "../Share";
import { DEFAULT_IMG } from "../../appConfig";
import { Request } from "../../utils/request";
import Modal from "./components/Modal";
import useIsMobile from "../../utils/useIsMobile";
import { setFiltersToUrl } from "../../pages/Specialists/utils";
import LightTooltip from "../../components/LightTooltip";

import "./index.scss";


const CardSpecialist = ({
    id,
    cert_number,
    last_name,
    first_name,
    second_name,
    last_name_lat,
    first_name_lat,
    picture_link,
    city_id,
    city_name,
    phone,
    email,
    disciplines,
    show_details,
    searchTypeId,
    specializations,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [additionalDisciplines, setAdditionalDisciplines] = useState(null);
    const [additionalPhones, setAdditionalPhones] = useState(null);
    const [additionalEmails, setAdditionalEmails] = useState(null);

    const isMobile = useIsMobile();
    const isMobile660px = useIsMobile(660);
    const isSpecialist = searchTypeId === 3;

    const onShowMoreClick = () => {
        (() => Request({
            url: `/api/workreferee/additional_details?JudgeId=${id}&SearchTypeId=${searchTypeId}`
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
                        {isMobile &&
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><span
                                className="card-specialist__city"
                                onClick={() => setFiltersToUrl({ CityIds: [city_id] })}
                                title={city_name}
                                >
                                    {city_name}
                                </span>
                            </div>
                        }
                        <div className="card-specialist__wrap">
                            <span className="card-specialist__photo" to={picture_link} style={{ backgroundImage: `url(${picture_link || DEFAULT_IMG.userAvatar})` }} />
                            <div className="card-specialist__info _modal">
                                <div className="card-specialist__contacts _modal">
                                <span className="card-specialist__name _modal">
                                    {last_name + " " + first_name + " " + second_name}&nbsp;<span className="card-specialist__sertificate">({cert_number})</span>
                                </span>
                                    <span className="card-specialist__name-eng _modal">{last_name_lat} {first_name_lat}</span>
                                    {phone && <span className="card-specialist__subtitle">т. {phone}</span>}

                                    {additionalPhones && additionalPhones.map((phone, index) => {
                                        return (
                                            <span key={index}
                                                  className="card-specialist__subtitle">
                                            т. {phone}
                                        </span>
                                        )
                                    })
                                    }
                                    {email && <span className="card-specialist__subtitle">Email: {email}</span>}
                                    {additionalEmails && additionalEmails.map((email, index) => <span className="card-specialist__subtitle" key={index}>Email: {email}</span>)}
                                </div>
                            </div>
                            <div className="card-specialist__content-modal">
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
                        {!isSpecialist && <div style={{ marginTop: '40px' }}>

                            <div className="card-specialist__full-content _modal">
                                <div className="card-specialists__grid">

                                    {additionalDisciplines?.map((item, index, arr) => {

                                        return (
                                            <div className="card-specialists__grid-item" key={index} style={{display: 'flex'}}>
                                                
                                                <div className="card-specialist__disciplines">

                                                    <div className="card-specialist__disciplines-inner" style={{flexDirection: 'column'}}>
                                                        {index < 1 && <div className="card-specialist__content-title" style={{marginBottom: '10px'}} >Дисциплины </div>}
                                                        <div style={{flexDirection: 'row'}}>
                                                            {item?.disciplines.map((item, index, arr) => {
                                                                return (
                                                                    <LightTooltip title={item.discipline_name} enterDelay={100} leaveDelay={50} key={index}>
                                                                        <span className="card-specialist__discipline">
                                                                            {item.discipline_short_name}
                                                                            {index < arr.length - 1 && ","} &nbsp;
                                                                        </span>
                                                                    </LightTooltip>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-specialist__ranks">
                                                    <div className="card-specialist__rank" >
                                                        {item.rank
                                                            && index < 1
                                                            && <h3  style={{display: 'block'}} className="card-specialist__rank-title"
                                                                    style={{marginBottom: '10px'}}>Ранг</h3>
                                                        }
                                                            <span style={{display: 'block'}}  className="card-specialist__content-data">{item.rank}</span>
                                                        </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>}


                        {isSpecialist && <div className="card-specialist__additional-wrap" style={{ marginTop: '40px' }}>

                            <div className="card-specialists__grid">
                                {additionalDisciplines?.map((item, index, arr) => {
                                    return (
                                        <div className="card-specialist__specialization-inner" key={index}>
                                        <p className="card-specialist__specialization">Специализация</p>
                                        <p className="card-specialist__subtitle" >{item.specialization}</p>

                                            {item?.disciplines.map((item, index, arr) => {
                                                return (
                                                    <div className="card-specialists__grid-item"  style={{display: 'flex'}} key={index}>
                                                        <div className="card-specialist__disciplines" style={{flexDirection: 'column'}}>
                                                            {index < 1 && <div className="card-specialist__content-title" >Дисциплины </div>}
                                                             <div className="card-specialist__disciplines-inner">

                                                                 {item?.disciplines.map((item, index, arr) => {
                                                                     return (
                                                                         <LightTooltip title={item.discipline_name} enterDelay={100} leaveDelay={50} key={index}>
                                                                            <span className="card-specialist__discipline">
                                                                                {item.discipline_short_name}
                                                                                {index < arr.length - 1 && ","} &nbsp;
                                                                            </span>
                                                                         </LightTooltip>
                                                                     )
                                                                 })}
                                                            </div>
                                                        </div>
                                                        <div className="card-specialist__ranks">

                                                    {item.rank &&
                                                        <div className="card-specialist__rank">
                                                            {item.rank
                                                                && index < 1
                                                                && <h3  style={{display: 'block'}} className="card-specialist__rank-title">Ранг</h3>
                                                            }
                                                            <span style={{display: 'block'}}
                                                                  className="card-specialist__content-data">
                                                                    {item.rank}
                                                            </span>
                                                        </div>
                                                    }
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                        }
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
                        <span className="card-specialist__name">
                            {last_name}
                            <br/>
                            {first_name + " " + second_name}&nbsp;<span className="card-specialist__sertificate">({cert_number})</span>
                        </span>
                            <span className="card-specialist__name-eng">{last_name_lat} {first_name_lat}</span>
                            <br/>
                            {!isMobile660px &&
                            <div className="card-specialist__contacts">
                                <div>
                                    {phone && <span className="card-specialist__subtitle">т. {phone}</span>}
                                    {email && <span className="card-specialist__subtitle _email">Email: {email}</span>}
                                </div>
                            </div>
                            }
                        </div>
                    </div>

                    {isMobile660px &&  <div className="card-specialist__contacts" style={{marginTop: "10px"}}>
                        <div>
                            {phone && <span className="card-specialist__subtitle">т. {phone}</span>}
                            {email && <span className="card-specialist__subtitle _email">Email: {email}</span>}
                        </div>
                    </div> }

                    <div className="card-specialist__content">
                        <div className="card-specialist__header">
                            {isMobile ? <div></div> : <div>{isSpecialist && <div>
                                <p className="card-specialist__specialization">Специализация</p>
                                <p className="card-specialist__subtitle">{specializations}</p>
                            </div>}
                                <br />
                                <span className="card-specialist__content-title">Дисциплины</span>
                                <div className="card-specialist__subtitle">{disciplines?.map((i, index) => <p key={index}>{i}</p>)}</div>
                            </div>}
                            {!isMobile && <span
                                className="card-specialist__city"
                                onClick={() => setFiltersToUrl({ CityIds: [city_id] })}
                                title={city_name}
                            >
                            {city_name}
                        </span>}
                        </div>
                        {!isMobile && (show_details || isSpecialist) && <span className="card-specialist__more" onClick={onShowMoreClick}>Подробнее...</span>}
                    </div>
                </div>
                {isMobile && <div>
                    <span className="card-specialist__content-title">Дисциплины</span>
                    <div className="card-specialist__subtitle">{disciplines?.map((i, index) => <p key={index}>{i}</p>)}</div>
                    {(show_details || isSpecialist) && <span className="card-specialist__more" onClick={onShowMoreClick}>Подробнее...</span>}
                </div>}
                <div className={`card-specialist__controls`}>
                    <Share url={`https://rkf.online`} />
                </div>
            </Card>
    )
};

export default React.memo(CardSpecialist);