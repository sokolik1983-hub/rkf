import React from "react";
import * as sort from "sortabular";
import * as search from "searchtabular";
import RowControl from "../RowControl";
import {formatDateWithTime, formatPrice} from "../../../../../../utils";
import {Link} from "react-router-dom";


export const getTableColumns = (sortingColumns, sortable) => {
    let cols = [
        {
            property: 'registration_date',
            header: {
                label: 'Дата регистрации'
            },
            footer: () => 'Итого:'
        },
        {
            property: 'federation',
            header: {
                label: 'Федерация'
            }
        },
        {
            property: 'status',
            header: {
                label: 'Статус'
            }
        },
        {
            property: 'document_number',
            header: {
                label: 'Номер документа'
            }
        },
        {
            property: 'declarant_name',
            header: {
                label: 'ФИО заявителя'
            }
        },
        {
            property: 'documents_count',
            header: {
                label: 'Количество документов'
            },
            footer: rows => rows.reduce((a,b) => a + b.documents_count, 0)
        },
        {
            property: 'cost',
            header: {
                label: 'Стоимость'
            },
            footer: rows => formatPrice(rows.reduce((a,b) => a + b.cost, 0))
        }
    ];

    cols.map(col => {
        col.header.formatters = [
            sort.header({
                sortable,
                getSortingColumns: () => sortingColumns,
                strategy: sort.strategies.byProperty
            })
        ];

        col.cell = {
            formatters: [
                (data, extra) => (search.highlightCell(data, extra))
            ]
        };

        if (col.property === 'registration_date') {
            col.cell.resolve = date => date && formatDateWithTime(date);
        } else if (col.property === 'cost') {
            col.cell.resolve = cost => formatPrice(cost)
        }

        return col;
    });

    cols.push({
        cell: {
            formatters: [
                (value, {rowData}) => {
                    console.log('value', value);
                    console.log('rowData', rowData);
                    return (
                        <RowControl>
                            <ul className="row-control__list">
                                <li className="row-control__item">
                                    <Link to="/" className="row-control__link" onClick={e => e.preventDefault()}>
                                        Подробнее
                                    </Link>
                                </li>
                                {rowData.status_id === 3 &&
                                    <li className="row-control__item">
                                        <Link to="/" className="row-control__link" onClick={e => e.preventDefault()}>
                                            Редактировать
                                        </Link>
                                    </li>
                                }
                            </ul>
                        </RowControl>
                    )
                }
            ]
        }
    });

    return cols;
};