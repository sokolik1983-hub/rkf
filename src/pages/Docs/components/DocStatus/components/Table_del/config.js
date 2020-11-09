import React from "react";
import * as sort from "sortabular";
import * as search from "searchtabular";
import RowControl from "../RowControl";
import { formatDateWithTime } from "../../../../../../utils";
import { Link } from "react-router-dom";
import {Request} from "utils/request";

const up = s => s[0] && s[0].toUpperCase() + s.slice(1);

export const getTableColumns = (sortingColumns, sortable, distinction, clubAlias, setState, rowClick, deleteRow) => {
    let cols = [
        {
            property: 'date_create',
            header: {
                label: 'Дата регистрации'
            }
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
            property: 'count',
            header: {
                label: 'Всего заявок в пакете'
            }
        },
        {
            property: 'count_done',
            header: {
                label: 'Изготовлено'
            }
        },
        {
            property: 'count_in_work',
            header: {
                label: 'В работе'
            }
        },
        {
            property: 'id',
            header: {
                label: '№ документа'
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
                (data, extra) => (<div onClick={() => rowClick && extra && extra.rowData && extra.rowData.id && rowClick(extra.rowData.id)}>{search.highlightCell(data, extra)}</div>)
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
                (value, { rowData }) => {
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
                                {distinction === 'pedigree' &&
                                    <li className="row-control__item">
                                        <span
                                            className="row-control__link"
                                            onClick={() => setState({docId: rowData.id, showModal: true})}
                                        >
                                            Вложенные заявки
                                        </span>
                                    </li>
                                }
                                {rowData.status_id === 4 &&
                                    <li className="row-control__item">
                                        <Link
                                            to={`/${clubAlias}/documents/${distinction}/${rowData.id}/form`}
                                            className="row-control__link"
                                        >
                                            Редактировать
                                        </Link>
                                    </li>
                                }
                                {rowData.status_id === 1 &&
                                    <li className="row-control__item">
                                        <Link
                                            to={`/${clubAlias}/documents/${distinction}/${rowData.id}/edit`}
                                            className="row-control__link"
                                        >
                                            Ответить
                                        </Link>
                                    </li>
                                }
                                <li className="row-control__item">
                                    <Link
                                        to={`/${clubAlias}/documents/${distinction}/${rowData.id}/print`}
                                        className="row-control__link"
                                    >
                                        Печать
                                    </Link>
                                </li>
                                {rowData.status_id === 4 &&
                                    <li className="row-control__item">
                                        <Link to={`/${clubAlias}/documents/`}
                                            className="row-control__link red"
                                            onClick={e => {
                                                e.preventDefault();
                                                if (window.confirm("Удалить черновик?")) {
                                                    Request({url:`/api/requests/${up(distinction)}Request`,data:rowData.id,method:'DELETE'},
                                                        data => {deleteRow && deleteRow(rowData.id);window.alert('Заявка удалена')},
                                                        e => window.alert('Отсутствует соединение с сервером')
                                                    )
                                                }
                                            }}
                                        >
                                            Удалить черновик
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
