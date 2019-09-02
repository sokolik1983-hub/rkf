import React, {useContext} from 'react'
import NewsAreEmpty from 'components/Club/NewsAreEmpty'
import ListArticle from '../ListArticle'
import {connectNewsList} from 'apps/ClientNews/connectors'
import {GET_NEWS_ENDPOINT} from 'apps/ClientNews/config'
import {useResourceAndStoreToRedux} from "shared/hooks";
import {ClubRouteContext} from 'apps/HomePage/context'

function ClientNewsList({getNewsSuccess, listIds}) {
    const {params} = useContext(ClubRouteContext);
    const {route} = params;
    const url = route ? `${GET_NEWS_ENDPOINT}${route}` : `${GET_NEWS_ENDPOINT}rkf`;
    const {loading} = useResourceAndStoreToRedux(url, getNewsSuccess);
    if (listIds.length === 0) {
        return <NewsAreEmpty/>
    }
    if (loading) {
        return (<div className="text-center">загрузка...</div>)
    }
    return listIds.map(id => <ListArticle key={id} id={id}/>)
}

export default connectNewsList(ClientNewsList)

