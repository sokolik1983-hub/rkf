import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Filters from "./components/Filters";
import ListFilter from "./components/Filters/components/ListFilter";
import SpecialistsList from "./components/SpecialistsList";
import SpecialistsTable from "./components/SpecialistsTable";
import ClickGuard from "../../components/ClickGuard";
import UserMenu from "../../components/Layouts/UserMenu";
import { Request } from "../../utils/request";
import { connectShowFilters } from "../../components/Layouts/connectors";
import { buildUrl, getFiltersFromUrl, getInitialFilters } from "./utils";
import { formatDateCommon } from "../../utils/datetime";
import { DEFAULT_IMG } from "../../appConfig";
import shorten from "../../utils/shorten";
import { clubNav } from "../Club/config";
import { isFederationAlias } from "../../utils";
import MenuComponent from "../../components/MenuComponent";
import SignUpModal from "pages/Educational/components/SignUpModal";
import ls from "local-storage";
import './index.scss';
import moment from "moment";
import "moment/locale/ru";
moment.locale('ru');


const Specialists = ({ history, isOpenFilters, setShowFilters }) => {
    const [loading, setLoading] = useState(true);
    const [listLoading, setListLoading] = useState(false);
    const [exhibitionsLoading, setSpecialistsLoading] = useState(true);
    const [filters, setFilters] = useState({ ...getInitialFilters() });
    const [url, setUrl] = useState(buildUrl({ ...filters }));
    const [club, setClub] = useState(null);
    const [exhibitions, setSpecialists] = useState([]);
    const [exhibitionsForTable, setSpecialistsForTable] = useState([]);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [displayName, setDisplayName] = useState('');
    const [federationName, setFederationName] = useState('');
    const [federationAlias, setFederationAlias] = useState('');
    const [clubAvatar, setClubAvatar] = useState('');
    const [clubId, setClubId] = useState('');
    const [active_member, setActiveMember] = useState(null);
    const [active_rkf_user, setActiveRkfUser] = useState(null);
    const [standardView, setStandardView] = useState(true);
    const [count, setCount] = useState(0);
    const [needUpdateTable, setNeedUpdateTable] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [notificationsLength, setNotificationsLength] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const isEducational = parseInt(filters.CategoryId) === 4 ? true : false;

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
            if (data.exhibitions?.length) {
                const modifiedSpecialists = data.exhibitions.map(exhibition => {
                    exhibition.date = '';
                    if (exhibition.dates && exhibition.dates.length) {
                        const startDate = exhibition.dates[0];
                        const endDate = exhibition.dates[exhibition.dates.length - 1];
                        exhibition.date = exhibition.dates.length === 1
                            ? formatDateCommon(new Date(`${startDate.year}/${startDate.month}/${startDate.day}`))
                            : formatDateCommon(new Date(`${startDate.year}/${startDate.month}/${startDate.day}`)) +
                            ' - ' + formatDateCommon(new Date(`${endDate.year}/${endDate.month}/${endDate.day}`));
                    }
                    exhibition.club_string = `Клуб ${exhibition.club_name}, ${exhibition.federation_name ? 'Федерация ' + exhibition.federation_name + ', ' : ''}${exhibition.city}`;
                    exhibition.rank_string = exhibition.ranks && exhibition.ranks.length ? exhibition.ranks.map(rank => rank.name).join(', ') : 'Не указано';
                    exhibition.club_rank_string = exhibition.club_string + ' / ' + exhibition.rank_string;
                    exhibition.breed_string = exhibition.breeds && exhibition.breeds.length ? exhibition.breeds.map(breed => breed.name).join(', ') : 'Не указано';
                    exhibition.url = `/exhibitions/${exhibition.id}`;
                    return exhibition;
                });

                if (data.exhibitions.length < 50) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
                setSpecialistsForTable(modifiedSpecialists);
                setSpecialists(startElem === 1 ? modifiedSpecialists : [...exhibitions, ...modifiedSpecialists]);
            } else if (isEducational && data.length) {
                const modifiedSpecialists = data.map(educationEvent => {
                    educationEvent.date = moment(educationEvent.date_begin).format('DD.MM.YYYY');
                    educationEvent.event_name = educationEvent.name;
                    educationEvent.type = educationEvent.type_name;
                    educationEvent.form = educationEvent.payment_form_type_name;

                    educationEvent.url = `/educationals/${educationEvent.id}`;
                    return educationEvent;
                });

                if (data.length < 50) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
                setSpecialistsForTable(modifiedSpecialists);
                setSpecialists(startElem === 1 ? modifiedSpecialists : [...exhibitions, ...modifiedSpecialists]);
            } else {
                if (startElem === 1) {
                    setSpecialists([]);
                    setSpecialistsForTable([]);
                }
                setHasMore(false);
            }

            setCount(data.count);
            setNeedUpdateTable(false);

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

    const getNextSpecialistsForTable = startElem => {
        (() => getSpecialists(buildUrl({ ...filters }), startElem))();
    };

    useEffect(() => {
        if (url) {
            setListLoading(true);
            setStartElement(1);
            setNeedUpdateTable(true);
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
            <div className="exhibitions-page__wrap redesign">
                <Container className="exhibitions-page content">
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
                        isEducational={isEducational}
                    />
                    <div className="exhibitions-page__content">
                        {filters.Alias && displayName &&
                            <div className="exhibitions-page__mobile-only">
                                {isFederationAlias(filters.Alias) ?
                                    <MenuComponent
                                        alias={filters.Alias}
                                        name={shorten(displayName)}
                                        isFederation={true}
                                    /> : <UserMenu userNav={filters.Alias === ls.get('user_info')?.alias
                                        ? clubNav(filters.Alias) // Show NewsFeed menu item to current user only
                                        : clubNav(filters.Alias).filter(i => i.id !== 2)}
                                        notificationsLength={notificationsLength}
                                    />
                                }
                            </div>
                        }
                        <ListFilter categoryId={filters.CategoryId} />
                        <div className="exhibitions-page__controls">
                            {!!exhibitionsForTable.length && !standardView &&
                                <button
                                    className="exhibitions-page__control exhibitions-page__control--downloadIcon"
                                    onClick={() => setExporting(true)}
                                    disabled={exporting}
                                >
                                    Скачать PDF
                                </button>
                            }
                            <button className={"exhibitions-page__control " + (standardView ? 'exhibitions-page__control--tableIcon' : 'exhibitions-page__control--backIcon')} onClick={() => setStandardView(!standardView)}>
                                {standardView ? 'Переключиться на табличный вид' : 'Вернуться к стандартному просмотру'}
                            </button>
                        </div>
                        {
                            listLoading
                                ? <Loading centered={false} />
                                : <>{standardView
                                    ? <SpecialistsList
                                        exhibitions={exhibitions}
                                        isEducational={isEducational}
                                        getNextSpecialists={getNextSpecialists}
                                        hasMore={hasMore}
                                        loading={exhibitionsLoading}
                                        setShowModal={setShowModal}
                                    />
                                    : <SpecialistsTable
                                        exhibitions={exhibitionsForTable}
                                        count={count}
                                        startElement={startElement - 1}
                                        needUpdate={needUpdateTable}
                                        getNextSpecialists={getNextSpecialistsForTable}
                                        exporting={exporting}
                                        setExporting={setExporting}
                                    />
                                }</>
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