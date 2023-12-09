import React, {memo, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import StickyBox from "react-sticky-box";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Card from "../../components/Card";
import Banner from "../../components/Banner";
import CopyrightInfo from "../../components/CopyrightInfo";
import HomepageSlider from "./components/HomepageSlider";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
import NewsList from "./components/NewsList";
import ClubsMap from "../../components/ClubsMap";
import Statistics from "../../components/Statistics";
import {RKFInfo, exhibitions} from "./config";
import {BANNER_TYPES} from "../../appConfig";
import {Request} from "../../utils/request";
import useIsMobile from "../../utils/useIsMobile";
import "./index.scss";


const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [banners, setBanners] = useState({});
    const isMobile = useIsMobile(1101);

    useEffect(() => {
       (() => Request({
            url: `/api/banner?ids=${BANNER_TYPES.homePageSlider}&ids=${BANNER_TYPES.homePageRightSiteBar}&ids=${BANNER_TYPES.homePageArticle}`
        }, data => {
            setBanners({
                homePageSlider: data.filter(banner => banner.banner_type === BANNER_TYPES.homePageSlider),
                homePageRightSiteBar: data.find(banner => banner.banner_type === BANNER_TYPES.homePageRightSiteBar),
                homePageArticle: data.find(banner => banner.banner_type === BANNER_TYPES.homePageArticle)
            });

            setLoading(false);
        }, error => {
            console.log(error.response);
        }))();
    }, []);

    return loading ?
        <Loading /> :
        <Layout showCopyright={false}>
            <div className="home-page__wrap">
                <HomepageSlider inputBanners={banners.homePageSlider} />
                <ExhibitionsComponent />
                <Container className="home-page__news">
                    <div className="home-page__news-wrap">
                        <Aside className="home-page__right">
                            <StickyBox offsetTop={60}>
                                <div className="home-page__right-wrap">
                                    <div className="home-page__tablet-wrap">
                                        <Card className="home-page__about">
                                            <h3>{RKFInfo.aboutTitle}</h3>
                                            <p>{RKFInfo.about}</p>
                                        </Card>
                                        <div className="home-page__tablet-inner">
                                            <Statistics />
                                        </div>
                                    </div>
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
                                    <Banner inputBanner={banners.homePageRightSiteBar} />
                                    <Card className="home-page__map-wrap">
                                        <h3><Link className="Homepage__map-title" to="/clubs-map">Карта авторизованных клубов</Link></h3>
                                        <div className="home-page__map">
                                            <ClubsMap />
                                        </div>
                                    </Card>
                                    {!isMobile && <CopyrightInfo withSocials={true} />}
                                </div>
                            </StickyBox>
                        </Aside>
                        <NewsList
                            isFullDate={false}
                            banner={banners.homePageArticle}
                        />
                    </div>
                </Container>
            </div>
        </Layout>
};

export default memo(HomePage);