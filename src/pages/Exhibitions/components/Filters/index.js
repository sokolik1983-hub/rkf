import React, { useState, useEffect } from "react";
import StickyBox from "react-sticky-box";
import Loading from "../../../../components/Loading";
import UserHeader from "../../../../components/redesign/UserHeader";
import BreedsFilter from "../../../../components/Filters/BreedsFilter";
import RanksFilter from "../../../../components/Filters/RanksFilter";
import CitiesFilter from "../../../../components/Filters/CitiesFilter";
import CalendarFilter from "../../../../components/Filters/CalendarFilter";
import { connectShowFilters } from "../../../../components/Layouts/connectors";
import { setFiltersToUrl, getEmptyFilters } from "../../utils";
import { setOverflow } from "../../../../utils";
import Card from "../../../../components/Card";
import { Request } from "../../../../utils/request";
import { endpointExhibitionsFilters } from "../../config";
import RangeCalendarExhibitions from "../../../../components/kendo/RangeCalendar/RangeCalendarExhibitions.js";
import "./index.scss";


const Filters = ({ isOpenFilters, filters, clubName, profileId, logo, federationName, federationAlias }) => {
    const [ranks, setRanks] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clear_filter, setClearFilter] = useState(false);
    const [range_clicked, setRangeClicked] = useState(false);

    useEffect(() => {
        (() => Request({
            url: `${endpointExhibitionsFilters}${filters.Alias ? '?Alias=' + filters.Alias : ''}`
        }, data => {
            setCities(data.cities);
            setRanks(data.ranks.map(({ value, label }) => ({ id: value, name: label })));
            setBreeds(data.breeds.filter(item => item.value !== 1));
            setLoading(false);
            window.scrollTo(0, 0);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
        }))();
    }, [filters.Alias]);

    useEffect(() => {
        setOverflow(isOpenFilters);
        window.addEventListener('resize', () => setOverflow(isOpenFilters));
        return () => window.removeEventListener('resize', () => setOverflow(isOpenFilters));
    }, [isOpenFilters]);

    const clearAll = () => {
        const calendarButton = document.getElementsByClassName('calendar-filter__button active')[0];
        if (calendarButton) calendarButton.classList.remove('active');

        setFiltersToUrl(getEmptyFilters(filters.Alias));
        setClearFilter(true);
    };

    return (
        <aside className={`exhibitions-page__filters exhibitions-filters${isOpenFilters ? ' _open' : ''}`}>
            <StickyBox offsetTop={65}>
                {loading ?
                    <Loading centered={false} /> :
                    <>
                        {clubName && filters.Alias &&
                            <div className="phone-hide">
                                <UserHeader
                                    user={filters.Alias !== 'rkf-online' ? 'club' : ''}
                                    logo={filters.logo_link || logo}
                                    name={clubName}
                                    alias={filters.Alias}
                                    profileId={profileId}
                                    federationName={federationName}
                                    federationAlias={federationAlias}
                                />
                            </div>
                        }
                        <div className="exhibitions-filters__wrap">
                            <Card>
                                <div className="exhibitions-filters__head">
                                    <h4>Диапазон дат</h4>
                                    <button type="button" className="exhibitions-filters__clear" onClick={clearAll}>Сбросить</button>
                                </div>
                                <div className="calendar-filter">
                                    <RangeCalendarExhibitions
                                        date_from={filters.DateFrom}
                                        date_to={filters.DateTo}
                                        handleRangeClick={() => setRangeClicked(true)}
                                    />
                                    <CalendarFilter
                                        date_from={filters.DateFrom}
                                        onChange={filter => setFiltersToUrl(filter)}
                                        is_club_link={clubName && filters.Alias}
                                        clear_filter={clear_filter}
                                        range_clicked={range_clicked}
                                        handleRangeReset={() => setRangeClicked(false)}
                                    />
                                </div>
                            </Card>
                            <BreedsFilter
                                breeds={breeds}
                                breed_ids={filters.BreedIds}
                                onChange={filter => setFiltersToUrl({ BreedIds: filter })}
                                is_club_link={clubName && filters.Alias}
                            />
                            <CitiesFilter
                                cities={cities}
                                city_ids={filters.CityIds}
                                onChange={filter => setFiltersToUrl({ CityIds: filter })}
                                is_club_link={clubName && filters.Alias}
                            />
                            <RanksFilter
                                ranks={ranks}
                                rank_ids={filters.RankIds}
                                onChange={filter => setFiltersToUrl({ RankIds: filter })}
                                is_club_link={clubName && filters.Alias}
                            />
                        </div>
                        <div className="exhibitions-filters__copy-wrap">
                            <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                            <p>Политика обработки персональных данных</p>
                        </div>
                    </>
                }
            </StickyBox>
        </aside>
    )
};

export default connectShowFilters(React.memo(Filters));