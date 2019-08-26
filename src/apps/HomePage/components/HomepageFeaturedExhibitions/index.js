import React from 'react'
import './styles.scss'
import Card from 'components/Card'
import HomepageExhibition from './HomepageExhibition'
import {useResourceAndStoreToRedux} from "shared/hooks";
import classnames from 'classnames'
import {connectClubCommonExhibitions} from 'apps/HomePage/connectors'


const HomepageFeaturedExhibitionsList = ({exhibitions, storeExhibitions, route}) => {

    const url = '/api/exhibitions/Exhibition/featured/' + String(route);

    const {loading} = useResourceAndStoreToRedux(url, storeExhibitions,);
    const arr = exhibitions ? exhibitions.slice(0, 3) : [];
    return (
        <Card>
            <div className={classnames(
                "HomepageFeaturedExhibitionsList",
                {"HomepageFeaturedExhibitionsList--loading": loading}
            )}>
                {
                    arr.map(exhibition => <HomepageExhibition {...exhibition} />)
                }
            </div>
        </Card>
    )
};

export default connectClubCommonExhibitions(HomepageFeaturedExhibitionsList);