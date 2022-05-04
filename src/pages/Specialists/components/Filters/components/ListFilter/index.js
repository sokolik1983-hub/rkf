import React, {memo, useEffect, useMemo, useState} from "react";
import {useLocation} from "react-router-dom";
import SwipeTabs from "../../../../../../components/SwipeTabs";
import {getEmptyFilters, setFiltersToUrl} from "../../../../utils";
import CustomCheckbox from "../../../../../../components/Form/CustomCheckbox";

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

    const [isFilter, setIsFilter] = useState(false);
    const [isPopular, setIsPopular] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const location = useLocation();

    const handleFilter = () => {
        setIsFilter(!isFilter);
        setIsPopular(false);
        setIsVerified(false);
        setFiltersToUrl({IsPopular: false , isVerified: false})
    }

    const handlePopular = () => {
        setIsPopular(!isPopular);
        setIsVerified(false);
        setFiltersToUrl({IsPopular: !isPopular , isVerified: false})
    }

    const handleVerified = () => {
        setIsVerified(!isVerified);
        setIsPopular(false);
        setFiltersToUrl({IsPopular: false, isVerified: !isVerified})
    }

    useEffect(()=>{
        location.search.indexOf('IsPopular=true') !== -1 && setIsFilter(!isFilter)
    }, []);

    return (
        <div className="specialists-page__list-filter">
            <div className="specialists-page__list-filter_header">
                <h4 className="list-filter__title">Судьи и специалисты</h4>
                <CustomCheckbox
                    id="need-filter"
                    label="Сортировка"
                    checked={!!isFilter}
                    onChange={handleFilter}
                    cName="sorting-filter"
                />
            </div>

            {!isFilter ? <SwipeTabs
                    items={tabItems}
                    activeTabIndex={tabItems.findIndex(item => item.search_type === searchTypeId)}
                    onChange={({search_type}) => setFiltersToUrl({
                        ...getEmptyFilters(),
                        RegionIds: RegionIds,
                        CityIds: CityIds,
                        SearchTypeId: search_type
                    })}
                /> :
                <div className="specialists-page__checkbox-wrap">
                    <CustomCheckbox
                        id="most-liked"
                        label="По популярности"
                        checked={!!isPopular}
                        onChange={handlePopular}
                        cName="like-filter"
                    />
                    <CustomCheckbox
                        id="verified"
                        label="По верифицированным специалистам"
                        checked={!!isVerified}
                        onChange={handleVerified}
                        cName="verified-filter"
                    />
                </div>}
        </div>
    )
};

export default memo(ListFilter);