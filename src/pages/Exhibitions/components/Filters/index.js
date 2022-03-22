import React, { useState, useEffect } from 'react';
import StickyBox from 'react-sticky-box';
import Loading from '../../../../components/Loading';
import UserHeader from '../../../../components/redesign/UserHeader';
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
import { isFederationAlias, setOverflow } from '../../../../utils';
import Card from '../../../../components/Card';
import {PromiseRequest, Request} from '../../../../utils/request';
import {
    endpointExhibitionsFilters,
    endpointEducationalsFilters,
} from '../../config';
import RangeCalendarExhibitions from '../../../../components/kendo/RangeCalendar/RangeCalendarExhibitions.js';
import CopyrightInfo from '../../../../components/CopyrightInfo';
import { clubNav } from '../../../Club/config';
import UserMenu from '../../../../components/Layouts/UserMenu';
import MenuComponent from '../../../../components/MenuComponent';
import { connectAuthVisible } from 'pages/Login/connectors';
import useIsMobile from '../../../../utils/useIsMobile';
import PhotoComponent from '../../../../components/PhotoComponent';
import ls from 'local-storage';

import './index.scss';



const Filters = ({
        club,
        logo,
        filters,
        setClub,
        clubName,
        profileId,
        IsPopular,
        active_member,
        isOpenFilters,
        isEducational,
        federationName,
        active_rkf_user,
        isAuthenticated,
        federationAlias,
        notificationsLength
}) => {
    const [ranks, setRanks] = useState([]);
    const [types, setTypes] = useState([]);
    const [canEdit, setCanEdit] = useState(false);
    const [breeds, setBreeds] = useState([]);
    const [regionLabels, setRegionLabels] = useState([]);
    const [cities, setCities] = useState({ exhibitionCities: [], educationalCities: [] });
    const [exhibitionCities, setExhibitionCities] = useState( []);
    const [currentExhibRegions, setcurrentExhibRegions] = useState( []);
    const [currentCityIds, setCurrentCityIds] = useState( []);
    const [isUserFiltered, setIsUserFiltered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [clear_filter, setClearFilter] = useState(false);
    const [range_clicked, setRangeClicked] = useState(false);
    const [fedInfo, setFedInfo] = useState(null);
    const isMobile = useIsMobile(1080);

    const getFedInfo = (url) => {
        Request({
            url: url
        }, data => {
            setFedInfo(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        });
    }

    useEffect(() => {
        Promise.all([
            PromiseRequest({ url: `${endpointExhibitionsFilters}${filters.Alias ? '?Alias=' + filters.Alias : ''}` }),
            PromiseRequest({ url: `${endpointEducationalsFilters}${filters.Alias ? '?Alias=' + filters.Alias : ''}` })
        ]).then(data => {
            setCities({ exhibitionCities: data[0].cities, educationalCities: data[1].cities });
            setExhibitionCities(data[0].cities);
            setRanks(data[0].ranks);
            setTypes(data[0].types);
            setBreeds(data[0].breeds.filter(item => item.value !== 1));
            setRegionLabels(data[0].regions.filter(item => item.label !== 1));
            setLoading(false);
            window.scrollTo(0, 0);
            setCanEdit(isAuthenticated && ls.get('is_active_profile') && ls.get('profile_id') === profileId);
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

    const clearAll = () => {
        const calendarButton = document.getElementsByClassName('calendar-filter__button active')[0];
        if (calendarButton) calendarButton.classList.remove('active');

        setFiltersToUrl(getEmptyFilters(filters.Alias));
        setClearFilter(true);
    };

    const onSubscriptionUpdate = (subscribed) => {
        setClub({
            ...club,
            subscribed: subscribed
        })
    };

    const handleChangeRegionFilter = (filter) => {
        setFiltersToUrl({RegionIds: filter});
        setcurrentExhibRegions(filter);
        setIsUserFiltered(true);
    };

    const handleChangeCityFilter = (filter) => {
        setFiltersToUrl({ CityIds: filter });
        setCurrentCityIds(filter);
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
            },error => {
                console.log(error.response);
                if (error.response) alert(`Ошибка: ${error.response.status}`);
            }))();
        }
    }, [currentExhibRegions]);

    useEffect(() => {
        if(filters.RegionIds.length === 0) {
            setExhibitionCities(cities.exhibitionCities);
        }
    }, [filters.RegionIds.length]);

    useEffect(() => {
        console.log('11111111111111111', filters.RegionIds.length);
        if(filters.RegionIds.length === 0 && isUserFiltered) {
            setCurrentCityIds([]);
            setFiltersToUrl({cityIds: []});
            setIsUserFiltered(false);
        }
        setFiltersToUrl({ CityIds: currentCityIds, filteredCities: exhibitionCities.map(item => item.value)});
    }, [exhibitionCities, currentCityIds]);

    return (
        <aside className={`exhibitions-page__filters exhibitions-filters${isOpenFilters ? ' _open' : ''}`}>
            <StickyBox offsetTop={60}>
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
                                active_member={active_member}
                                active_rkf_user={active_rkf_user}
                                canEdit={canEdit}
                                subscribed={club.subscribed}
                                member={club.member}
                                subscribed_id={profileId = { profileId }}
                                onSubscriptionUpdate={onSubscriptionUpdate}
                                isAuthenticated={isAuthenticated}
                            />
                            {
                                (federationAlias || club.alias === 'rkf') && fedInfo &&
                                <PhotoComponent
                                    photo={fedInfo.owner_photo}
                                    name={fedInfo.owner_name}
                                    position={fedInfo.owner_position}
                                />
                            }
                            {!isMobile && isFederationAlias(filters.Alias) ?
                                <MenuComponent
                                    alias={filters.Alias}
                                    name={clubName}
                                    isFederation={true}
                                />
                                :
                                !isMobile &&
                                <UserMenu userNav={filters.Alias === ls.get('user_info')?.alias
                                    ? clubNav(filters.Alias) // Show NewsFeed menu item to current user only
                                    : clubNav(filters.Alias).filter(i => i.id !== 2)}
                                          notificationsLength={notificationsLength}
                                />
                            }
                        </div>
                        }
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
                                        handleRangeClick={() => setRangeClicked(true)}
                                    />
                                    <CalendarFilter
                                        date_from={filters.DateFrom}
                                        onChange={(filter, asInitial) => setFiltersToUrl(filter, asInitial)}
                                        is_club_link={clubName && filters.Alias}
                                        clear_filter={clear_filter}
                                        range_clicked={range_clicked}
                                        handleRangeReset={() => setRangeClicked(false)}
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
                                onChange={filter => setFiltersToUrl({ TypeIds: filter })}
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
                                    onChange={filter => setFiltersToUrl({ RankIds: filter })}
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