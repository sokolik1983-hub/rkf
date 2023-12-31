import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "../Loading";
import Card from "../Card";
import List from "../List";
import {Request} from "../../utils/request";
import {endpointGetNews, endpointDeleteArticle} from "./config";
import {DEFAULT_IMG} from "../../appConfig";
import "./index.scss";


const UserNews = ({user, canEdit, alias, page, setPage, needRequest, setNeedRequest, profileInfo, setProfileInfo }) => {
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pagesCount, setPagesCount] = useState(1);

    const getNews = async page => {
        setLoading(true);
        await Request({
            url: `${endpointGetNews}?alias=${alias}${page > 1 ? '&page=' + page : ''}`
        }, data => {
            let modifiedNews = [];

            if(data.articles.length) {
                modifiedNews = data.articles.map(article => {
                    article.title = article.name;
                    article.url = `/news/${article.id}`;
                    return article;
                });
            }

            setNews(modifiedNews);
            setPagesCount(Math.ceil(data.articles_count / 10));
        }, error => {
            console.log(error.response);
        });
        setNeedRequest(false);
        setLoading(false);
    };

    const deleteArticle = async id => {
        if(window.confirm('Вы действительно хотите удалить эту новость?')) {
            await Request({
                url: endpointDeleteArticle + id,
                method: 'DELETE'
            }, () => {
                setNeedRequest(true);
                if(!!setProfileInfo){
                    setProfileInfo({...profileInfo, 
                        counters: {
                            ...profileInfo.counters,
                            publications_count: profileInfo.counters.publications_count - 1
                        }});
                }
            },
            error => {
                console.log(error);
                alert('Новость не удалена');
            });
        }
    };

    useEffect(() => {
        if(needRequest) (() => getNews(page))();
    }, [needRequest, page]);

    return loading ?
        <Loading/> :
        <div className="news-component">
            <div className="news-component__header">
                <h4 className="news-component__title">Новости</h4>
                <Link to={`/${user === 'nursery' ? 'kennel/' + alias : alias}/news`}>посмотреть все</Link>
            </div>
            {!news || !news.length ?
                <Card className="user-news">
                    <div className="user-news__content">
                        <h4 className="user-news__text">Новости не найдены</h4>
                        <img className="user-news__img" src={DEFAULT_IMG.noNews} alt="У вас нет новостей"/>
                    </div>
                </Card> :
                <List
                    list={news}
                    listNotFound="Новости не найдены"
                    listClass="user-news"
                    isFullDate={true}
                    removable={canEdit}
                    onDelete={deleteArticle}
                    pagesCount={pagesCount}
                    currentPage={page}
                    setPage={page => {
                        setPage(page);
                        setNeedRequest(true);
                    }}
                />
            }
        </div>
};

export default React.memo(UserNews);