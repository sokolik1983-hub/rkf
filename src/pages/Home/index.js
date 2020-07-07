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
//import ExhibitionsSlider from "./components/ExhibitionsSlider";
import HomepageCheckStatus from "./components/HomepageCheckStatus";
import Statistics from "./components/Statistics";
import HorizontalSwipe from "../../components/HorozintalSwipe";
import ClubsMap from "../../components/ClubsMap";
import { endpointGetNews, RKFInfo, partners, exhibitions } from "./config";
import { connectNewsList } from "./connectors";
import { useResourceAndStoreToRedux } from "../../shared/hooks";
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

    const buildNewsQuery = () => newsFilter && `${endpointGetNews}?size=4&page=${page ? page : 1}${newsFilter.city && newsFilter.city.value ? `&fact_city_ids=${newsFilter.city.value}` : ''}${newsFilter.activeType ? `&${newsFilter.activeType}=true` : ''}`;

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
                <h3 className="Homepage__news-title">Новости</h3>
                <div className="home-page__news-wrap">
                    <NewsList
                        list={articles}
                        listNotFound="Новости не найдены"
                        listClass="news-list"
                        isFullDate={false}
                        pagesCount={Math.ceil(articles_count / 4)}
                        currentPage={page}
                        setPage={setPage}
                        setNewsFilter={setNewsFilter}
                        currentActiveType={current_active_type}
                        currentCity={newsFilter.city}
                        citiesDict={cities}
                        loading={loading}
                    />
                    <Aside className="home-page__right">
                        <Card>
                            <h3>{RKFInfo.aboutTitle}</h3>
                            <p>{RKFInfo.about}</p>
                        </Card>
                        <Statistics />
                        <HomepageCheckStatus />
                        <Card>
                            <div className="home-page__projects">
                                <h3>Наши проекты</h3>
                                <p>
                                    <a href="http://rkf.org.ru/" target="_blank" rel="noreferrer noopener">Официальный сайт РКФ</a>
                                </p>
                                <p>
                                    <span className="disabled">Образовательный портал</span>
                                </p>
                                <p>
                                    <a href="https://help.rkf.online/ru/knowledge_base/" target="_blank" rel="noreferrer noopener">База знаний</a>
                                </p>
                                <p>
                                    <a href="http://rkfshow.ru/" target="_blank" rel="noreferrer noopener">Запись на мероприятия</a>
                                </p>
                            </div>
                        </Card>
                    </Aside>
                </div>
            </Container>
            <Container className="home-page__partners">
                <h3 className="Homepage__partners-header">Наши партнеры</h3>
                <div className="Homepage__partners-wrap">
                    <HorizontalSwipe id="Homepage__partners-list">
                        <ul className="Homepage__partners-list">
                            {partners.map(i => (
                                <li key={i.id}>
                                    <a href={i.url} title={i.title} target="_blank" rel="noreferrer noopener">
                                        <img src={i.img} alt={i.title} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </HorizontalSwipe>
                </div>

                <h3 className="Homepage__exhibitions-header">Международные мероприятия</h3>
                <div className="Homepage__exhibitions-wrap">
                    <HorizontalSwipe id="Homepage__exhibitions-list">
                        <ul className="Homepage__exhibitions-list">
                            {exhibitions.map(i => (
                                <li key={i.id}>
                                    <a href={i.url} title={i.name} target="_blank" rel="noreferrer noopener">
                                        <img src={i.logo} alt={i.name} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </HorizontalSwipe>
                </div>
                <h3 className="Homepage__map-header">
                    <Link className="Homepage__map-title" to="/clubs-map" target="_blank">Карта авторизованных клубов</Link>
                </h3>
                <div className="Homepage__map-wrap">
                    <ClubsMap />
                </div>
            </Container>
        </Layout>
    )
};

const mapStateToProps = state => ({ homepage: state.homepage });

export default connect(mapStateToProps)(connectNewsList(HomePage));
