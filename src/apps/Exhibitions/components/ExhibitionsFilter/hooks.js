import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePushMessage } from 'apps/Messages/hooks';
import { buildUrl, loadGlobalCity } from './heplers';
import { endpointExhibitionsList } from 'apps/Exhibitions/config';
import { getHeaders } from 'utils/request';

const NO_EXHIBITIONS_FOUND = 'Выставок не найдено';
const NO_EXHIBITIONS_FOUND_IN_CITY = 'Для вашего города выставок не найдено';
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
    const { push } = usePushMessage();
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

    //
    const applyFilter = () => {
        const url = `${buildUrl(filter)}`;
        setUrl(url);
    };
    // filter modifiers for different filter sub filters
    const changeCitiesFilter = cities => setFilter({ ...filter, cities });
    const changeBreedsFilter = breeds => setFilter({ ...filter, breeds });
    const changeRanksFilter = ranks => setFilter({ ...filter, ranks });
    const changeCastesFilter = castes => setFilter({ ...filter, castes });
    const changeTypesFilter = types => setFilter({ ...filter, types });
    const changeClubsFilter = clubs => setFilter({ ...filter, clubs });
    const setDate = date => {
        const newFilter = { ...filter, dateFrom: [date], dateTo: [date] };
        setFilter(newFilter);
        const url = `${buildUrl(newFilter)}`;
        setUrl(url);
    };
    const clearDate = () => {
        const newFilter = { ...filter, dateFrom: [], dateTo: [] };
        setFilter(newFilter);
        const url = `${buildUrl(newFilter)}`;
        setUrl(url);
    };

    const setDatesRange = ({ dateFrom, dateTo }) => {
        const newFilter = { ...filter, dateFrom: [dateFrom], dateTo: [dateTo] };
        setFilter(newFilter);
        const url = `${buildUrl(newFilter)}`;
        setUrl(url);
    };
    const clearDatesRange = () => {
        const newFilter = { ...filter, dateFrom: [], dateTo: [] };
        setFilter(newFilter);
        const url = `${buildUrl(newFilter)}`;
        setUrl(url);
    };

    const setPage = page => {
        const url = `${buildUrl({
            ...filter,
            page: [page]
        })}`;
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
                    push({
                        text: NO_EXHIBITIONS_FOUND_IN_CITY
                    });
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
                const { exhibitions } = response.data.result;
                if (exhibitions.length === 0) {
                    push({
                        text: NO_EXHIBITIONS_FOUND
                    });
                }
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
        url,
        setUrl,
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
        clearDate,
        setDatesRange,
        clearDatesRange,
        clearFilter,
        setPage
    };
};
