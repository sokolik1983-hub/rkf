import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Card from "../../components/Card";
import NewsList from "./components/NewsList";
import HomepageSlider from "./components/HomepageSlider";
import ExhibitionsSlider from "./components/ExhibitionsSlider";
import HorizontalSwipe from "../../components/HorozintalSwipe";
import { endpointGetNews, RKFInfo, partners, exhibitions } from "./config";
import { connectNewsList } from 'apps/HomePage/connectors';
import { useResourceAndStoreToRedux } from 'shared/hooks';
import { YMaps, Map, ObjectManager } from 'react-yandex-maps';
import { Request } from "utils/request";
import './index.scss';

const CLubsMap = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        Request({
            url: 'http://192.168.6.34/GetDogClubs.ashx'
        }, data => {
            setData(data);
        }, error => {
            console.log(error.response);
        })
    }, []);

    return <YMaps>
        <Map defaultState={{ center: [55.76, 37.64], zoom: 10 }} width="100%" height="100%">
            <ObjectManager
                options={{ clusterize: true, gridSize: 32, clusterDisableClickZoom: true }}
                objects={{ preset: 'islands#greenDotIcon' }}
                clusters={{ preset: 'islands#greenClusterIcons' }}
                defaultFeatures={data.features}
            />
        </Map>
    </YMaps>
};

function getCity() {
    const l = localStorage.getItem('GLOBAL_CITY');
    return l ? JSON.parse(l) : { label: 'Выберите город', value: null };
}

const HomePage = ({ homepage, getNewsSuccess }) => {
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
    }
    const { loading } = useResourceAndStoreToRedux(buildNewsQuery(), onSuccess);


    return (
        <Layout>
            <HomepageSlider />
            <ExhibitionsSlider />
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
                        loading={loading}
                    />
                    <Aside className="home-page__right">
                        <Card>
                            <h3>{RKFInfo.aboutTitle}</h3>
                            <p>{RKFInfo.about}</p>
                        </Card>
                        <Card>
                            <div className="home-page__projects">
                                <h3>Наши проекты</h3>
                                <p>
                                    <a href="http://rkf.org.ru/">Официальный сайт РКФ</a>
                                </p>
                                <p>
                                    <span>Образовательный портал</span>
                                </p>
                                <p>
                                    <a href="http://wiki.rkf.online/">База знаний</a>
                                </p>
                                <p>
                                    <a href="http://rkfshow.ru/">Запись на выставки</a>
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
                                    <a href={i.url} title={i.title}>
                                        <img src={i.img} alt={i.title} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </HorizontalSwipe>
                </div>

                <h3 className="Homepage__exhibitions-header">Всероссийские выставки</h3>
                <div className="Homepage__exhibitions-wrap">
                    <HorizontalSwipe id="Homepage__exhibitions-list">
                        <ul className="Homepage__exhibitions-list">
                            {exhibitions.map(i => (
                                <li key={i.id}>
                                    <a href={i.url} title={i.name}>
                                        <img src={i.logo} alt={i.name} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </HorizontalSwipe>
                </div>

                <h3 className="Homepage__map-header">Карта клубов</h3>
                <div className="Homepage__map-wrap">
                    <CLubsMap />
                </div>
            </Container>
        </Layout>
    )
};

const mapStateToProps = state => ({ homepage: state.homepage });

export default connect(mapStateToProps)(connectNewsList(HomePage));