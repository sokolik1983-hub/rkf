export const getFiltersFromLS = () => {
    return JSON.parse(localStorage.getItem('ClubsFiltersValues'));
};

export const setFiltersToLS = filters => {
    localStorage.setItem('ClubsFiltersValues', JSON.stringify(filters));
};

export const getEmptyFilters = () => ({
    "string_filter": "",
    "federation_ids": [],
    "city_ids": [],
    "is_activated": null,
    "active_member": true,
    "page": 1
});

export const getInitialFilters = () => {
    const emptyFilters = getEmptyFilters();
    const filtersFromLS = getFiltersFromLS();

    return filtersFromLS ? filtersFromLS : emptyFilters;
};