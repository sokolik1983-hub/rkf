import React from 'react';
import Pagify from 'react-pagify';
import segmentize from 'segmentize';
import './styles.scss';

export const paginate = ({ page, perPage }) => {
    return (rows = []) => {
        const p = page - 1 || 0;

        const amountOfPages = Math.ceil(rows.length / perPage);
        const startPage = p < amountOfPages ? p : 0;

        return {
            amount: amountOfPages,
            rows: rows.slice(startPage * perPage, (startPage * perPage) + perPage),
            page: startPage
        };
    };
};

export const Paginator = ({ pagination, pages, onSelect }) => (
    <div className="ReportDetails__pagination">
        <Pagify.Context
            className="pagify-pagination"
            segments={segmentize({
                page: pagination.page,
                pages,
                beginPages: 3,
                endPages: 3,
                sidePages: 2
            })}
            onSelect={onSelect}
        >
            {pagination.page > 1 && <Pagify.Button page={pagination.page - 1}>Предыдущая</Pagify.Button>}

            <Pagify.Segment field="beginPages" />

            <Pagify.Ellipsis
                className="ellipsis"
                previousField="beginPages"
                nextField="previousPages"
            />

            <Pagify.Segment field="previousPages" />
            <Pagify.Segment field="centerPage" className="selected" />
            <Pagify.Segment field="nextPages" />

            <Pagify.Ellipsis
                className="ellipsis"
                previousField="nextPages"
                nextField="endPages"
            />

            <Pagify.Segment field="endPages" />

            {pagination.page < pages && <Pagify.Button page={pagination.page + 1}>Следующая</Pagify.Button>}
        </Pagify.Context>
    </div>
);