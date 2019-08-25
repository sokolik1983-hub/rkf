import React from 'react'

import {useResourceAndStoreToRedux} from 'shared/hooks'
//import {getNewsSuccess} from 'apps/HomePage/actions'
import {publicNewsEndpoint} from 'apps/HomePage/config'
import {connectNewsList} from 'apps/HomePage/connectors'
import NewsStory from './NewsStory'

import './styles.scss'

function NewsList({listIds, route, getNewsSuccess}) {
    const url = route ? publicNewsEndpoint + '?alias=' + route : publicNewsEndpoint;
    const {loading} = useResourceAndStoreToRedux(url, getNewsSuccess);
    return (!loading && listIds) ?
        (
            <div className="NewsList">
                {listIds.map(id => <NewsStory key={id} id={id}/>)}
            </div>
        )
        : <div>Новости не найдены</div>
}

export default connectNewsList(NewsList);