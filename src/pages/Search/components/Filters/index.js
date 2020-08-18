import React, {useEffect} from "react";
import StickyBox from "react-sticky-box";
import Aside from "../../../../components/Layouts/Aside";
import Card from "../../../../components/Card";
import Dropdown from "./Dropdown";
import {setOverflow} from "../../../../utils";
import {connectShowFilters} from "../../../../components/Layouts/connectors";
import {connectFilters} from "../../connectors";
import {filters} from "../../config";
import "./index.scss";


const Filters = ({isOpenFilters, string_filter}) => {
    useEffect(() => {
        setOverflow(isOpenFilters);
        window.addEventListener('resize', () => setOverflow(isOpenFilters));
        return () => window.removeEventListener('resize', () => setOverflow(isOpenFilters));
    }, [isOpenFilters]);

    return (
        <Aside className={`search-page__left${isOpenFilters ? ' _open' : ''}`}>
            <StickyBox offsetTop={66}>
                <Card className="search-page__filters">
                    <h3 className="search-page__filters-title">Результаты поиска для</h3>
                    <p className="search-page__filters-value">{string_filter}</p>
                    {filters.map(filter =>
                        <Dropdown {...filter} key={filter.name}/>
                    )}
                </Card>
                <div className="search-page__copy-wrap">
                    <p>© 1991—{new Date().getFullYear()} СОКО РКФ.</p>
                    <p>Политика обработки персональных данных</p>
                </div>
            </StickyBox>
        </Aside>
    )
};

export default connectShowFilters(connectFilters(React.memo(Filters)));