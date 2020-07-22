import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Card from "../../components/Card";
import NewsList from "./components/NewsList";
import HomepageSlider from "./components/HomepageSlider";
import ExhibitionsComponent from "components/ExhibitionsComponent";
import HomepageCheckStatus from "./components/HomepageCheckStatus";
import ClubsMap from "../../components/ClubsMap";
import { endpointGetNews, RKFInfo, exhibitions } from "./config";
import { connectNewsList } from "./connectors";
import { useResourceAndStoreToRedux } from "../../shared/hooks";
import StickyBox from "react-sticky-box";
import "./index.scss";


function getCity() {
    const l = localStorage.getItem('GLOBAL_CITY');
    return l ? JSON.parse(l) : { label: 'Выберите город', value: null };
}

const HomePage = ({ homepage, getNewsSuccess, cities }) => {
    const { articles, articles_count, current_page, current_active_type } = homepage.news;
    const [newsFilter, setNewsFilter] = useState({
        city: getCity(),
        activeType: current_active_type
    });
    const [page, setPage] = useState(current_page);

    const buildNewsQuery = () => newsFilter && `${endpointGetNews}?size=10&page=${page ? page : 1}${newsFilter.city && newsFilter.city.value ? `&fact_city_ids=${newsFilter.city.value}` : ''}${newsFilter.activeType ? `&${newsFilter.activeType}=true` : ''}`;

    const onSuccess = (data) => {
        getNewsSuccess({
            ...data,
            current_page: page,
            current_active_type: newsFilter.activeType
        });
    };


    const { loading } = useResourceAndStoreToRedux(buildNewsQuery(), onSuccess);

    return (
        <Layout>
            <HomepageSlider />
            <ExhibitionsComponent />
            <Container className="home-page__news">
                <div className="home-page__news-wrap">
                    <NewsList
                        list={articles}
                        listNotFound="Новости не найдены"
                        listClass="news-list"
                        isFullDate={false}
                        pagesCount={Math.ceil(articles_count / 10)}
                        currentPage={page}
                        setPage={setPage}
                        setNewsFilter={setNewsFilter}
                        currentActiveType={current_active_type}
                        currentCity={newsFilter.city}
                        citiesDict={cities}
                        loading={loading}
                    />
                    <Aside className="home-page__right">
                        <StickyBox offsetTop={75}>
                            <div className="home-page__right-wrap">
                                <Card>
                                    <h3>{RKFInfo.aboutTitle}</h3>
                                    <p>{RKFInfo.about}</p>
                                </Card>
                                <Card>
                                    <h3 style={{ marginBottom: '12px' }}>РКФ в соцсетях</h3>
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
                                <HomepageCheckStatus />
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
                            </div>
                        </StickyBox>
                    </Aside>
                </div>
            </Container>
        </Layout >
    )
};

const mapStateToProps = state => ({ homepage: state.homepage });

export default connect(mapStateToProps)(connectNewsList(HomePage));
