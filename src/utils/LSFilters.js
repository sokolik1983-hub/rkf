export const getLSCities = () => {
    const filters = JSON.parse(localStorage.getItem('FiltersValues')) || {};
    return filters.cities || [];
};

export const getLSRegions = () => {
    const filters = JSON.parse(localStorage.getItem('FiltersValues')) || {};
    return filters.regions || [];
};

export const setLSCities = citiesIds => {
    let filters = JSON.parse(localStorage.getItem('FiltersValues')) || {};
    filters.cities = citiesIds;
    localStorage.setItem('FiltersValues', JSON.stringify(filters));
};

export const setLSRegions = regionIds => {
    let filters = JSON.parse(localStorage.getItem('FiltersValues')) || {};
    filters.regions = regionIds;
    localStorage.setItem('FiltersValues', JSON.stringify(filters));
};