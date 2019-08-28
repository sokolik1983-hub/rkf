import React, { useState } from 'react'
import { connectExhibitionsFilter } from 'apps/Exhibitions/connectors'
import { ExhibitionsFilterContext } from 'apps/Exhibitions/context'
import { useDictionary } from "apps/Dictionaries";

const { Provider } = ExhibitionsFilterContext;
const filterInitialState = {
    cities: [],
    breeds: [],
    dates: {}
};


function ExhibitionsFilter({ city_ids, children }) {
    // city_ids - города которые присутствуют в выставке
    const [filter, setFilter] = useState(filterInitialState);
    //const {dictionary: breed_types} = useDictionary('breed_types');
    const { dictionary: cities } = useDictionary('cities');
    // cities - словарь всех городов
    const changeCitiesFilter = cities => setFilter({ ...filter, cities });
    const clearFilter = () => {
        setFilter({ ...filterInitialState });
    };
    return (
        <Provider value={{
            city_ids,
            filter,
            setFilter,
            //breed_types,
            cities,
            changeCitiesFilter,
            clearFilter
        }}>
            {children}
        </Provider>
    )
}

export default connectExhibitionsFilter(React.memo(ExhibitionsFilter))