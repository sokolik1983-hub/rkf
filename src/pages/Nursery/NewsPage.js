import React, { useEffect, useState } from "react";
import {Redirect} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import UserHeader from "../../components/UserHeader";
import List from "../../components/List";
import UserMenu from "./components/UserMenu";
import NurseryInfo from "./components/NurseryInfo";
import {Request} from "../../utils/request";
import {endpointGetNurseryInfo} from "./config";
import {connectAuthVisible} from "../Login/connectors";
import "./index.scss";
import {DEFAULT_IMG} from "../../appConfig";
import Card from "../../components/Card";


const NewsPage = ({ history, match, is_active_profile, profile_id, isAuthenticated }) => {
    const [nurseryInfo, setNurseryInfo] = useState(null);
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
            url: endpointGetNurseryInfo + alias
        }, data => {
            if(data.user_type !== 4) {
                history.replace(`/${alias}/news`);
            } else {
                setNurseryInfo(data);
                setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
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
            url: `/api/Article/public?alias=${alias}${page > 1 ? '&page=' + page : ''}`
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
            error.status === 422 ? <Redirect to="/kennel/activation"/> : <Redirect to="404"/>
            : <Layout>
                <Container className="content nursery-page NewsPage">
                    <UserHeader
                        user="nursery"
                        logo={nurseryInfo.logo_link}
                        banner={nurseryInfo.headliner_link}
                        name={nurseryInfo.short_name || nurseryInfo.name || 'Название клуба отсутствует'}
                        federationName={nurseryInfo.federation_name}
                        federationAlias={nurseryInfo.federation_alias}
                        canEdit={canEdit}
                        editLink={`/kennel/${alias}/edit`}
                    />
                    <div className="nursery-page__content-wrap">
                        <div className="nursery-page__content">
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
                                        user="nursery"
                                        list={news}
                                        listNotFound={false}
                                        listClass="nursery-page__news"
                                        isFullDate={true}
                                    />
                                </InfiniteScroll>
                            }
                        </div>
                        <Aside className="nursery-page__info">
                            <UserMenu
                                alias={alias}
                                name={nurseryInfo.name || 'Имя отсутствует'}
                            />
                            <NurseryInfo
                                {...nurseryInfo}
                            />
                        </Aside>
                    </div>
                </Container>
            </Layout>
};

export default React.memo(connectAuthVisible(NewsPage));