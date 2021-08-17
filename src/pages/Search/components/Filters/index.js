import React, {memo, useEffect} from "react";
import StickyBox from "react-sticky-box";
import Aside from "../../../../components/Layouts/Aside";
import Card from "../../../../components/Card";
import CopyrightInfo from "../../../../components/CopyrightInfo";
import Dropdown from "./Dropdown";
import {setOverflow} from "../../../../utils";
import "./index.scss";


const Filters = ({isOpenFilters, filtersValue, filters, additionalFilters}) => {
    useEffect(() => {
        setOverflow(isOpenFilters);
        window.addEventListener('resize', () => setOverflow(isOpenFilters));
        return () => window.removeEventListener('resize', () => setOverflow(isOpenFilters));
    }, [isOpenFilters]);

    return (
        <Aside className={`search-page__left${isOpenFilters ? ' _open' : ''}`}>
            <StickyBox>
                <div className="search-page__filters-wrap">
                    {filters.map(filter =>
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