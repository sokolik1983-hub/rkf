import React, { useState, useEffect } from "react";
import { useTimeOut } from "../../shared/hooks.js";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import CheckStatus from "../Club/components/CheckStatus";
import CheckRegistration from "./components/CheckRegistration"
import FoundInfo from "./components/FoundInfo";
import StickyBox from "react-sticky-box";
import Aside from "../../components/Layouts/Aside";
import Card from "../../components/Card";
import ClubsMap from "../../components/ClubsMap";
import Statistics from "../../components/Statistics";
import StampSearch from "./components/StampSearch";
import RefereeSearch from "./components/RefereeSearch";
import OutsideClickHandler from "react-outside-click-handler";
import CustomMenu from "../../components/CustomMenu";
import Alert from "../../components/Alert";
import TopComponent from "../../components/TopComponent";
import { Link as LinkScroll } from "react-scroll";
import { Link } from "react-router-dom";
import PublicationSearch from "./components/PublicationSearch";
import { parseLocationSearch } from "./utils.js";
import { Request } from "../../utils/request";
import "./index.scss";


const BaseSearch = () => {
    const [found_info_clicked, setFoundInfoClicked] = useState(false);
    const [status_clicked, setStatusClicked] = useState(false);
    const [registration_clicked, setRegistrationClicked] = useState(false);
    const [stamp_clicked, setStampClicked] = useState(false);
    const [referee_clicked, setRefereeClicked] = useState(false);
    const [publication_clicked, setPublicationClicked] = useState(false);

    const [alert, seAlert] = useState(false);
    const [clubData, setClubData] = useState(null);
    const [nurseryData, setNurseryData] = useState(null);

    useEffect(() => {
        const organizationData = parseLocationSearch(window.location.search);
        let [orgType, alias] = organizationData[0];
        if (orgType === 'clubAlias') {

            (() => Request({ url: `/api/Club/public/${alias}` },
                data => {
                    setClubData(data);
                    console.log(data)
                },
                error => {
                    console.log(error.response);
                }))();
        } else if (orgType === 'nurseryAlias') {

            (() => Request({ url: `/api/nurseries/nursery/public/${alias}` },
                data => {
                    setNurseryData(data);
                },
                error => {
                    console.log(error.response);
                }))();
        }
        window.scrollTo(0, 0);
    }, [])

    const handleActiveReset = () => {
        setFoundInfoClicked(false);
        setStatusClicked(false);
        setRegistrationClicked(false);
        setStampClicked(false);
        setRefereeClicked(false);
        setPublicationClicked(false);
    };

    const handleBrokenLinkClick = e => {
        e.preventDefault();
        seAlert(true);
    };

    useTimeOut(handleActiveReset, 2000);

    return (
        <Layout>
            <div className="redesign">
                <Container className="content base-search">
                    {clubData && <TopComponent
                        logo={clubData ? clubData.logo_link : ``}
                        name={clubData ? clubData.title : ``}
                        canEdit={false}
                        withShare={false}
                    />}
                    {nurseryData && <TopComponent
                        logo={nurseryData ? nurseryData.logo_link : ``}
                        name={nurseryData ? nurseryData.name : ``}
                        canEdit={false}
                        withShare={false}
                    />}
                    <div className="base-search__content-wrap">
                        <div className="base-search__content">
                            <FoundInfo found_info_clicked={found_info_clicked} />
                            <CheckStatus status_clicked={status_clicked} />
                            <CheckRegistration registration_clicked={registration_clicked} />
                            <StampSearch stamp_clicked={stamp_clicked} />
                            <RefereeSearch referee_clicked={referee_clicked} />
                            <PublicationSearch publication_clicked={publication_clicked} />
                        </div>
                        <Aside className="base-search__info">
                            <StickyBox offsetTop={65}>
                                <div className="base-search__info-inner">
                                    {clubData ? <>
                                        <CustomMenu title="Личный кабинет">
                                            <Link to={`/${clubData.club_alias}/documents`} title="Оформление документов" className="menu-component__link menu-component__link--documents">Оформление документов</Link>
                                            <Link to={`/${clubData.club_alias}/documents/responsible`} title="Организационная информация" className="menu-component__link menu-component__link--org">Организационная информация</Link>
                                            <Link to={`/${clubData.club_alias}/documents/stamps`} title="Клейма" className="menu-component__link menu-component__link--stain">Клейма</Link>
                                            <Link to="/reports" title="Отчеты" onClick={handleBrokenLinkClick} className="menu-component__link menu-component__link--report">Отчеты</Link>
                                            <Link to={`/base-search?clubAlias=${clubData.club_alias}`} className="menu-component__link--search">Поиск по базе РКФ</Link>
                                            <Link to={`/${clubData.club_alias}/documents/bookform`} className="menu-component__link menu-component__link--appointment">Запись на очный прием</Link>
                                            <Link to={`/${clubData.club_alias}/documents/review`} className="menu-component__link menu-component__link--mark">Оценка работы федерации</Link>
                                            <Link to={`/${clubData.club_alias}`} title="Страница клуба" className="menu-component__link menu-component__link--club">Страница клуба</Link>
                                        </CustomMenu>
                                        {alert &&
                                            <Alert
                                                title="Внимание!"
                                                text="Раздел находится в разработке."
                                                autoclose={1.5}
                                                onOk={() => seAlert(false)}
                                            />
                                        }
                                    </>
                                    :
                                    nurseryData ? <CustomMenu title="Личный кабинет">
                                        <Link to={`/kennel/${nurseryData.alias}/documents`} title="Оформление документов" className="menu-component__link menu-component__link--documents">Оформление документов</Link>
                                        <Link to={`/kennel/${nurseryData.alias}/documents/responsible`} title="Организационная информация"  className="menu-component__link menu-component__link--org">Организационная информация</Link>
                                        <Link to={`/base-search?nurseryAlias=${nurseryData.alias}`} className="menu-component__link--search">Поиск по базе РКФ</Link>
                                        <Link to={`/kennel/${nurseryData.alias}/documents/bookform`} className="menu-component__link menu-component__link--appointment">Запись на очный прием</Link>
                                        <Link to={`/kennel/${nurseryData.alias}/documents/review`} className="menu-component__link menu-component__link--mark">Оценка работы федерации</Link>
                                        <Link to={`/kennel/${nurseryData.alias}`} title="Страница питомника" className="menu-component__link menu-component__link--club">Страница питомника</Link>
                                    </CustomMenu>
                                    :
                                    <>
                                        <OutsideClickHandler onOutsideClick={handleActiveReset}>
                                            <Card className="menu-component__card">
                                                <h3 className="menu-component__title">Поиск</h3>
                                                <ul className="menu-component__list">
                                                    <li className="menu-component__item">
                                                        <LinkScroll
                                                            to="found-info-anchor"
                                                            spy={true}
                                                            smooth={true}
                                                            offset={-60}
                                                            duration={500}
                                                            className="menu-component__link"
                                                            title="Информация о найденных собаках"
                                                            onClick={() => {
                                                                handleActiveReset();
                                                                setFoundInfoClicked(true);
                                                            }}
                                                        >
                                                            Информация о найденных собаках
                                                        </LinkScroll>
                                                    </li>
                                                    <li className="menu-component__item">
                                                        <LinkScroll
                                                            to="check-status-anchor"
                                                            spy={true}
                                                            smooth={true}
                                                            offset={-60}
                                                            duration={500}
                                                            className="menu-component__link"
                                                            title="Статус документов"
                                                            onClick={() => {
                                                                handleActiveReset();
                                                                setStatusClicked(true);
                                                            }}
                                                        >
                                                            Статус документов
                                                        </LinkScroll>
                                                    </li>
                                                    <li className="menu-component__item">
                                                        <LinkScroll
                                                            to="check-registration-anchor"
                                                            spy={true}
                                                            smooth={true}
                                                            offset={-60}
                                                            duration={500}
                                                            className="menu-component__link"
                                                            title="Регистационные данные собаки"
                                                            onClick={() => {
                                                                handleActiveReset();
                                                                setRegistrationClicked(true);
                                                            }}
                                                        >
                                                            Регистационные данные собаки
                                                        </LinkScroll>
                                                    </li>
                                                    <li className="menu-component__item">
                                                        <LinkScroll
                                                            to="stamp-search-anchor"
                                                            spy={true}
                                                            smooth={true}
                                                            offset={-60}
                                                            duration={500}
                                                            className="menu-component__link"
                                                            title="Поиск клуба/питомника"
                                                            onClick={() => {
                                                                handleActiveReset();
                                                                setStampClicked(true);
                                                            }}
                                                        >
                                                            Поиск клуба/питомника по клейму
                                                        </LinkScroll>
                                                    </li>
                                                    <li className="menu-component__item">
                                                        <LinkScroll
                                                            to="referee-search-anchor"
                                                            spy={true}
                                                            smooth={true}
                                                            offset={-60}
                                                            duration={500}
                                                            className="menu-component__link"
                                                            title="Поиск судьи"
                                                            onClick={() => {
                                                                handleActiveReset();
                                                                setRefereeClicked(true);
                                                            }}
                                                        >
                                                            Поиск судьи
                                                        </LinkScroll>
                                                    </li>
                                                    <li className="menu-component__item">
                                                        <LinkScroll
                                                            to="publication-search-anchor"
                                                            spy={true}
                                                            smooth={true}
                                                            offset={-60}
                                                            duration={500}
                                                            className="menu-component__link"
                                                            title="Поиск по объявлениям"
                                                            onClick={() => {
                                                            handleActiveReset();
                                                            setPublicationClicked(true);
                                                        }}
                                                        >
                                                            Поиск по объявлениям
                                                        </LinkScroll>
                                                    </li>
                                                </ul>
                                            </Card>
                                        </OutsideClickHandler>
                                        <Card className="base-search__socials">
                                            <h3>РКФ в соцсетях</h3>
                                            <div className="base-search__right-socials">
                                                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ruskynologfed/"><img src="/static/icons/social/facebook.svg" alt="" /></a>
                                                <a target="_blank" rel="noopener noreferrer" href="https://vk.com/ruskynologfed"><img src="/static/icons/social/vk.svg" alt="" /></a>
                                                <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UC1mzNt3TccDxGfA-vkEAQig"><img src="/static/icons/social/youtube.svg" alt="" /></a>
                                                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/russiankynologfed/"><img src="/static/icons/social/instagram.svg" alt="" /></a>
                                                <a target="_blank" rel="noopener noreferrer" href="https://t.me/RkfOnlineOfficial"><img src="/static/icons/social/telegram.svg" alt="" /></a>
                                            </div>
                                        </Card>
                                        <Statistics />
                                        <Card className="base-search__map-wrap">
                                            <h3><Link className="base-search__map-title" to="/clubs-map">Карта авторизованных клубов</Link></h3>
                                            <div className="base-search__map">
                                                <ClubsMap />
                                            </div>
                                        </Card>
                                    </>
                                    }
                                    <div className="base-search__copy-wrap">
                                        <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                                        <p>Политика обработки персональных данных</p>
                                    </div>
                                </div>
                            </StickyBox>
                        </Aside>
                    </div>
                </Container>
            </div>
        </Layout>
    )
};

export default React.memo(BaseSearch);