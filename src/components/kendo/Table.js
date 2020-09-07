import React, { useState, useEffect } from 'react';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Window } from '@progress/kendo-react-dialogs';
import '@progress/kendo-theme-default/dist/all.css';
import formatDate from 'utils/formatDate';
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import ruMessages from './ruMessages.json';

loadMessages(ruMessages, 'ru-RU');

const categories = [
    { "status_id": 1, "StatusName": "Отклоненные" },
    { "status_id": 2, "StatusName": "В работе" },
    { "status_id": 3, "StatusName": "Выполненные" },
    { "status_id": 4, "StatusName": "Не отправленные" },
];

const ColumnMenu = (props) => {
    return <div>
        <GridColumnMenuFilter {...props} expanded={true} />
    </div>
};

const Table = ({ documents, distinction }) => {
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
    }, []);

    const handleDropDownChange = (e) => {
        let newDataState = { ...gridData }
        if (e.target.value.status_id !== null) {
            newDataState.filter = {
                logic: 'and',
                filters: [{ field: 'status_id', operator: 'eq', value: e.target.value.status_id }]
            }
            newDataState.skip = 0
        } else {
            newDataState.filter = []
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
        <div className="App">
            <LocalizationProvider language="ru-RU">
                <IntlProvider locale={'ru'}>
                    <p>
                        <strong>Фильтры: </strong>&nbsp;
                <DropDownList
                            data={categories}
                            dataItemKey="status_id"
                            textField="StatusName"
                            defaultItem={{ status_id: null, StatusName: "Все" }}
                            onChange={handleDropDownChange}
                        />
                    </p>
                    {
                        rows && <Grid
                            data={process(rows, gridData)}
                            pageable
                            sortable
                            resizable
                            {...gridData}
                            onDataStateChange={handleGridDataChange}
                            onRowClick={handleGridRowClick}
                            style={{ height: "700px" }}>
                            <GridColumn field="date_create" title="Дата создания" width="150px" columnMenu={ColumnMenu} />
                            <GridColumn field="date_change" title="Изменение статуса" width="170px" columnMenu={ColumnMenu} />
                            <GridColumn field={`${distinction}_request_id`} title="Номер пакета" width="140px" columnMenu={ColumnMenu} />
                            <GridColumn field="breeder_full_name" title="ФИО заводчика" width="150px" columnMenu={ColumnMenu} />
                            <GridColumn field="nursery_name" title="Питомник" width="150px" columnMenu={ColumnMenu} />
                            <GridColumn field="count_of_litter" title="Щенков" width="100px" columnMenu={ColumnMenu} />
                            <GridColumn field="breed" title="Порода" width="150px" columnMenu={ColumnMenu} />
                            <GridColumn field="stamp_code" title="Клеймо" width="100px" columnMenu={ColumnMenu} />
                            <GridColumn field="count_of_documents" title="Документов" width="130px" columnMenu={ColumnMenu} />
                            <GridColumn field="barcode" title="Трек-номер" width="150px" columnMenu={ColumnMenu} />
                            <GridColumn field="status_name" title="Статус" width="150px" columnMenu={ColumnMenu} />
                        </Grid>
                    }


                    {windowVisible &&
                        <Window
                            title="Подробности"
                            onClose={() => setWindowVisible(false)}
                            height={300}>
                            <dl style={{ textAlign: "left" }}>
                                <dt><strong>Дата создания</strong></dt>
                                <dd style={{ marginBottom: '10px' }}>{gridClickedRow.date_create}</dd>
                                <dt><strong>Изменение статуса</strong></dt>
                                <dd style={{ marginBottom: '10px' }}>{gridClickedRow.date_change}</dd>
                                <dt><strong>Номер пакета</strong></dt>
                                <dd style={{ marginBottom: '10px' }}>{gridClickedRow[`${distinction}_request_id`]}</dd>
                                <dt><strong>ФИО заводчика</strong></dt>
                                <dd style={{ marginBottom: '10px' }}>{gridClickedRow.breeder_full_name}</dd>
                                <dt><strong>Питомник</strong></dt>
                                <dd style={{ marginBottom: '10px' }}>{gridClickedRow.nursery_name}</dd>
                                <dt><strong>Щенков</strong></dt>
                                <dd style={{ marginBottom: '10px' }}>{gridClickedRow.count_of_litter}</dd>
                                <dt><strong>Порода</strong></dt>
                                <dd style={{ marginBottom: '10px' }}>{gridClickedRow.breed}</dd>
                                <dt><strong>Клеймо</strong></dt>
                                <dd style={{ marginBottom: '10px' }}>{gridClickedRow.stamp_code}</dd>
                                <dt><strong>Документов</strong></dt>
                                <dd style={{ marginBottom: '10px' }}>{gridClickedRow.count_of_documents}</dd>
                                <dt><strong>Трек-номер</strong></dt>
                                <dd style={{ marginBottom: '10px' }}>{gridClickedRow.barcode}</dd>
                                <dt><strong>Статус</strong></dt>
                                <dd style={{ marginBottom: '10px' }}>{gridClickedRow.status_name}</dd>
                            </dl>
                        </Window>
                    }
                </IntlProvider>
            </LocalizationProvider>
        </div>
    )
};

export default Table;