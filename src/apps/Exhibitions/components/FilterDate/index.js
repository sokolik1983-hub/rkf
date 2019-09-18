import React, { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';
import { ExhibitionsFilterContext } from 'apps/Exhibitions/context';
import {
    formatDateToString,
    getEndOfWeek,
    getEndOfMonth,
    getEndOfYear
} from 'utils/datetime';
import FilterButton from './FilterButton';
import './index.scss';

const FILTERS = {
    week: 'week',
    month: 'month',
    year: 'year',
    today: 'today'
};

const getDatesState = () => {
    const today = new Date();
    const endOfWeek = getEndOfWeek(today);
    const endOfMonth = getEndOfMonth(today);
    const endOfYear = getEndOfYear(today);
    return {
        today: formatDateToString(today),
        endOfWeek: formatDateToString(endOfWeek),
        endOfMonth: formatDateToString(endOfMonth),
        endOfYear: formatDateToString(endOfYear)
    };
};

function FilterDateRange() {
    const [currentDates] = useState(getDatesState());
    const [filter, setFilter] = useState(null);
    const [archive, setArchive] = useState(false);
    const { setDatesRange, clearDatesRange } = useContext(
        ExhibitionsFilterContext
    );
    const onClick = newFilter => {
        if (newFilter !== filter) {
            setFilter(newFilter);
        } else {
            setFilter('');
        }
    };



    useEffect(() => {
        if (filter === FILTERS.today) {
            setDatesRange({
                dateFrom: currentDates.today,
                dateTo: currentDates.today
            });
        }
        if (filter === FILTERS.week) {
            setDatesRange({
                dateFrom: currentDates.today,
                dateTo: currentDates.endOfWeek
            });
        }
        if (filter === FILTERS.month) {
            setDatesRange({
                dateFrom: currentDates.today,
                dateTo: currentDates.endOfMonth
            });
        }
        if (filter === FILTERS.year) {
            setDatesRange({
                dateFrom: currentDates.today,
                dateTo: currentDates.endOfYear
            });
        }
        if (filter === '') {
            clearDatesRange();
        }
    }, [filter]);

    return (
        <div className="exhibition-list__header">
            <div className="exhibition-list__date-range-filter">
                <FilterButton
                    type={FILTERS.year}
                    filter={filter}
                    onClick={onClick}
                >
                    Год
                </FilterButton>
                <FilterButton
                    type={FILTERS.month}
                    filter={filter}
                    onClick={onClick}
                >
                    Месяц
                </FilterButton>
                <FilterButton
                    type={FILTERS.week}
                    filter={filter}
                    onClick={onClick}
                >
                    Неделя
                </FilterButton>
                <FilterButton
                    type={FILTERS.today}
                    filter={filter}
                    onClick={onClick}
                >
                    Сегодня
                </FilterButton>
            </div>
            {/*<Button className={'exhibition-list__btn-create btn-primary btn-lg'}>Создать выставку</Button>*/}
        </div>
    );
}

export default FilterDateRange;
