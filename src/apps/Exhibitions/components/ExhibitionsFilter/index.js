import React, { useState, useEffect } from 'react';
import { connectExhibitionsFilter } from 'apps/Exhibitions/connectors';
import { ExhibitionsFilterContext } from 'apps/Exhibitions/context';
import { useDictionary } from 'apps/Dictionaries';
import { useResourceAndStoreToRedux } from 'shared/hooks';
import { endpointExhibitionsList } from 'apps/Exhibitions/config';
import { useResourceGlobalCity } from './hooks';
import { buildUri, loadGlobalCity } from './heplers';

const { Provider } = ExhibitionsFilterContext;

const filterInitialState = {
    cities: []
    //breeds: [],
    //dates: {}
};

function ExhibitionsFilter({
    city_ids,
    children,
    className,
    fetchExhibitionsSuccess
}) {
    const globalCity = loadGlobalCity();

    const initialUrl = globalCity
        ? `${endpointExhibitionsList}?CityIds=${globalCity}`
        : endpointExhibitionsList;

    const [url, setUrl] = useState(initialUrl);

    const { loading } = useResourceAndStoreToRedux(
        url,
        fetchExhibitionsSuccess
    );

    // city_ids - ids of cities of exhibitions in selected list
    const [filter, setFilter] = useState(filterInitialState);
    //const {dictionary: breed_types} = useDictionary('breed_types');
    const { dictionary: cities } = useDictionary('cities');
    // cities - словарь всех городов
    const changeCitiesFilter = cities => setFilter({ ...filter, cities });
    const clearFilter = () => {
        setFilter({ ...filterInitialState });
        setUrl(endpointExhibitionsList);
    };

    const applyFilter = () => {
        const url = `${endpointExhibitionsList}?${buildUri(filter)}`;
        setUrl(url);
    };

    const setPage = page => {
        const url = `${endpointExhibitionsList}?${buildUri(
            filter
        )}&PageNumber=${page}`;
        setUrl(url);
    };

    useEffect(() => {
        if (globalCity) {
            changeCitiesFilter([globalCity]);
        }
    }, []);

    useResourceGlobalCity({
        url: endpointExhibitionsList,
        globalCity,
        applyFilter,
        changeCitiesFilter,
        filter
    });
    console.log(filter)
    return (
        <Provider
            value={{
                loading,
                city_ids,
                filter,
                setFilter,
                //breed_types,
                cities,
                changeCitiesFilter,
                clearFilter,
                applyFilter,
                setPage
            }}
        >
            <div className={className}>{children}</div>
        </Provider>
    );
}

export default connectExhibitionsFilter(ExhibitionsFilter);
