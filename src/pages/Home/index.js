import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Card from "../../components/Card";
import List from "../../components/List";
import HomepageSlider from "./components/HomepageSlider";
import ExhibitionsSlider from "./components/ExhibitionsSlider";
import { endpointGetNews, RKFInfo, partners, exhibitions } from "./config";
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

    return (
        <Layout>
            <HomepageSlider />
            <ExhibitionsSlider />
            <Container>
                <h3 className="Homepage__news-header">Новости</h3>
                <div className="home-page">
                    <List
                        list={articles}
                        listNotFound="Новости не найдены"
                        listClass="news-list"
                        isFullDate={false}
                        pagesCount={Math.ceil(articles_count / 4)}
                        currentPage={page}
                        setPage={setPage}
                        isHomepage={true}
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
                                    Официальный сайт РКФ<br />
                                    <a className="link" href="http://rkf.org.ru/">rkf.org.ru</a>
                                </p>
                                <p>
                                    Образовательный портал<br />
                                    ...
                                </p>
                                <p>
                                    Запись на выставки
                                    <br />...
                                </p>
                            </div>
                        </Card>
                    </Aside>
                </div>
            </Container>
            <Container>
                <h3 className="Homepage__partners-header">Наши партнеры</h3>
                <div className="Homepage__partners-wrap">
                    {
                        partners.map((i) => {
                            return <a href={i.url} title={i.title} key={i.id}>
                                <img src={i.img} alt={i.title} />
                            </a>
                        })
                    }
                </div>

                <h3 className="Homepage__exhibitions-header">Всероссийские выставки</h3>
                <div className="Homepage__exhibitions-wrap">
                    {
                        exhibitions.map((i) => {
                            return <a href={i.url} title={i.name} key={i.id}>
                                <img src={i.logo} alt={i.name} />
                            </a>
                        })
                    }
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