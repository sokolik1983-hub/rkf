import React, { useState, useEffect } from 'react';
import StickyBox from 'react-sticky-box';
import Loading from '../../../../components/Loading';
import BreedsFilter from '../../../../components/Filters/BreedsFilter';
import RegionsFilter from '../../../../components/Filters/RegionsFilter';
import RanksFilter from '../../../../components/Filters/RanksFilter';
import TypeFilter from '../../../../components/Filters/TypeFilter';
import CitiesFilter from '../../../../components/Filters/CitiesFilter';
import FormatFilter from '../../../../components/Filters/FormatFilter';
import PaymentFormFilter from '../../../../components/Filters/PaymentFormFilter';
import CalendarFilter from '../../../../components/Filters/CalendarFilter';
import { connectShowFilters } from '../../../../components/Layouts/connectors';
import { setFiltersToUrl, getEmptyFilters } from '../../utils';
import { setOverflow } from '../../../../utils';
import Card from '../../../../components/Card';
import {PromiseRequest, Request} from '../../../../utils/request';
import {
    endpointExhibitionsFilters,
    endpointEducationalsFilters,
} from '../../config';
import RangeCalendarExhibitions from '../../../../components/kendo/RangeCalendar/RangeCalendarExhibitions.js';
import CopyrightInfo from '../../../../components/CopyrightInfo';
import { connectAuthVisible } from 'pages/Login/connectors';

import './index.scss';

