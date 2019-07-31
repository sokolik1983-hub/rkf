import React, {useEffect} from 'react'
import {connectExhibitionsList} from 'apps/Exhibitions/connectors'
import ListItem from '../ListItem'
import ListLayout from '../ListLayout'

function ExhibitionsList({fetchExhibitions, exhibitionsIds}) {
    useEffect(() => {
        fetchExhibitions()
    }, []);
    return (
        <ListLayout>
            <div className="ExhibitionsList">
                {
                    exhibitionsIds.map(exhibitionId =>
                        <ListItem key={exhibitionId} id={exhibitionId}/>
                    )
                }
            </div>
        </ListLayout>
    )
}

export default connectExhibitionsList(ExhibitionsList)