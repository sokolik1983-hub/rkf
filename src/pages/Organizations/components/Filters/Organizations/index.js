import React, {memo, useMemo} from "react";
import SwipeTabs from "../../../../../components/SwipeTabs";
import {getEmptyFilters, setFiltersToUrl} from "../../../utils";
import "./index.scss";


const OrganizationsFilter = ({organization_type}) => {
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
                <h3>Организации</h3>
                <SwipeTabs
                    items={tabItems}
                    activeTabIndex={tabItems.findIndex(item => item.organization_type === organization_type)}
                    onChange={({organization_type}) => setFiltersToUrl({
                        ...getEmptyFilters(),
                        organization_type
                    })}
                />
            </div>
        </div>
    );
};

export default memo(OrganizationsFilter);