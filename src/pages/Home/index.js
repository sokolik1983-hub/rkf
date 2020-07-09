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

    const [activeType, setActiveType] = useState(false);
    const [prevPosition, setPrevPosition] = useState(null);
    const handleClick = (e) => {
        e.preventDefault();
        setActiveType(e.target.name);
    };



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
                if (winTop >= (elHeight + 1250) - winHeight) {
                    if (!el.classList.contains('home-page__right-wrap--fixed') && !el.style.top && !el.style.bottom) {
                        el.classList.add("home-page__right-wrap--fixed");
                        el.style.bottom = 0;
                        el.style.removeProperty('margin-top');
                    } else {
                        if (el.style.marginTop && (winTop >= (elHeight + 1250) - winHeight + parseInt(el.style.marginTop))) {
                            el.classList.add("home-page__right-wrap--fixed");
                            el.style.bottom = 0;
                            el.style.removeProperty('top');
                            el.style.removeProperty('margin-top');
                        } else {
                            if (el.style.top && el.classList.contains('home-page__right-wrap--fixed')) {
                                el.classList.remove("home-page__right-wrap--fixed");
                                el.style.marginTop = `${(winHeight - elHeight) + (winTop - 1100) + (elHeight - winHeight)}px`;
                            }
                        }
                    }
                    if (winTop >= 2620) {
                        el.classList.remove("home-page__right-wrap--fixed");
                        el.style.marginTop = `910px`;
                    }
                } else {
                    if (el.classList.contains('home-page__right-wrap--fixed') && !el.style.bottom) {
                        el.classList.remove("home-page__right-wrap--fixed");
                        el.style.marginTop = `${(winHeight - elHeight) + (winTop - 1150) + (elHeight - winHeight)}px`;
                    }
                }
            } else { // Scroll up
                setPrevPosition(winTop);
                if (winTop >= 1100) {
                    if (!el.classList.contains("home-page__right-wrap--fixed")) {
                        if (winTop <= (1180 + parseInt(el.style.marginTop))) {
                            el.classList.add("home-page__right-wrap--fixed");
                            el.style.top = '80px';
                            el.style.removeProperty('bottom');
                            el.style.removeProperty('margin-top');
                        }
                    }
                    else {
                        if (el.style.bottom) {
                            el.style.removeProperty('top');
                            el.classList.remove("home-page__right-wrap--fixed");
                            el.style.marginTop = `${(winHeight - elHeight) + (winTop - 1230)}px`;
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
                <div className="Homepage__news-title-wrap">
                    <h3 className="Homepage__news-title">Публикации</h3>
                    <ul className="ListFilter">
                        <li><a href="/" onClick={handleClick} className={!activeType ? 'active' : undefined}>Все</a></li>
                        <li><a href="/" onClick={handleClick} name="news" className={activeType === 'news' ? 'active' : undefined}>Новости</a></li>
                        <li style={{ opacity: '0.5' }}><span>Объявления</span></li>
                    </ul>
                </div>
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
                            {/* <Statistics /> */}
                            <HomepageCheckStatus />
                            <Card>
                                <h3>Международные мероприятия</h3>
                                <div className="home-page__projects">
                                    {exhibitions.map(i => (
                                        <a key={i.id} href={i.url} title={i.name} target="_blank" rel="noreferrer noopener">
                                            <img src={i.logo} alt={i.name} />
                                        </a>
                                    ))}
                                </div>
                            </Card>
                            <Card>
                                <h3>Карта авторизованных клубов</h3>
                                <div className="home-page__map-wrap">
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
        </Layout>
    )
};

const mapStateToProps = state => ({ homepage: state.homepage });

export default connect(mapStateToProps)(connectNewsList(HomePage));
