import React, { useState } from 'react'
import './styles.scss'
import HomeFeaturedExhibition from './HomeFeaturedExhibition'
import { useResourceAndStoreToRedux } from "shared/hooks";
import classnames from 'classnames'
import { FEATURED_EXHIBITIONS_URL } from 'apps/Exhibitions/components/Featured'
import { connectClubCommonExhibitions } from 'apps/HomePage/connectors'


const HomeFeaturedExhibitionsList = () => {

    const [exhibitions, setExhibitions] = useState([]);

    const { loading } = useResourceAndStoreToRedux(
        FEATURED_EXHIBITIONS_URL,
        setExhibitions
    );

    const featuredExhibitions = exhibitions ? exhibitions.slice(0, 3) : [];
    return (
        featuredExhibitions.length > 0
            ? (
                <div className={classnames(
                    "HomeFeaturedExhibitionsList",
                    { "HomeFeaturedExhibitionsList--loading": loading }
                )}>
                    {
                        featuredExhibitions.map((exhibition, index) => <HomeFeaturedExhibition {...exhibition} key={index} />)
                    }
                </div>
            )
            : null
    )
};

export default connectClubCommonExhibitions(HomeFeaturedExhibitionsList);