const Filters = ({
        club,
        filters,
        clubName,
        isOpenFilters,
        isEducational,
        federationAlias,
        scrollRef,
}) => {
    const [ranks, setRanks] = useState([]);
    const [currentRanks, setCurrentRanks] = useState([]);
    const [types, setTypes] = useState([]);
    const [currentTypes, setCurrentTypes] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [regionLabels, setRegionLabels] = useState([]);
    const [cities, setCities] = useState({ exhibitionCities: [], educationalCities: [] });
    const [exhibitionCities, setExhibitionCities] = useState( []);
    const [startCities, setStartCities] = useState( []);
    const [currentExhibRegions, setcurrentExhibRegions] = useState( []);
    const [currentCityIds, setCurrentCityIds] = useState( []);
    const [isUserFiltered, setIsUserFiltered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [clear_filter, setClearFilter] = useState(false);
    const [range_clicked, setRangeClicked] = useState(false);

    const getFedInfo = (url) => {
        Request({
            url: url
        }, data => {
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        });
    };

    const goToLink = (cities, currentCityIds) => {
        if(currentExhibRegions.length  === 0) {
            setExhibitionCities(startCities);
            setFiltersToUrl({CityIds: []});
        } else {
            const newArr = [];
            cities.map(item => item.value).forEach(item => {
                currentCityIds.forEach(elem => {
                    if(item === elem) {
                        newArr.push(item);
                    }
                })
            });

            setCurrentCityIds(newArr)
            setFiltersToUrl({ CityIds: newArr});
        }
        setIsUserFiltered(false);
        scrollFunc();
    };

    useEffect(() => {
        Promise.all([
            PromiseRequest({ url: `${endpointExhibitionsFilters}${filters.Alias ? '?Alias=' + filters.Alias : ''}` }),
            PromiseRequest({ url: `${endpointEducationalsFilters}${filters.Alias ? '?Alias=' + filters.Alias : ''}` })
        ]).then(data => {
            setCities({ exhibitionCities: data[0].cities, educationalCities: data[1].cities });
            setExhibitionCities(data[0].cities);
            setStartCities(data[0].cities);
            setRanks(data[0].ranks);
            setTypes(data[0].types);
            setBreeds(data[0].breeds.filter(item => item.value !== 1));
            setRegionLabels(data[0].regions.filter(item => item.label !== 1));
            setLoading(false);
            window.scrollTo(0, 0);
        }).catch(error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
        });
    }, [filters.Alias]);

    useEffect(() => {
        setOverflow(isOpenFilters);
        window.addEventListener('resize', () => setOverflow(isOpenFilters));
        return () => window.removeEventListener('resize', () => setOverflow(isOpenFilters));
    }, [isOpenFilters]);

    const scrollFunc = () => {
        if (!!scrollRef && window.scrollY > scrollRef.current.getBoundingClientRect().top + window.scrollY) window.scrollTo(0, scrollRef.current.getBoundingClientRect().top + window.scrollY)
    }

    const clearAll = () => {
        const calendarButton = document.getElementsByClassName('calendar-filter__button active')[0];
        if (calendarButton) calendarButton.classList.remove('active');

        setFiltersToUrl(getEmptyFilters(filters.Alias));
        setClearFilter(true);
        scrollFunc();
    };

    const handleChangeRegionFilter = (filter) => {
        setcurrentExhibRegions(filter);
        setIsUserFiltered(true);
        setFiltersToUrl({RegionIds: filter});
        scrollFunc();
    };

    const handleChangeCityFilter = (filter) => {
        setCurrentCityIds(filter);
        setFiltersToUrl({ CityIds: filter });
        scrollFunc();
    };

    const handleChangeType = async (filter) => {
        setFiltersToUrl({ TypeIds: filter });
        setCurrentTypes(filter);

        const newFilterString = `${filter.map(item => `TypeIds=${item}`)}`.replace(/,/g, '&');

        await Request({
            url: "api/exhibitions/Exhibition/filter?" + newFilterString
        }, data => {
            setRanks(data.ranks)
        }, error => {
            console.log(error.response);
        });
        scrollFunc();
    };

    const handleChangeRank = (filter) => {
        setCurrentRanks(filter);
        setFiltersToUrl({ RankIds: filter });
        scrollFunc();
    };

    useEffect(() => {
        if(federationAlias) {
            let url = `/api/Club/federation_base_info?alias=` + federationAlias;
            getFedInfo(url)
        } else if(club?.alias === 'rkf') {
            let url = '/api/Club/rkf_base_info';
            getFedInfo(url);
        }
    }, []);

    useEffect(() => {
        if(currentExhibRegions && currentExhibRegions.length > 0){
            (() => Request({
                url: `${endpointExhibitionsFilters}?${currentExhibRegions.map(reg => `RegionIds=${reg}`).join('&')}`
            }, data => {
                setExhibitionCities(data.cities);
                isUserFiltered && goToLink(data.cities, currentCityIds);
            },error => {
                console.log(error.response);
                if (error.response) alert(`Ошибка: ${error.response.status}`);
            }))();
        } else {
            goToLink(startCities, currentCityIds);
        }
    }, [currentExhibRegions]);

    useEffect(() => {
        if(currentTypes && !!currentTypes.length) {
            const newArr = [];
            ranks.map(item => item.value).forEach(item => {
                currentRanks.forEach(elem => {
                    if(item === elem) {
                        newArr.push(item);
                    }
                })
            });
            setCurrentRanks(newArr);
            setFiltersToUrl({ RankIds: newArr});
        } else {
            setCurrentRanks([]);
            setFiltersToUrl({ RankIds: [] });
        };
        scrollFunc();
    }, [currentTypes, ranks]);

    return (
        <aside className={`exhibitions-page__filters exhibitions-filters${isOpenFilters ? ' _open' : ''}`}>
            <StickyBox offsetTop={60}>
                {loading ?
                    <Loading centered={false} /> :
                    <>
                        <div className="exhibitions-filters__wrap">
                            <Card>
                                <div className="exhibitions-filters__head">
                                    <h4>Диапазон дат</h4>
                                    <button type="button" className="exhibitions-filters__clear" onClick={clearAll}>
                                        <svg
                                            className="icon-broom"
                                            width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.01 2.86102e-08L18.43 1.42L12.71 7.13C13.78
                                            8.67 13.93 10.52 13.03 11.72L6.71 5.4C7.91 4.5 9.76 4.65
                                            11.3 5.72L17.01 2.86102e-08ZM3.58 14.85C1.57 12.84 0.34 10.44
                                            -9.53674e-08 8.2L4.88 6.11L12.32 13.55L10.23 18.43C7.99 18.09
                                            5.59 16.86 3.58 14.85Z" fill="#72839c" />
                                        </svg>
                                        Сбросить
                                    </button>
                                </div>
                                <div className="calendar-filter">
                                    <RangeCalendarExhibitions
                                        date_from={filters.DateFrom}
                                        date_to={filters.DateTo}
                                        handleRangeClick={() => {
                                            setRangeClicked(true);
                                            scrollFunc();
                                        }}
                                    />
                                    <CalendarFilter
                                        date_from={filters.DateFrom}
                                        onChange={(filter, asInitial) => setFiltersToUrl(filter, asInitial)}
                                        is_club_link={clubName && filters.Alias}
                                        clear_filter={clear_filter}
                                        range_clicked={range_clicked}
                                        handleRangeReset={() => {
                                            setRangeClicked(false);
                                            scrollFunc();
                                        }}
                                    />
                                </div>
                            </Card>
                            {parseInt(filters.CategoryId) === 4
                                ? <FormatFilter
                                    format_ids={filters.TypeIds}
                                    onChange={filter => setFiltersToUrl({ TypeIds: filter })}
                                    is_club_link={clubName && filters.Alias}
                                />
                                : <BreedsFilter
                                    breeds={breeds}
                                    breed_ids={filters.BreedIds}
                                    onChange={filter => setFiltersToUrl({ BreedIds: filter })}
                                    is_club_link={clubName && filters.Alias}
                                />}
                            <RegionsFilter
                                regions={regionLabels}
                                region_ids={filters.RegionIds}
                                onChange={filter => handleChangeRegionFilter(filter)}
                            />
                            <CitiesFilter
                                loading={loading}
                                cities={isEducational ? cities.educationalCities : exhibitionCities}
                                city_ids={filters.CityIds}
                                onChange={filter => handleChangeCityFilter(filter)}
                                is_club_link={clubName && filters.Alias}
                            />
                            {parseInt(filters.CategoryId) !== 4 &&
                            <TypeFilter
                                types={types}
                                type_ids={filters.TypeIds}
                                onChange={filter => handleChangeType(filter)}
                                is_club_link={clubName && filters.Alias}
                            />
                            }
                            {parseInt(filters.CategoryId) === 4
                                ? <PaymentFormFilter
                                    payment_form_ids={filters.PaymentFormTypeIds}
                                    onChange={filter => setFiltersToUrl({ PaymentFormTypeIds: filter })}
                                    is_club_link={clubName && filters.Alias}
                                />
                                : <RanksFilter
                                    ranks={ranks}
                                    rank_ids={filters.RankIds}
                                    onChange={filter => handleChangeRank(filter)}
                                    is_club_link={clubName && filters.Alias}
                                />}
                            <CopyrightInfo withSocials={true} />
                        </div>
                    </>
                }
            </StickyBox>
        </aside>
    )
};

export default connectAuthVisible(connectShowFilters(React.memo(Filters)));