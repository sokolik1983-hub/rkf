import React, {memo, useEffect, useRef, useState} from "react";
import moment from "moment";
import "moment/locale/ru";
import Layout from "../../components/Layouts";
import Loading from "../../components/Loading";
import ClickGuard from "../../components/ClickGuard";
import Container from "../../components/Layouts/Container";
import {connectShowFilters} from "../../components/Layouts/connectors";
import SignUpModal from "../Educational/components/SignUpModal";
import Filters from "./components/Filters";
import ListFilter from "./components/Filters/components/ListFilter";
import SpecialistsList from "./components/SpecialistsList";
import {buildUrl, getFiltersFromUrl, getInitialFilters, setFiltersToUrl} from "./utils";
import {formatDateCommon} from "../../utils/datetime";
import {Request} from "../../utils/request";

import "./index.scss";


moment.locale('ru');

const Specialists = ({history, isOpenFilters, setShowFilters}) => {
    const [loading, setLoading] = useState(true);
    const [listLoading, setListLoading] = useState(false);
    const [specialistsLoading, setSpecialistsLoading] = useState(true);
    const [filters, setFilters] = useState({...getInitialFilters()});
    const [url, setUrl] = useState(buildUrl({...filters}));
    const [specialists, setSpecialists] = useState([]);
    const [startElement, setStartElement] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [allBreeder, setAllBreeder] = useState(false);

    useEffect(() => {
        const unListen = history.listen(() => {
            const filters = getFiltersFromUrl();
            setFilters({...filters});
            setUrl(buildUrl({...filters}));
            !filters && setShowFilters({isOpenFilters: false});
        });

        return () => unListen();
    }, []);

    const getSpecialists = async (url, startElem, allBreeder = '') => {
        setSpecialistsLoading(true);

        await Request({
            url: `${url}&StartElement=${startElem}&ElementCount=50&IsAllBreeder=${allBreeder}`
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
            (() => getSpecialists(buildUrl({ ...filters }), startElement + 50, allBreeder))();
            setStartElement(startElement + 50);
        }
    };

    const scrollRef = useRef();

    useEffect(() => {
        if (url) {
            setListLoading(true);
            setStartElement(1);
            (() => getSpecialists(url, 1, allBreeder))();
        }
    }, [url, allBreeder]);


    return loading ?
        <Loading /> :
        <Layout layoutWithFilters>
            <ClickGuard value={isOpenFilters} callback={() => setShowFilters({isOpenFilters: false})} />
            <div className="specialists-page__wrap redesign" ref={scrollRef}>
                <Container className="specialists-page content">
                    <Filters
                        allBreeder={allBreeder}
                        setAllBreeder={setAllBreeder}
                        isOpenFilters={isOpenFilters}
                        filtersValue={filters}
                        scrollRef={scrollRef}
                    />
                    <div className="specialists-page__content">
                        <ListFilter
                            searchTypeId={filters.SearchTypeId}
                            is_verified={filters.isVerified}
                            is_popular={filters.IsPopular}
                            RegionIds={filters.RegionIds}
                            CityIds={filters.CityIds}
                            onChange={filters => setFiltersToUrl({ IsPopular: filters, isVerified : filters})}
                        />
                        {listLoading ?
                            <Loading centered={false} /> :
                            <SpecialistsList
                                specialists={specialists}
                                getNextSpecialists={getNextSpecialists}
                                hasMore={hasMore}
                                loading={specialistsLoading}
                                searchTypeId={filters.SearchTypeId}
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

export default connectShowFilters(memo(Specialists));