import React, {useEffect} from 'react'
import NewsStory from '../NewsStory'
import {connectNewsList} from 'apps/ClientNews/connectors'


function ClientNewsList({getNews, newsIds}) {
    useEffect(() => {
        getNews(12)
    }, []);
    return newsIds.map(id => <NewsStory key={id} id={id}/>)
}

export default connectNewsList(ClientNewsList)

