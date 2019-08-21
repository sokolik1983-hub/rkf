import React from 'react'
import {useResourceAndStoreToRedux} from 'shared/hooks'
import {connectExhibitionsList} from 'apps/Exhibitions/connectors'
import ListItem from '../ListItem'
import ListLayout from '../ListLayout'
import {endpointExhibitionsList} from 'apps/Exhibitions/config'

function ExhibitionsList({fetchExhibitionsSuccess, listIds}) {
    const {loading} = useResourceAndStoreToRedux(endpointExhibitionsList, fetchExhibitionsSuccess);

    return (
        <ListLayout>
            <div className="ExhibitionsList">
                {
                    listIds.map(id =>
                        <ListItem key={id} id={id}/>
                    )
                }
            </div>
        </ListLayout>
    )
}

export default connectExhibitionsList(ExhibitionsList)