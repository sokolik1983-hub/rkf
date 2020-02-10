import React, {useEffect} from "react";
import Calendar from "./components/Calendar";
import BreedsFilter from "./components/BreedsFilter";
import RanksFilter from "./components/RanksFilter";
import {connectAuthVisible} from "../../../../apps/Auth/connectors";
import {connectShowFilters} from "../../../../components/Layouts/connectors";
import {connectFilters} from "../../connectors";
import {getEmptyFilters} from "../../utils";
import {setOverflow} from "../../../../utils";
import "./index.scss";


const Filters = ({isAuthenticated, isOpenFilters, setFiltersSuccess}) => {
    useEffect(() => {
        setOverflow(isOpenFilters);
        window.addEventListener('resize', () => setOverflow(isOpenFilters));
        return () => window.removeEventListener('resize', () => setOverflow(isOpenFilters));
    }, [isOpenFilters]);

    const clearAll = () => {
        setFiltersSuccess(getEmptyFilters());
        const calendarButton = document.getElementsByClassName('exhibitions-calendar__button active')[0];
        if(calendarButton) calendarButton.classList.remove('active');
    };

    return (
        <aside className={`exhibitions-page__filters exhibitions-filters${isOpenFilters ? ' _open' : ''}`}>
            <div className="exhibitions-filters__head">
                <h4>Календарь выставок</h4>
                <button type="button" className="exhibitions-filters__clear" onClick={clearAll}>Сбросить</button>
            </div>
            <Calendar />
            <h4 className="exhibitions-filters__title">Фильтры</h4>
            <BreedsFilter />
            <RanksFilter />
        </aside>
    )
};

export default connectShowFilters(connectAuthVisible(connectFilters(React.memo(Filters))));