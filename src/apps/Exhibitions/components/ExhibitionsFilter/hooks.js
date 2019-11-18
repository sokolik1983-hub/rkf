import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePushMessage, useClearMessages } from 'apps/Messages/hooks';
import { buildUrl } from './heplers';
import { getHeaders } from 'utils/request';
import { formatDateToString, getEndOfMonth } from 'utils/datetime';

const NO_EXHIBITIONS_FOUND = 'Выставок не найдено';
const NO_EXHIBITIONS_FOUND_IN_CITY = 'Для вашего города выставок не найдено';
const getFiltersFromLS = () => {
    return JSON.parse(localStorage.getItem('FiltersValues'));
};
const setFiltersToLS = (filters) => {
    localStorage.setItem('FiltersValues', JSON.stringify(filters));
};
const filtersFromLS = getFiltersFromLS();
const emptyFilters = {
    cities: [],
    breeds: [],
    ranks: [],
    castes: [],
    types: [],
    clubs: [],
    page: [],
    // запиливаем выставки с текущего дня до бесконечности
    dateFrom: [formatDateToString(new Date())],
    dateTo: []
};
let filterInitialState = filtersFromLS ? filtersFromLS : emptyFilters;
if (filtersFromLS) {
    if (Object.keys(filtersFromLS).length === 1) {
        const { cities } = filtersFromLS;
        filterInitialState = { ...emptyFilters, cities };
    } else {
        const dateToday = +new Date(emptyFilters.dateFrom[0]);
        const dateFrom = filtersFromLS.dateFrom.length ?
            +new Date(filtersFromLS.dateFrom[0]) > dateToday ?
                filtersFromLS.dateFrom[0] :
                emptyFilters.dateFrom[0] :
            emptyFilters.dateFrom[0];
        const dateTo = filtersFromLS.dateTo.length ?
            +new Date(filtersFromLS.dateTo[0]) >= +new Date(dateFrom) ?
                filtersFromLS.dateTo[0] :
                '' :
            '';

        filterInitialState.dateFrom = [dateFrom];
        filterInitialState.dateTo = dateTo ? [dateTo] : [];
    }
}

export const useExhibitionsFilter = ({ successAction }) => {
    const { push } = usePushMessage();
    const { clear } = useClearMessages();

    // filterState used for constructing filter, and url params based on filter
    const [filter, setFilter] = useState(filterInitialState);
    const setFilters = (filters) => {
        setFilter(filters);
        setFiltersToLS(filters);
    };

    // url of request, if it changed effect run again, applyFilter do this
    const [url, setUrl] = useState(`${buildUrl(filter)}`);
    // for requests

    const [loading, setLoading] = useState(false);

    const applyFilter = () => {
        setFiltersToLS(filter);
        const url = `${buildUrl(filter)}`;
        setUrl(url);
    };
    // filter modifiers for different filter sub filters
    const changeCitiesFilter = cities => setFilter({ ...filter, cities });
    const changeBreedsFilter = breeds => setFilter({ ...filter, breeds });
    const changeRanksFilter = ranks => setFilter({ ...filter, ranks });
    const changeCastesFilter = castes => setFilter({ ...filter, castes });
    const changeTypesFilter = types => setFilter({ ...filter, types });
    const changeClubsFilter = clubs => {
        const newFilter = { ...filter, clubs };
        setFilters(newFilter);
        const url = `${buildUrl(newFilter)}`;
        setUrl(url);
    };
    const setDate = date => {
        const newFilter = { ...filter, dateFrom: [date], dateTo: [date] };
        setFilters(newFilter);

        const url = `${buildUrl(newFilter)}`;
        setUrl(url);
    };
    const clearDate = () => {
        const newFilter = { ...filter, dateFrom: [], dateTo: [] };
        setFilters(newFilter);

        const url = `${buildUrl(newFilter)}`;
        setUrl(url);
    };

    const setDatesRange = ({ dateFrom, dateTo }) => {
        const newFilter = { ...filter, dateFrom: [dateFrom], dateTo: [dateTo] };
        setFilters(newFilter);

        const url = `${buildUrl(newFilter)}`;
        setUrl(url);
    };

    const clearDatesRange = () => {
        const newFilter = { ...filter, dateFrom: [], dateTo: [] };
        setFilters(newFilter);

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
        setFilters({ ...emptyFilters });
        setUrl(`${buildUrl(emptyFilters)}`);
    };

    const handleCalendarMonthChange = date => {
        const newFilter = {
            ...filter,
            dateFrom: [formatDateToString(date)],
            dateTo: [formatDateToString(getEndOfMonth(date))]
        };
        setFilters(newFilter);
        const url = `${buildUrl(newFilter)}`;
        setUrl(url);
    };

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
                if (exhibitions && exhibitions.length === 0) {
                    push({
                        text: filter.cities.length === 1 ? NO_EXHIBITIONS_FOUND_IN_CITY : NO_EXHIBITIONS_FOUND
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
        if (!cancelRequest) {
            fetchData();
        }

        return () => {
            cancelRequest = true;
            clear();
        };
    }, [url]);

    return {
        url,
        setUrl,
        filter,
        setFilter,
        setFilters,
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
        handleCalendarMonthChange,
        clearFilter,
        setPage
    };
};
