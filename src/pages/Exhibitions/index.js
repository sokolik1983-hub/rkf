import React, {useEffect, useRef, useState} from "react";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Filters from "./components/Filters";
import ListFilter from "./components/Filters/components/ListFilter";
import ExhibitionsList from "./components/ExhibitionsList";
import ExhibitionsTable from "./components/ExhibitionsTable";
import EducationalsTable from "./components/EducationalsTable";
import { Request } from "../../utils/request";
import { connectShowFilters } from "../../components/Layouts/connectors";
import { buildUrl, getFiltersFromUrl, getInitialFilters } from "./utils";
import { formatDateCommon } from "../../utils/datetime";
import { DEFAULT_IMG } from "../../appConfig";
import shorten from "../../utils/shorten";
import SignUpModal from "pages/Educational/components/SignUpModal";
import useIsMobile from "../../utils/useIsMobile";
import MenuComponentNew from "../../components/MenuComponentNew";

import './index.scss';

import moment from "moment";
import "moment/locale/ru";
moment.locale('ru');

const Exhibitions = ({ history, isOpenFilters, setShowFilters }) => {
    const [loading, setLoading] = useState(true);
    const [listLoading, setListLoading] = useState(false);
    const [exhibitionsLoading, setExhibitionsLoading] = useState(true);
    const [filters, setFilters] = useState({ ...getInitialFilters() });
    const [url, setUrl] = useState(buildUrl({ ...filters }));
    const [club, setClub] = useState(null);
    const [exhibitions, setExhibitions] = useState([]);
    const [exhibitionsForTable, setExhibitionsForTable] = useState([]);
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
    const [showModal, setShowModal] = useState(false);
    const isMobile = useIsMobile(1080);
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

    const getExhibitions = async (url, startElem) => {
        setExhibitionsLoading(true);

        await Request({
            url: `${url.replace('club/', '')}&StartElement=${startElem}&ElementCount=50`
        }, data => {
            if (data.exhibitions?.length) {
                const modifiedExhibitions = data.exhibitions.map(exhibition => {
                    exhibition.date = '';
                    if (exhibition.dates && exhibition.dates.length) {
                        const startDate = exhibition.dates[0];
                        const endDate = exhibition.dates[exhibition.dates.length - 1];
                        exhibition.date = exhibition.dates.length === 1
                            ? formatDateCommon(new Date(`${startDate.year}/${startDate.month}/${startDate.day}`))
                            :  (isMobile ? ((startDate.day <= 9) ? '0' + startDate.day : startDate.day) : formatDateCommon(new Date(`${startDate.year}/${startDate.month}/${startDate.day}`))) +
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
                setExhibitionsForTable(modifiedExhibitions);
                setExhibitions(startElem === 1 ? modifiedExhibitions : [...exhibitions, ...modifiedExhibitions]);
            } else if (isEducational && data.length) {
                const modifiedExhibitions = data.map(educationEvent => {
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
                setExhibitionsForTable(modifiedExhibitions);
                setExhibitions(startElem === 1 ? modifiedExhibitions : [...exhibitions, ...modifiedExhibitions]);
            } else {
                if (startElem === 1) {
                    setExhibitions([]);
                    setExhibitionsForTable([]);
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

            setExhibitionsLoading(false);
            setLoading(false);
            setListLoading(false);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setExhibitionsLoading(false);
            setLoading(false);
            setListLoading(false);
        });
    };

    const getNextExhibitions = () => {
        if (hasMore) {
            (() => getExhibitions(buildUrl({ ...filters }), startElement + 50))();
            setStartElement(startElement + 50);
        }
    };

    const getNextExhibitionsForTable = startElem => {
        (() => getExhibitions(buildUrl({ ...filters }), startElem))();
    };

    const scrollRef = useRef();

    useEffect(() => {
        if (url) {
            setListLoading(true);
            setStartElement(1);
            setNeedUpdateTable(true);
            (() => getExhibitions(url, 1))();
        }
    }, [url]);

    return loading ?
        <Loading /> :
        <Layout layoutWithFilters>
            <div className="exhibitions-page__wrap redesign" ref={scrollRef}>
                <Container className="exhibitions-page content">
                    <Filters
                        IsPopular={filters.IsPopular}
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
                        isEducational={isEducational}
                        scrollRef={scrollRef}
                    />
                    <div className="exhibitions-page__content">
                        {filters.Alias && displayName &&
                            <div className="exhibitions-page__mobile-only">
                                {!isMobile && <MenuComponentNew />}
                            </div>
                        }
                        <ListFilter
                            exhibitionsForTable={exhibitionsForTable}
                            categoryId={filters.CategoryId}
                            standardView={standardView}
                            setExporting={setExporting}
                            exporting={exporting}
                            setStandardView={setStandardView}
                            scrollRef={scrollRef}
                        />
                        {
                            listLoading
                                ? <Loading centered={false} />
                                : <>{standardView ?
                                    <ExhibitionsList
                                        exhibitions={exhibitions}
                                        isEducational={isEducational}
                                        getNextExhibitions={getNextExhibitions}
                                        hasMore={hasMore}
                                        loading={exhibitionsLoading}
                                        setShowModal={setShowModal}
                                    /> :
                                    isEducational
                                        ? <EducationalsTable
                                            exhibitions={exhibitionsForTable}
                                            count={count}
                                            startElement={startElement - 1}
                                            needUpdate={needUpdateTable}
                                            getNextExhibitions={getNextExhibitionsForTable}
                                            exporting={exporting}
                                            setExporting={setExporting}
                                        />
                                        : <ExhibitionsTable
                                            exhibitions={exhibitionsForTable}
                                            count={count}
                                            startElement={startElement - 1}
                                            needUpdate={needUpdateTable}
                                            getNextExhibitions={getNextExhibitionsForTable}
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

export default connectShowFilters(React.memo(Exhibitions));