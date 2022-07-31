import React, {memo, useMemo, useState} from 'react';
import SwipeTabs from '../../../../../components/SwipeTabs';
import {getEmptyFilters, setFiltersToUrl} from '../../../utils';

import './index.scss';
import { Sorting } from "../../../../../components/Sorting";

const OrganizationsFilter = ({organization_type}) => {
    const [isOpen, setIsOpen] = useState(false);

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
                    <Sorting
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        pageName="organizations"
                        setFilters={setFiltersToUrl}
                    />
                </div>
                <SwipeTabs
                    items={tabItems}
                    activeTabIndex={tabItems.findIndex(item => item.organization_type === organization_type)}
                    onChange={({organization_type}) => setFiltersToUrl({
                        ...prepareFilters(organization_type),
                        organization_type
                    })}
                />
            </div>
        </div>
    );
};

export default memo(OrganizationsFilter);