import React, {PureComponent} from 'react'
import {DogBreedFilter} from 'apps/Exhibitions/components/Filter'

import {dogBreedFilterOptions} from 'apps/Exhibitions/config'


const Filter = () =>
    <div className="exhibition__filters">
        <h3>Фильтры</h3>
        <DogBreedFilter options={dogBreedFilterOptions}/>
    </div>

export default Filter;