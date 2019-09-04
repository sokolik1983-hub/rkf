import React from 'react'
import {connectExhibitionsList} from 'apps/Exhibitions/connectors'
import ListItem from '../ListItem'
import ListLayout from '../ListLayout'
import Paginator from './Paginator'

function ExhibitionsList({listIds}) {

    return (
        <ListLayout>
            <div className="ExhibitionsList">
                {
                    listIds.map(id =>
                        <ListItem key={id} id={id}/>
                    )
                }
            </div>
            <Paginator/>
        </ListLayout>
    )
}

export default connectExhibitionsList(ExhibitionsList)