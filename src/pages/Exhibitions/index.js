import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Disclaimer from "../../components/Disclaimer";
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
    const [pagesCount, setPagesCount] = useState(1);
    const [displayName, setDisplayName] = useState('');
    const [clubAvatar, setClubAvatar] = useState('');

    useEffect(() => {
        const unListen = history.listen(() => {
            const filters = getFiltersFromUrl();
            setFilters({ ...filters });
            setUrl(buildUrl({ ...filters }));
            !filters && setShowFilters({ isOpenFilters: false });
        });

        return () => unListen();
    }, []);

    const getExhibitions = async (url) => {
        setExhibitionsLoading(true);

        await Request({
            url: url
        }, data => {
            const modifiedExhibitions = data.exhibitions.map(exhibition => {
                exhibition.title = exhibition.city;
                exhibition.create_date = new Date(exhibition.dates[0].year, exhibition.dates[0].month - 1, exhibition.dates[0].day);
                exhibition.content = exhibition.exhibition_name;
                exhibition.url = `/exhibitions/${exhibition.id}`;
                return exhibition;
            });

            const club = data.searching_club;

            if (club) {
                setDisplayName(club.display_name || "Название клуба отсутствует");
                setClubAvatar(club.club_avatar);
            }

            setExhibitions(modifiedExhibitions);
            setPagesCount(data.page_count);
            setExhibitionsLoading(false);
            setLoading(false);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setExhibitionsLoading(false);
            setLoading(false);
        });
    };

    useEffect(() => {
        if (url) (() => getExhibitions(url))();
    }, [url]);

    return loading ?
        <Loading /> :
        <Layout withFilters>
            {filters.Alias && displayName &&
                <>
                    <FloatingMenu
                        alias={filters.Alias}
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
            <Container className="exhibitions-page content">
                <Filters filters={filters} clubName={shorten(displayName)} />
                <div className="exhibitions-page__content">
                    <Disclaimer>
                        <a className="Disclaimer__support-link" href="http://support.rkf.online/%d0%b8%d0%bd%d1%81%d1%82%d1%80%d1%83%d0%ba%d1%86%d0%b8%d1%8f-%d0%bf%d0%be-%d0%b8%d1%81%d0%bf%d0%be%d0%bb%d1%8c%d0%b7%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d1%8e-%d1%84%d0%b8%d0%bb%d1%8c%d1%82%d1%80%d0%be-2/" target="_blank" rel="noopener noreferrer">
                            Инструкция по календарю мероприятий
                        </a>
                    </Disclaimer>
                    <ListFilter categoryId={filters.CategoryId} />
                    <ExhibitionsSearch ExhibitionName={filters.ExhibitionName} />
                    <ExhibitionsList
                        exhibitions={exhibitions}
                        loading={exhibitionsLoading}
                        pagesCount={pagesCount}
                        PageNumber={filters.PageNumber}
                    />
                </div>
            </Container>
        </Layout>
};

export default connectShowFilters(React.memo(Exhibitions));