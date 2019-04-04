import React, {PureComponent} from 'react'
import {CheckBoxFilter} from 'apps/Exhibitions/components/Filter'
import FilterSearch from 'apps/Exhibitions/components/FilterSearch'
import Button from 'components/Button'
import {dogBreedFilterOptions} from 'apps/Exhibitions/config'
import {cityFilterOptions} from 'apps/Exhibitions/config'

export default class Filter extends PureComponent {
    state = {
        dogBreedFilter: [],
        cityFilter: []
    };
    dogBreedFilterChanged = values => {
        this.setState({dogBreedFilter: values})
    };
    cityFilterChanged = values => {
        this.setState({cityFilter: values})
    };
    onSearchFilterChange = (value) => {
        console.log(value)
    };

    render() {
        return (
            <div className="exhibition-filters">
                <h3>Фильтры</h3>
                <CheckBoxFilter
                    multiselect={false}
                    onChange={this.dogBreedFilterChanged}
                    options={dogBreedFilterOptions}
                />
                <FilterSearch
                    onChange={this.onSearchFilterChange}
                />
                <CheckBoxFilter
                    multiselect={true}
                    onChange={this.cityFilterChanged}
                    options={cityFilterOptions}
                />
                <div className="exhibition-filters__controls">
                    <Button className="btn-primary">Применить</Button>
                    <Button className="">Очистить</Button>
                </div>
            </div>
        )
    }
}
