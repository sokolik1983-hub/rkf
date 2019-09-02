import React, {useContext} from 'react'
import {ExhibitionsFilterContext} from 'apps/Exhibitions/context'
import './ClearFilter.scss'

const ClearFilter = () => {
    const {applyFilter, clearFilter} = useContext(ExhibitionsFilterContext);
    return (
        <div className="ClearFilter">
            <button onClick={applyFilter} className="ClearFilter__apply">Применить</button>
            <button className="ClearFilter__cancel" onClick={clearFilter}>Отменить</button>
        </div>
    );
};

export default ClearFilter;