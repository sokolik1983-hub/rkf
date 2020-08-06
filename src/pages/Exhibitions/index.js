import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Filters from "./components/Filters";
import ListFilter from "./components/Filters/components/ListFilter";
import ExhibitionsSearch from "./components/Filters/components/Search";
import ExhibitionsList from "./components/ExhibitionsList";
import ClickGuard from "../../components/ClickGuard";
import TopComponent from "../../components/TopComponent";
import FloatingMenu from "../Club/components/FloatingMenu";
import { Request } from "../../utils/request";
import { connectShowFilters } from "../../components/Layouts/connectors";
import { buildUrl, getFiltersFromUrl, getInitialFilters } from "./utils";
import { DEFAULT_IMG } from "../../appConfig";
import shorten from "../../utils/shorten";
import './index.scss';


const Exhibitions = ({ history, isOpenFilters, setShowFilters }) => {
    const [loading, setLoading] = useState(true);
    const [exhibitionsLoading, setExhibitionsLoading] = useState(true);
    const [filters, setFilters] = useState({ ...getInitialFilters() });
    const [url, setUrl] = useState(buildUrl({ ...filters }));
    const [exhibitions, setExhibitions] = useState(null);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [displayName, setDisplayName] = useState('');
    const [clubAvatar, setClubAvatar] = useState('');
    const [clubId, setClubId] = useState('');

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
            url: `${url}&StartElement=${startElem}`
        }, data => {
            if (data.exhibitions.length) {
                const modifiedExhibitions = data.exhibitions.map(exhibition => {
                    exhibition.title = exhibition.city;
                    exhibition.create_date = new Date(exhibition.dates[0].year, exhibition.dates[0].month - 1, exhibition.dates[0].day);
                    exhibition.content = exhibition.exhibition_name;
                    exhibition.url = `/exhibitions/${exhibition.id}`;
                    return exhibition;
                });

                if (data.exhibitions.length < 10) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
                setExhibitions(startElem === 1 ? modifiedExhibitions : [...exhibitions, ...modifiedExhibitions]);
            } else {
                if (startElem === 1) {
                    setExhibitions([]);
                }
                setHasMore(false);
            }


            const club = data.searching_club;

            if (club) {
                setDisplayName(club.display_name || "Название клуба отсутствует");
                setClubAvatar(club.club_avatar);
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
            (() => getExhibitions(buildUrl({ ...filters }), startElement + 10))();
            setStartElement(startElement + 10);
        }
    };

    useEffect(() => {
        if (url) {
            setStartElement(1);
            (() => getExhibitions(url, 1))();
        }
    }, [url]);

    return loading ?
        <Loading /> :
        <Layout withFilters>
            {filters.Alias && displayName &&
                <>
                    <FloatingMenu
                        alias={filters.Alias}
                        profileId={clubId}
                        name={shorten(displayName, 16)}
                    />
                    <div className="exhibitions-page__top-wrap container">
                        <TopComponent
                            logo={clubAvatar || DEFAULT_IMG.clubAvatar}
                            name={displayName}
                        />
                    </div>
                </>
            }
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({ isOpenFilters: false })} />
            <div className="exhibitions-page__wrap">
                <Container className="exhibitions-page content">
                    <Filters filters={filters} clubName={shorten(displayName)} profileId={clubId} />
                    <div className="exhibitions-page__content">
                        <ListFilter categoryId={filters.CategoryId} />
                        <ExhibitionsSearch ExhibitionName={filters.ExhibitionName} />
                        <ExhibitionsList
                            exhibitions={exhibitions}
                            getNextExhibitions={getNextExhibitions}
                            hasMore={hasMore}
                            loading={exhibitionsLoading}
                        />
                    </div>
                </Container>
            </div>
        </Layout>
};

export default connectShowFilters(React.memo(Exhibitions));