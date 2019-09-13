import React, { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';
import { ExhibitionsFilterContext } from 'apps/Exhibitions/context';
import { formatDateToString } from 'utils/datetime';
import FilterButton from './FilterButton';
import './index.scss';

const FILTERS = {
    week: 'week',
    month: 'month',
    year: 'year',
    today: 'today'
};

function FilterDateRange() {
    const [currentDate] = useState(
        formatDateToString(new Date())
    );
    const [filter, setFilter] = useState(null);
    const [archive, setArchive] = useState(false);
    const { setDatesRange, clearDatesRange } = useContext(ExhibitionsFilterContext);
    const onClick = newFilter => {
        if(newFilter!==filter){
            setFilter(newFilter);
        }
        else{
            setFilter('');
        }
    };

    const onArchiveClick = () => {
        setArchive(!archive);
    };

    useEffect(() => {
        if (filter === FILTERS.today) {
            setDatesRange({ dateFrom: currentDate, dateTo: currentDate });
        }
        if(filter===''){
            clearDatesRange()
        }
    }, [filter, archive]);

    return (
        <div className="exhibition-list__header">
            <div className="exhibition-list__date-range-filter">
                <button
                    onClick={onArchiveClick}
                    className={classnames('exhibition-list__btn', {
                        'exhibition-list__btn--archive': archive
                    })}
                >
                    Архив
                </button>
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
