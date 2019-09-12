import { useEffect, useState } from 'react';
import axios from 'axios';
import { buildUrlParams, loadGlobalCity } from './heplers';
import { endpointExhibitionsList } from 'apps/Exhibitions/config';
import { getHeaders } from 'utils/request';

const filterInitialState = {
    cities: [],
    breeds: [],
    ranks: [],
    castes: [],
    types: [],
    clubs: [],
    page: [],
    dateFrom: [],
    dateTo: []
    //dates: {}
};
export const useExhibitionsFilter = ({ successAction }) => {
    // берём выбранныей выбором город
    const globalCity = loadGlobalCity();
    // filterState used for constructing filter, and url params based on filter
    const [filter, setFilter] = useState(filterInitialState);

    // url of request, if it changed effect run again, applyFilter do this
    const [url, setUrl] = useState(endpointExhibitionsList);
    // for requests

    const [loading, setLoading] = useState(false);

    const [canCommonRequestRun, setCanCommonRequestRun] = useState(
        globalCity === null
    );
    console.log('canCommonRequestRun', canCommonRequestRun, url);
    //
    const applyFilter = () => {
        const url = `${endpointExhibitionsList}?${buildUrlParams(filter)}`;
        setUrl(url);
    };
    // filter modifiers for different filter sub filters
    const changeCitiesFilter = cities => setFilter({ ...filter, cities });
    const changeBreedsFilter = breeds => setFilter({ ...filter, breeds });
    const changeRanksFilter = ranks => setFilter({ ...filter, ranks });
    const changeCastesFilter = castes => setFilter({ ...filter, castes });
    const changeTypesFilter = types => setFilter({ ...filter, types });
    const changeClubsFilter = clubs => setFilter({ ...filter, clubs });
    const setDate = date =>
        setFilter({ ...filter, dateFrom: [date], dateTo: [date] });
    const setDatesRange = ({ dateFrom, dateTo }) =>
        setFilter({ ...filter, dateFrom: [dateFrom], dateTo: [dateTo] });
    const setPage = page => {
        const url = `${endpointExhibitionsList}?${buildUrlParams({ ...filter, page: [page] })}`;
        setUrl(url);
    };

    const clearFilter = () => {
        setFilter({ ...filterInitialState });
        setUrl(endpointExhibitionsList);
    };
    // first request if for global city, need to check
    // if there is no exhibitions
    // it run the normal request for all exhibitions

    useEffect(() => {
        let cancelRequest = false;

        if (!!globalCity) {
            changeCitiesFilter([globalCity]);
        }

        const fetchData = async () => {
            try {
                const axiosConfig = {
                    url: `${url}?CityIds=${globalCity}`,
                    headers: getHeaders()
                };
                setLoading(true);
                setUrl(axiosConfig.url);
                const response = await axios(axiosConfig);
                const { exhibitions } = response.data.result;

                if (exhibitions.length === 0) {
                    setLoading(false);
                    setCanCommonRequestRun(true);
                    clearFilter();
                } else {
                    successAction(response.data.result);
                    setCanCommonRequestRun(true);
                }
            } catch (error) {
                console.error('useExhibitionsFilter Error');
                console.log(error);
            }
        };
        if (!cancelRequest && !!globalCity) {
            fetchData();
        }

        return () => {
            cancelRequest = true;
        };
    }, []);

    // common request
    useEffect(() => {
        let cancelRequest = false;

        const axiosConfig = {
            url,
            headers: getHeaders()
        };

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios(axiosConfig);
                successAction(response.data.result);
                setLoading(false);
            } catch (error) {
                console.error('useExhibitionsFilter Error');
                console.log(error);
                setLoading(false);
            }
        };
        if (!cancelRequest && canCommonRequestRun) {
            fetchData();
        }

        return () => {
            cancelRequest = true;
        };
    }, [url]);
    return {
        filter,
        setFilter,
        loading,
        applyFilter,
        changeCitiesFilter,
        changeBreedsFilter,
        changeRanksFilter,
        changeCastesFilter,
        changeTypesFilter,
        changeClubsFilter,
        setDate,
        setDatesRange,
        clearFilter,
        setPage
    };
};
