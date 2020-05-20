import React from "react";
import * as sort from "sortabular";
import * as search from "searchtabular";
import RowControl from "../RowControl";
import { formatDateWithTime } from "../../../../../../utils";
import { Link } from "react-router-dom";


export const getTableColumns = (sortingColumns, sortable, clubAlias, setState) => {
    let cols = [
        {
            property: 'date_create',
            header: {
                label: 'Дата регистрации'
            }
        },
        {
            property: 'puppy_name',
            header: {
                label: 'Кличка'
            }
        },
        {
            property: 'stamp',
            header: {
                label: 'Клеймо'
            }
        },
        {
            property: 'owner_name',
            header: {
                label: 'ФИО заводчика'
            }
        },
        {
            property: 'puppy_birthday',
            header: {
                label: 'Дата рождения щенка'
            }
        },
        {
            property: 'status_name',
            header: {
                label: 'Статус'
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

        if (col.property === 'date_create') {
            col.cell.resolve = date => date && formatDateWithTime(date);
        }

        if(col.property === 'puppy_birthday') {
            col.cell.resolve = date => date && new Date(date).toLocaleDateString('ru-RU');
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
                                    <Link
                                        to={`/${clubAlias}/documents/puppy/metrics/${rowData.id}/print`}
                                        className="row-control__link"
                                    >
                                        Распечатать
                                    </Link>
                                </li>
                                {rowData.status_id === 5 &&
                                    <>
                                        <li className="row-control__item">
                                            <span
                                                className="row-control__link"
                                                onClick={() => setState({
                                                    puppyId: rowData.id,
                                                    showModal: true,
                                                    showOwnerForm: true,
                                                    showSuffixForm: false
                                                })}
                                            >
                                                Добавить владельца
                                            </span>
                                        </li>
                                        <li className="row-control__item">
                                            <span
                                                className="row-control__link"
                                                onClick={() => setState({
                                                    puppyId: rowData.id,
                                                    showModal: true,
                                                    showOwnerForm: false,
                                                    showSuffixForm: true
                                                })}
                                            >
                                                Добавить суффикс и префикс
                                            </span>
                                        </li>
                                    </>
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