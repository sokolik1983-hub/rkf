import React, {PureComponent} from 'react'
import {CheckBoxFilter} from 'apps/Exhibitions/components/Filter'

import {dogBreedFilterOptions} from 'apps/Exhibitions/config'

export default class Filter extends PureComponent {
    state = {
        dogBreedFilter: [],
        cityFilter: []
    };
    dogBreedFilterChanged = values => {
        this.setState({dogBreedFilter: values})
    };

    render() {
        return (
            <div className="exhibition__filters">
                <h3>Фильтры</h3>
                <CheckBoxFilter multiselect={false} onChange={this.dogBreedFilterChanged} options={dogBreedFilterOptions}/>
            </div>
        )
    }
}
