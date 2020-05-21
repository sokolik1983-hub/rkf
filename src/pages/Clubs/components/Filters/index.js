import React, {useEffect} from "react";
import Aside from "../../../../components/Layouts/Aside";
import Card from "../../../../components/Card";
import FederationsFilter from "./components/FederationsFilter";
import IsActivatedFilter from "./components/IsActivatedFilter";
import IsActiveMember from "./components/IsActiveMember";
import CitiesFilter from "./components/CitiesFilter";
import {setOverflow} from "../../../../utils";
import {getEmptyFilters} from "../../utils";
import {connectFilters} from "../../connectors";
import {connectShowFilters} from "../../../../components/Layouts/connectors";
import "./index.scss";


const Filters = ({isOpenFilters, setFilters}) => {
    useEffect(() => {
        setOverflow(isOpenFilters);
        window.addEventListener('resize', () => setOverflow(isOpenFilters));
        return () => window.removeEventListener('resize', () => setOverflow(isOpenFilters));
    }, [isOpenFilters]);

    const clearFilters = (e) => {
        e.preventDefault();
        setFilters(getEmptyFilters());
    };

    return (
        <Aside className={`clubs-page__left${isOpenFilters ? ' _open' : ''}`}>
            <Card className="card__filter">
                <FederationsFilter/>
                <IsActiveMember/>
                <IsActivatedFilter/>
                <CitiesFilter/>
                <a href="/" className="link" onClick={clearFilters}>Сбросить все параметры</a>
            </Card>
        </Aside>
    )
};

export default connectShowFilters(connectFilters(React.memo(Filters)));