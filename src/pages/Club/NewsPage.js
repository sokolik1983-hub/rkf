import React, { useEffect, useState } from "react";
import NotConfirmed from "../NotConfirmed";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import { Link } from "react-router-dom";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import List from "../../components/List";
import InfiniteScroll from "react-infinite-scroll-component";
import {DEFAULT_IMG} from "../../appConfig";
import UserHeader from "../../components/redesign/UserHeader";
// import ExhibitionsComponent from "../../components/ExhibitionsComponent";
// import UserContacts from "../../components/redesign/UserContacts";
// import UserDescription from "../../components/redesign/UserDescription";
import AddArticle from "../../components/UserAddArticle";
import ListFilter from '../../pages/Club/components/ClubUserNews/ListFilter';
import FloatingMenu from './components/FloatingMenu';
import { Request } from "../../utils/request";
import shorten from "../../utils/shorten";
import { endpointGetClubInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import { Gallery } from "../../components/Gallery";
import { endpointGetNews } from "./config";
import StickyBox from "react-sticky-box";
import "./index.scss";


const ClubPage = ({ history, match, profile_id, is_active_profile, isAuthenticated }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [error, setError] = useState(null);
    const [images, setImages] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [notActiveProfile, setNotActiveProfile] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [newsLoading, setNewsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [filters, setFilters] = useState(null);

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


    useEffect(() => {
        getImages()
    }, []);

    const getImages = () => {
        Request({
            url: `/api/photogallery/gallery?alias=${match.params.route}&elem_count=12`,
            method: 'GET'
        }, data => {
            if (data.photos.length) {
                const twelveItemsArray = Array.apply(null, Array(12)).map((x, i) => i);
                const { photos } = data;
                const imagesArray = twelveItemsArray.map(p => {
                    if (photos[p]) {
                        return {
                            id: photos[p].id,
                            src: photos[p].link,
                            thumbnail: photos[p].small_photo.link,
                            thumbnailWidth: 88,
                            thumbnailHeight: 88,
                            caption: photos[p].caption
                        }
                    } else {
                        return {
                            id: p,
                            src: '/static/images/noimg/empty-gallery-item.jpg',
                            thumbnail: '/static/images/noimg/empty-gallery-item.jpg',
                            thumbnailWidth: 88,
                            thumbnailHeight: 88
                        }
                    }
                });
                setImages(imagesArray);
            }
        },
        error => {
            //handleError(error);
        });
    }

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


    const squareStyle = () => {
        return {
            height: '89px',
            width: '89px',
            objectFit: 'cover',
            cursor: 'pointer'
        };
    }

    return loading ?
        <Loading /> :
        error ?
            <PageNotFound /> :
            notActiveProfile ?
                <NotConfirmed /> :
                <Layout>
                    <div className="redesign">
                        <Container className="content club-page">
                            <div className="club-page__content-wrap">
                                <div className="club-page__content">
                                    <Card className="club-page__content-banner">
                                        <div style={clubInfo.headliner_link && { backgroundImage: `url(${clubInfo.headliner_link}` }} />
                                    </Card>
                                    <div className="club-page__mobile-only">
                                        <UserHeader
                                            user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                            logo={clubInfo.logo_link}
                                            name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                            alias={clubInfo.club_alias}
                                            profileId={clubInfo.id}
                                            federationName={clubInfo.federation_name}
                                            federationAlias={clubInfo.federation_alias}
                                        />
                                    </div>
                                    {/* <UserDescription description={clubInfo.description} /> */}
                                    {/* <UserContacts {...clubInfo} /> */}
                                    {/* <div className="club-page__exhibitions">
                                        <ExhibitionsComponent alias={clubInfo.club_alias} />
                                    </div> */}
                                    {(!news || !news.length) ?
                                <Card className="user-news">
                                    <div className="user-news__content">
                                        <h4 className="user-news__text">Новости не найдены</h4>
                                        <img className="user-news__img" src={DEFAULT_IMG.noNews} alt="У вас нет новостей"/>
                                    </div>
                                </Card> :
                                <>
                                    <div className="news-component__header-wrap">
                                        <div className="news-component__header">
                                            <h4 className="news-component__title">Публикации</h4>
                                            <ListFilter
                                                setFilters={setFilters}
                                                setNeedRequest={setNeedRequest}
                                            />
                                        </div>
                                    </div>
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
                                </>
                            }
                                    <div className="club-page__mobile-only">
                                        <Card className="club-page__gallery-wrap">
                                            <div className="club-page__gallery-header">
                                                <h4 className="club-page__gallery-title">Фотогалерея</h4>
                                                <Link to={`/${clubInfo.club_alias}/gallery`}>Смотреть все</Link>
                                            </div>
                                            <Gallery
                                                items={images}
                                                backdropClosesModal={true}
                                                enableImageSelection={false}
                                                withLoading={false}
                                                rowHeight={89}
                                                thumbnailStyle={squareStyle}
                                            />
                                        </Card>
                                    </div>
                                    {canEdit &&
                                        <AddArticle
                                            id={clubInfo.id}
                                            logo={clubInfo.logo_link}
                                            setNeedRequest={setNeedRequest}
                                        />
                                    }
                                    {/* <ClubUserNews
                                        user="club"
                                        canEdit={canEdit}
                                        alias={match.params.route}
                                        needRequest={needRequest}
                                        setNeedRequest={setNeedRequest}
                                    /> */}
                                </div>
                                <Aside className="club-page__info">
                                    <StickyBox offsetTop={65}>
                                        <div className="club-page__info-inner">
                                            <UserHeader
                                                user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                                logo={clubInfo.logo_link}
                                                name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                                alias={clubInfo.club_alias}
                                                profileId={clubInfo.id}
                                                federationName={clubInfo.federation_name}
                                                federationAlias={clubInfo.federation_alias}
                                            />
                                            <Card className="club-page__gallery-wrap">
                                                <div className="club-page__gallery-header">
                                                    <h4 className="club-page__gallery-title">Фотогалерея</h4>
                                                    <Link to={`/${clubInfo.club_alias}/gallery`}>Смотреть все</Link>
                                                </div>
                                                <Gallery
                                                    items={images}
                                                    backdropClosesModal={true}
                                                    enableImageSelection={false}
                                                    withLoading={false}
                                                    rowHeight={88}
                                                    thumbnailStyle={squareStyle}
                                                />
                                            </Card>
                                        </div>
                                    </StickyBox>
                                </Aside>
                            </div>
                            <FloatingMenu
                                alias={clubInfo.club_alias}
                                profileId={clubInfo.id}
                                name={shorten(clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует')}
                            />
                        </Container>
                    </div>
                </Layout>
};

export default React.memo(connectAuthVisible(ClubPage));