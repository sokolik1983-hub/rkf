import React from "react";
import * as sort from "sortabular";
import * as search from "searchtabular";
import RowControl from "../RowControl";
import formatDate from 'utils/formatDate';
import { getHeaders } from "utils/request";

export const getTableColumns = (sortingColumns, sortable, setDefaultStamp) => {
    let cols = [
        {
            property: 'stamp_code',
            header: {
                label: 'Код клейма'
            }
        },
        {
            property: 'document_id',
            header: {
                label: 'Свидетельство о регистрации кода клейма'
            }
        },
        {
            property: 'date_create',
            header: {
                label: 'Дата добавления клейма'
            }
        },
        {
            property: 'is_default',
            header: {
                label: 'По умолчанию'
            }
        }
    ];

    const handleClick = async (e, id) => {
        e.preventDefault();
        console.log(e.target.innerText);
        let el = e.target;
        el.className = 'stamp-loading';
        el.innerText = 'Загрузка...';
        await fetch(`/api/clubs/ClubStampCode/document?id=${id}`, {
            method: 'GET',
            headers: getHeaders()
        })
            .then(response => response.blob())
            .then(blob => {
                let url = window.URL.createObjectURL(blob),
                    a = document.createElement('a');
                a.href = url;
                a.download = `Свидетельство о регистрации кода клейма ${id}`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            });
        el.innerText = 'Скачать файл';
        el.className = '';
    };

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
            col.cell.resolve = data => formatDate(data, 'ru') || 'не указана';
        }

        if (col.property === 'document_id') {
            col.cell.formatters = [id => <a href="/" onClick={e => handleClick(e, id)}>Скачать файл</a>] || 'отсутствует';
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
                                        onClick={() => setDefaultStamp(rowData.stamp_code_id)}
                                    >
                                        Сделать по умолчанию
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