import React, { useEffect, useState } from "react";
import ls from "local-storage";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Filters from "./components/Filters";
import ListFilter from "./components/Filters/components/ListFilter";
import SpecialistsList from "./components/SpecialistsList";
import ClickGuard from "../../components/ClickGuard";
import { Request } from "../../utils/request";
import { connectShowFilters } from "../../components/Layouts/connectors";
import { buildUrl, getFiltersFromUrl, getInitialFilters } from "./utils";
import { formatDateCommon } from "../../utils/datetime";
import { DEFAULT_IMG } from "../../appConfig";
import shorten from "../../utils/shorten";
// import UserMenu from "../../components/Layouts/UserMenu";
// import { clubNav } from "../Club/config";
import { isFederationAlias } from "../../utils";
import MenuComponent from "../../components/MenuComponent";
import SignUpModal from "pages/Educational/components/SignUpModal";
import SearchFilter from "./components/Filters/components/Search";

import './index.scss';

import moment from "moment";
import "moment/locale/ru";
moment.locale('ru');

const Specialists = ({ history, isOpenFilters, setShowFilters }) => {
    const [loading, setLoading] = useState(true);
    const [listLoading, setListLoading] = useState(false);
    const [specialistsLoading, setSpecialistsLoading] = useState(true);
    const [filters, setFilters] = useState({ ...getInitialFilters() });
    const [url, setUrl] = useState(buildUrl({ ...filters }));
    const [club, setClub] = useState(null);
    const [specialists, setSpecialists] = useState([]);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [displayName, setDisplayName] = useState('');
    const [federationName, setFederationName] = useState('');
    const [federationAlias, setFederationAlias] = useState('');
    const [clubAvatar, setClubAvatar] = useState('');
    const [clubId, setClubId] = useState('');
    const [active_member, setActiveMember] = useState(null);
    const [active_rkf_user, setActiveRkfUser] = useState(null);
    const [notificationsLength, setNotificationsLength] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [needRequest, setNeedRequest] = useState(false);

    useEffect(() => {
        const unListen = history.listen(() => {
            const filters = getFiltersFromUrl();
            setFilters({ ...filters });
            setUrl(buildUrl({ ...filters }));
            !filters && setShowFilters({ isOpenFilters: false });
        });

        return () => unListen();
    }, []);

    const getSpecialists = async (url, startElem) => {
        setSpecialistsLoading(true);

        await Request({
            url: `${url}&StartElement=${startElem}&ElementCount=50`
        }, data => {
            const itemsArray = data.specialists || data.exterior_judges;
            if (itemsArray?.length) {
                const modifiedSpecialists = itemsArray.map(s => {
                    s.date = '';
                    if (s.dates && s.dates.length) {
                        const startDate = s.dates[0];
                        const endDate = s.dates[s.dates.length - 1];
                        s.date = s.dates.length === 1
                            ? formatDateCommon(new Date(`${startDate.year}/${startDate.month}/${startDate.day}`))
                            : formatDateCommon(new Date(`${startDate.year}/${startDate.month}/${startDate.day}`)) +
                            ' - ' + formatDateCommon(new Date(`${endDate.year}/${endDate.month}/${endDate.day}`));
                    }
                    s.club_string = `Клуб ${s.club_name}, ${s.federation_name ? 'Федерация ' + s.federation_name + ', ' : ''}${s.city}`;
                    s.rank_string = s.ranks && s.ranks.length
                        ? Array.isArray(s.ranks) ? s.ranks.map(rank => rank.name).join(', ') : s.ranks
                        : 'Не указано';
                    s.club_rank_string = s.club_string + ' / ' + s.rank_string;
                    s.breed_string = s.breeds && s.breeds.length ? s.breeds.map(breed => breed.name).join(', ') : 'Не указано';
                    s.url = `/specialists/${s.id}`;
                    return s;
                });

                if (itemsArray.length < 50) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
                setSpecialists(startElem === 1 ? modifiedSpecialists : [...specialists, ...modifiedSpecialists]);
            } else {
                if (startElem === 1) {
                    setSpecialists([]);
                }
                setHasMore(false);
            }

            const club = data.searching_club;

            if (club) {
                setDisplayName(club.display_name || "Название клуба отсутствует");
                setClubAvatar(club.club_avatar);
                setFederationName(club.federation_name || null);
                setFederationAlias(club.federation_alias || null);
                setClubId(club.club_id);
                setActiveMember(club.active_member);
                setActiveRkfUser(club.active_rkf_user);
                setClub(club);
            }

            setSpecialistsLoading(false);
            setLoading(false);
            setListLoading(false);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setSpecialistsLoading(false);
            setLoading(false);
            setListLoading(false);
        });
    };

    const getNextSpecialists = () => {
        if (hasMore) {
            (() => getSpecialists(buildUrl({ ...filters }), startElement + 50))();
            setStartElement(startElement + 50);
        }
    };

    useEffect(() => {
        if (url) {
            setListLoading(true);
            setStartElement(1);
            (() => getSpecialists(url, 1))();
        }
    }, [url]);

    return loading ?
        <Loading /> :
        <Layout
            withFilters
            setNotificationsLength={setNotificationsLength}
        >
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({ isOpenFilters: false })} />
            <div className="specialists-page__wrap redesign">
                <Container className="specialists-page content">
                    <Filters
                        filters={filters}
                        clubName={shorten(displayName)}
                        profileId={clubId}
                        logo={clubAvatar || DEFAULT_IMG.clubAvatar}
                        active_member={active_member}
                        active_rkf_user={active_rkf_user}
                        federationName={federationName}
                        federationAlias={federationAlias}
                        club={club}
                        setClub={setClub}
                        notificationsLength={notificationsLength}
                        needRequest={needRequest}
                        setNeedRequest={setNeedRequest}
                    />
                    <div className="specialists-page__content">
                        {filters.Alias && displayName &&
                            <div className="specialists-page__mobile-only">
                                {isFederationAlias(filters.Alias) &&
                                    <MenuComponent
                                        alias={filters.Alias}
                                        name={shorten(displayName)}
                                        isFederation={true}
                                    />
                                    // : <UserMenu userNav={filters.Alias === ls.get('user_info')?.alias
                                    //     ? clubNav(filters.Alias) // Show NewsFeed menu item to current user only
                                    //     : clubNav(filters.Alias).filter(i => i.id !== 2)}
                                    //     notificationsLength={notificationsLength}
                                    // />
                                }
                            </div>
                        }
                        <ListFilter
                            searchTypeId={filters.SearchTypeId}
                            setNeedRequest={setNeedRequest}
                        />
                        <SearchFilter StringFilter={filters.StringFilter} searchTypeId={parseInt(filters.SearchTypeId)} />
                        {
                            listLoading
                                ? <Loading centered={false} />
                                : <SpecialistsList
                                    specialists={specialists}
                                    getNextSpecialists={getNextSpecialists}
                                    hasMore={hasMore}
                                    loading={specialistsLoading}
                                    setShowModal={setShowModal}
                                    searchTypeId={parseInt(filters.SearchTypeId)}
                                />
                        }
                    </div>
                </Container>
                {showModal &&
                    <SignUpModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        title={showModal.name}
                        id={showModal.id}
                    />
                }
            </div>
        </Layout>
};

export default connectShowFilters(React.memo(Specialists));

