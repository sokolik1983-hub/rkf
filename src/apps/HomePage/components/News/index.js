import React from 'react'

import {useResourceAndStoreToRedux} from 'shared/hooks'
import {getNewsSuccess} from 'apps/HomePage/actions'
import {publicNewsEndpoint} from 'apps/HomePage/config'
import {connectNewsList} from 'apps/HomePage/connectors'
import NewsStory from './NewsStory'

import './styles.scss'

function NewsList({listIds}) {
    // TODO fix that shit
    const url = publicNewsEndpoint + '?profileId=12';
    const {loading} = useResourceAndStoreToRedux(url, getNewsSuccess);

    //const {loading} = useResourceAndStoreToRedux(publicNewsEndpoint, getNewsSuccess);
    const [first, second, third, ...rest] = listIds;
    return (
        <div className="NewsList">
            <div className="NewsList__announcement">
                <NewsStory id={first} className="NewsStory--main"/>
                <div className="flex-row">
                    <NewsStory id={second} className="NewsStory--secondary"/>
                    <NewsStory id={third} className="NewsStory--secondary"/>
                </div>
            </div>
            <div className="NewsList__feed">
                <h2>Последние новости</h2>
                {
                    loading ?
                        <div className="text-center">"loading..."</div>
                        :
                        rest.slice(0, 4).map(id => <NewsStory key={id} id={id}/>)
                }
            </div>
        </div>
    )
}

export default connectNewsList(NewsList);