import React, { useState, useEffect, useRef } from "react";
import Loading from "../../../../components/Loading";
//import Calendar from "./components/Calendar";
import { Calendar } from '@progress/kendo-react-dateinputs';
import '@progress/kendo-theme-default/dist/all.css';
import BreedsFilter from "./components/BreedsFilter";
import RanksFilter from "./components/RanksFilter";
import CitiesFilter from "./components/CitiesFilter";
import UserHeader from "components/redesign/UserHeader";
import { connectShowFilters } from "../../../../components/Layouts/connectors";
import { setFiltersToUrl, getEmptyFilters } from "../../utils";
import { setOverflow } from "../../../../utils";
import { Request } from "../../../../utils/request";
import StickyBox from "react-sticky-box";
import { endpointExhibitionsDates, endpointExhibitionsFilters } from "../../config";
import "./index.scss";


const Filters = ({ history, isOpenFilters, filters, clubName, profileId, logo, federationName, federationAlias }) => {
    const [ranks, setRanks] = useState(null);
    const [breeds, setBreeds] = useState(null);
    const [calendarData, setCalendarData] = useState(null);
    const [cities, setCities] = useState(null);
    const [loading, setLoading] = useState(true);

    const filtersElement = useRef(null);

    useEffect(() => {
        Promise.all([getCalendarData(), getFiltersData()])
            .then(() => {
                setLoading(false);
                window.scrollTo(0, 0);
            });
    }, []);

    useEffect(() => {
        setOverflow(isOpenFilters);
        window.addEventListener('resize', () => setOverflow(isOpenFilters));
        return () => window.removeEventListener('resize', () => setOverflow(isOpenFilters));
    }, [isOpenFilters]);

    const getCalendarData = () => Request({
        url: endpointExhibitionsDates
    }, data =>
        setCalendarData(data)
        , error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        });

    const getFiltersData = async () => await Request({
        url: endpointExhibitionsFilters
    }, data => {
        setCities(data.cities);
        setRanks(data.ranks.map(({ value, label }) => ({ id: value, name: label })));
        setBreeds(data.breeds.filter(item => item.value !== 1));
    }
        , error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        });

    const clearAll = () => {
        const calendarButton = document.getElementsByClassName('exhibitions-calendar__button active')[0];
        if (calendarButton) calendarButton.classList.remove('active');

        setFiltersToUrl(getEmptyFilters(filters.Alias));
    };

    if (filtersElement.current) filtersElement.current.scrollTop = 0;

    return (
        <aside className={`exhibitions-page__filters exhibitions-filters${isOpenFilters ? ' _open' : ''}`} ref={filtersElement}>
            <StickyBox offsetTop={65}>
                {loading ?
                    <Loading centered={false} /> :
                    <>
                        {clubName && filters.Alias &&
                            <div className="phone-hide">
                                <UserHeader
                                    user={filters.Alias !== 'rkf-online' ? 'club' : ''}
                                    logo={filters.logo_link}
                                    name={clubName}
                                    alias={filters.Alias}
                                    profileId={profileId}
                                    federationName={federationName}
                                    federationAlias={federationAlias}
                                />
                            </div>
                        }
                        <div className="exhibitions-filters__wrap">
                            <div className="exhibitions-filters__head">
                                <h4>Календарь</h4>
                                <div>
                                    <button type="button" className="exhibitions-filters__clear" onClick={clearAll}>Сбросить</button>
                                    <a className="exhibitions-filters__support-link" href="https://help.rkf.online/ru/knowledge_base/art/40/cat/3/#/" title="Инструкция по календарю мероприятий" target="_blank" rel="noopener noreferrer">
                                        <svg className="exhibitions-filters__svg-info" fill="#72839c" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 7H11V5H9V7ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM9 15H11V9H9V15Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            {/* <Calendar calendarData={calendarData} DateFrom={filters.DateFrom} /> */}
                            <Calendar />
                            {/* <h4 className="exhibitions-filters__title">Фильтры</h4> */}
                            <BreedsFilter breeds={breeds} BreedIds={filters.BreedIds} />
                            <CitiesFilter cities={cities} CityIds={filters.CityIds} />
                            <RanksFilter ranks={ranks} RankIds={filters.RankIds} />
                        </div>
                        <div className="exhibitions-filters__copy-wrap">
                            <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                            <p>Политика обработки персональных данных</p>
                        </div>
                    </>
                }
            </StickyBox>
        </aside>
    )
};

export default connectShowFilters(React.memo(Filters));
