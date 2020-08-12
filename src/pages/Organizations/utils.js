export const getFiltersFromLS = () => {
    return JSON.parse(localStorage.getItem('OrganizationsFilters'));
};

export const setFiltersToLS = filters => {
    localStorage.setItem('OrganizationsFilters', JSON.stringify(filters));
};

export const getEmptyFilters = () => ({
    organization_type: 3,
    string_filter: "",
    federation_ids: [],
    city_ids: [],
    breed_ids: [],
    activated: true,
    active_member: false,
    start_element: 1
});

export const getInitialFilters = () => {
    const emptyFilters = getEmptyFilters();
    const filtersFromLS = getFiltersFromLS();

    return filtersFromLS ? filtersFromLS : emptyFilters;
};