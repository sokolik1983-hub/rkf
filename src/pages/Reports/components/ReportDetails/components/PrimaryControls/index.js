import React from 'react';
import * as search from 'searchtabular';
import './styles.scss';

const PrimaryControls = ({ perPage, columns, rows, column, query, onPerPage, onSearch, onColumnChange, onAdd }) => (
    <div className="ReportDetails__controls primary-controls">
        
        <div className="primary-controls__per-page per-page-control">
            <span className="per-page-control__label">Строк на страницу:</span>
            <select defaultValue={perPage} onChange={e => onPerPage(e.target.value)}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
                <option value="35">35</option>
                <option value="40">40</option>
            </select>
        </div>
        <div className="primary-controls__search search-control">
            <span className="search-control__label">Поиск:</span>
            <search.Field
                column={column}
                query={query}
                columns={columns}
                rows={rows}
                onChange={onSearch}
                onColumnChange={onColumnChange}
                i18n={{ all: 'Все' }}
            />
        </div>
    </div>
);

export default PrimaryControls;