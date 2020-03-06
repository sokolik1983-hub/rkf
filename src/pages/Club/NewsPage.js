import React, { useEffect, useState } from "react";
import ClubNotActive from "./components/ClubNotActive";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import MenuComponent from "../../components/MenuComponent";
import ClubHeader from "./components/ClubHeader";
import ClubInfo from "./components/ClubInfo";
import FloatingMenu from './components/FloatingMenu';
import { Request } from "../../utils/request";
import shorten from "../../utils/shorten";
import { endpointGetClubInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import { endpointGetNews } from "./config";
import List from "components/List";
import InfiniteScroll from 'react-infinite-scroll-component';
import "./index.scss";


const NewsPage = ({ match, profile_id, isAuthenticated }) => {
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
            setClubInfo(data);
            setCanEdit(isAuthenticated && profile_id === data.id);
            !news.length && getNews();
            setLoading(false);
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
                    <ClubHeader
                        clubLogo={clubInfo.logo_link}
                        clubImg={clubInfo.headliner_link}
                        clubName={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                        federationName={clubInfo.federation_name}
                        federationAlias={clubInfo.federation_alias}
                        canEdit={canEdit}
                    />
                    <div className="club-page__content-wrap">
                        <div className="club-page__content">
                            <InfiniteScroll
                                dataLength={news.length}
                                next={getNews}
                                hasMore={hasMore}
                                loader={newsLoading && <Loading centered={false} />}
                                endMessage={<div className="NewsPage__endMessage">Новостей больше нет</div>}
                            >
                                <List
                                    list={news}
                                    listNotFound={false}
                                    listClass="club-page__news"
                                    isFullDate={true}
                                />
                            </InfiniteScroll>
                        </div>
                        <Aside className="club-page__info">
                            <MenuComponent
                                alias={clubInfo.club_alias}
                                name={shorten(clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует')}
                            />
                            <ClubInfo {...clubInfo} />
                        </Aside>
                    </div>
                    <FloatingMenu
                        alias={clubInfo.club_alias}
                        name={"Страница клуба"}
                    />
                </Container>
            </Layout>
};

export default React.memo(connectAuthVisible(NewsPage));
