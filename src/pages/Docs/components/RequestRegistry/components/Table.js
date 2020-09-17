import React, { useState } from 'react';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import formatDate from 'utils/formatDate';
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import kendoMessages from 'kendoMessages.json';

loadMessages(kendoMessages, 'ru-RU');

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

const DateCell = ({ dataItem }, field) => <td>{formatDate(dataItem[field])}</td>;

const Table = ({ documents, distinction, height }) => {
    const [gridData, setGridData] = useState({
        skip: 0, take: 50,
        sort: [
            { field: "date_create", dir: "asc" }
        ]
    });

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
                        documents && distinction === 'litter'
                            ? <Grid
                                data={process(documents, gridData)}
                                pageable
                                sortable
                                resizable
                                {...gridData}
                                onDataStateChange={handleGridDataChange}
                                style={{ height: height ? height : "700px" }}>
                                <GridColumn field="date_create" title="Дата создания" width="150px" columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
                                <GridColumn field="date_change" title="Изменение статуса" width="170px" columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_change')} />
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
                            : <Grid
                                data={process(documents, gridData)}
                                pageable
                                sortable
                                resizable
                                {...gridData}
                                onDataStateChange={handleGridDataChange}
                                style={{ height: height ? height : "700px" }}>
                                <GridColumn field="date_create" title="Дата создания" width="150px" columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
                                <GridColumn field={`${distinction}_request_id`} title="Номер пакета" width="140px" columnMenu={ColumnMenu} />
                                <GridColumn field="owner_full_name" title="ФИО владельца" width="150px" columnMenu={ColumnMenu} />
                                <GridColumn field="breeder_full_name" title="ФИО заводчика" width="150px" columnMenu={ColumnMenu} />
                                <GridColumn field="dog_name" title="Кличка" width="150px" columnMenu={ColumnMenu} />
                                <GridColumn field="breed" title="Порода" width="150px" columnMenu={ColumnMenu} />
                                <GridColumn field="stamp_number" title="Клеймо" width="100px" columnMenu={ColumnMenu} />
                                <GridColumn field="barcode" title="Трек-номер" width="150px" columnMenu={ColumnMenu} />
                                <GridColumn field="status_name" title="Статус" width="150px" columnMenu={ColumnMenu} />
                                <GridColumn field="pedigree_link" title="Ссылка на эл. копию документа" width="150px" columnMenu={ColumnMenu} />

                            </Grid>
                    }
                </IntlProvider>
            </LocalizationProvider>
        </div>
    )
};

export default Table;