import React, {useState, useEffect} from "react";
import {Request} from "../../utils/request";
import UserNews from "../Layouts/UserNews";

import "./index.scss";


const NewsComponent = ({alias, page, setPage, needRequest, setNeedRequest, canEdit}) => {
    const [news, setNews] = useState(null);
    const [isRequestEnd, setIsRequestEnd] = useState(false);

    const getNews = async page => {
        await Request({
            url: `/api/Article/public_v2?alias=${alias}&page=${page}&size=5`
        }, data => {
            setNews(data.articles);
            setIsRequestEnd(true);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setIsRequestEnd(true);
        });

        setNeedRequest(false);
    };


    useEffect(() => {
        if(needRequest) (() => getNews(page))();
    }, [needRequest, page]);

    if(isRequestEnd && (!news || !news.length)) return null;

    return (
        <div className="news-component">
            <UserNews
                canEdit={canEdit}
                alias={alias}
                needRequest={needRequest}
                setNeedRequest={setNeedRequest}
                profileInfo={news}
                setProfileInfo={setNews}
                isFederation={true}
            />
        </div>
    )
};

export default React.memo(NewsComponent);