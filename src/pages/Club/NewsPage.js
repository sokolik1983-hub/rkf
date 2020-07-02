import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ClubNotActive from "./components/ClubNotActive";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import MenuComponent from "../../components/MenuComponent";
import UserHeader from "../../components/UserHeader";
import ClubInfo from "./components/ClubInfo";
import Card from "../../components/Card";
import List from "../../components/List";
import FloatingMenu from './components/FloatingMenu';
import { Request } from "../../utils/request";
import shorten from "../../utils/shorten";
import { endpointGetClubInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import { endpointGetNews } from "./config";
import {DEFAULT_IMG} from "../../appConfig";
import "./index.scss";


const NewsPage = ({ history, match, profile_id, isAuthenticated }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);
    const [newsLoading, setNewsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const alias = match.params.route;

    useEffect(() => {
        (() => Request({
            url: endpointGetClubInfo + alias
        }, data => {
            if(data.user_type === 4) {
                history.replace(`/kennel/${match.params.route}/news`);
            } else {
                setClubInfo(data);
                setCanEdit(isAuthenticated && profile_id === data.id);
                !news.length && getNews();
                setLoading(false);
            }
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        }))();
    }, [match]);

    const getNews = async () => {
        setNewsLoading(true);
        await Request({
            url: `${endpointGetNews}?alias=${alias}${page > 1 ? '&page=' + page : ''}`
        }, data => {
            let modifiedNews = [];

            if (data.articles.length) {
                modifiedNews = news.concat(
                    data.articles.map(article => {
                        article.title = article.club_name;
                        article.url = `/news/${article.id}`;
                        return article;
                    })
                );
            }
            setNews(modifiedNews);
            setPage(page + 1);
            modifiedNews.length === data.articles_count && setHasMore(false);
            setNewsLoading(false);
        }, error => {
            console.log(error.response);
        });
    };

    return loading
        ? <Loading />
        : error ?
            error.status === 422 ? <ClubNotActive /> : <PageNotFound />
            : <Layout>
                <Container className="content club-page NewsPage">
                    <UserHeader
                        user="club"
                        logo={clubInfo.logo_link}
                        banner={clubInfo.headliner_link}
                        name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                        federationName={clubInfo.federation_name}
                        federationAlias={clubInfo.federation_alias}
                        canEdit={canEdit}
                        editLink="/client"
                    />
                    <div className="club-page__content-wrap">
                        <div className="club-page__content">
                            {(!news || !news.length) ?
                                <Card className="user-news">
                                    <div className="user-news__content">
                                        <h4 className="user-news__text">Новости не найдены</h4>
                                        <img className="user-news__img" src={DEFAULT_IMG.noNews} alt="У вас нет новостей"/>
                                    </div>
                                </Card> :
                                <InfiniteScroll
                                    dataLength={news.length}
                                    next={getNews}
                                    hasMore={hasMore}
                                    loader={newsLoading && <Loading centered={false}/>}
                                    endMessage={
                                        <div className="user-news__content">
                                            <h4 className="user-news__text">Новостей больше нет</h4>
                                            <img className="user-news__img" src={DEFAULT_IMG.noNews} alt="У вас нет новостей"/>
                                        </div>
                                    }
                                >
                                    <List
                                        user="club"
                                        list={news}
                                        listNotFound={false}
                                        listClass="club-page__news"
                                        isFullDate={true}
                                    />
                                </InfiniteScroll>
                            }
                        </div>
                        <Aside className="club-page__info">
                            <MenuComponent
                                alias={clubInfo.club_alias}
                                profileId={clubInfo.id}
                                name={shorten(clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует')}
                            />
                            <ClubInfo {...clubInfo} />
                        </Aside>
                    </div>
                    <FloatingMenu
                        alias={clubInfo.club_alias}
                        profileId={clubInfo.id}
                        name={shorten(clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует')}
                    />
                </Container>
            </Layout>
};

export default React.memo(connectAuthVisible(NewsPage));