import React, {useState} from 'react'
import {connectExhibitionsFilter} from 'apps/Exhibitions/connectors'
import {ExhibitionsFilterContext} from 'apps/Exhibitions/context'
import {useDictionary} from "apps/Dictionaries";
import {useResourceAndStoreToRedux} from "../../../../shared/hooks";
import {endpointExhibitionsList} from "../../config";

const {Provider} = ExhibitionsFilterContext;
const filterInitialState = {
    cities: [],
    //breeds: [],
    //dates: {}
};


function ExhibitionsFilter({city_ids, children, className, fetchExhibitionsSuccess}) {
    const [url, setUrl] = useState(endpointExhibitionsList);
    const {loading} = useResourceAndStoreToRedux(url, fetchExhibitionsSuccess);

    // city_ids - ids of cities of exhibitions in selected list
    const [filter, setFilter] = useState(filterInitialState);
    //const {dictionary: breed_types} = useDictionary('breed_types');
    const {dictionary: cities} = useDictionary('cities');
    // cities - словарь всех городов
    const changeCitiesFilter = cities => setFilter({...filter, cities});
    const clearFilter = () => {
        setFilter({...filterInitialState});
        setUrl(endpointExhibitionsList);
    };
    const mapParams = (array, apiParamName) => {
        let str = '';
        array.forEach(el => {
            str = str + apiParamName + '=' + el + '&'
        });
        return str
    };
    const buildUri = filter => {
        let str = '';

        Object.keys(filter).forEach(key => {
            str = str + mapParams(filter[key], 'CityIds')
        });

        return str
    };
    const applyFilter = () => {
        const url = `${endpointExhibitionsList}?${buildUri(filter)}`;
        setUrl(url)
    };

    const setPage = (page) => {
        const url = `${endpointExhibitionsList}?${buildUri(filter)}&PageNumber=${page}`;
        setUrl(url)
    };

    return (
        <Provider value={{
            loading,
            city_ids,
            filter,
            setFilter,
            //breed_types,
            cities,
            changeCitiesFilter,
            clearFilter,
            applyFilter,
            setPage,
        }}>
            <div className={className}>
                {children}
            </div>
        </Provider>
    )
}

export default React.memo(connectExhibitionsFilter(ExhibitionsFilter))