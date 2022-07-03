import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Request} from "../../utils/request";
import {setFiltersToUrl} from "../../pages/Specialists/utils";
import LightTooltip from "../../components/LightTooltip";
import Card from "../Card";
import CardFooter from "../CardFooter";
import {judgeIcon} from "../Layouts/UserLayout/config";
import Avatar from "../Layouts/Avatar";

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
                            searchTypeId,
                            opened_group_and_breed,
                            ranks,
                            is_liked,
                            like_count,
                            owner_alias,
                        }) => {
    const [additionalDisciplines, setAdditionalDisciplines] = useState(null);
    const [additionalGroups, setAdditionalGroups] = useState(null);
    const [additionalContests, setAdditionalContests] = useState(null);
    const [additionalPhones, setAdditionalPhones] = useState(null);
    const [additionalEmails, setAdditionalEmails] = useState(null);
    const [moreData, setMoreData] = useState(false);
    const [isAllBreeder, setIsAllBreeder] = useState(false);
    const isSpecialist = searchTypeId === 3;
    const isJudge = searchTypeId === 4;
    const modifiedRanks = ranks?.split(',');

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
        <Card className="card-specialists">
            <div className="card-specialists__wrap">
                <div className="card-specialists__part card-specialists__part_top">
                    <Avatar
                        card="specialist-card"
                        data="specialist-card"
                        id={id}
                        logo={picture_link}
                        name={`${first_name} ${last_name}`}
                    />
                    <div className="card-specialists__inner">
                        <div className="card-specialists__info">

                            <div className="card-specialists__names">
                                {owner_alias ?
                                    <Link className="card-specialists__name"
                                        to={`/user/${owner_alias}`}
                                    >
                                        <div className="card-specialists__name-first">
                                            <span>{last_name}</span>
                                            {owner_alias && judgeIcon}
                                        </div>
                                        <span>
                                            {first_name || ''}{second_name ? ' ' + second_name : ''}
                                        </span>
                                    </Link>
                                    :
                                    <span className="card-specialists__name">
                                        <span>
                                            {last_name}
                                        </span>
                                        <span>
                                            {first_name || ''}{second_name ? ' ' + second_name : ''}
                                        </span>
                                    </span>
                                }
                                <span className="card-specialists__name-eng">
                                    {last_name_lat || ''}{first_name_lat ? ' ' + first_name_lat : ''}
                                </span>
                            </div>

                            <div className="card-specialists__city"
                                 onClick={() => setFiltersToUrl({ CityIds: [city_id] })}
                                 title={city_name}>
                                {city_name}
                            </div>

                            <div className="card-specialists__sertificate-block">
                                <span className="card-specialists__sertificate">
                                    {`Лист ${!isSpecialist ? 'судьи' : 'специалиста'} № `}<span>{cert_number}</span>
                                </span>
                            </div>
                        </div>

                        <div className="card-specialists__content">
                            <div className="card-specialists__contacts">
                                <div className="card-specialists__bottom-block">
                                    {phone && <div className="card-specialists__subtitle">
                                        <span className="card-specialists__contacts_bold">
                                            Телефон:&nbsp;
                                        </span>

                                        <div>
                                            <span>{phone}</span>
                                            {additionalPhones && moreData && additionalPhones.map((phone, index) => {
                                                return (
                                                    <span key={index}>
                                                    {phone}
                                                </span>
                                                )
                                            })}
                                        </div>
                                    </div>}

                                    <div className="card-specialists__subtitle">
                                        <span className="card-specialists__contacts_bold">
                                            E-mail:&nbsp;
                                        </span>
                                        <div>

                                    <span>
                                        {email ? email : 'не указан'}
                                    </span>

                                            {additionalEmails && moreData && additionalEmails.map((email, index) => {
                                                return (
                                                    <span key={index}
                                                          className="card-specialists__subtitle"
                                                    >
                                                {email}
                                            </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                { moreData && <div className={ "card-specialists__part card-specialists__part_bottom _open" }>
                    <div className="card-specialists__grid">
                        <div className="card-specialists__grid-item">
                            <div className="card-specialists__disciplines is_groups">
                                <div>

                                    { ranks &&
                                    <div className="card-specialists__rank-wrap">
                                        <span className="card-specialists__rank-title">Статус</span>
                                        <span className="card-specialists__ranks-group">
                                            { modifiedRanks.map((rank, index, arr) => {
                                                return (
                                                    <span
                                                        className="card-specialists__rank"
                                                        key={index}
                                                    >
                                                        { rank }
                                                        { rank !== 'САС в России и за рубежом' && index < arr.length - 1 && "," }&nbsp;
                                                    </span>
                                                )
                                            }) }
                                        </span>
                                    </div>
                                    }

                                    { isJudge && <>
                                        { <>
                                            <div className="card-specialists__content-title title-style">
                                                Группа, номер стандарта, название породы
                                            </div>

                                            <div>
                                                <span className="card-specialists__discipline">
                                                    { isAllBreeder ? 'ВСЕ ПОРОДЫ / ALL BREEDS' : opened_group_and_breed }
                                                </span>
                                            </div>
                                        </> }

                                        { additionalGroups && additionalGroups.map((item, index) =>  (
                                                <div
                                                    className={ !moreData && index >= 0 ? "card-specialists__grid-item __hide" : "card-specialists__grid-item " }
                                                    key={ index }>
                                                    <div>
                                                    <span className="card-specialists__discipline">
                                                        { !isAllBreeder && item }
                                                    </span>
                                                    </div>
                                                </div>
                                            )
                                        ) }

                                        { additionalContests && !!additionalContests.length && <>
                                            <div className="card-specialists__content-title title-style">Выставочные
                                                конкурсы</div>
                                            { additionalContests.map((item, index) => {
                                                    return (
                                                        <div
                                                            className={ !moreData && index >= 0 ? "card-specialists__grid-item __hide" : "card-specialists__grid-item" }
                                                            key={ index }>
                                                            <div>
                                                            <span className="card-specialists__discipline">
                                                                { item }
                                                            </span>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            ) }
                                        </> }
                                    </> }

                                    { additionalDisciplines && additionalDisciplines.map((item, index) => {
                                        return (
                                            <div className="card-specialists__section card-specialists__grid-item"
                                                 key={ index }
                                            >

                                                { !isSpecialist && <>
                                                    { item?.for_judge_examiner &&
                                                    <div className="card-specialists__examiner">
                                                        Экзаменатор
                                                    </div>
                                                    }

                                                    <div className="card-specialists__ranks">
                                                        <div className="card-specialists__rank">
                                                            { item.rank &&
                                                            <div>
                                                                <span
                                                                    className="card-specialists__rank-title">Ранг</span>
                                                                <span
                                                                    className="card-specialists__content-data">{ item.rank }</span>
                                                            </div>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="card-specialists__disciplines">
                                                        <div className="card-specialists__disciplines-inner">
                                                            <div
                                                                className="card-specialists__content-title">Дисциплины
                                                            </div>
                                                            <div className="card-specialists__disciplines-group">
                                                                { item?.disciplines?.map((item, index, arr) => {
                                                                    return (
                                                                        <LightTooltip
                                                                            title={ item.discipline_name || 'title' }
                                                                            enterDelay={ 100 } leaveDelay={ 50 }
                                                                            key={ index }>
                                                                            <span
                                                                                className="card-specialists__discipline">
                                                                                { item.discipline_short_name }
                                                                                { index < arr.length - 1 && "," }&nbsp;
                                                                            </span>
                                                                        </LightTooltip>
                                                                    )
                                                                }) }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </> }

                                                { isSpecialist &&
                                                <div className="card-specialists__specialization">
                                                    <p className="card-specialists__specialization-name">Специализация</p>
                                                    <p className="card-specialists__subtitle">{ item.specialization }</p>
                                                </div>
                                                }

                                                { isSpecialist && item?.disciplines?.map((discipline, index) =>  (
                                                        <div className="card-specialists__grid-item" key={ index }>
                                                            { discipline?.for_judge_examiner &&
                                                            <div className="card-specialists__examiner">
                                                                Экзаменатор
                                                            </div>
                                                            }

                                                            <div className="card-specialists__ranks">
                                                                { discipline?.rank &&
                                                                <div className="card-specialists__rank">
                                                                    <span
                                                                        className="card-specialists__rank-title">Ранг</span>
                                                                    <span
                                                                        className="card-specialists__content-data">{ discipline.rank }</span>
                                                                </div>
                                                                }
                                                            </div>

                                                            <div className="card-specialists__disciplines">
                                                                <div className="card-specialists__disciplines-inner">
                                                                    <div
                                                                        className="card-specialists__content-title">Дисциплины
                                                                    </div>

                                                                    <div
                                                                        className="card-specialists__disciplines-inner">

                                                                        { discipline?.disciplines?.map((discipline, index, arr) => {
                                                                            return (
                                                                                <LightTooltip
                                                                                    title={ discipline.discipline_name || 'title' }
                                                                                    enterDelay={ 100 } leaveDelay={ 50 }
                                                                                    key={ index }>
                                                                                <span
                                                                                    className="card-specialists__discipline">
                                                                                    { discipline.discipline_short_name }
                                                                                    { index < arr.length - 1 && "," }&nbsp;
                                                                                </span>
                                                                                </LightTooltip>
                                                                            )
                                                                        }) }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                ) }
                                            </div>
                                        )
                                    }) }
                                </div>
                            </div>
                        </div>
                    </div>
                </div> }
            </div>

            <div>
                {!moreData && <span className="card-specialists__more" onClick={onShowMoreClick}>
                    Подробнее...
                </span>}
                {moreData && <span className="card-specialists__more" onClick={() => setMoreData(!moreData)}>
                    Скрыть
                </span>}
            </div>

            <div className={`card-specialists__controls`}>
                <CardFooter
                    id={id}
                    share_link={owner_alias ? `${window.location.host}/user/${owner_alias}` : document.location.href}
                    is_liked={is_liked}
                    like_count={like_count}
                    likesOn={true}
                    type="judges"
                    userType={searchTypeId}
                />
            </div>
        </Card>
    )
};

export default React.memo(CardSpecialist);

