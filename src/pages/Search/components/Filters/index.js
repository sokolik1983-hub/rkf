import React, {memo, useEffect} from "react";
import StickyBox from "react-sticky-box";
import Aside from "../../../../components/Layouts/Aside";
import Card from "../../../../components/Card";
import CopyrightInfo from "../../../../components/CopyrightInfo";
import Dropdown from "./Dropdown";
import {setOverflow} from "../../../../utils";
import "./index.scss";


const Filters = ({isOpenFilters, filtersValue, filters, additionalFilters,}) => {
    useEffect(() => {
        setOverflow(isOpenFilters);
        window.addEventListener('resize', () => setOverflow(isOpenFilters));
        return () => window.removeEventListener('resize', () => setOverflow(isOpenFilters));
    }, [isOpenFilters]);

    const checkFilter = (filter) => {
        if (filter.items[0].search_type.toString()[0] === filtersValue.search_type.toString()[0]) return true;
    }

    return (
        <Aside className={`search-page__left${isOpenFilters ? ' _open' : ''}`}>
            <StickyBox>
                <div className="search-page__filters-wrap">
                    {filters.map(filter =>
                        checkFilter(filter) &&
                        <Card key={filter.name}>
                            <Dropdown
                                filtersValue={filtersValue}
                                {...filter}
                                additionalFilters={additionalFilters}
                            />
                        </Card>
                    )}
                    <CopyrightInfo withSocials/>
                </div>
            </StickyBox>
        </Aside>
    )
};

export default memo(Filters);