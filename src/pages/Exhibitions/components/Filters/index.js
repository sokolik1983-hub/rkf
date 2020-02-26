import React, { useState, useEffect } from "react";
import Loading from "../../../../components/Loading";
import Calendar from "./components/Calendar";
import BreedsFilter from "./components/BreedsFilter";
import RanksFilter from "./components/RanksFilter";
import { connectShowFilters } from "../../../../components/Layouts/connectors";
import { connectFilters } from "../../connectors";
import { getEmptyFilters } from "../../utils";
import { setOverflow } from "../../../../utils";
import {Request} from "../../../../utils/request";
import {endpointExhibitionsRanks, endpointExhibitionsBreeds, endpointExhibitionsDates} from "../../config";
import "./index.scss";


const Filters = ({ isOpenFilters, setFiltersSuccess }) => {
    const [ranks, setRanks] = useState(null);
    const [breeds, setBreeds] = useState(null);
    const [calendarData, setCalendarData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getRanks(), getBreeds(), getCalendarData()])
            .then(() => setLoading(false));
    }, []);

    useEffect(() => {
        setOverflow(isOpenFilters);
        window.addEventListener('resize', () => setOverflow(isOpenFilters));
        return () => window.removeEventListener('resize', () => setOverflow(isOpenFilters));
    }, [isOpenFilters]);

    const getRanks = () => {
        return Request({
            url: endpointExhibitionsRanks
        }, data => {
            setRanks(data);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        });
    };

    const getBreeds = () => {
        return Request({ url: endpointExhibitionsBreeds },
            data => {
                setBreeds(data.map(item => ({ value: item.id, label: item.name })));
            }, error => {
                console.log(error.response);
                if (error.response) alert(`Ошибка: ${error.response.status}`);
            })
    };

    const getCalendarData = () => {
        return Request({
            url: endpointExhibitionsDates
        }, data => {
            setCalendarData(data);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        })
    };

    const clearAll = () => {
        setFiltersSuccess(getEmptyFilters());
        const calendarButton = document.getElementsByClassName('exhibitions-calendar__button active')[0];
        if (calendarButton) calendarButton.classList.remove('active');
    };

    return (
        <aside className={`exhibitions-page__filters exhibitions-filters${isOpenFilters ? ' _open' : ''}`}>
            {
                loading
                    ? <Loading centered={false} />
                    : <>
                        <div className="exhibitions-filters__head">
                            <h4>Календарь выставок</h4>
                            <button type="button" className="exhibitions-filters__clear" onClick={clearAll}>Сбросить</button>
                        </div>
                        <Calendar calendarData={calendarData} />
                        <h4 className="exhibitions-filters__title">Фильтры</h4>
                        <BreedsFilter breeds={breeds} />
                        <RanksFilter ranks={ranks} />
                    </>
            }
        </aside>
    )
};

export default connectShowFilters(connectFilters(React.memo(Filters)));