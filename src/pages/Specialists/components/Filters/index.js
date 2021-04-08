import React, { useState, useEffect } from "react";
import StickyBox from "react-sticky-box";
import Loading from "../../../../components/Loading";
import UserHeader from "../../../../components/redesign/UserHeader";
import EventsFilter from "./components/EventsFilter";
import DisciplinesFilter from "./components/DisciplinesFilter";
import CitiesFilter from "../../../../components/Filters/CitiesFilter";
import { connectShowFilters } from "../../../../components/Layouts/connectors";
import { setFiltersToUrl } from "../../utils";
import { isFederationAlias, setOverflow } from "../../../../utils";
import { PromiseRequest } from "../../../../utils/request";
import { endpointSpecialistsFilters } from "../../config";
import CopyrightInfo from "../../../../components/CopyrightInfo";
import { clubNav } from "../../../Club/config";
import UserMenu from "../../../../components/Layouts/UserMenu";
import MenuComponent from "../../../../components/MenuComponent";
import { connectAuthVisible } from "pages/Login/connectors";
import ls from "local-storage";
import "./index.scss";


const Filters = ({ isOpenFilters, filters, clubName, profileId, club, setClub, isAuthenticated, logo, federationName, federationAlias, active_member, active_rkf_user, notificationsLength }) => {
    const [events, setEvents] = useState([]);
    const [canEdit, setCanEdit] = useState(false);
    const [disciplines, setDisciplines] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            PromiseRequest({ url: `${endpointSpecialistsFilters}?SearchTypeId=${filters.SearchTypeId}${filters.Alias ? '&Alias=' + filters.Alias : ''}` }),
            //PromiseRequest({ url: `${endpointEducationalsFilters}${filters.Alias ? '?Alias=' + filters.Alias : ''}` })
        ]).then(data => {
            setCities(data[0].cities);
            setDisciplines(data[0].disciplines);
            setEvents(data[0].classification);
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

    const onSubscriptionUpdate = (subscribed) => {
        setClub({
            ...club,
            subscribed: subscribed
        })
    }

    return (
        <aside className={`specialists-page__filters specialists-filters${isOpenFilters ? ' _open' : ''}`}>
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
                        <div className="specialists-filters__wrap">
                            <CitiesFilter
                                cities={cities}
                                city_ids={filters.CityIds}
                                onChange={filter => setFiltersToUrl({ CityIds: filter })}
                                is_club_link={clubName && filters.Alias}
                            />
                            <EventsFilter
                                events={events}
                                event_ids={filters.ClassificationId}
                                onChange={filter => setFiltersToUrl({ ClassificationId: filter })}
                                is_club_link={clubName && filters.Alias}
                            />
                            <DisciplinesFilter
                                disciplines={disciplines}
                                discipline_ids={filters.DisciplineIds}
                                onChange={filter => setFiltersToUrl({ DisciplineIds: filter })}
                                is_club_link={clubName && filters.Alias}
                            />
                            <CopyrightInfo withSocials={true} />
                        </div>
                    </>
                }
            </StickyBox>
        </aside>
    )
};

export default connectAuthVisible(connectShowFilters(React.memo(Filters)));