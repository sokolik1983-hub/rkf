import React, {useState} from 'react'
import {connectExhibitionsFilter} from 'apps/Exhibitions/connectors'
import {ExhibitionsFilterContext} from 'apps/Exhibitions/context'
import {useDictionary} from "apps/Dictionaries";

const {Provider} = ExhibitionsFilterContext;
const filterInitialState = {
    cities: [],
    breeds: [],
    dates: {}
};


function ExhibitionsFilter({city_ids, children}) {
    const [filter, setFilter] = useState(filterInitialState);
    //const {dictionary: breed_types} = useDictionary('breed_types');
    const {dictionary: cities} = useDictionary('cities');
    const changeCitiesFilter = cities => setFilter({...filter, cities});
    console.log('filter', filter)
    return (
        <Provider value={{
            city_ids,
            filter,
            setFilter,
            //breed_types,
            cities,
            changeCitiesFilter
        }}>
            {children}
        </Provider>
    )
}

export default connectExhibitionsFilter(React.memo(ExhibitionsFilter))