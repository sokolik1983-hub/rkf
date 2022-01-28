import React, {memo, useMemo} from "react";
import SwipeTabs from "../../../../../../components/SwipeTabs";
import {setFiltersToUrl, getEmptyFilters} from "../../../../utils";
import CustomCheckbox from "../../../../../../components/Form/CustomCheckbox";
import "./index.scss";


const ListFilter = ({
                        searchTypeId,
                        is_popular,
                        onChange
}) => {
    const tabItems = useMemo(() => {
        return [
            {title: 'По породам', search_type: 4},
            {title: 'По служебным и игровым дисциплинам', search_type: 1},
            {title: 'По охотничьим дисциплинам', search_type: 2},
            {title: 'Специалисты', search_type: 3}
        ];
    }, []);

    return (
        <div className="specialists-page__list-filter">
            <h4 className="list-filter__title">Судьи и специалисты</h4>
            <CustomCheckbox
                id="most-liked"
                label="По популярности"
                checked={!!is_popular}
                onChange={() => onChange(!is_popular)}
            />
            <SwipeTabs
                items={tabItems}
                activeTabIndex={tabItems.findIndex(item => item.search_type === searchTypeId)}
                onChange={({search_type}) => setFiltersToUrl({
                    ...getEmptyFilters(),
                    SearchTypeId: search_type
                })}
            />
        </div>
    )
};

export default memo(ListFilter);