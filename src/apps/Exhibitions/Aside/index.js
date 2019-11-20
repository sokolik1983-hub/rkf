import React from 'react'
import {connectAuthVisible} from 'apps/Auth/connectors.js';
import Search from 'apps/Exhibitions/components/Search'
import Calendar from 'apps/Exhibitions/components/Calendar'
import CitiesFilter from 'apps/Exhibitions/components/ExhibitionsFilter/CititesFilter'
import ClearFilter from 'apps/Exhibitions/components/ExhibitionsFilter/ClearFilter'
import MyExhibitionsFilter from "../components/FilterMyExhibitions";
import './styles.scss'


const ExhibitionsAside = ({isAuthenticated}) => {
    return (
        <>
            <Search/>
            <Calendar/>
            <h4 className="ExhibitionsAside__filters">Фильтры</h4>
            {isAuthenticated && <MyExhibitionsFilter />}
            <CitiesFilter/>
            <ClearFilter/>
        </>
    )
};

export default connectAuthVisible(ExhibitionsAside);