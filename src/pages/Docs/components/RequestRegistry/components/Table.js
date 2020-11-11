import React, { useState, useRef, useEffect } from 'react';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import formatDate from 'utils/formatDate';
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { GridPDFExport } from "@progress/kendo-react-pdf";
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

const Table = ({ documents, distinction, height, fullScreen, exporting, setExporting }) => {
    const gridPDFExport = useRef(null);
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

    useEffect(() => {
        if (exporting) {
            gridPDFExport.current.save(documents, () => setExporting(false));
        }
    }, [exporting]);

    const litterGrid = <Grid
        data={process(documents, gridData)}
        pageable
        sortable
        resizable
        {...gridData}
        onDataStateChange={handleGridDataChange}
        style={{ height: height ? height : "700px" }}>
        <GridColumn field="date_create" title="Дата создания" width={fullScreen ? '170px' : '150px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
        <GridColumn field="date_change" title="Изменение статуса" width={fullScreen ? '190px' : '170px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_change')} />
        <GridColumn field={`${distinction}_request_id`} title="№ пакета" width="130px" columnMenu={ColumnMenu} />
        <GridColumn field="breeder_full_name" title="Заводчик" width="155px" columnMenu={ColumnMenu} />
        <GridColumn field="nursery_name" title="Питомник" width="140px" columnMenu={ColumnMenu} />
        <GridColumn field="count_of_litter" title="Щенков" width="100px" columnMenu={ColumnMenu} />
        <GridColumn field="breed" title="Порода" width="150px" columnMenu={ColumnMenu} />
        <GridColumn field="stamp_code" title="Клеймо" width="100px" columnMenu={ColumnMenu} />
        <GridColumn field="count_of_documents" title="Док-в" width="130px" columnMenu={ColumnMenu} />
        <GridColumn field="barcode" title="Трек-номер" width="150px" columnMenu={ColumnMenu} />
        <GridColumn field="status_name" title="Статус" width="150px" columnMenu={ColumnMenu} />
    </Grid>;

    const breedGrid = <Grid
        data={process(documents, gridData)}
        pageable
        sortable
        resizable
        {...gridData}
        onDataStateChange={handleGridDataChange}
        style={{ height: height ? height : "700px" }}>
        <GridColumn field="date_create" title="Дата создания" width={fullScreen ? '170px' : '150px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
        <GridColumn field={`${distinction}_request_id`} title="№ пакета" width="130px" columnMenu={ColumnMenu} />
        <GridColumn field="owner_full_name" title="ФИО владельца" width="155px" columnMenu={ColumnMenu} />
        <GridColumn field="breeder_full_name" title="Заводчик" width="155px" columnMenu={ColumnMenu} />
        <GridColumn field="dog_name" title="Кличка" width="140px" columnMenu={ColumnMenu} />
        <GridColumn field="breed" title="Порода" width="150px" columnMenu={ColumnMenu} />
        <GridColumn field="stamp_number" title="Клеймо" width="100px" columnMenu={ColumnMenu} />
        <GridColumn field="barcode" title="Трек-номер" width="150px" columnMenu={ColumnMenu} />
        <GridColumn field="status_name" title="Статус" width="150px" columnMenu={ColumnMenu} />
        <GridColumn field="pedigree_link" title="Ссылка на эл. копию документа" width={fullScreen ? '200px' : '150px'} columnMenu={ColumnMenu} />
    </Grid>;

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
                            ? <><Grid
                                data={process(documents, gridData)}
                                pageable
                                sortable
                                resizable
                                {...gridData}
                                onDataStateChange={handleGridDataChange}
                                style={{ height: height ? height : "700px" }}>
                                <GridColumn field="date_create" title="Дата создания" width={fullScreen ? '170px' : '150px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
                                <GridColumn field="date_change" title="Изменение статуса" width={fullScreen ? '190px' : '170px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_change')} />
                                <GridColumn field={`${distinction}_request_id`} title="№ пакета" width="130px" columnMenu={ColumnMenu} />
                                <GridColumn field="breeder_full_name" title="Заводчик" width="155px" columnMenu={ColumnMenu} />
                                <GridColumn field="nursery_name" title="Питомник" width="140px" columnMenu={ColumnMenu} />
                                <GridColumn field="count_of_litter" title="Щенков" width="100px" columnMenu={ColumnMenu} />
                                <GridColumn field="breed" title="Порода" width="150px" columnMenu={ColumnMenu} />
                                <GridColumn field="stamp_code" title="Клеймо" width="100px" columnMenu={ColumnMenu} />
                                <GridColumn field="count_of_documents" title="Док-в" width="130px" columnMenu={ColumnMenu} />
                                <GridColumn field="barcode" title="Трек-номер" width="150px" columnMenu={ColumnMenu} />
                                <GridColumn field="status_name" title="Статус" width="150px" columnMenu={ColumnMenu} />
                            </Grid>
                                <GridPDFExport
                                    ref={gridPDFExport}
                                    scale={0.3}
                                    margin="1cm"
                                    paperSize="A4"
                                >
                                    {litterGrid}
                                </GridPDFExport>
                                
                            </>
                            :
                            <><Grid
                                data={process(documents, gridData)}
                                pageable
                                sortable
                                resizable
                                {...gridData}
                                onDataStateChange={handleGridDataChange}
                                style={{ height: height ? height : "700px" }}>
                                <GridColumn field="date_create" title="Дата создания" width={fullScreen ? '170px' : '150px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
                                <GridColumn field={`${distinction}_request_id`} title="№ пакета" width="130px" columnMenu={ColumnMenu} />
                                <GridColumn field="owner_full_name" title="ФИО владельца" width="155px" columnMenu={ColumnMenu} />
                                <GridColumn field="breeder_full_name" title="Заводчик" width="155px" columnMenu={ColumnMenu} />
                                <GridColumn field="dog_name" title="Кличка" width="140px" columnMenu={ColumnMenu} />
                                <GridColumn field="breed" title="Порода" width="150px" columnMenu={ColumnMenu} />
                                <GridColumn field="stamp_number" title="Клеймо" width="100px" columnMenu={ColumnMenu} />
                                <GridColumn field="barcode" title="Трек-номер" width="150px" columnMenu={ColumnMenu} />
                                <GridColumn field="status_name" title="Статус" width="150px" columnMenu={ColumnMenu} />
                                <GridColumn field="pedigree_link" title="Ссылка на эл. копию документа" width={fullScreen ? '200px' : '150px'} columnMenu={ColumnMenu} />
                            </Grid>
                                <GridPDFExport
                                    ref={gridPDFExport}
                                    scale={0.3}
                                    margin="1cm"
                                    paperSize="A4"
                                >
                                    {breedGrid}
                                </GridPDFExport>
                                </>
                    }
                </IntlProvider>
            </LocalizationProvider>
        </div>
    )
};

export default Table;