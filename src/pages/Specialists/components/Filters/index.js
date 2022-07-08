import React, {memo, useState, useEffect} from "react";
import StickyBox from "react-sticky-box";
import Loading from "../../../../components/Loading";
import CopyrightInfo from "../../../../components/CopyrightInfo";
import RegionsFilter from "../../../../components/Filters/RegionsFilter";
import CitiesFilter from "../../../../components/Filters/CitiesFilter";
import BreedGroupsFilter from "../../../../components/Filters/BreedGroupsFilter";
import BreedsFilter from "../../../../components/Filters/BreedsFilter";
import RankFilter from "../../../../components/Filters/RankFilter";
import ContestsFilter from "../../../../components/Filters/ContestsFilter";
import SpecializationsFilter from "../../../../components/Filters/SpecializationsFilter";
import DisciplinesFilter from "../../../../components/Filters/DisciplinesFilter";
import AllBbreedsFilter from "../../../../components/Filters/AllBbreedsFilter";
import {buildFiltersUrl, setFiltersToUrl} from "../../utils";
import {setOverflow} from "../../../../utils";
import {Request} from "../../../../utils/request";
import {scrollFunc} from "../../../../utils/scrollToContent";

import "./index.scss";

const Filters = ({
                     isOpenFilters,
                     filtersValue,
                     allBreeder,
                     setAllBreeder,
                     scrollRef,
}) => {
    const [loading, setLoading] = useState(true);
    const [isUserFiltered, setIsUserFiltered] = useState(false);
    const [isFirstTimeFiltersRequest, setIsFirstTimeFiltersRequest] = useState({
        1: true,
        2: true,
        3: true,
        4: true
    });

    const [filters, setFilters] = useState({
        regions: [],
        cities: [],
        breed_groups: [],
        breeds: [],
        ranks: [],
        classification: [],
        specializations: [],
        disciplines: [],
        contests: []
    });
    const isJudges = parseInt(filtersValue.SearchTypeId) === 4;

    const handleChangeRegionFilter = (filter) => {
        setIsUserFiltered(true);
        setFiltersToUrl({RegionIds: filter});
    };

    const handleChangeCityFilter = (filter) => {
        setFiltersToUrl({ CityIds: filter });
    };

    const goToLink = (cities, currentCityIds) => {
        if(filtersValue.RegionIds.length === 0) {
            setFiltersToUrl({CityIds: []});
        } else {
            setFiltersToUrl({ CityIds: currentCityIds, filteredCities: cities.map(item => item.value)});
        }
        setIsUserFiltered(false);
    };


    useEffect(() => {
        (() => Request({
            url: buildFiltersUrl(filtersValue, isFirstTimeFiltersRequest[filtersValue.SearchTypeId])
        }, data => {
            if(isFirstTimeFiltersRequest[filtersValue.SearchTypeId]) {
                setIsFirstTimeFiltersRequest({...isFirstTimeFiltersRequest, [filtersValue.SearchTypeId]: false});
            }
            const newFilters = Object.keys(filters).reduce((acc, key) => {
                acc[key] = data[key] || filters[key];
                return acc;
            }, {});
            setFilters(newFilters);
            isUserFiltered && goToLink(newFilters.cities, filtersValue.CityIds);
            setLoading(false);
        },error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
        }))();
    }, [filtersValue]);

    useEffect(() => {
        scrollFunc(scrollRef);
    }, [filtersValue, allBreeder]);

    useEffect(() => {
        setOverflow(isOpenFilters);
        window.addEventListener('resize', () => setOverflow(isOpenFilters));
        return () => window.removeEventListener('resize', () => setOverflow(isOpenFilters));
    }, [isOpenFilters]);

    return (
        <aside className={`specialists-page__filters specialists-filters${isOpenFilters ? ' _open' : ''}`}>
            <StickyBox offsetTop={60} style={{top: "225px"}}>
                {loading ?
                    <Loading centered={false} /> :
                    <div className="specialists-filters__wrap">
                        <RegionsFilter
                            regions={filters.regions}
                            region_ids={filtersValue.RegionIds}
                            onChange={filter => handleChangeRegionFilter(filter)}
                        />

                        <CitiesFilter
                            cities={filters.cities}
                            city_ids={filtersValue.CityIds}
                            onChange={filter => handleChangeCityFilter(filter)}
                        />

                        {isJudges ?
                            <>
                                {filtersValue.SearchTypeId !== 3 &&
                                    <RankFilter
                                        ranks={filters.ranks}
                                        rank_ids={filtersValue.RankIds}
                                        onChange={filter => {
                                            setFiltersToUrl({RankIds: filter});
                                        }}
                                        searchTypeId={filtersValue.SearchTypeId}
                                    />
                                }

                                <AllBbreedsFilter
                                    allBreeder={allBreeder}
                                    setAllBreeder={setAllBreeder}
                                    onChange={() => setAllBreeder(prevState => !prevState)}
                                />

                                <BreedGroupsFilter
                                    breedGroups={filters.breed_groups}
                                    breedGroupIds={filtersValue.BreedGroupIds}
                                    onChange={filter => {
                                        setFiltersToUrl({BreedGroupIds: filter});
                                    }}
                                />

                                <BreedsFilter
                                    breeds={filters.breeds}
                                    breed_ids={filtersValue.BreedIds}
                                    onChange={filter => {
                                        setFiltersToUrl({BreedIds: filter});
                                    }}
                                />

                                <ContestsFilter
                                    contests={filters.contests}
                                    contest_ids={filtersValue.ContestIds}
                                    onChange={filter => {
                                        setFiltersToUrl({ContestIds: filter});
                                    }}
                                />
                            </> :
                            <>
                                {filtersValue.SearchTypeId === 3 &&
                                    <SpecializationsFilter
                                        types={filters.specializations}
                                        type_ids={filtersValue.SpecializationIds}
                                        onChange={filter => {
                                            setFiltersToUrl({SpecializationIds: filter});
                                        }}
                                    />
                                }

                                <RankFilter
                                    ranks={filters.ranks}
                                    rank_ids={filtersValue.RankIds}
                                    onChange={filter => {
                                        setFiltersToUrl({RankIds: filter});
                                    }}
                                />

                                <DisciplinesFilter
                                    disciplines={filters.disciplines}
                                    discipline_ids={filtersValue.DisciplineIds}
                                    onChange={filter => {
                                        setFiltersToUrl({DisciplineIds: filter});
                                    }}
                                />
                            </>
                        }
                        <CopyrightInfo withSocials={true} />
                    </div>
                }
            </StickyBox>
        </aside>
    )
};

export default memo(Filters);