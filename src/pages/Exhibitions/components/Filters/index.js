import React, { useState, useEffect } from "react";
import StickyBox from "react-sticky-box";
import Loading from "../../../../components/Loading";
import UserHeader from "../../../../components/redesign/UserHeader";
import BreedsFilter from "../../../../components/Filters/BreedsFilter";
import RanksFilter from "../../../../components/Filters/RanksFilter";
import CitiesFilter from "../../../../components/Filters/CitiesFilter";
import FormatFilter from "../../../../components/Filters/FormatFilter";
import PaymentFormFilter from "../../../../components/Filters/PaymentFormFilter";
import CalendarFilter from "../../../../components/Filters/CalendarFilter";
import { connectShowFilters } from "../../../../components/Layouts/connectors";
import { setFiltersToUrl, getEmptyFilters } from "../../utils";
import { isFederationAlias, setOverflow } from "../../../../utils";
import Card from "../../../../components/Card";
import { PromiseRequest } from "../../../../utils/request";
import { endpointExhibitionsFilters, endpointEducationalsFilters } from "../../config";
import RangeCalendarExhibitions from "../../../../components/kendo/RangeCalendar/RangeCalendarExhibitions.js";
import CopyrightInfo from "../../../../components/CopyrightInfo";
import { clubNav } from "../../../Club/config";
import UserMenu from "../../../../components/Layouts/UserMenu";
import MenuComponent from "../../../../components/MenuComponent";
import { connectAuthVisible } from "pages/Login/connectors";
import ls from "local-storage";
import "./index.scss";


const Filters = ({ isOpenFilters, filters, clubName, profileId, club, setClub, isAuthenticated, logo, federationName, federationAlias, active_member, active_rkf_user, notificationsLength, isEducational }) => {
    const [ranks, setRanks] = useState([]);
    const [canEdit, setCanEdit] = useState(false);
    const [breeds, setBreeds] = useState([]);
    const [cities, setCities] = useState({ exhibitionCities: [], educationalCities: [] });
    const [loading, setLoading] = useState(true);
    const [clear_filter, setClearFilter] = useState(false);
    const [range_clicked, setRangeClicked] = useState(false);

    useEffect(() => {
        Promise.all([
            PromiseRequest({ url: `${endpointExhibitionsFilters}${filters.Alias ? '?Alias=' + filters.Alias : ''}` }),
            PromiseRequest({ url: `${endpointEducationalsFilters}${filters.Alias ? '?Alias=' + filters.Alias : ''}` })
        ]).then(data => {
            setCities({ exhibitionCities: data[0].cities, educationalCities: data[1].cities });
            setRanks(data[0].ranks);
            setBreeds(data[0].breeds.filter(item => item.value !== 1));
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
    }

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
                                    active_member={active_member}
                                    active_rkf_user={active_rkf_user}
                                    canEdit={canEdit}
                                    subscribed={club.subscribed}
                                    member={club.member}
                                    subscribed_id={profileId = { profileId }}
                                    onSubscriptionUpdate={onSubscriptionUpdate}
                                    isAuthenticated={isAuthenticated}
                                />
                                {isFederationAlias(filters.Alias) ?
                                    <MenuComponent
                                        alias={filters.Alias}
                                        name={clubName}
                                        isFederation={true}
                                    /> :
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
                            <CitiesFilter
                                cities={isEducational ? cities.educationalCities : cities.exhibitionCities}
                                city_ids={filters.CityIds}
                                onChange={filter => setFiltersToUrl({ CityIds: filter })}
                                is_club_link={clubName && filters.Alias}
                            />
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