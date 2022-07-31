import React, { memo, useMemo, useState } from "react";
import SwipeTabs from "../../../../../../components/SwipeTabs";
import {getEmptyFilters, setFiltersToUrl} from "../../../../utils";
import { Sorting } from "../../../../../../components/Sorting";
import "./index.scss";


const ListFilter = ({
        CityIds,
        RegionIds,
        searchTypeId,
}) => {
    const tabItems = useMemo(() => {
        return [
            {title: 'По породам', search_type: 4},
            {title: 'По служебным и игровым дисциплинам', search_type: 1},
            {title: 'По охотничьим дисциплинам', search_type: 2},
            {title: 'Специалисты', search_type: 3}
        ];
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (id) => {
        setIsOpen(false);

        setFiltersToUrl({
            ...getEmptyFilters(),
            RegionIds: RegionIds,
            CityIds: CityIds,
            SearchTypeId: id,
        });
    }


    return (
        <div className="specialists-page__list-filter">
            <div className="specialists-page__list-filter_header">
                <h4 className="list-filter__title">Судьи и специалисты</h4>
                <Sorting
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    pageName="specialists"
                    setFilters={setFiltersToUrl}
                />
            </div>

            <SwipeTabs
                items={tabItems}
                activeTabIndex={tabItems.findIndex(item => item.search_type === searchTypeId)}
                onChange={({search_type}) => { handleChange(search_type)}}
            />
        </div>
    )
};

export default memo(ListFilter);