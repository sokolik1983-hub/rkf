import React, {useState, useEffect} from "react";
import Loading from "../../../../components/Loading";
import MenuComponent from "../../../../components/MenuComponent";
import Calendar from "./components/Calendar";
import BreedsFilter from "./components/BreedsFilter";
import RanksFilter from "./components/RanksFilter";
import CitiesFilter from "./components/CitiesFilter";
import {connectShowFilters} from "../../../../components/Layouts/connectors";
import {setFiltersToUrl, getEmptyFilters} from "../../utils";
import {setOverflow} from "../../../../utils";
import {Request} from "../../../../utils/request";
import {endpointExhibitionsRanks, endpointExhibitionsBreeds, endpointExhibitionsDates, endpointExhibitionsFilters} from "../../config";
import "./index.scss";


const Filters = ({isOpenFilters, filters, clubName}) => {
    const [ranks, setRanks] = useState(null);
    const [breeds, setBreeds] = useState(null);
    const [calendarData, setCalendarData] = useState(null);
    const [cities, setCities] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getRanks(), getBreeds(), getCalendarData(), getCities()])
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

    const getRanks = () => Request({
        url: endpointExhibitionsRanks
    }, data =>
        setRanks(data)
    , error => {
        console.log(error.response);
        if (error.response) alert(`Ошибка: ${error.response.status}`);
    });

    const getBreeds = () => Request({
        url: endpointExhibitionsBreeds
    },
    data =>
        setBreeds(data.filter(item => item.id !== 1).map(item => ({value: item.id, label: item.name})))
    , error => {
        console.log(error.response);
        if (error.response) alert(`Ошибка: ${error.response.status}`);
    });

    const getCalendarData = () => Request({
        url: endpointExhibitionsDates
    }, data =>
        setCalendarData(data)
    , error => {
        console.log(error.response);
        if (error.response) alert(`Ошибка: ${error.response.status}`);
    });

    const getCities = () => Request({
        url: endpointExhibitionsFilters
    }, data =>
        setCities(data.cities)
    , error => {
        console.log(error.response);
        if (error.response) alert(`Ошибка: ${error.response.status}`);
    });

    const clearAll = () => {
        const calendarButton = document.getElementsByClassName('exhibitions-calendar__button active')[0];
        if (calendarButton) calendarButton.classList.remove('active');

        setFiltersToUrl(getEmptyFilters(filters.Alias));
    };

    return (
        <aside className={`exhibitions-page__filters exhibitions-filters${isOpenFilters ? ' _open' : ''}`}>
            {loading ?
                <Loading centered={false} /> :
                <>
                    {clubName && filters.Alias &&
                        <MenuComponent
                            alias={filters.Alias}
                            name={clubName}
                            className="phone-hide"
                        />
                    }
                    <div className="exhibitions-filters__head">
                        <h4>Календарь</h4>
                        <button type="button" className="exhibitions-filters__clear" onClick={clearAll}>Сбросить</button>
                    </div>
                    <Calendar calendarData={calendarData} DateFrom={filters.DateFrom} />
                    <h4 className="exhibitions-filters__title">Фильтры</h4>
                    <BreedsFilter breeds={breeds} BreedIds={filters.BreedIds}/>
                    <CitiesFilter cities={cities} CityIds={filters.CityIds}/>
                    <RanksFilter ranks={ranks} RankIds={filters.RankIds}/>
                </>
            }
        </aside>
    )
};

export default connectShowFilters(React.memo(Filters));
