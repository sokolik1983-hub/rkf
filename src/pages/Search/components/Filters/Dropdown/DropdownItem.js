import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import CalendarFilter from "../../../../../components/Filters/CalendarFilter";
import FederationsFilter from "../../../../../components/Filters/FederationsFilter";
import ActiveFilter from "../../../../../components/Filters/FederationChoiceFilter";
import ActivatedFilter from "../../../../../components/Filters/ActivatedFilter";
import BreedsFilter from "../../../../../components/Filters/BreedsFilter";
import CitiesFilter from "../../../../../components/Filters/CitiesFilter";
import RanksFilter from "../../../../../components/Filters/RanksFilter";
import PriceFilter from "../../../../../components/Filters/PriceFilter";
import { formatDateToString } from "../../../../../utils/datetime";
import { getEmptyFilters, setFiltersToUrl } from "../../../utils";
import RangeCalendarSearch from "../../../../../components/kendo/RangeCalendar/RangeCalendarSearch.js";
import DisciplinesFilter from "../../../../../components/Filters/DisciplinesFilter";
import ClassificationsFilter from "../../../../../components/Filters/ClassificationsFilter";
import SpecializationsFilter from "../../../../../components/Filters/SpecializationsFilter";
import ContestsFilter from "../../../../../components/Filters/ContestsFilter";
import BreedGroupsFilter from "../../../../../components/Filters/BreedGroupsFilter";
import RegionsFilter from "../../../../../components/Filters/RegionsFilter";


const DropdownItem = ({
    filtersValue,
    name,
    search_type,
    count,
    filters,
    federations,
    regions,
    cities,
    breed_groups,
    breeds,
    ranks,
    classification,
    disciplines,
    specializations,
    contests,
    exhibition_dates
}) => {
    const [isOpen, setIsOpen] = useState(search_type === filtersValue.search_type);
    const [range_clicked, setRangeClicked] = useState(false);

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
                <span className={`dropdown__item-count${!count ? ' _disabled' : ''} ${count > 99 ? "longCount" : ''}`} title={count} >
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
                                <div key="calendar-filter">
                                    <RangeCalendarSearch
                                        date_from={filtersValue.date_from}
                                        date_to={filtersValue.date_to}
                                        handleRangeClick={() => setRangeClicked(true)}
                                    />
                                    <CalendarFilter
                                        dates={exhibition_dates.dates}
                                        years={exhibition_dates.years}
                                        date_from={filtersValue.date_from || formatDateToString(new Date())}
                                        onChange={filter => setFiltersToUrl({
                                            date_from: filter.DateFrom,
                                            date_to: filter.DateTo
                                        })}
                                        range_clicked={range_clicked}
                                        handleRangeReset={() => setRangeClicked(false)}
                                    />
                                </div> :
                            filter === 'federation' && federations ?
                                <FederationsFilter
                                    federations={federations}
                                    federation_ids={filtersValue.federation_ids}
                                    onChange={filter => setFiltersToUrl({ federation_ids: filter })}
                                    key="federations-filter"
                                /> :
                            filter === 'active_member' ?
                                <ActiveFilter
                                    active_member={filtersValue.active_member}
                                    onChange={filter => setFiltersToUrl({ active_member: filter })}
                                    key="active-filter"
                                /> :
                            filter === 'activated' ?
                                <ActivatedFilter
                                    activated={filtersValue.activated}
                                    label={`Активированные ${search_type === 2 ? 'клубы' : 'питомники'}`}
                                    onChange={filter => setFiltersToUrl({ activated: filter })}
                                    key="activated-filter"
                                /> :
                            filter === 'region' && regions && regions.length ?
                                <RegionsFilter
                                    regions={regions}
                                    region_ids={filtersValue.region_ids}
                                    onChange={filter => setFiltersToUrl({region_ids: filter})}
                                    key="regions-filter"
                                /> :
                            filter === 'city' && cities && cities.length ?
                                <CitiesFilter
                                    cities={cities}
                                    city_ids={filtersValue.city_ids}
                                    onChange={filter => setFiltersToUrl({ city_ids: filter })}
                                    key="cities-filter"
                                /> :
                            filter === 'breed_group' && breed_groups && breed_groups.length ?
                                <BreedGroupsFilter
                                    breedGroups={breed_groups}
                                    breedGroupIds={filtersValue.breed_group_ids}
                                    onChange={filter => setFiltersToUrl({breed_group_ids: filter})}
                                    key="breed-groups-filter"
                                /> :
                            filter === 'breed' && breeds && breeds.length ?
                                <BreedsFilter
                                    breeds={breeds}
                                    breed_ids={filtersValue.breed_ids}
                                    onChange={filter => setFiltersToUrl({ breed_ids: filter })}
                                    key="breeds-filter"
                                /> :
                            filter === 'rank' && ranks && ranks.length ?
                                <RanksFilter
                                    ranks={ranks}
                                    rank_ids={filtersValue.rank_ids}
                                    onChange={filter => setFiltersToUrl({ rank_ids: filter })}
                                    key="ranks-filter"
                                /> :
                            filter === 'specialization' && specializations && specializations.length ?
                                <SpecializationsFilter
                                    types={specializations}
                                    type_ids={filtersValue.specialist_specialization_ids}
                                    onChange={filter => setFiltersToUrl({specialist_specialization_ids: filter})}
                                    key="specializations-filter"
                                /> :
                            filter === 'contest' && contests && contests.length ?
                                <ContestsFilter
                                    contests={contests}
                                    contest_ids={filtersValue.contest_ids}
                                    onChange={filter => setFiltersToUrl({contest_ids: filter})}
                                    key="contests-filter"
                                /> :
                            filter === 'classification' && classification && classification.length ?
                                <ClassificationsFilter
                                    events={classification}
                                    event_ids={filtersValue.specialist_classification_id}
                                    onChange={filter => setFiltersToUrl({specialist_classification_id: filter})}
                                    key="classifications-filter"
                                /> :
                            filter === 'discipline' && disciplines && disciplines.length ?
                                <DisciplinesFilter
                                    disciplines={disciplines}
                                    discipline_ids={filtersValue.specialist_discipline_ids}
                                    onChange={filter => setFiltersToUrl({specialist_discipline_ids: filter})}
                                    key="disciplines-filter"
                                /> :
                            filter === 'price' ?
                                <PriceFilter
                                    price_from={filtersValue.price_from}
                                    price_to={filtersValue.price_to}
                                    onChange={filter => setFiltersToUrl(filter)}
                                    key="price-filter"
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