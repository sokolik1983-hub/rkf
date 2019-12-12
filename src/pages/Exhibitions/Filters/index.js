import React, { useEffect } from "react";
import Card from "../../../components/Card";
import Aside from "../../../components/Layouts/Aside";
import Calendar from "./components/Calendar";
// import MyExhibitionsFilter from "./components/MyExhibition";
// import CitiesFilter from "./components/CitiesFilter/CititesFilter";
import { connectAuthVisible } from "../../../apps/Auth/connectors";
import { connectShowFilters } from "../../../components/Layouts/connectors";
import { connectFilters } from "pages/Exhibitions/connectors";
import { getEmptyFilters } from "pages/Exhibitions/utils";
import './index.scss';


const Filters = ({ isAuthenticated, isOpenFilters, setFiltersSuccess }) => {
    const setOverflow = (isOpen) => {
        if (window.innerWidth <= 768) {
            document.body.style.overflow = isOpen ? 'hidden' : '';
        } else if (window.innerWidth > 768 && isOpen) {
            document.body.style.overflow = '';
        }
    };

    useEffect(() => {
        setOverflow(isOpenFilters);
        window.addEventListener('resize', () => setOverflow(isOpenFilters));
        return () => window.removeEventListener('resize', () => setOverflow(isOpenFilters));
    }, [isOpenFilters]);

    const clearAll = (e) => {
        e.preventDefault();
        setFiltersSuccess(getEmptyFilters());
        const searchCancel = document.getElementsByClassName('ExhibitionsSearch__cancel')[0]; // TODO: make this better
        if (searchCancel) searchCancel.click();
    }

    return (
        <Aside className={`exhibitions-page__left${isOpenFilters ? ' _open' : ''}`}>
            <Card>
                <Calendar />
                {/* <h4 className="exhibitions-filters__title">Фильтры</h4>
                {isAuthenticated && <MyExhibitionsFilter />}
                <CitiesFilter /> */}
                <a href="/" className="link" onClick={clearAll}>Сбросить все параметры</a>
            </Card>
        </Aside>
    )
};

export default connectShowFilters(connectAuthVisible(connectFilters(React.memo(Filters))));