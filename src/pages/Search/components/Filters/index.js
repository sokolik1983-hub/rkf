import React, {useEffect} from "react";
import StickyBox from "react-sticky-box";
import Aside from "../../../../components/Layouts/Aside";
import Card from "../../../../components/Card";
import Dropdown from "./Dropdown";
import {setOverflow} from "../../../../utils";
import "./index.scss";

const filters = [
    {
        name: 'Кинологические организации',
        items: [
            {name: 'РКФ и Федерации', search_type: 1},
            {name: 'Клубы', search_type: 2},
            {name: 'Питомники', search_type: 3},
            {name: 'НКП', search_type: 4},
            {name: 'Приюты ', search_type: 10, disabled: true} //search_type пока не известен
        ]
    },
    {
        name: 'Мероприятия',
        items: [
            {name: 'Выставочные мероприятия', search_type: 5},
            {name: 'Племенные мероприятия', search_type: 6},
            {name: 'Состязания и испытания рабочих качеств', search_type: 7, disabled: true},
        ]
    },
    {
        name: 'Публикации',
        items: [
            {name: 'Новости', search_type: 8},
            {name: 'Объявления', search_type: 9}
        ]
    }
];


const Filters = ({isOpenFilters}) => {
    useEffect(() => {
        setOverflow(isOpenFilters);
        window.addEventListener('resize', () => setOverflow(isOpenFilters));
        return () => window.removeEventListener('resize', () => setOverflow(isOpenFilters));
    }, [isOpenFilters]);

    return (
        <Aside className={`search-page__left${isOpenFilters ? ' _open' : ''}`}>
            <StickyBox offsetTop={66}>
                <Card className="search-page__filters">
                    {filters.map(filter =>
                        <Dropdown {...filter} key={filter.name}/>
                    )}
                </Card>
            </StickyBox>
        </Aside>
    )
};

export default React.memo(Filters);