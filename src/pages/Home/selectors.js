export const selectCities = state => {
    const { cities } = state.dictionaries;
    return { cities: cities.options };
};