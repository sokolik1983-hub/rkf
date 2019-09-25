import React from 'react'
import NewsStory from '../NewsStory'
import {connectNewsList} from 'apps/PublicClubNews/connectors'
import {endpointUrl} from "apps/PublicClubNews/config";
import {useResourceAndStoreToRedux} from "../../../../shared/hooks";


function PublicClubNewsList({club_route='rkf', listIds, getNewsSuccess}) {
    const url = endpointUrl + String(club_route);
    useResourceAndStoreToRedux(url, getNewsSuccess);
    return listIds.map(id => <NewsStory key={id} id={id}/>)
}

export default connectNewsList(PublicClubNewsList)

