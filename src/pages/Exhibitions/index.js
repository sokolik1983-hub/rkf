import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Card from "../../components/Card";
import Filters from "./components/Filters";
import ListFilter from "./components/Filters/components/ListFilter";
import ExhibitionsSearch from "./components/Filters/components/Search";
import ExhibitionsList from "./components/ExhibitionsList";
import ClickGuard from "../../components/ClickGuard";
import TopComponent from "../../components/TopComponent";
import FloatingMenu from "../Club/components/FloatingMenu";
import {Request} from "../../utils/request";
import {connectShowFilters} from "../../components/Layouts/connectors";
import {buildUrl, getFiltersFromUrl, getInitialFilters} from "./utils";
import {DEFAULT_IMG} from "../../appConfig";
import shorten from "../../utils/shorten";
import './index.scss';


const Exhibitions = ({history, isOpenFilters, setShowFilters}) => {
    const [loading, setLoading] = useState(true);
    const [exhibitionsLoading, setExhibitionsLoading] = useState(true);
    const [filters, setFilters] = useState({...getInitialFilters()});
    const [url, setUrl] = useState(buildUrl({...filters}));
    const [exhibitions, setExhibitions] = useState(null);
    const [pagesCount, setPagesCount] = useState(1);
    const [displayName, setDisplayName] = useState('');
    const [clubAvatar, setClubAvatar] = useState('');

    useEffect(() => {
        const unListen = history.listen(() => {
            const filters = getFiltersFromUrl();
            setFilters({...filters});
            setUrl( buildUrl({...filters}));
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
                        name={shorten(displayName,16)}
                    />
                    <div className="exhibitions-page__top-wrap container">
                        <TopComponent
                            logo={clubAvatar || DEFAULT_IMG.clubAvatar}
                            name={displayName}
                        />
                    </div>
                </>
            }
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})}/>
            <Container className="content exhibitions-page">
                <Filters filters={filters} clubName={shorten(displayName)}/>
                <div className="exhibitions-page__content">
                    <Card className="exhibitions-page__disclaimer">
                        <p>В настоящее  время на Платформе представлены выставки рангов CAC и CACIB.
                            Для ознакомления с другими мероприятиями - просьба перейти на
                            сайт <a href="http://rkf.org.ru/" target="_blank" rel="noopener noreferrer">ркф</a></p>
                    </Card>
                    <ListFilter/>
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
