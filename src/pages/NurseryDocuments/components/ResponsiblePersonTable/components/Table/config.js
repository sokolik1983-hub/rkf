import React from "react";
import * as sort from "sortabular";
import * as search from "searchtabular";
import RowControl from "../RowControl";
import { Link } from "react-router-dom";


export const getTableColumns = (sortingColumns, sortable, nurseryAlias, deletePerson, setDefaultPerson) => {
    let cols = [
        {
            property: 'full_name',
            header: {
                label: 'ФИО'
            }
        },
        {
            property: 'phone',
            header: {
                label: 'Телефон'
            }
        },
        {
            property: 'email',
            header: {
                label: 'Email'
            }
        },
        {
            property: 'subscriber_mail',
            header: {
                label: 'Абонентский ящик'
            }
        },
        {
            property: 'address',
            header: {
                label: 'Адрес'
            }
        },
        {
            property: 'is_default',
            header: {
                label: 'По умолчанию'
            }
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

        if (col.property === 'subscriber_mail') {
            col.cell.resolve = data => data || 'не указан';
        }

        if (col.property === 'is_default') {
            col.cell.resolve = data => data ? 'да' : 'нет';
        }

        return col;
    });

    cols.push({
        cell: {
            formatters: [
                (value, { rowData }) => {
                    return (
                        <RowControl>
                            <ul className="row-control__list">
                                <li className="row-control__item">
                                    <span
                                        className="row-control__link"
                                        onClick={() => setDefaultPerson(rowData.id)}
                                    >
                                        Сделать по умолчанию
                                    </span>
                                </li>
                                <li className="row-control__item">
                                    <Link
                                        to={`/nursery/${nurseryAlias}/documents/responsible/${rowData.id}/edit`}
                                        className="row-control__link"
                                    >
                                        Редактировать
                                    </Link>
                                </li>
                                <li className="row-control__item">
                                    <span
                                        className="row-control__link"
                                        onClick={() => deletePerson(rowData.id)}
                                    >
                                        Удалить
                                    </span>
                                </li>
                            </ul>
                        </RowControl>
                    )
                }
            ]
        }
    });

    return cols;
};