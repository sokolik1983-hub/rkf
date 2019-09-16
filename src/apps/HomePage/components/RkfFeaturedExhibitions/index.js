import React, { useState } from 'react';
import Loading from 'components/Loading';
import FeaturedExhibition from './Exhibition';
import { useResourceAndStoreToRedux } from 'shared/hooks';

import {
    DEFAULT_ELEMENTS_COUNT,
    DEFAULT_ELEMENTS_COUNT_OFFSET,
    FEATURED_EXHIBITIONS_ENDPOINT
} from 'apps/HomePage/config';

function RkfFeaturedExhibitions() {
    const [exhibitions, setExhibitions] = useState([]);
    // TODO надо как-то красивее это
    const url = `${FEATURED_EXHIBITIONS_ENDPOINT}?ElementsCount=${DEFAULT_ELEMENTS_COUNT +
        DEFAULT_ELEMENTS_COUNT_OFFSET}`;
    const { loading } = useResourceAndStoreToRedux(url, setExhibitions);

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                exhibitions
                    .slice(DEFAULT_ELEMENTS_COUNT_OFFSET)
                    .map(exhibition => (
                        <FeaturedExhibition
                            key={exhibition.id}
                            {...exhibition}
                        />
                    ))
            )}
        </div>
    );
}

export default RkfFeaturedExhibitions;
