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
    const [state, setState] = useState({
        loading: true,
        exhibitionsLoading: true,
        filters: {...getInitialFilters()},
        url: buildUrl({...getInitialFilters()}),
        exhibitions: null,
        pagesCount: 1,
        display_name: '',
        club_avatar: ''
    });

    useEffect(() => {
        const unListen = history.listen(() => {
            const filters = getFiltersFromUrl();
            setState({...state, filters: {...filters}, url: buildUrl({...filters}), loading: false});
        });

        return () => unListen();
    }, []);

    
    const getExhibitions = async (url) => {
        setState({...state, exhibitionsLoading: true});
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
                setState({
                    ...state,
                    display_name: club.display_name || "Название клуба отсутствует",
                    club_avatar: club.club_avatar
                });
            }
            setState({
                ...state,
                exhibitions: modifiedExhibitions,
                pagesCount: data.page_count,
                exhibitionsLoading: false,
                loading: false
            });
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setState({...state, exhibitionsLoading: false});
        });
    };

    useEffect(() => {
        if (state.url) (() => getExhibitions(state.url))();
    }, [state.url]);

    return state.loading ?
        <Loading /> :
        <Layout withFilters>
            {state.filters.Alias && state.display_name &&
                <>
                    <FloatingMenu
                        alias={state.filters.Alias}
                        name={shorten(state.display_name,16)}
                    />
                    <div className="exhibitions-page__top-wrap container">
                        <TopComponent
                            logo={state.club_avatar || DEFAULT_IMG.clubAvatar}
                            name={state.display_name}
                        />
                    </div>
                </>
            }
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})}/>
            <Container className="content exhibitions-page">
                <Filters filters={state.filters} clubName={shorten(state.display_name)}/>
                <div className="exhibitions-page__content">
                    <Card className="exhibitions-page__disclaimer">
                        <p>В настоящее  время на Платформе представлены выставки рангов CAC и CACIB.
                            Для ознакомления с другими мероприятиями - просьба перейти на
                            сайт <a href="http://rkf.org.ru/" target="_blank" rel="noopener noreferrer">ркф</a></p>
                    </Card>
                    <ListFilter/>
                    <ExhibitionsSearch ExhibitionName={state.filters.ExhibitionName} />
                    <ExhibitionsList 
                        exhibitions={state.exhibitions}
                        loading={state.loading}
                        pagesCount={state.pagesCount}
                        PageNumber={state.filters.PageNumber}
                    />
                </div>
            </Container>
        </Layout>
};

export default connectShowFilters(React.memo(Exhibitions));
