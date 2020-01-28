import React, { useEffect } from "react";
import Card from "components/Card";
import Aside from "components/Layouts/Aside";
import Calendar from "./components/Calendar";
import BreedsFilter from "./components/BreedsFilter";
// import MyExhibitionsFilter from "./components/MyExhibition";
// import CitiesFilter from "./components/CitiesFilter/CititesFilter";
import RanksFilter from "./components/RanksFilter";
import { connectAuthVisible } from "apps/Auth/connectors";
import { connectShowFilters } from "components/Layouts/connectors";
import { connectFilters } from "pages/Exhibitions/connectors";
import { getEmptyFilters } from "pages/Exhibitions/utils";
import { setOverflow } from "utils";
import "./index.scss";


const Filters = ({ isAuthenticated, isOpenFilters, setFiltersSuccess }) => {
    useEffect(() => {
        setOverflow(isOpenFilters);
        window.addEventListener('resize', () => setOverflow(isOpenFilters));
        return () => window.removeEventListener('resize', () => setOverflow(isOpenFilters));
    }, [isOpenFilters]);

    const clearAll = (e) => {
        e.preventDefault();
        setFiltersSuccess(getEmptyFilters());
        const calendarButton = document.getElementsByClassName('exhibitions-calendar__button active')[0];
        if(calendarButton) calendarButton.classList.remove('active');
    };

    return (
        <Aside className={`exhibitions-page__left${isOpenFilters ? ' _open' : ''}`}>
            <Card>
                <Calendar />
                <BreedsFilter />
                <RanksFilter />
                {/* <h4 className="exhibitions-filters__title">Фильтры</h4>
                {isAuthenticated && <MyExhibitionsFilter />}
                <CitiesFilter /> */}
                <a href="/" className="link" onClick={clearAll}>Сбросить все параметры</a>
            </Card>
        </Aside>
    )
};

export default connectShowFilters(connectAuthVisible(connectFilters(React.memo(Filters))));