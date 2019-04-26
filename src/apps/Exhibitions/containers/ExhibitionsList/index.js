import React from 'react'
import {connect} from 'react-redux'

import ListItem from 'apps/Exhibitions/components/ListItem'


const ExhibitionsList = ({exhibitions = [],cities}) =>
    exhibitions.map(exhibition =>
        <ListItem
            key={exhibition.id} {...exhibition}
            cities={cities}
        />
    )

const mapStateToProps = state => ({
    exhibitions: state.exhibitions.exhibitions,
    cities: state.exhibitions.cities
});
export default connect(mapStateToProps)(ExhibitionsList);