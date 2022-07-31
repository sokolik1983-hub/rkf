import React, {memo, useMemo, useState} from 'react';
import SwipeTabs from '../../../../../../components/SwipeTabs';
import {setFiltersToUrl} from '../../../../utils';
import {scrollFunc} from "../../../../../../utils/scrollToContent";
import { Sorting } from "../../../../../../components/Sorting";

import './index.scss';


const ListFilter = ({
                        categoryId,
                        exhibitionsForTable,
                        standardView,
                        setStandardView,
                        exporting,
                        setExporting,
                        scrollRef,
}) => {
    const clientWidth = window.innerWidth;

    const [isOpen, setIsOpen] = useState(false);

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
        scrollFunc(scrollRef);
    };

    const checkIos = () => {
        if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){
            return true;
        }
    };

    return (
        <div className="exhibitions-page__list-filter">
            <div className="exhibitions-page__title-inner">
                <h4 className="list-filter__title">Мероприятия</h4>
                {clientWidth < 630 &&
                    <button
                        className={"exhibitions-page__control " + (standardView ? 'exhibitions-page__control--tableIcon' : 'exhibitions-page__control--backIcon')}
                        onClick={() => setStandardView(!standardView)}
                    />
                }
                <div className="exhibitions-page__controls">
                    {!!exhibitionsForTable.length && !standardView && !checkIos() &&
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
                   {clientWidth > 630 &&
                       <button
                           className={"exhibitions-page__control " + (standardView ? 'exhibitions-page__control--tableIcon' : 'exhibitions-page__control--backIcon')}
                           onClick={() => setStandardView(!standardView)}
                       >
                           {standardView ? 'Переключиться на табличный вид' : 'Вернуться к стандартному просмотру'}
                       </button>
                   }
                </div>
                <Sorting
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    pageName="exhibitions"
                    setFilters={setFiltersToUrl}
                />
            </div>
            <SwipeTabs
                items={tabItems}
                activeTabIndex={tabItems.findIndex(item => item.type === +categoryId)}
                onChange={item => {
                    handleClick(item);
                }}
            />
        </div>
    );
};

export default memo(ListFilter);