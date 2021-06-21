import React, { useState } from "react";
import Card from "../Card";
import Share from "../Share";
import { DEFAULT_IMG } from "../../appConfig";
import { Request } from "../../utils/request";
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
                            specialization,
                        }) => {
    const [additionalDisciplines, setAdditionalDisciplines] = useState(null);
    const [additionalPhones, setAdditionalPhones] = useState(null);
    const [additionalEmails, setAdditionalEmails] = useState(null);
    const [moreData, setMoreData] = useState(false);

    const isMobile700 = useIsMobile(700);
    const isSpecialist = searchTypeId === 3;

    const onShowMoreClick = () => {
        (() => Request({
            url: `/api/workreferee/additional_details?JudgeId=${id}&SearchTypeId=${searchTypeId}`
        }, data => {
            setAdditionalPhones(data.phones);
            setAdditionalEmails(data.emails);
            setAdditionalDisciplines(data.disciplines);
            setMoreData(!moreData)
        }, error => {
            console.log(error.response);
        }))();
    };

    return (
        <Card className="card-specialist">
            <div className="card-specialist__city"
                 onClick={() => setFiltersToUrl({ CityIds: [city_id] })}
                 title={city_name}>
                    {city_name}
            </div>
                <div className="card-specialist__wrap">
                    <span className="card-specialist__photo" to={picture_link} style={{ backgroundImage: `url(${picture_link || DEFAULT_IMG.userAvatar})`}}/>
                    {isMobile700 && <div className="card-specialist__names">
                            <span className="card-specialist__name">
                                {last_name + " " + first_name}&nbsp;
                                <br/>
                                {second_name}
                            </span>
                                <span className="card-specialist__name-eng">
                                    {last_name_lat} {first_name_lat}
                                </span>
                            </div>}

                    <div className="card-specialist-inner">

                        <div className="card-specialist__info">

                            {!isMobile700 &&
                            <><span className="card-specialist__name">
                                    {last_name + " " + first_name}&nbsp;
                                <br/>
                                {second_name}
                                    </span>
                                <span className="card-specialist__name-eng">{last_name_lat} {first_name_lat}</span></>
                            }
                            <span className="card-specialist__sertificate">Номер сертификата<span> {cert_number}</span></span>
                        </div>

                        {isMobile700 && <div className="card-specialist__contacts">
                              <div>
                                    <h3>Контакты</h3>
                                  {phone && <span className="card-specialist__subtitle">т. {phone}</span>}
                                  {(additionalPhones && moreData) && additionalPhones.map((phone, index) => {
                                      return (
                                          <span key={index}
                                                className="card-specialist__subtitle">
                                            т. {phone}
                                            </span>
                                      )
                                  })}

                                  {email && <span className="card-specialist__subtitle">{email}</span>}
                                  {(additionalEmails && moreData) && additionalEmails.map((email, index) => {
                                      return (
                                          <span key={index}
                                                className="card-specialist__subtitle">
                                                        {email}
                                                </span>
                                      )
                                  }) }
                                </div>
                            </div> }

                        <div className="card-specialist__content">
                         {!isMobile700 && <div className="card-specialist__contacts">
                                <div>
                                    <h3>Контакты</h3>
                                    {phone && <span className="card-specialist__subtitle">т. {phone}</span>}
                                    {(additionalPhones && moreData) && additionalPhones.map((phone, index) => {
                                        return (
                                            <span key={index}
                                                  className="card-specialist__subtitle">
                                            т. {phone}
                                            </span>
                                        )
                                    })}

                                    {email && <span className="card-specialist__subtitle">{email}</span>}
                                    {(additionalEmails && moreData) && additionalEmails.map((email, index) => {
                                        return (
                                            <span key={index}
                                                  className="card-specialist__subtitle">
                                                        {email}
                                                </span>
                                        )
                                    }) }
                                </div>
                            </div>}
                        </div>

                        <div className="card-specialists__grid">

                            {(!isSpecialist && additionalDisciplines)
                            && additionalDisciplines?.map((item, index, arr) => {
                                return (
                                    <div className={!moreData && index >= 0 ? "card-specialists__grid-item __hide" : "card-specialists__grid-item "} key={index}>
                                                <div className="card-specialist__disciplines">

                                                    <div className="card-specialist__disciplines-inner">
                                                        {index === 0 &&  <div className="card-specialist__content-title">Дисциплины</div>}

                                                        <div>
                                                            {item?.disciplines.map((item, index, arr) => {
                                                                return (
                                                                    <LightTooltip title={item.discipline_name || 'title'} enterDelay={100} leaveDelay={50} key={index}>
                                                                        <span className="card-specialist__discipline">
                                                                            {item.discipline_short_name}
                                                                            {index < arr.length - 1 && ","}&nbsp;
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
                                                        && index === 0
                                                        && <h3 className="card-specialist__rank-title">Ранг</h3>
                                                        }
                                                        <span className="card-specialist__content-data">{item.rank}</span>
                                                        </div>
                                                </div>

                                    </div>
                                )
                            })
                            }

                            {moreData && additionalDisciplines && isSpecialist
                                ? additionalDisciplines?.map((additionalDiscipline, index, arr) => {

                                    return (
                                        <React.Fragment key={index}>
                                            <div
                                                className={ !moreData && index > 0  ? "card-specialist__specialization-inner __hide" : "card-specialist__specialization-inner"}>
                                            <p className="card-specialist__specialization">Специализация</p>
                                            <p className="card-specialist__subtitle">{additionalDiscipline.specialization}</p>
                                                {additionalDiscipline?.disciplines?.map((rank, index, arr) => {
                                                    return (
                                                        <div className="card-specialists__grid-item" key={index}>
                                                        <div className="card-specialist__disciplines">
                                                            {index === 0 && <div className="card-specialist__content-title" >Дисциплины</div>}

                                                            <div className="card-specialist__disciplines-inner" style={{flexDirection: 'row'}}>

                                                                 {rank?.disciplines?.map((discipline, index, arr) => {
                                                                     return (
                                                                         <LightTooltip title={discipline.discipline_name || 'title'} enterDelay={100} leaveDelay={50} key={index}>
                                                                            <span className="card-specialist__discipline">
                                                                                {discipline.discipline_short_name}
                                                                                {index < arr.length - 1 && ","}&nbsp;
                                                                            </span>
                                                                         </LightTooltip>
                                                                     )
                                                                 })}
                                                            </div>
                                                        </div>
                                                        <div className="card-specialist__ranks">
                                                        <div className="card-specialist__rank" >
                                                            {rank.rank
                                                            && index === 0
                                                            && <h3 className="card-specialist__rank-title">Ранг</h3>
                                                            }
                                                            <span className="card-specialist__content-data">{rank.rank}</span>
                                                            </div>
                                                    </div>
                                                    </div>
                                                    )
                                                })}
                                        </div>
                                        </React.Fragment>
                                    )
                                })
                                :  disciplines.map((item, index, arr) => {
                                    return (
                                        <React.Fragment key={index}>
                                        <div className="card-specialists__grid-item" key={index}>
                                                <div className="card-specialist__disciplines">
                                                     {isSpecialist
                                                     && <div style={{display: 'flex', flexDirection: 'column'}}>
                                                            <p className="card-specialist__specialization">Специализация</p>
                                                            <p className="card-specialist__subtitle">{specialization}</p>
                                                        </div>
                                                     }
                                                    <div className="card-specialist__disciplines-inner" style={{flexDirection: 'column'}}>
                                                    {index < 1 && <div className="card-specialist__content-title" >Дисциплины</div>}
                                                        <div style={{flexDirection: 'row'}}>
                                                        {item?.disciplines.map((item, index, arr) => {
                                                            return (
                                                                <LightTooltip title={item.discipline_name || 'title'} enterDelay={100} leaveDelay={50} key={index}>
                                                                    <span className="card-specialist__discipline">
                                                                        {item.discipline_short_name}
                                                                        {index < arr.length - 1 && ","}&nbsp;
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
                                                    && <h3  style={{display: 'block'}} className="card-specialist__rank-title">Ранг</h3>
                                                    }
                                                    <span style={{display: 'block'}}  className="card-specialist__content-data">{item.rank}</span>
                                                    </div>
                                            </div>
                                        </div>

                                    </React.Fragment>
                                    )
                                })
                            }

                        </div>
                    </div>
                    {show_details &&
                    <>
                            {!moreData  && <span className="card-specialist__more" onClick={onShowMoreClick}> Подробнее...</span>}
                        {moreData  && <span className="card-specialist__more" onClick={() => setMoreData(!moreData)}>Скрыть</span>}
                        </>
                    }
                </div>

                <div className={`card-specialist__controls`}>
                    <Share url={`https://rkf.online`} />
                </div>
            </Card>
    )
};

export default React.memo(CardSpecialist);