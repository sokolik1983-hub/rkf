import React from 'react'
import Search from 'apps/Exhibitions/components/Search'
import Calendar from 'apps/Exhibitions/components/Calendar'
import CitiesFilter from 'apps/Exhibitions/components/ExhibitionsFilter/CititesFilter'
import ClearFilter from 'apps/Exhibitions/components/ExhibitionsFilter/ClearFilter'
import './styles.scss'
//import Filter from 'apps/Exhibitions/containers/Filter'

const ExhibitionsAside = () =>
    <div className="ExhibitionsAside">
        <Search/>
        <Calendar/>
        <h4 className="ExhibitionsAside__filters">Фильтры</h4>
        <CitiesFilter/>
        <ClearFilter/>
    </div>;


export default ExhibitionsAside;