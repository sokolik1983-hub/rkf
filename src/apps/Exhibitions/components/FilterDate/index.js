import React from "react";
import Button from 'components/Button'
import './index.scss'

const FilterDateRange = () => (
    <div className="exhibition-list__header">
        <div className="exhibition-list__date-range-filter">
            <button>Архив</button>
            <button>Год</button>
            <button>Месяц</button>
            <button>Неделя</button>
            <button>Сегодня</button>
        </div>
        <Button className={'exhibition-list__btn-create btn-primary btn-lg'}>Создать выставку</Button>
    </div>
);

export default FilterDateRange;