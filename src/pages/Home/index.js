import React, { useEffect, useState } from "react";
import Swipe from 'react-easy-swipe';
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Card from "../../components/Card";
import NewsList from "./components/NewsList";
import HomepageSlider from "./components/HomepageSlider";
import ExhibitionsSlider from "./components/ExhibitionsSlider";
import {endpointGetNews, RKFInfo, partners, exhibitions} from "./config";
import { connect } from "react-redux";
import { connectNewsList } from 'apps/HomePage/connectors';
import { useResourceAndStoreToRedux } from 'shared/hooks';
import './index.scss';

const HomePage = ({ homepage, getNewsSuccess }) => {
    const [newsFilter, setNewsFilter] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        newsFilter && buildNewsQuery()
    }, [page]);

    const buildNewsQuery = () => newsFilter && `${endpointGetNews}?size=4&page=${page ? page : 1}${newsFilter.city && newsFilter.city.value ? `&fact_city_ids=${newsFilter.city.value}` : ''}${newsFilter.activeType ? `&${newsFilter.activeType}=true` : ''}`;

    const { loading } = useResourceAndStoreToRedux(buildNewsQuery(), getNewsSuccess);

    const { articles, articles_count } = homepage.news;

    const onPartnersSwipe = (position, event) => {
      console.log('position', position.x);
      console.log('event', event);
    };

    const onExhibitionsSwipe = (position, event) => {
      console.log('position', position.x);
      console.log('event', event);
    };

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
                                    <span>Официальный сайт РКФ</span>
                                    <a className="link" href="http://rkf.org.ru/">rkf.org.ru</a>
                                </p>
                                <p>
                                    <span>Образовательный портал</span>
                                    <a className="link" href="http://rkf.org.ru/">rkf.org.ru</a>
                                </p>
                                <p>
                                    <span>Запись на выставки</span>
                                    <a className="link" href="http://rkf.org.ru/">rkf.org.ru</a>
                                </p>
                            </div>
                        </Card>
                    </Aside>
                </div>
            </Container>
            <Container className="home-page__partners">
                <h3 className="Homepage__partners-header">Наши партнеры</h3>
                <div className="Homepage__partners-wrap">
                    <Swipe className="Homepage__partners-list" onSwipeMove={onPartnersSwipe}>
                        {
                            partners.map((i) => {
                                return <a href={i.url} title={i.title} key={i.id}>
                                    <img src={i.img} alt={i.title} />
                                </a>
                            })
                        }
                    </Swipe>
                </div>

                <h3 className="Homepage__exhibitions-header">Всероссийские выставки</h3>
                <div className="Homepage__exhibitions-wrap">
                    <Swipe className="Homepage__exhibitions-list" onSwipeMove={onExhibitionsSwipe}>
                        {
                            exhibitions.map((i) => {
                                return <a href={i.url} title={i.name} key={i.id}>
                                    <img src={i.logo} alt={i.name} />
                                </a>
                            })
                        }
                    </Swipe>
                </div>

                <h3 className="Homepage__map-header">Карта клубов</h3>
                <div className="Homepage__map-wrap">
                    <iframe src="http://tables.uep24.ru/YMapDogClubs.html" title="Карта клубов" />
                </div>
            </Container>
        </Layout>
    )
};

const mapStateToProps = state => ({ homepage: state.homepage });

export default connect(mapStateToProps)(connectNewsList(HomePage));