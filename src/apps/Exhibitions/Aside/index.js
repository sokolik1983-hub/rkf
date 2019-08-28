import React from 'react'
//import Search from 'apps/Exhibitions/components/Search'
import Calendar from 'apps/Exhibitions/components/Calendar'
import ExhibitionsFilter from 'apps/Exhibitions/components/ExhibitionsFilter'
import CitiesFilter from 'apps/Exhibitions/components/ExhibitionsFilter/CititesFilter'
import ClearFilter from 'apps/Exhibitions/components/ExhibitionsFilter/ClearFilter'
//import Filter from 'apps/Exhibitions/containers/Filter'

const ExhibitionsAside = () =>
    <ExhibitionsFilter>
        {/*<Search/>*/}
        <Calendar />
        <CitiesFilter />
        <ClearFilter />
    </ExhibitionsFilter>;

export default ExhibitionsAside;