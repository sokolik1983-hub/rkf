import React from 'react'
import NewsAreEmpty from 'components/Club/NewsAreEmpty'
import NewsStory from '../NewsStory'
import {connectNewsList} from 'apps/ClientNews/connectors'
import {useResourceAndStoreToRedux} from "shared/hooks";


function ClientNewsList({getNewsSuccess, listIds}) {
    const {loading} = useResourceAndStoreToRedux('/api/ClubArticle/list', getNewsSuccess);
    if (listIds.length === 0) {
        return <NewsAreEmpty/>
    }
    if (loading) {
        return (<div className="text-center">загрузка...</div>)
    }
    return listIds.map(id => <NewsStory key={id} id={id}/>)
}

export default connectNewsList(ClientNewsList)

