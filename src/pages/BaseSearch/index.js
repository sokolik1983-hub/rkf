import React from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import CheckStatus from "../Club/components/CheckStatus";
import CheckRegistration from "./components/CheckRegistration"
import FoundInfo from "./components/FoundInfo";
import StickyBox from "react-sticky-box";
import Aside from "../../components/Layouts/Aside";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import ClubsMap from "../../components/ClubsMap";
import { RKFInfo } from "../Home/config";
import Statistics from "../../components/Statistics";
import "./index.scss";


const BaseSearch = () => {
    return (
        <Layout>
            <div className="redesign">
                <Container className="content base-search">
                    <div className="base-search__content-wrap">
                        <div className="base-search__content">
                            <FoundInfo />
                            <CheckStatus isBaseSearch />
                            <CheckRegistration />
                        </div>
                        <Aside className="base-search__info">
                            <StickyBox offsetTop={65}>
                                <div className="base-search__info-inner">
                                    <Card>
                                        <h3>{RKFInfo.aboutTitle}</h3>
                                        <p>{RKFInfo.about}</p>
                                    </Card>
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