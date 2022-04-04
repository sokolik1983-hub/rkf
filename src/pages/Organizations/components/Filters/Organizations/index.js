import React, {memo, useMemo, useState} from 'react';
import SwipeTabs from '../../../../../components/SwipeTabs';
import {getEmptyFilters, setFiltersToUrl} from '../../../utils';
import CustomCheckbox from '../../../../../components/Form/CustomCheckbox';

import './index.scss';

const OrganizationsFilter = ({organization_type}) => {
    const [isFilter, setIsFilter] = useState(false);

    const handleFilter = () => {
        setIsFilter(!isFilter);
        setFiltersToUrl({is_popular: !isFilter})
    }

    const prepareFilters =  (typeId) => {
        if (typeId !== 3 && typeId !== 4) {
            return getEmptyFilters();
        }
    }

    const tabItems = useMemo(() => {
        return [
            {title: 'РКФ и Федерации', organization_type: 5},
            {title: 'Клубы', organization_type: 3},
            {title: 'Питомники', organization_type: 4},
            {title: 'НКП', organization_type: 7}
        ];
    }, []);

    return (
        <div className="organizations-page__list-filter">
            <div className="organizations-page__filter-wrap">
                <div className="organizations-page__filter-header">
                    <h3>Организации</h3>
                    {(organization_type !== 5) &&
                        <CustomCheckbox
                        id="need-filter"
                        label="Сортировка"
                        checked={!!isFilter}
                        onChange={handleFilter}
                        cName="sorting-filter"
                    />}
                </div>
                {!isFilter ? <SwipeTabs
                    items={tabItems}
                    activeTabIndex={tabItems.findIndex(item => item.organization_type === organization_type)}
                    onChange={({organization_type}) => setFiltersToUrl({
                        ...prepareFilters(organization_type),
                        organization_type
                    })}
                /> :
                    <CustomCheckbox
                        id="most-liked"
                        label="По популярности"
                        checked={!!isFilter}
                        onChange={handleFilter}
                        cName="like-filter"
                    />}
            </div>
        </div>
    );
};

export default memo(OrganizationsFilter);