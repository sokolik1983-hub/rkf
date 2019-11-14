import React from 'react';
import * as search from 'searchtabular';
import './styles.scss';

const PrimaryControls = ({perPage, columns, rows, column, query, onPerPage, onSearch, onColumnChange, onAdd}) => (
    <div className="ReportDetails__controls primary-controls">
        <div className="primary-controls__add-row add-row">
            <span className="add-row__label">Добавить новую запись:</span>
            <button className="add-row__button" onClick={onAdd}>Добавить</button>
        </div>
        <div className="primary-controls__per-page per-page-control">
            <span className="per-page-control__label">На страницу:</span>
            <input
                className="per-page-control__control"
                type="text"
                defaultValue={perPage}
                onChange={e => onPerPage(e.target.value)}
            />
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
                i18n={{all: 'Все'}}
            />
        </div>
    </div>
);

export default PrimaryControls;