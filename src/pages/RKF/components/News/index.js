import React, {useState, useEffect} from "react";
import NewsCard from "../../../../components/NewsCard";
import Placeholder from "../../../../components/NewsCard/Placeholder";
import Paginator from "../../../../components/Paginator";
import {Request} from "../../../../utils/request";
import {endpointGetNews} from "../../config";
import "./index.scss";


const NewsComponent = () => {
    const [news, setNews] = useState(null);
    const [pagesCount, setPagesCount] = useState(1);
    const [page, setPage] = useState(1);
    const newsPlaceholder = [0,1,2,3,4];

    useEffect(() => {
        (() => Request({
            url: `${endpointGetNews}?alias=rkf&page=${page}&size=5`
        }, data => {
            setNews(data.articles);
            setPagesCount(Math.ceil(data.articles_count / 5));
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        }))();
    }, [page]);

    return (
        <div className="news-component">
            <ul className="news-component__list">
                {news && news.length ?
                    news.map(item =>
                        <li className="news-component__item" key={item.id}>
                            <NewsCard {...item}/>
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
                    setPage={setPage}
                    scrollToTop={false}
                />
            }
        </div>
    )
};

export default React.memo(NewsComponent);