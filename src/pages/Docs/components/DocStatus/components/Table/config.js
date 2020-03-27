import React from "react";
import * as sort from "sortabular";
import * as search from "searchtabular";
import RowControl from "../RowControl";
import {formatDateWithTime} from "../../../../../../utils";
import {Link} from "react-router-dom";


export const getTableColumns = (sortingColumns, sortable, distinction, clubAlias) => {
    let cols = [
        {
            property: 'date_create',
            header: {
                label: 'Дата регистрации'
            },
            footer: () => 'Итого:'
        },
        {
            property: 'federation_name',
            header: {
                label: 'Федерация'
            }
        },
        {
            property: 'status_name',
            header: {
                label: 'Статус'
            }
        },
        {
            property: 'id',
            header: {
                label: 'Номер документа'
            }
        },
        {
            property: 'name',
            header: {
                label: 'ФИО заявителя'
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

        return col;
    });

    cols.push({
        cell: {
            formatters: [
                (value, {rowData}) => {
                    return (
                        <RowControl>
                            <ul className="row-control__list">
                                <li className="row-control__item">
                                    <Link
                                        to={`/${clubAlias}/documents/${distinction}/${rowData.id}`}
                                        className="row-control__link"
                                    >
                                        Подробнее
                                    </Link>
                                </li>
                                {rowData.status_id === 1 &&
                                    <li className="row-control__item">
                                        <Link
                                            to={`/${clubAlias}/documents/${distinction}/${rowData.id}`}
                                            className="row-control__link"
                                        >
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