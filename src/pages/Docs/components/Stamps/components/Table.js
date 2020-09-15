import React, { useState, useEffect } from 'react';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DropDownButton } from '@progress/kendo-react-buttons';
import { Window } from '@progress/kendo-react-dialogs';
import formatDate from 'utils/formatDate';
import { getHeaders } from "utils/request";
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import kendoMessages from 'kendoMessages.json';

loadMessages(kendoMessages, 'ru-RU');

const categories = [
    { "status_id": 1, "StatusName": "На рассмотрении" },
    { "status_id": 2, "StatusName": "Отказ" },
    { "status_id": 3, "StatusName": "Подтверждено" },
];

const ColumnMenu = (props) => {
    return <div>
        <GridColumnMenuFilter {...props} expanded={true} />
    </div>
};

const isDefaultCell = ({ dataItem }) => <td>{dataItem.is_default ? 'Да' : 'Нет'}</td>;
const LinkCell = ({ dataItem }) => {
    const { document_id } = dataItem;
    return <td>
        {document_id &&
            <span className="pedigree-link" onClick={e => handleClick(e, document_id)} >Скачать файл</span>
        }
    </td>
};

const OptionsCell = ({ dataItem }, setDefaultStamp) => {
    const { stamp_code_id } = dataItem;
    const options = [
        {
            text: 'Сделать по умолчанию',
            render: ({ item }) => <span onClick={() => setDefaultStamp(stamp_code_id)}>{item.text}</span>
        }
    ];

    return <td><DropDownButton icon="more-horizontal" items={options} /></td>
};

const handleClick = async (e, id) => {
    e.preventDefault();
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
    el.className = 'pedigree-link';
};

const Table = ({ documents, setDefaultStamp }) => {
    const [windowVisible, setWindowVisible] = useState(false);
    const [gridClickedRow, setGridClickedRow] = useState({});
    const [rows, setRows] = useState(null);
    const [gridData, setGridData] = useState({
        skip: 0, take: 20,
        sort: [
            { field: "date_create", dir: "asc" }
        ]
    });

    useEffect(() => {
        setRows(documents.map(d => {
            return {
                ...d,
                date_create: formatDate(d.date_create),
                date_change: formatDate(d.date_change)
            }
        }))
    }, [documents]);

    const handleDropDownChange = (e) => {
        let newDataState = { ...gridData }
        if (e.target.value.status_id !== null) {
            newDataState.filter = {
                logic: 'and',
                filters: [{ field: 'status_id', operator: 'eq', value: e.target.value.status_id }]
            }
            newDataState.skip = 0
        } else {
            newDataState.filter = {
                filters: []
            }
            newDataState.skip = 0
        }
        setGridData(newDataState);
    }

    const handleGridDataChange = (e) => {
        setGridData(e.data);
    }

    const handleGridRowClick = (e) => {
        setWindowVisible(true);
        setGridClickedRow(e.dataItem);
    }

    return (
        <LocalizationProvider language="ru-RU">
            <IntlProvider locale={'ru'}>
                <div className={'club-documents-status__filters-wrap'}>
                    <strong>Фильтры: </strong>&nbsp;
                    <DropDownList
                        data={categories}
                        dataItemKey="status_id"
                        textField="StatusName"
                        defaultItem={{ status_id: null, StatusName: "Все" }}
                        onChange={handleDropDownChange}
                    />
                </div>
                {
                    rows && <Grid
                        data={process(rows, gridData)}
                        pageable
                        sortable
                        resizable
                        {...gridData}
                        onDataStateChange={handleGridDataChange}
                        onRowClick={handleGridRowClick}
                        style={{ height: "400px" }}>
                        <GridColumn field="stamp_code" title="Чип/Клеймо" width="130px" columnMenu={ColumnMenu} />
                        <GridColumn field="status_name" title="Статус" width="140px" columnMenu={ColumnMenu} />
                        <GridColumn field="document_id" title="Свидетельство о регистрации кода клейма" width="225px" columnMenu={ColumnMenu} cell={LinkCell} />
                        <GridColumn field="date_create" title="Дата добавления клейма" width="150px" columnMenu={ColumnMenu} />
                        <GridColumn field="is_default" title="По умолчанию" width="150px" columnMenu={ColumnMenu} cell={isDefaultCell} />
                        <GridColumn width="60px" cell={(props) => OptionsCell(props, setDefaultStamp)} />
                    </Grid>
                }


                {windowVisible &&
                    <Window
                        title="Подробности"
                        onClose={() => setWindowVisible(false)}
                        height={350}>
                        <dl style={{ textAlign: "left" }}>
                            <dt><strong>Чип/Клеймо</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.stamp_code}</dd>
                            <dt><strong>Статус</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.status_name}</dd>
                            <dt><strong>Свидетельство о регистрации кода клейма</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>
                                {gridClickedRow.document_id &&
                                    <span className="pedigree-link" onClick={e => handleClick(e, gridClickedRow.document_id)} >Скачать файл</span>
                                }
                            </dd>
                            <dt><strong>Дата добавления клейма</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.date_create}</dd>
                            <dt><strong>По умолчанию</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.is_default ? 'Да' : 'Нет'}</dd>
                        </dl>
                    </Window>
                }
            </IntlProvider>
        </LocalizationProvider>
    )
};

export default Table;