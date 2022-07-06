import history from "../../utils/history";
import {endpointGetSpecialists, endpointGetJudges, endpointJudgesFilters, endpointSpecialistsFilters} from "./config";


const buildUrlParams = filters => {
    let params = '';

    Object.keys(filters).forEach(key => {
        if(key !== 'filteredCities') {
            if(filters[key]) {
                if(key === 'SearchTypeId') {
                    if(filters[key] > 0) {
                        params = params + `${key}=${filters[key]}&`;
                    }
                } else if(
                    key === 'RegionIds' ||
                    key === 'CityIds' ||
                    key === 'BreedGroupIds' ||
                    key === 'BreedIds' ||
                    key === 'SpecializationIds' ||
                    key === 'DisciplineIds' ||
                    key === 'ContestIds'||
                    key === 'RankIds'
                ) {
                    if (filters[key].length) {
                        params = params + filters[key].map(item => `${key}=${item}&`).join('');
                    }
                } else {
                    params = params + `${key}=${filters[key]}&`;
                }
            }
        }
    });

    if (params.charAt(params.length - 1) === '&') {
        params = params.slice(0, -1);
    }

    return params ? `?${params}` : '';
};

export const buildUrl = filters => {
    return +filters.SearchTypeId === 4
        ? endpointGetJudges + buildUrlParams(filters)
        : endpointGetSpecialists + buildUrlParams(filters);
};

export const buildFiltersUrl = (filters, isFirstTime) => {
    return +filters.SearchTypeId === 4 ?
        `${endpointJudgesFilters}?SearchTypeId=${filters.SearchTypeId}${filters.RegionIds.map(reg => `&RegionIds=${reg}`).join('')}${filters.CityIds.map(city => `&CityIds=${city}`).join('')}${filters.BreedGroupIds.map(b => `&BreedGroupIds=${b}`).join('')}&ReturnStaticFilters=true&ReturnBreeds=true&ReturnCities=true` : //ReturnStaticFilters= должен использовать переменную "isFirstTime" сделали костыль, убрали оптимизацию запросов, нужно переделать
        `${endpointSpecialistsFilters}?SearchTypeId=${filters.SearchTypeId}${filters.RegionIds.map(reg => `&RegionIds=${reg}`).join('')}${filters.CityIds.map(city => `&CityIds=${city}`).join('')}&returnRegions=${isFirstTime}${filters.RankIds.map(rank => `&RankIds=${rank}`).join('')}${filters.DisciplineIds.map(discipline => `&DisciplineIds=${discipline}`).join('')}`
};

export const getFiltersFromUrl = () => {
    const emptyFilters = getEmptyFilters();
    let filters = {};

    if (history.location.search) {
        const searchString = decodeURIComponent(history.location.search);
        let filtersFromUrl = {};

        searchString.replace('?', '').split('&').forEach(param => {
            const key = param.split('=')[0];
            const value = param.split('=')[1];

            if (
                key === 'RegionIds' ||
                key === 'CityIds' ||
                key === 'BreedGroupIds' ||
                key === 'BreedIds' ||
                key === 'SpecializationIds' ||
                key === 'DisciplineIds' ||
                key === 'ContestIds' ||
                key === 'RankIds'
            ) {
                filtersFromUrl[key] = filtersFromUrl[key] ? [...filtersFromUrl[key], +value] : [+value];
            } else if(key === 'SearchTypeId' || key === 'ClassificationId') {
                filtersFromUrl[key] = +value;
            } else {
                filtersFromUrl[key] = value;
            }
        });

        Object.keys(emptyFilters).forEach(key => {
            filters[key] = filtersFromUrl[key] || emptyFilters[key];
        });
    }

    return filters;
};

export const setFiltersToUrl = (filters, initial = false) => {
    if(filters.filteredCities) {
        const newArr = [];
        filters.filteredCities.forEach(item => {
            filters.CityIds.forEach(elem => {
                if(item === elem) {
                    newArr.push(item);
                }
            })
        });
        filters.CityIds = newArr;
    }

    const newFilters = getFiltersFromUrl() ? { ...getFiltersFromUrl(), ...filters } : filters;
    const targetUrl = (`/specialists${buildUrlParams(newFilters)}`);

    initial ? history.replace(targetUrl) : history.push(targetUrl);
};

export const getEmptyFilters = () => ({
    sortType: 1,
    RegionIds: [],
    CityIds: [],
    BreedGroupIds: [],
    BreedIds: [],
    RankIds: [],
    ClassificationId: 0,
    SpecializationIds: [],
    DisciplineIds: [],
    ContestIds: [],
    SearchTypeId: 4,
    StringFilter: ''
});

export const getInitialFilters = () => {
    const emptyFilters = getEmptyFilters();
    const filtersFromUrl = getFiltersFromUrl();
    const hasFiltersFromUrl = !!Object.keys(filtersFromUrl).length;

    const filters = hasFiltersFromUrl ? filtersFromUrl : emptyFilters;

    if (!hasFiltersFromUrl) setFiltersToUrl(filters, true);

    return filters;
};