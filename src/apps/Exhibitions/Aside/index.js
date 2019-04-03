import React, {Fragment} from 'react'
import Search from 'apps/Exhibitions/containers/Search'
import Calendar from 'apps/Exhibitions/containers/Calendar'
import Filter from 'apps/Exhibitions/containers/Filter'

const ExhibitionsAside = () =>
    <Fragment>
        <Search/>
        <Calendar/>
        <Filter/>
    </Fragment>;

export default ExhibitionsAside;