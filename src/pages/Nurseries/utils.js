export const getFiltersFromLS = () => {
    return JSON.parse(localStorage.getItem('NurseriesFiltersValues'));
};

export const setFiltersToLS = filters => {
    localStorage.setItem('NurseriesFiltersValues', JSON.stringify(filters));
};

export const getEmptyFilters = () => ({
    "string_filter": "",
    "federation_ids": [],
    "city_ids": [],
    "breed_ids": [],
    "is_activated": true,
    "active_member": false,
    "page": 1
});

export const getInitialFilters = () => {
    const emptyFilters = getEmptyFilters();
    const filtersFromLS = getFiltersFromLS();

    if(filtersFromLS && !filtersFromLS.breed_ids) {
        filtersFromLS.breed_ids = [];
    }

    return filtersFromLS ? filtersFromLS : emptyFilters;
};