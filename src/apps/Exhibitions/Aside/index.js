import React, {Fragment} from 'react'
import Search from 'apps/Exhibitions/components/Search'
import Calendar from 'apps/Exhibitions/components/Calendar'
import Filter from 'apps/Exhibitions/containers/Filter'

const ExhibitionsAside = () =>
    <Fragment>
        <Search/>
        <Calendar/>
        <Filter/>
    </Fragment>;

export default ExhibitionsAside;