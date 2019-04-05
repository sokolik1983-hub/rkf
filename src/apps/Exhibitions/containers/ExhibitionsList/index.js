import React from 'react'
import {connect} from 'react-redux'

import ListItem from 'apps/Exhibitions/components/ListItem'


const ExhibitionsList = ({exhibitions = []}) =>
    exhibitions.map(exhibition =>
        <ListItem
            key={exhibition.id} {...exhibition}
        />
    )

const mapStateToProps = state => ({exhibitions: state.exhibitions.exhibitions});
export default connect(mapStateToProps)(ExhibitionsList);