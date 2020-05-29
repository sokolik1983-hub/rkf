import React from "react";
import * as search from "searchtabular";
import "./index.scss";


const PrimaryControls = ({className, perPage, columns, rows, column, query, onPerPage, onSearch, onColumnChange}) => (
    <div className={`primary-controls${className ? ' ' + className : ''}`}>
        <div className="primary-controls__per-page per-page-control">
            <span className="per-page-control__label">Строк в таблице:</span>
            <select defaultValue={perPage} onChange={e => onPerPage(e.target.value)}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
            </select>
        </div>
        <div className="primary-controls__search search-control">
            <span className="search-control__label">Поиск по таблице:</span>
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

export default React.memo(PrimaryControls);