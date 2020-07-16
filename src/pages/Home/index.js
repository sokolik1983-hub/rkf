import React, { useState, useEffect, useRef } from "react";
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
// import Statistics from "./components/Statistics";
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
    const [prevPosition, setPrevPosition] = useState(null);

    const buildNewsQuery = () => newsFilter && `${endpointGetNews}?size=10&page=${page ? page : 1}${newsFilter.city && newsFilter.city.value ? `&fact_city_ids=${newsFilter.city.value}` : ''}${newsFilter.activeType ? `&${newsFilter.activeType}=true` : ''}`;

    const onSuccess = (data) => {
        getNewsSuccess({
            ...data,
            current_page: page,
            current_active_type: newsFilter.activeType
        });
    };

    const sidebarRef = useRef(null);
    useEffect(() => {
        const scrollListener = () => {
            let el = sidebarRef.current;
            let winHeight = window.innerHeight;
            let elHeight = el.offsetHeight;
            let winTop = window.scrollY;

            if (winTop > prevPosition) { // Scroll down
                setPrevPosition(winTop);
                if (winTop >= (elHeight + 1040) - winHeight) {
                    if (!el.classList.contains('home-page__right-wrap--fixed') && !el.style.top && !el.style.bottom) {
                        el.classList.add("home-page__right-wrap--fixed");
                        el.style.bottom = 0;
                        el.style.removeProperty('margin-top');
                    } else {
                        if (el.style.marginTop && (winTop >= (elHeight + 1040) - winHeight + parseInt(el.style.marginTop))) {
                            el.classList.add("home-page__right-wrap--fixed");
                            el.style.bottom = 0;
                            el.style.removeProperty('top');
                            el.style.removeProperty('margin-top');
                        } else {
                            if (el.style.top && el.classList.contains('home-page__right-wrap--fixed')) {
                                el.classList.remove("home-page__right-wrap--fixed");
                                el.style.marginTop = `${(winHeight - elHeight) + (winTop - 990) + (elHeight - winHeight)}px`;
                            }
                        }
                    }
                    if (winTop >= 2490) {
                        el.classList.remove("home-page__right-wrap--fixed");
                        el.style.marginTop = `1000px`;
                    }
                } else {
                    if (el.classList.contains('home-page__right-wrap--fixed') && !el.style.bottom) {
                        el.classList.remove("home-page__right-wrap--fixed");
                        el.style.marginTop = `${(winHeight - elHeight) + (winTop - 980) + (elHeight - winHeight)}px`;
                    }
                }
            } else { // Scroll up
                setPrevPosition(winTop);
                if (winTop >= 970) {
                    if (!el.classList.contains("home-page__right-wrap--fixed")) {
                        if (winTop <= (970 + parseInt(el.style.marginTop))) {
                            el.classList.add("home-page__right-wrap--fixed");
                            el.style.top = '60px';
                            el.style.removeProperty('bottom');
                            el.style.removeProperty('margin-top');
                        }
                    }
                    else {
                        if (el.style.bottom) {
                            el.style.removeProperty('top');
                            el.classList.remove("home-page__right-wrap--fixed");
                            el.style.marginTop = `${(winHeight - elHeight) + (winTop - 1020)}px`;
                        }
                    }

                } else {
                    el.classList.remove("home-page__right-wrap--fixed");
                    el.style.removeProperty('top');
                    el.style.removeProperty('margin-top');
                }

                setPrevPosition(winTop);
            }

        };

        window.addEventListener('scroll', scrollListener);
        return () => window.removeEventListener('scroll', scrollListener);
    }, [prevPosition]);

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
                        <div className="home-page__right-wrap" ref={sidebarRef}>
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
                            {/* <Statistics /> */}
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
                                <h3>Карта авторизованных клубов</h3>
                                <div className="home-page__map">
                                    <ClubsMap />
                                </div>
                            </Card>
                            {/* <Card>
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
                        </Card> */}
                        </div>
                    </Aside>
                </div>
            </Container>
            {/* <Container className="home-page__partners">
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
            </Container> */}
        </Layout >
    )
};

const mapStateToProps = state => ({ homepage: state.homepage });

export default connect(mapStateToProps)(connectNewsList(HomePage));
