import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Filters from "./components/Filters";
import ListFilter from "./components/Filters/components/ListFilter";
import ExhibitionsList from "./components/ExhibitionsList";
import ExhibitionsTable from "./components/ExhibitionsTable";
import ClickGuard from "../../components/ClickGuard";
import MenuComponent from "../../components/MenuComponent";
import { Request } from "../../utils/request";
import { connectShowFilters } from "../../components/Layouts/connectors";
import { buildUrl, getFiltersFromUrl, getInitialFilters } from "./utils";
import { formatDateCommon } from "../../utils/datetime";
import { DEFAULT_IMG } from "../../appConfig";
import shorten from "../../utils/shorten";
import './index.scss';


const Exhibitions = ({ history, isOpenFilters, setShowFilters, user }) => {
    const [loading, setLoading] = useState(true);
    const [exhibitionsLoading, setExhibitionsLoading] = useState(true);
    const [filters, setFilters] = useState({ ...getInitialFilters() });
    const [url, setUrl] = useState(buildUrl({ ...filters }));
    const [exhibitions, setExhibitions] = useState([]);
    const [exhibitionsForTable, setExhibitionsForTable] = useState([]);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [displayName, setDisplayName] = useState('');
    const [federationName, setFederationName] = useState('');
    const [federationAlias, setFederationAlias] = useState('');
    const [clubAvatar, setClubAvatar] = useState('');
    const [clubId, setClubId] = useState('');
    const [standardView, setStandardView] = useState(true);
    const [count, setCount] = useState(0);
    const [needUpdateTable, setNeedUpdateTable] = useState(false);
    const [exporting, setExporting] = useState(false);

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
            url: `${url}&StartElement=${startElem}&ElementCount=50`
        }, data => {
            if (data.exhibitions.length) {
                const modifiedExhibitions = data.exhibitions.map(exhibition => {
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
            }

            setExhibitionsLoading(false);
            setLoading(false);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setExhibitionsLoading(false);
            setLoading(false);
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

    useEffect(() => {
        if (url) {
            setStartElement(1);
            setNeedUpdateTable(true);
            (() => getExhibitions(url, 1))();
        }
    }, [url]);

    return loading ?
        <Loading /> :
        <Layout withFilters>
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({ isOpenFilters: false })} />
            <div className="exhibitions-page__wrap redesign">
                <Container className="exhibitions-page content">
                    <Filters
                        filters={filters}
                        clubName={shorten(displayName)}
                        profileId={clubId}
                        logo={clubAvatar || DEFAULT_IMG.clubAvatar}
                        federationName={federationName}
                        federationAlias={federationAlias}
                    />
                    <div className="exhibitions-page__content">
                        {filters.Alias && displayName &&
                            <div className="exhibitions-page__mobile-only">
                                <MenuComponent
                                    alias={filters.Alias}
                                    user={user}
                                    profileId={clubId}
                                    noCard={true}
                                />
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
                        {standardView ?
                            <ExhibitionsList
                                exhibitions={exhibitions}
                                getNextExhibitions={getNextExhibitions}
                                hasMore={hasMore}
                                loading={exhibitionsLoading}
                            /> :
                            <ExhibitionsTable
                                exhibitions={exhibitionsForTable}
                                count={count}
                                startElement={startElement - 1}
                                needUpdate={needUpdateTable}
                                getNextExhibitions={getNextExhibitionsForTable}
                                exporting={exporting}
                                setExporting={setExporting}
                            />
                        }
                    </div>
                </Container>
            </div>
        </Layout>
};

export default connectShowFilters(React.memo(Exhibitions));