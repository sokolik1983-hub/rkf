import React from 'react'
import './styles.scss'
import HomeFeaturedExhibition from './HomeFeaturedExhibition'
import { useResourceAndStoreToRedux } from "shared/hooks";
import classnames from 'classnames'
import { connectClubCommonExhibitions } from 'apps/HomePage/connectors'


const HomeFeaturedExhibitionsList = ({ exhibitions, storeExhibitions, route }) => {

    const url = '/api/exhibitions/Exhibition/?Alias=real_tyu' + String(route);

    const { loading } = useResourceAndStoreToRedux(url, storeExhibitions);
    const arr = exhibitions ? exhibitions.slice(0, 3) : [];
    return (
        <div className={classnames(
            "HomeFeaturedExhibitionsList",
            { "HomeFeaturedExhibitionsList--loading": loading }
        )}>
            {
                arr.map(exhibition => <HomeFeaturedExhibition {...exhibition} />)
            }
        </div>
    )
};

export default connectClubCommonExhibitions(HomeFeaturedExhibitionsList);