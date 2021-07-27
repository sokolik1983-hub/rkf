import React from "react";
import cn from "classnames";
import Loading from "../../../../components/Loading";
import ListFilter from "../NewsList/ListFilter";
import HomeCitySelect from "./HomeCitySelect/index";
import useIsMobile from "../../../../utils/useIsMobile";
import {connectShowFilters} from "../../../../components/Layouts/connectors";


const NewsFilters = ({
    loading,
    cities,
    newsFilter,
    changeOrganizationFilters,
    changeTypeFilters,
    activeType,
    changeCityFilter,
    isOpenFilters
}) => {
    const isMobile1080 = useIsMobile(1080);

    return (
        <div className={cn("NewsList__head", {
            ["NewsList__head-mobile"] : isMobile1080,
            ["NewsList__head-desktop"] : !isMobile1080,
            ["__open"] : isMobile1080 && isOpenFilters,

        })}>
            <div className="NewsList__head-wrap">
                <div className="NewsList__filters">
                    {loading ?
                        <Loading centered={false}/> :
                        <>
                            <ListFilter
                                changeFilter={changeOrganizationFilters}
                            />
                            <HomeCitySelect
                                checkedCities={newsFilter.cities}
                                cities={cities}
                                changeCityFilter={changeCityFilter}
                            />
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default connectShowFilters(React.memo(NewsFilters));
