import React, { useState, useEffect } from "react";
import StickyBox from "react-sticky-box";
import Loading from "../../../../components/Loading";
import UserHeader from "../../../../components/redesign/UserHeader";
import BreedsFilter from "../../../../components/Filters/BreedsFilter";
import RanksFilter from "../../../../components/Filters/RanksFilter";
import TypeFilter from "../../../../components/Filters/TypeFilter";
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
import useIsMobile from "../../../../utils/useIsMobile";
import ls from "local-storage";

import "./index.scss";

const Filters = ({ isOpenFilters, filters, clubName, profileId, club, setClub, isAuthenticated, logo, federationName, federationAlias, active_member, active_rkf_user, notificationsLength, isEducational }) => {
    const [ranks, setRanks] = useState([]);
    const [types, setTypes] = useState([]);
    const [canEdit, setCanEdit] = useState(false);
    const [breeds, setBreeds] = useState([]);
    const [cities, setCities] = useState({ exhibitionCities: [], educationalCities: [] });
    const [loading, setLoading] = useState(true);
    const [clear_filter, setClearFilter] = useState(false);
    const [range_clicked, setRangeClicked] = useState(false);
    const isMobile = useIsMobile(1080);

    useEffect(() => {
        Promise.all([
            PromiseRequest({ url: `${endpointExhibitionsFilters}${filters.Alias ? '?Alias=' + filters.Alias : ''}` }),
            PromiseRequest({ url: `${endpointEducationalsFilters}${filters.Alias ? '?Alias=' + filters.Alias : ''}` })
        ]).then(data => {
            setCities({ exhibitionCities: data[0].cities, educationalCities: data[1].cities });
            setRanks(data[0].ranks);
            setTypes(data[0].types);
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
            <StickyBox offsetTop={60}>
                {loading ?
                    <Loading centered={false} /> :
                    <>

                    </>
                }
            </StickyBox>
        </aside>
    )
};

export default connectAuthVisible(connectShowFilters(React.memo(Filters)));