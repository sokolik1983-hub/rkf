import React from 'react'
import {useResourceAndStoreToRedux} from "shared/hooks";
import {mergeDateToString} from 'utils/mergeDateToString'
import {connectListExhibitionsByDates} from 'apps/Exhibitions/connectors'
import {endpointExhibitionsList} from "apps/Exhibitions/config";
import ListLayout from "../ListLayout";

import RenderDate from './RenderDate'

function ListExhibitionsByDates(props) {
    const {dates, fetchExhibitionsSuccess} = props;
    const {loading} = useResourceAndStoreToRedux(endpointExhibitionsList, fetchExhibitionsSuccess);
    return (
        <ListLayout>
            <div className="ExhibitionsList">
                {
                    dates.map(date =>
                        <RenderDate key={mergeDateToString(date)} {...date}/>
                    )
                }
            </div>
        </ListLayout>
    )
}

export default connectListExhibitionsByDates(ListExhibitionsByDates)