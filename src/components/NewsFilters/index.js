import React from 'react';
import ListFilter from "../../pages/Home/components/NewsList/ListFilter";
import CitySelect from "../CitySelect";

const NewsFilters = (newsFilter, changeOrganizationFilters, changeTypeFilters, activeType, changeCityFilter) => {
    return (
        <div className="NewsList__head">
            <div className="NewsList__head-wrap">
                <div className="Homepage__news-title">

                    {/*<div className="Homepage__news-mobile-only">*/}
                    {/*    <CitySelect*/}
                    {/*        currentCity={newsFilter.city}*/}
                    {/*        cityFilter={city => {*/}
                    {/*            if (!city || city.value !== (newsFilter.city && newsFilter.city.value)) {*/}
                    {/*                changeCityFilter(city);*/}
                    {/*            }*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
                <div className="NewsList__filters">
                    <div className="Homepage__news-title-w ">
                        <ul className="ListFilter">
                            <h3>Публикации</h3>
                            <li  style={{backgroundImage: '/static/icons/home-filters/cards-variant.svg'}}>
                                    <span
                                        className={`ListFilter__item${activeType === 'all' ? ' _active' : ''}`}
                                        onClick={() => changeTypeFilters('all')}

                                    >Все</span>
                            </li>
                            <li>
                                    <span
                                        className={`ListFilter__item${activeType === 'news' ? ' _active' : ''}`}
                                        onClick={() => changeTypeFilters('news')}
                                    >Новости</span>
                            </li>
                            <li>
                                    <span
                                        className={`ListFilter__item${activeType === 'advert' ? ' _active' : ''}`}
                                        onClick={() => changeTypeFilters('advert')}
                                    >Объявления</span>
                            </li>
                        </ul>

                    </div>

                    <ListFilter
                        changeFilter={changeOrganizationFilters}
                    />
                </div>
                <div className="NewsList__filters-city">
                    <CitySelect
                        currentCity={newsFilter.cities}
                        cityFilter={cities => {
                            console.log("cities father", cities)
                            changeCityFilter(cities);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewsFilters;
