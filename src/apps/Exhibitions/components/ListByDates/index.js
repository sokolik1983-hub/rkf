import React from 'react'
import {connectListExhibitionsByDates} from 'apps/Exhibitions/connectors'
import ListLayout from "../ListLayout";
import ListItem from "../ListItem";
import {mergeDateToString} from 'utils/mergeDateToString'
import {useResourceAndStoreToRedux} from "../../../../shared/hooks";
import {endpointExhibitionsList} from "../../config";
import {transformDate, formatDateWithLocaleString} from 'utils/datetime'
function RenderDate(props) {
    const {items, ...restDate} = props;
    return (
        <React.Fragment>
            <div> {formatDateWithLocaleString(transformDate(restDate))}</div>
            <RenderDateExhibitions exhibitions={items}/>
        </React.Fragment>
    )
}

function RenderDateExhibitions({exhibitions}) {
    return exhibitions.map(exhibition => <ListItem key={exhibition.id} {...exhibition}/>)
}

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