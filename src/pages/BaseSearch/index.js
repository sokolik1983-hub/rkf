import React, { useState } from "react";
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
// import PublicationSearch from "./components/PublicationSearch";
import { Link } from "react-scroll";
import "./index.scss";


const BaseSearch = () => {
    const [found_info_clicked, setFoundInfoClicked] = useState(false);
    const [status_clicked, setStatusClicked] = useState(false);
    const [registration_clicked, setRegistrationClicked] = useState(false);
    const [stamp_clicked, setStampClicked] = useState(false);
    const [referee_clicked, setRefereeClicked] = useState(false);
    // const [publication_clicked, setPublicationClicked] = useState(false);

    const handleActiveReset = () => {
        setFoundInfoClicked(false);
        setStatusClicked(false);
        setRegistrationClicked(false);
        setStampClicked(false);
        setRefereeClicked(false);
        // setPublicationClicked(false);
    };

    return (
        <Layout>
            <div className="redesign">
                <Container className="content base-search">
                    <div className="base-search__content-wrap">
                        <div className="base-search__content">
                            <FoundInfo found_info_clicked={found_info_clicked} />
                            <CheckStatus status_clicked={status_clicked} />
                            <CheckRegistration registration_clicked={registration_clicked} />
                            <StampSearch stamp_clicked={stamp_clicked} />
                            <RefereeSearch referee_clicked={referee_clicked} />
                            {/* <PublicationSearch publication_clicked={publication_clicked} /> */}
                        </div>
                        <Aside className="base-search__info">
                            <StickyBox offsetTop={65}>
                                <div className="base-search__info-inner">
                                    <OutsideClickHandler onOutsideClick={handleActiveReset}>
                                        <Card>
                                            <h3>Поиск</h3>
                                            <ul className="menu-component__list">
                                                <li className="menu-component__item">
                                                    <Link
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
                                                </Link>
                                                </li>
                                                <li className="menu-component__item">
                                                    <Link
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
                                                </Link>
                                                </li>
                                                <li className="menu-component__item">
                                                    <Link
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
                                                </Link>
                                                </li>
                                                <li className="menu-component__item">
                                                    <Link
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
                                                </Link>
                                                </li>
                                                <li className="menu-component__item">
                                                    <Link
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
                                                </Link>
                                                </li>
                                                <li className="menu-component__item _disabled">
                                                    <Link
                                                        to="publication-search-anchor"
                                                        spy={true}
                                                        smooth={true}
                                                        offset={-60}
                                                        duration={500}
                                                        className="menu-component__link"
                                                        title="Поиск по объявлениям"
                                                        // onClick={() => {
                                                        //     handleActiveReset();
                                                        //     setPublicationClicked(true);
                                                        // }}
                                                        disabled={true}
                                                    >
                                                        Поиск по объявлениям
                                                </Link>
                                                </li>
                                            </ul>
                                        </Card>
                                    </OutsideClickHandler>
                                    <Card className="base-search__card">
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
                                        <h3><a className="base-search__map-title" href="/clubs-map">Карта авторизованных клубов</a></h3>
                                        <div className="base-search__map">
                                            <ClubsMap />
                                        </div>
                                    </Card>
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