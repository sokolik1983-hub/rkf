import React, {memo} from "react";
import StickyBox from "react-sticky-box";
import Loading from "../../../../components/Loading";
import ClickGuard from "../../../../components/ClickGuard";
import ListFilter from "../NewsList/ListFilter";
import CitiesFilter from "../../../../components/Filters/CitiesFilter";
import {connectShowFilters} from "../../../../components/Layouts/connectors";
import "./index.scss";


const NewsFilters = ({
    loading,
    cities,
    newsFilter,
    changeOrganizationFilters,
    changeCityFilter,
    setShowFilters,
    isOpenFilters
}) => (
    <aside className={`news-filters${isOpenFilters ? ' _open' : ''}`}>
        <ClickGuard
            value={isOpenFilters}
            callback={() => setShowFilters({isOpenFilters: false})}
        />
        <StickyBox offsetTop={60}>
            {loading ?
                <Loading centered={false}/> :
                <>
                    <ListFilter
                        changeFilter={changeOrganizationFilters}
                    />
                    <CitiesFilter
                        withOpenButton={false}
                        cities={cities}
                        city_ids={newsFilter.cities}
                        onChange={changeCityFilter}
                    />
                </>
            }
        </StickyBox>
    </aside>
);

export default memo(connectShowFilters(NewsFilters));