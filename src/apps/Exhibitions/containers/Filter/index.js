import React, {PureComponent} from 'react'
import {CheckBoxFilter} from 'apps/Exhibitions/components/Filter/FilterCheckbox'
import FilterSearch from 'apps/Exhibitions/components/FilterSearch'
import Button from 'components/Button'
import {dogBreedFilterOptions} from 'apps/Exhibitions/config'
import {cityFilterOptions} from 'apps/Exhibitions/config'

const filterSearchInitialState = {
    value: '',
    checked: false,
};

const filterInititalState = {
    filter: {
        dogBreedFilter: [],
        cityFilter: [],
    },

    filterSearch: {
        value: '',
        checked: false,
    },
};

export default class Filter extends PureComponent {
    state = filterInititalState;

    dogBreedFilterChanged = values => {
        const filter = {...this.state.filter};
        filter.dogBreedFilter = values;
        this.setState({filter: filter})
    };

    cityFilterChanged = values => {
        const filter = {...this.state.filter};
        filter.cityFilter = values;
        this.setState({filter: filter})
    };

    onCitySearchChange = (values) => {
        this.setState({filterSearch: values})
    };


    searchCities = (checked) => {
        const {filter, filterSearch} = this.state;
        const {cityFilter} = filter;
        const searchString = filterSearch.value;

        return checked ?
            cityFilterOptions.filter(option => option.label.indexOf(searchString) >= 0 && cityFilter.includes(option.value))
            :
            cityFilterOptions.filter(option => option.label.toLowerCase().indexOf(searchString.toLowerCase()) >= 0)
    };

    onFilterSearchReset = () => {
        this.setState({filterSearch: filterSearchInitialState})
    };

    onReset = () => {
        this.setState({...filterInititalState})
    }

    render() {
        const cityFilterOptions = this.searchCities(this.state.filterSearch.checked)
        return (
            <div className="exhibition-filters">
                <h3>Фильтры</h3>
                <CheckBoxFilter
                    multiselect={false}
                    onChange={this.dogBreedFilterChanged}
                    values={this.state.filter.dogBreedFilter}
                    options={dogBreedFilterOptions}
                />
                <FilterSearch
                    values={this.state.filterSearch}
                    onChange={this.onCitySearchChange}
                    onReset={this.onFilterSearchReset}
                />
                <CheckBoxFilter
                    multiselect={true}
                    onChange={this.cityFilterChanged}
                    values={this.state.filter.cityFilter}
                    options={cityFilterOptions}
                />
                <div className="exhibition-filters__controls">
                    <Button className="btn-primary">Применить</Button>
                    <Button className="btn-text" onClick={this.onReset}>Очистить</Button>
                </div>
            </div>
        )
    }
}
