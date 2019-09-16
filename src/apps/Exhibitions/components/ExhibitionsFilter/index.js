import React from 'react';
import { endpointExhibitionsFilters } from 'apps/Exhibitions/config';
import { connectExhibitionsFilter } from 'apps/Exhibitions/connectors';
import { ExhibitionsFilterContext } from 'apps/Exhibitions/context';
import { useDictionary } from 'apps/Dictionaries';
import { useResourceAndStoreToRedux } from 'shared/hooks';
import { useExhibitionsFilter } from './hooks';

const { Provider } = ExhibitionsFilterContext;

function ExhibitionsFilter({
    // filters options
    filterOptionsBreeds,
    filterOptionsCastes,
    filterOptionsCities,
    filterOptionsDates,
    filterOptionsRanks,
    filterOptionsTypes,
    // end of filters options
    children,
    className,
    fetchExhibitionsSuccess,
    fetchFiltersSuccess
}) {
    const { ...hookExports } = useExhibitionsFilter({
        successAction: fetchExhibitionsSuccess
    });

    const { loading: filtersLoading } = useResourceAndStoreToRedux(
        endpointExhibitionsFilters,
        fetchFiltersSuccess
    );

    return (
        <Provider
            value={{
                filterOptionsBreeds,
                filterOptionsCastes,
                filterOptionsCities,
                filterOptionsDates,
                filterOptionsRanks,
                filterOptionsTypes,
                filtersLoading,
                ...hookExports
                //
            }}
        >
            <div className={className}>{children}</div>
        </Provider>
    );
}

export default connectExhibitionsFilter(ExhibitionsFilter);
