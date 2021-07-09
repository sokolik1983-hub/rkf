import React from 'react';
import ListFilter from "../NewsList/ListFilter";
import HomeCitySelect from "./HomeCitySelect/index";

import cn from "classnames";

import useIsMobile from "../../../../utils/useIsMobile";
import {connectShowFilters} from "../../../../components/Layouts/connectors";

const NewsFilters = ({
                 newsFilter,
                 changeOrganizationFilters,
                 changeTypeFilters,
                 activeType,
                 changeCityFilter,
                 isOpenFilters,
             }) => {

    const isMobile1080 = useIsMobile(1080)
    return (

            <div className={cn("NewsList__head", {
                ["NewsList__head-mobile"] : isMobile1080,
                ["NewsList__head-desktop"] : !isMobile1080,
                ["__open"] : isMobile1080 && isOpenFilters,

            })}>
            <div className="NewsList__head-wrap">
                <div className="NewsList__filters">
                    <div className="Homepage__news-title-w ">
                        <ul className="ListFilter">
                            <h3>Публикации</h3>
                            <li style={{backgroundImage: '/static/icons/home-filters/cards-variant.svg'}}>
                            <span
                                className={`ListFilter__item${activeType === 'all' ? ' _active' : ''}`}
                                onClick={() => changeTypeFilters('all')}>
                                Все
                            </span>
                            </li>
                            <li>
                            <span
                                className={`ListFilter__item${activeType === 'news' ? ' _active' : ''}`}
                                onClick={() => changeTypeFilters('news')}>
                                Новости
                            </span>
                            </li>
                            <li>
                            <span
                                className={`ListFilter__item${activeType === 'advert' ? ' _active' : ''}`}
                                onClick={() => changeTypeFilters('advert')}>
                                Объявления
                            </span>
                            </li>
                        </ul>

                    </div>

                    <ListFilter
                        changeFilter={changeOrganizationFilters}
                    />
                </div>
                <div className="NewsList__filters-city">
                        <HomeCitySelect
                            checkedCities={newsFilter.cities}
                            changeCityFilter={changeCityFilter}
                        />
                    </div>
            </div>
         </div>
    );
};

export default connectShowFilters(React.memo(NewsFilters));
