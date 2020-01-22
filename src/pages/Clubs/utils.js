export const getFiltersFromLS = () => {
    return JSON.parse(localStorage.getItem('ClubsFiltersValues'));
};

export const setFiltersToLS = filters => {
    localStorage.setItem('ClubsFiltersValues', JSON.stringify(filters));
};

export const getEmptyFilters = () => ({
    "string_filter": "",
    "federation_ids": [],
    "club_ids": [],
    "is_activated": null,
    "page": 1
});

export const getInitialFilters = () => {
    const emptyFilters = getEmptyFilters();
    const filtersFromLS = getFiltersFromLS();

    return filtersFromLS ? filtersFromLS : emptyFilters;
};