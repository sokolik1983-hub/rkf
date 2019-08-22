import React from 'react'
import NewsStory from '../NewsStory'
import {connectNewsList} from 'apps/ClientNews/connectors'
import {useResourceAndStoreToRedux} from "shared/hooks";


function ClientNewsList({getNewsSuccess, listIds, club_id}) {
    useResourceAndStoreToRedux('/api/ClubArticle/list', getNewsSuccess);

    return listIds.map(id => <NewsStory key={id} id={id}/>)
}

export default connectNewsList(ClientNewsList)

