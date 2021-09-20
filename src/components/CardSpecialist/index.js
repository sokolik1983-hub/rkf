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
                            disciplines = [],
                            show_details,
                            searchTypeId,
                            specialization,
                            opened_group_and_breed,
                            ranks
                        }) => {
    const [additionalDisciplines, setAdditionalDisciplines] = useState(null);
    const [additionalGroups, setAdditionalGroups] = useState(null);
    const [additionalContests, setAdditionalContests] = useState(null);
    const [additionalPhones, setAdditionalPhones] = useState(null);
    const [additionalEmails, setAdditionalEmails] = useState(null);
    const [moreData, setMoreData] = useState(false);
    const [isAllBreeder, setIsAllBreeder] = useState(false);
    const isMobile700 = useIsMobile(700);
    const isSpecialist = searchTypeId === 3;
    const isJudge = searchTypeId === 4;

    const onShowMoreClick = () => {
        (() => Request({
            url: isJudge
                ? `/api/exteriorjudge/additional_details/${id}`
                : `/api/workreferee/additional_details?JudgeId=${id}&SearchTypeId=${searchTypeId}`
        }, data => {
            setAdditionalPhones(data.phones);
            setAdditionalEmails(data.emails);
            setAdditionalDisciplines(data.disciplines);
            setAdditionalContests(data.contests);
            setAdditionalGroups(data.opened_groups_and_breeds);
            setMoreData(!moreData)
            setIsAllBreeder(data.is_all_breeder)
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
                <span className="card-specialist__photo" to={picture_link} style={{ backgroundImage: `url(${picture_link || DEFAULT_IMG.userAvatar})` }} />
                {isMobile700 && <div className="card-specialist__names">
                    <span className="card-specialist__name">
                        {last_name}&nbsp;
                        <br />
                        {first_name + " " + second_name}
                    </span>
                    <span className="card-specialist__name-eng">{last_name_lat} {first_name_lat}</span>
                </div>}

                <div className="card-specialist-inner">

                    <div className="card-specialist__info">

                        {!isMobile700 &&
                        <>
                                <span className="card-specialist__name">
                                    {last_name}&nbsp;
                                    <br />
                                    {first_name + " " + second_name}
                                </span>
                            <span className="card-specialist__name-eng">{last_name_lat} {first_name_lat}</span>
                        </>
                        }
                        {/*<span className="card-specialist__sertificate">Лист судьи №<span>{cert_number}</span></span>*/}
                    </div>

                    {isMobile700 && <div className="card-specialist__contacts">
                        <div>
                            <h3>Контакты</h3>
                            {phone && <span className="card-specialist__subtitle">т. {phone}</span>}
                            {additionalPhones && moreData && additionalPhones.map((phone, index) => {
                                return (
                                    <span key={index} className="card-specialist__subtitle">
                                        т. {phone}
                                    </span>
                                )
                            })}

                            {email && <span className="card-specialist__subtitle">{email}</span>}
                            {additionalEmails && moreData && additionalEmails.map((email, index) => {
                                return (
                                    <span key={index}
                                          className="card-specialist__subtitle">
                                        {email}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                    }

                    <div className="card-specialist__content">
                        {!isMobile700 && <div className="card-specialist__contacts">
                            <div>
                                <h3>Контакты</h3>
                                {phone && <span className="card-specialist__subtitle">т. {phone}</span>}
                                {additionalPhones && moreData && additionalPhones.map((phone, index) => {
                                    return (
                                        <span key={index}
                                              className="card-specialist__subtitle">
                                            т. {phone}
                                        </span>
                                    )
                                })}

                                {email && <span className="card-specialist__subtitle">{email}</span>}
                                {additionalEmails && moreData && additionalEmails.map((email, index) => {
                                    return (
                                        <span key={index}
                                              className="card-specialist__subtitle">
                                            {email}
                                        </span>
                                    )
                                })
                                }

                                <span className="card-specialist__sertificate">Лист судьи №<span>{cert_number}</span></span>
                            </div>
                        </div>
                        }
                    </div>

                    <div className="card-specialists__grid">

                        {isJudge && <div className="card-specialists__grid-item">



                            <div className="card-specialist__disciplines is_groups">
                                <div className={!moreData ? "card-specialist__disciplines-inner card-specialists__grid-item __hide" : ""} style={{ flexDirection: 'column' }}>
                                   {ranks &&
                                       <div className="card-specialist__rank-wrap">
                                            <span className="card-specialist__rank-title">Ранг </span>
                                            <span className="card-specialist__content-data">{ranks}</span>
                                       </div>
                                    }


                                    { <>
                                        <div className="card-specialist__content-title title-style" >Группа, номер стандарта, название породы</div>
                                        <div style={{ flexDirection: 'row' }}>
                                            <span className="card-specialist__discipline">
                                                {isAllBreeder ? 'ВСЕ ПОРОДЫ / ALL BREEDS' : opened_group_and_breed}
                                            </span>
                                        </div>
                                    </>}
                                    {additionalGroups && additionalGroups.map((item, index) => {
                                        return (
                                            <div className={!moreData && index >= 0 ? "card-specialists__grid-item __hide" : "card-specialists__grid-item "} key={index}>
                                                <div style={{ flexDirection: 'row' }}>
                                                    <span className="card-specialist__discipline">
                                                        {!isAllBreeder && item}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {additionalContests && !!additionalContests.length && <>
                                        {moreData && <div className="card-specialist__content-title title-style">Выставочные конкурсы</div>}
                                        {
                                            additionalContests.map((item, index) => {
                                            return <div className={!moreData && index >= 0 ? "card-specialists__grid-item __hide" : "card-specialists__grid-item"} key={index}>
                                                <div style={{ flexDirection: 'row' }}>
                                                    <span className="card-specialist__discipline">
                                                        {item}
                                                    </span>
                                                </div>
                                            </div>
                                        }

                                        )}
                                    </>}
                                </div>
                            </div>





                        </div>}

                        {disciplines.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {!isSpecialist && <div className={!moreData && index >= 0 ? "card-specialists__grid-item __hide" : "card-specialists__grid-item "} key={index}>
                                        <div className="card-specialist__disciplines">
                                            <div className="card-specialist__disciplines-inner" style={{ flexDirection: 'column' }}>
                                                {index < 1 && <div className="card-specialist__content-title" >Дисциплины</div>}
                                                <div style={{ flexDirection: 'row' }}>
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
                                            <div className="card-specialist__rank">
                                                {item.rank &&
                                                <>
                                                    <h3 className="card-specialist__rank-title" >Ранг</h3>
                                                    <span className="card-specialist__content-data">{item.rank}</span>
                                                </>
                                                }

                                            </div>
                                        </div>
                                    </div>}

                                </React.Fragment>
                            )
                        })}

                        {!isSpecialist && additionalDisciplines
                        && additionalDisciplines.map((item, index) => {
                            return (
                                <div className={!moreData && index >= 0 ? "card-specialists__grid-item __hide" : "card-specialists__grid-item "} key={index}>
                                    <div className="card-specialist__disciplines">

                                        <div className="card-specialist__disciplines-inner">
                                            <div>
                                                {item?.disciplines?.map((item, index, arr) => {
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
                                        {item.rank &&
                                        <>
                                            <span className="card-specialist__content-data">{item.rank}</span>
                                        </>
                                        }
                                    </div>

                                </div>
                            )
                        })
                        }


                        {isSpecialist && moreData && additionalDisciplines
                        && additionalDisciplines.map((additionalDiscipline, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className={!moreData && index > 0 ? "card-specialist__specialization-inner __hide" : "card-specialist__specialization-inner"}>
                                        <p className="card-specialist__specialization">Специализация</p>
                                        <p className="card-specialist__subtitle">{additionalDiscipline.specialization}</p>
                                        {additionalDiscipline?.disciplines?.map((rank, index) => {
                                            return (
                                                <div className="card-specialists__grid-item" key={index}>
                                                    <div className="card-specialist__disciplines" style={{ whiteSpace: "nowrap" }}>
                                                        {index === 0 && <div className="card-specialist__content-title">Дисциплины</div>}

                                                        <div className="card-specialist__disciplines-inner" style={{ flexDirection: 'row' }}>

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
                        }

                    </div>
                </div>
            </div>

            <div className={`card-specialist__controls`}>
                <button disabled>Страница пользователя</button>
                <Share url={`https://rkf.online`} />
                <div>
                    <>
                        {!moreData && <span className="card-specialist__more" onClick={onShowMoreClick}> Полная информация</span>}
                        {moreData && <span className="card-specialist__more" onClick={() => setMoreData(!moreData)}>Скрыть</span>}
                    </>
                </div>
            </div>
        </Card>
    )
};

export default React.memo(CardSpecialist);