import React, { useState, useEffect } from 'react';
import { endpointExhibitionsFilters } from 'apps/Exhibitions/config';
import { connectExhibitionsFilter } from 'apps/Exhibitions/connectors';
import { ExhibitionsFilterContext } from 'apps/Exhibitions/context';
import { useResourceAndStoreToRedux } from 'shared/hooks';
import { buildUrlParams } from './heplers';
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
    const [filtersUrl, setFiltersUrl] = useState(endpointExhibitionsFilters);
    const { filter } = hookExports;
    const { dateFrom, dateTo } = filter;
    useEffect(() => {
        const newUrl = `${endpointExhibitionsFilters}?${buildUrlParams({
            dateFrom,
        })}`;
        setFiltersUrl(newUrl);
    }, [dateFrom, dateTo]);

    const { loading: filtersLoading } = useResourceAndStoreToRedux(
        filtersUrl,
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
