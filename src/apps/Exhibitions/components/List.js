import React from 'react'
import ListItem from './ListItem'


const ExhibitionsList = ({exhibitions=[]}) =>
    exhibitions.map(exhibition =>
        <ListItem
            key={exhibition.id} {...exhibition}
        />
    )

export default ExhibitionsList;