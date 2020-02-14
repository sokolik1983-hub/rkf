import React, {useState, useEffect} from "react";
import NewsCard from "../NewsCard";
import Placeholder from "../NewsCard/Placeholder";
import Paginator from "../Paginator";
import {Request} from "../../utils/request";
import "./index.scss";


const NewsComponent = ({alias, page, setPage, needRequest, setNeedRequest, canEdit}) => {
    const [news, setNews] = useState(null);
    const [pagesCount, setPagesCount] = useState(1);
    const [isRequestEnd, setIsRequestEnd] = useState(false);
    const newsPlaceholder = [0,1,2,3,4];

    const getNews = async page => {
        await Request({
            url: `/api/ClubArticle/public?alias=${alias}&page=${page}&size=5`
        }, data => {
            setNews(data.articles);
            setPagesCount(Math.ceil(data.articles_count / 5));
            setIsRequestEnd(true);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setIsRequestEnd(true);
        });

        setNeedRequest(false);
    };

    const deleteArticle = async id => {
        if(window.confirm('Вы действительно хотите удалить эту новость?')) {
            await Request({
                    url: '/api/ClubArticle/' + id,
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

    if(isRequestEnd && (!news || !news.length)) return null;

    return (
        <div className="news-component">
            <ul className="news-component__list">
                {news && news.length ?
                    news.map(item =>
                        <li className="news-component__item" key={item.id}>
                            <NewsCard {...item} canEdit={canEdit} onDelete={deleteArticle}/>
                        </li>
                    ) :
                    newsPlaceholder.map(item =>
                        <li className="news-component__item" key={item}>
                            <Placeholder />
                        </li>
                    )
                }
            </ul>
            {pagesCount > 1 &&
                <Paginator
                    pagesCount={pagesCount}
                    currentPage={page}
                    setPage={setNewsPage}
                    scrollToTop={false}
                />
            }
        </div>
    )
};

export default React.memo(NewsComponent);