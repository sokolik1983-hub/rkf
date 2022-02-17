import React, {memo, useMemo, useState} from "react";
import SwipeTabs from "../../../../../../components/SwipeTabs";
import {setFiltersToUrl} from "../../../../utils";
import CustomCheckbox from "../../../../../../components/Form/CustomCheckbox";

import "./index.scss";


const ListFilter = ({categoryId, exhibitionsForTable, standardView, setStandardView, exporting, setExporting}) => {
    const clientWidth = window.innerWidth;

    const [isFilter, setIsFilter] = useState(false)

    const tabItems = useMemo(() => {
        return [
            {title: 'Все', type: 0},
            {title: 'Выставочные', type: 1},
            {title: 'Племенные', type: 2},
            {title: 'Состязания и испытания рабочих качеств', type: 3, disabled: true}
        ];
    }, []);

    const handleClick = ({type}) => {
        const calendarButton = document.getElementsByClassName('exhibitions-calendar__button active')[0];
        if (calendarButton) calendarButton.classList.remove('active');

        setFiltersToUrl({CategoryId: type});

        if (type === 3) {
            setFiltersToUrl({CityIds: []});
        }
    };

    const handleFilter = () => {
        setIsFilter(!isFilter);
        setFiltersToUrl({IsPopular: !isFilter})
    }

    return (
        <div className="exhibitions-page__list-filter">
            <div className="exhibitions-page__title-inner">
                <h4 className="list-filter__title">Мероприятия</h4>
                {clientWidth < 560 &&
                    <button
                        className={"exhibitions-page__control " + (standardView ? 'exhibitions-page__control--tableIcon' : 'exhibitions-page__control--backIcon')}
                        onClick={() => setStandardView(!standardView)}
                    />
                }
                <div className="exhibitions-page__controls">
                    {!!exhibitionsForTable.length && !standardView &&
                        <div className="exhibitions-page__downloadBtn-wrap">
                            <button
                                className="exhibitions-page__control exhibitions-page__control--downloadIcon"
                                onClick={() => setExporting(true)}
                                disabled={exporting}
                            >
                                Скачать PDF
                            </button>
                        </div>
                    }
                   {clientWidth > 560 &&
                       <button
                           className={"exhibitions-page__control " + (standardView ? 'exhibitions-page__control--tableIcon' : 'exhibitions-page__control--backIcon')}
                           onClick={() => setStandardView(!standardView)}
                       >
                           {standardView ? 'Переключиться на табличный вид' : 'Вернуться к стандартному просмотру'}
                       </button>
                   }
                </div>
                <CustomCheckbox
                    id="need-filter"
                    label="Сортировка"
                    checked={!!isFilter}
                    onChange={handleFilter}
                    cName="sorting-filter"
                />
            </div>
            {!isFilter ? <SwipeTabs
                items={tabItems}
                activeTabIndex={tabItems.findIndex(item => item.type === +categoryId)}
                onChange={item => handleClick(item)}
            /> :
            <CustomCheckbox
                id="most-liked"
                label="По популярности"
                checked={!!isFilter}
                onChange={handleFilter}
                cName="like-filter"
            />}
        </div>
    );
};

export default memo(ListFilter);