import React, { useState, useEffect } from "react";
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

    const [clubAlias, setClubAlias] = useState('');
    const [nurseryAlias, setNurseryAlias] = useState('');
    const [alert, seAlert] = useState(false);
    const [clubData, setClubData] = useState(null);
    const [nurseryData, setNurseryData] = useState(null);

    const requestInfoClub = async (clubAlias) => {
        await Request({
            url: '/api/Club/public/' + clubAlias
        }, data => {
            setClubData(data);
            console.log(data);
        }, error => {
            console.log(error.response);
        });
    };

    const requestInfoNursery = async (nurseryAlias) => {
        await Request({
            url: '/api/nurseries/nursery/public/' + nurseryAlias
        }, data => {
            setNurseryData(data);
            console.log(data);
        }, error => {
            console.log(error.response);
        });
    };

    useEffect(() => {
        const organizationData = parseLocationSearch(window.location.search);
        let [orgDataList] = organizationData;
        let [orgType, alias] = orgDataList;
        if (orgType === 'clubAlias') {
            setClubAlias(alias);
            requestInfoClub(alias);
            window.scrollTo(0, 0);
        } else if (orgType === 'nurseryAlias') {
            setNurseryAlias(alias);
            requestInfoNursery(alias);
            window.scrollTo(0, 0);
        }
    }, [])

    const handleActiveReset = () => {
        setFoundInfoClicked(false);
        setStatusClicked(false);
        setRegistrationClicked(false);
        setStampClicked(false);
        setRefereeClicked(false);
    };

    const handleBrokenLinkClick = e => {
        e.preventDefault();
        seAlert(true);
    };

    return (
        <Layout>
            <div className="redesign">
                <Container className="content base-search">
                {clubAlias && <TopComponent
                    // logo={clubLogo}
                    // name={clubName}
                    canEdit={false}
                    withShare={false}
                />}
                {nurseryAlias && <TopComponent
                    // logo={nurseryLogo}
                    // name={nurseryName}
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
                            <PublicationSearch />
                        </div>
                        <Aside className="base-search__info">
                            <StickyBox offsetTop={65}>
                                <div className="base-search__info-inner">
                                    {clubAlias ? <>
                                        <CustomMenu title="Личный кабинет">
                                            <Link to={`/${clubAlias}/documents`} title="Оформление документов">Оформление документов</Link>
                                            <Link to={`/${clubAlias}/documents/responsible`} title="Организационная информация">Организационная информация</Link>
                                            <Link to={`/${clubAlias}/documents/stamps`} title="Клейма">Клейма</Link>
                                            <Link to="/reports" title="Отчеты" onClick={handleBrokenLinkClick}>Отчеты</Link>
                                            <Link to={`/base-search?clubAlias=${clubAlias}`}>Поиск по базе РКФ</Link>
                                            <Link to={`/${clubAlias}/documents/bookform`}>Запись на очный прием</Link>
                                            <Link to={`/${clubAlias}/documents/review`}>Оценка работы федерации</Link>
                                            <Link to={`/${clubAlias}`} title="Страница клуба">Страница клуба</Link>
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
                                    nurseryAlias ? <CustomMenu title="Личный кабинет">
                                        <Link to={`/kennel/${nurseryAlias}/documents`} title="Оформление документов">Оформление документов</Link>
                                        <Link to={`/kennel/${nurseryAlias}/documents/responsible`} title="Организационная информация">Организационная информация</Link>
                                        <Link to={`/base-search?alias=${nurseryAlias}&type=nursery`}>Поиск по базе РКФ</Link>
                                        {/*<Link to={`/kennel/${nurseryAlias}/documents/stamps`} title="Клейма">Клейма</Link>*/}
                                        {/*<Link to="/reports" title="Отчеты" onClick={handleBrokenLinkClick}>Отчеты</Link>*/}
                                        <Link to={`/kennel/${nurseryAlias}/documents/bookform`}>Запись на очный прием</Link>
                                        <Link to={`/kennel/${nurseryAlias}/documents/review`}>Оценка работы федерации</Link>
                                        <Link to={`/kennel/${nurseryAlias}`} title="Страница питомника">Страница питомника</Link>
                                    </CustomMenu>
                                    :
                                    <>
                                        <OutsideClickHandler onOutsideClick={handleActiveReset}>
                                            <Card>
                                                <h3>Поиск</h3>
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