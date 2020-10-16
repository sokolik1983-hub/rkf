import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import CalendarFilter from "../../../../../components/Filters/CalendarFilter";
import FederationsFilter from "../../../../../components/Filters/FederationsFilter";
import ActiveFilter from "../../../../../components/Filters/ActiveFilter";
import ActivatedFilter from "../../../../../components/Filters/ActivatedFilter";
import BreedsFilter from "../../../../../components/Filters/BreedsFilter";
import CitiesFilter from "../../../../../components/Filters/CitiesFilter";
import RanksFilter from "../../../../../components/Filters/RanksFilter";
import PriceFilter from "../../../../../components/Filters/PriceFilter";
import { formatDateToString } from "../../../../../utils/datetime";
import { getEmptyFilters, setFiltersToUrl } from "../../../utils";
import RangeCalendarSearch from "../../../../../components/kendo/RangeCalendar/RangeCalendarSearch.js";


const DropdownItem = ({ filtersValue,
    name,
    search_type,
    count,
    filters,
    federations,
    cities,
    breeds,
    ranks,
    exhibition_dates }) => {
    const [isOpen, setIsOpen] = useState(search_type === filtersValue.search_type);

    useEffect(() => {
        setIsOpen(search_type === filtersValue.search_type);
    }, [filtersValue.search_type]);

    const handleClick = () => {
        if (count) {
            setIsOpen(!isOpen);
            if (search_type !== filtersValue.search_type) {
                setFiltersToUrl({ ...getEmptyFilters(), string_filter: filtersValue.string_filter, search_type });
            }
        }
    };
    return (
        <li className={`dropdown__item${filtersValue.search_type === search_type ? ' _active' : ''}${!count ? ' _disabled' : ''}`}>
            <div className="dropdown__item-head" onClick={handleClick}>
                <span className="dropdown__item-title">{name}</span>
                <span className={`dropdown__item-count${!count ? ' _disabled' : ''}`} title={count}>
                    {count > 99 ? '99+' : count}
                </span>
            </div>
            {!!filters.length &&
                <CSSTransition
                    in={isOpen}
                    timeout={350}
                    classNames="dropdown__transition"
                    unmountOnExit
                >
                    <div className="dropdown__item-body">
                        {filters.map(filter =>
                            filter === 'calendar' && exhibition_dates ?
                                <>
                                    <RangeCalendarSearch
                                        date_from={filtersValue.date_from}
                                        date_to={filtersValue.date_to}
                                    />
                                    <CalendarFilter
                                        dates={exhibition_dates.dates}
                                        years={exhibition_dates.years}
                                        date_from={filtersValue.date_from || formatDateToString(new Date())}
                                        onChange={filter => setFiltersToUrl({
                                            date_from: filter.DateFrom,
                                            date_to: filter.DateTo
                                        })}
                                    />
                                </> :
                                filter === 'federation' && federations ?
                                    <FederationsFilter
                                        federations={federations}
                                        federation_ids={filtersValue.federation_ids}
                                        onChange={filter => setFiltersToUrl({ federation_ids: filter })}
                                    /> :
                                    filter === 'active_member' ?
                                        <ActiveFilter
                                            active_member={filtersValue.active_member}
                                            onChange={filter => setFiltersToUrl({ active_member: filter })}
                                        /> :
                                        filter === 'activated' ?
                                            <ActivatedFilter
                                                activated={filtersValue.activated}
                                                label={`Активированные ${search_type === 2 ? 'клубы' : 'питомники'}`}
                                                onChange={filter => setFiltersToUrl({ activated: filter })}
                                            /> :
                                            filter === 'breed' && breeds && breeds.length ?
                                                <BreedsFilter
                                                    breeds={breeds}
                                                    breed_ids={filtersValue.breed_ids}
                                                    onChange={filter => setFiltersToUrl({ breed_ids: filter })}
                                                /> :
                                                filter === 'city' && cities && cities.length ?
                                                    <CitiesFilter
                                                        cities={cities}
                                                        city_ids={filtersValue.city_ids}
                                                        onChange={filter => setFiltersToUrl({ city_ids: filter })}
                                                    /> :
                                                    filter === 'rank' && ranks && ranks.length ?
                                                        <RanksFilter
                                                            ranks={ranks}
                                                            rank_ids={filtersValue.rank_ids}
                                                            onChange={filter => setFiltersToUrl({ rank_ids: filter })}
                                                        /> :
                                                        filter === 'price' ?
                                                            <PriceFilter
                                                                price_from={filtersValue.price_from}
                                                                price_to={filtersValue.price_to}
                                                                onChange={filter => setFiltersToUrl(filter)}
                                                            /> :
                                                            null
                        )}
                    </div>
                </CSSTransition>
            }
        </li>
    )
};

export default DropdownItem;