import React, { useState } from 'react'
import './styles.scss'
import FeaturedExhibition from './Exhibition'
import { useResourceAndStoreToRedux } from 'shared/hooks'
import classnames from 'classnames'
import { connectClubId } from 'apps/Exhibitions/connectors'

export const FEATURED_EXHIBITIONS_URL = '/api/exhibitions/Exhibition/featured';

const FeaturedExhibitionsList = ({ club_id, club_alias }) => {
    const [exhibitions, setExhibitions] = useState([]);
    const { loading } = useResourceAndStoreToRedux(
        FEATURED_EXHIBITIONS_URL + (club_id ? '?ClubId=' + club_id : '?Alias=' + club_alias), //TODO: Refactor this
        setExhibitions
    );

    const featuredExhibitions = exhibitions ? exhibitions.slice(0, 3) : [];
    return (
        <div
            className={classnames('FeaturedExhibitions', {
                'FeaturedExhibitionsx--loading': loading
            })}
        >
            {featuredExhibitions ? (
                featuredExhibitions.map((exhibition, index) => (
                    <FeaturedExhibition {...exhibition} key={index} />
                ))
            ) : (
                    <h2>Не найдено анонсов выставок</h2>
                )}
        </div>
    )
}

export default connectClubId(FeaturedExhibitionsList)
