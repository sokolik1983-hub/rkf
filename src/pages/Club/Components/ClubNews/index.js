import React, {useEffect, useState} from "react";
import Loading from "../../../../components/Loading";
import Card from "../../../../components/Card";
import NewsAreEmpty from "../../../../components/Club/NewsAreEmpty";
import List from "../../../../components/List";
import {Request} from "../../../../utils/request";
import {endpointGetNews, endpointDeleteArticle} from "../../config";
import {connectAuthVisible} from "../../../Login/connectors";
import "./index.scss";


const ClubNews = ({isAuthenticated, profile_id, clubId, alias, page, setPage, needRequest, setNeedRequest}) => {
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
                    article.title = article.club_name;
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
            }, () => setNeedRequest(true),
            error => {
                console.log(error);
                alert('Новость не удалена');
            });
        }
    };

    const setNewsPage = page => {
        setPage(page);
        setNeedRequest(true);
    };

    useEffect(() => {
        if(needRequest) (() => getNews(page))();
    }, [needRequest, page]);

    return loading ?
        <Loading/> :
        !news || !news.length ?
            <Card className="club-page__news">
                <NewsAreEmpty/>
            </Card> :
            <List
                list={news}
                listNotFound="Новости не найдены"
                listClass="club-page__news"
                isFullDate={true}
                removable={isAuthenticated && profile_id === clubId}
                onDelete={deleteArticle}
                pagesCount={pagesCount}
                currentPage={page}
                setPage={setNewsPage}
            />
};

export default React.memo(connectAuthVisible(ClubNews));