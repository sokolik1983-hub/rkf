import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Card from "../../components/Card";
import NewsList from "./components/NewsList";
import HomepageSlider from "./components/HomepageSlider";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
// import HomepageCheckStatus from "./components/HomepageCheckStatus";
import ClubsMap from "../../components/ClubsMap";
import Statistics from "../../components/Statistics";
import { RKFInfo, exhibitions } from "./config";
import StickyBox from "react-sticky-box";
import "./index.scss";

const HomePage = ({ homepage, cities }) => {
    const { current_active_type } = homepage.news;
    return (
        <Layout showCopyright={false}>
            <div className="home-page__wrap">
                <HomepageSlider />
                <ExhibitionsComponent />
                <Container className="home-page__news" >
                    <div className="home-page__news-wrap">
                        <NewsList
                            listNotFound="Новости не найдены"
                            listClass="news-list"
                            isFullDate={false}
                            currentActiveType={current_active_type}
                            citiesDict={cities.options}
                        />
                        <Aside className="home-page__right">
                            <StickyBox offsetTop={65}>
                                <div className="home-page__right-wrap">
                                    <Card className="home-page__about">
                                        <h3>{RKFInfo.aboutTitle}</h3>
                                        <p>{RKFInfo.about}</p>
                                    </Card>
                                    <Card className="home-page__socials">
                                        <h3>РКФ в соцсетях</h3>
                                        <div className="home-page__right-socials">
                                            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/ruskynologfed/"><img src="/static/icons/social/facebook.svg" alt="" /></a>
                                            <a target="_blank" rel="noopener noreferrer" href="https://vk.com/ruskynologfed"><img src="/static/icons/social/vk.svg" alt="" /></a>
                                            {/* <a target="_blank" rel="noopener noreferrer" href="https://ok.ru/rkforg"><img src="/static/icons/social/odnoklassniki.svg" alt="" /></a>
                                            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/ruskynologfed"><img src="/static/icons/social/twitter.svg" alt="" /></a> */}
                                            <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UC1mzNt3TccDxGfA-vkEAQig"><img src="/static/icons/social/youtube.svg" alt="" /></a>
                                            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/russiankynologfed/"><img src="/static/icons/social/instagram.svg" alt="" /></a>
                                            <a target="_blank" rel="noopener noreferrer" href="https://t.me/RkfOnlineOfficial"><img src="/static/icons/social/telegram.svg" alt="" /></a>
                                        </div>
                                    </Card>
                                    <Statistics />
                                    <Card className="home-page__projects-wrap">
                                        <h3>Международные мероприятия</h3>
                                        <div className="home-page__projects">
                                            {exhibitions.map(i => (
                                                <a key={i.id} href={i.url} title={i.name} target="_blank" rel="noreferrer noopener">
                                                    <img src={i.logo} alt={i.name} />
                                                </a>
                                            ))}
                                        </div>
                                    </Card>
                                    <Card className="home-page__map-wrap">
                                        <h3><Link className="Homepage__map-title" to="/clubs-map">Карта авторизованных клубов</Link></h3>
                                        <div className="home-page__map">
                                            <ClubsMap />
                                        </div>
                                    </Card>
                                    <div className="home-page__copy-wrap">
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

const mapStateToProps = state => ({ homepage: state.homepage, cities: state.dictionaries.cities });
export default React.memo(connect(mapStateToProps)(HomePage));