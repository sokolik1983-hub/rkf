import React, {useEffect, useState} from "react";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Filters from "./components/Filters";
import ExhibitionsSearch from "./components/Filters/components/Search";
import ExhibitionsList from "./components/ExhibitionsList";
import ClickGuard from "../../components/ClickGuard";
import TopComponent from "../../components/TopComponent";
import {Request} from "utils/request";
import {connectShowFilters} from "../../components/Layouts/connectors";
import {buildUrl, getFiltersFromUrl, getInitialFilters} from "./utils";
import shorten from "utils/shorten";
import './index.scss';


const Exhibitions = ({history, isOpenFilters, setShowFilters}) => {
    const [exhibitions, setExhibitions] = useState(null);
    const [display_name, setDisplayName] = useState(null);
    const [club_avatar, setClubAvatar] = useState(null);
    const [pagesCount, setPagesCount] = useState(1);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({...getInitialFilters()});
    const [url, setUrl] = useState(buildUrl({...filters}));
    
    const getExhibitions = async (url) => {
        setLoading(true);
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
            setExhibitions(modifiedExhibitions);
            let {dn, ca} = data.searching_club;
            setDisplayName(shorten(dn || "Название клуба отсутствует"));
            setClubAvatar(ca);
            setPagesCount(data.page_count);
            setLoading(false);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setLoading(false);
        });
    };

    useEffect(() => {
        if (url) (() => getExhibitions(url))();
    }, [url]);

    useEffect(() => {
        const unListen = history.listen(() => {
            const filters = getFiltersFromUrl();
            setFilters({...filters});
            setUrl(buildUrl({...filters}));
        });

        return () => unListen();
    }, []);

    return (
        <Layout withFilters>
            {filters.Alias && display_name &&
                <div className="exhibitions-page__top-wrap">
                    <TopComponent
                        logo={club_avatar || "/static/icons/default/club-avatar.svg"}
                        name={display_name}
                    />
                </div>
            }
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})}/>
            <Container className="content exhibitions-page">
                <Filters filters={filters} clubName={display_name}/>
                <div className="exhibitions-page__content">
                    <ExhibitionsSearch ExhibitionName={filters.ExhibitionName} />
                    <ExhibitionsList 
                        exhibitions={exhibitions}
                        loading={loading}
                        pagesCount={pagesCount}
                        PageNumber={filters.PageNumber}
                    />
                </div>
            </Container>
        </Layout>
    )
};

export default connectShowFilters(React.memo(Exhibitions));
