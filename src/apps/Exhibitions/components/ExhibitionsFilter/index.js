import React from 'react';
import {connectExhibitionsFilter} from 'apps/Exhibitions/connectors';
import {ExhibitionsFilterContext} from 'apps/Exhibitions/context';
import {useDictionary} from 'apps/Dictionaries';
import {useExhibitionsFilter} from './hooks';

const { Provider } = ExhibitionsFilterContext;

function ExhibitionsFilter({
    city_ids,
    children,
    className,
    fetchExhibitionsSuccess
}) {
    const { ...hookExports } = useExhibitionsFilter({
        successAction: fetchExhibitionsSuccess
    });

    const { dictionary: cities } = useDictionary('cities');


    return (
        <Provider
            value={{
                city_ids,
                cities,
                ...hookExports
                //
            }}
        >
            <div className={className}>{children}</div>
        </Provider>
    );
}

export default connectExhibitionsFilter(ExhibitionsFilter);
