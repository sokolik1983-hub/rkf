import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { DropDownButton } from '@progress/kendo-react-buttons';
import formatDate from 'utils/formatDate';
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { GridPDFExport } from "@progress/kendo-react-pdf";
import kendoMessages from 'kendoMessages.json';

loadMessages(kendoMessages, 'ru-RU');

const ColumnMenu = (props) => {
    return <div>
        <GridColumnMenuFilter {...props} expanded={true} />
    </div>
};

const DateCell = ({ dataItem }, field) => <td>{formatDate(dataItem[field])}</td>;

const OptionsCell = ({ dataItem }, distinction, deleteRow, setShowModal) => {
    const { id, status_id } = dataItem;
    const { route } = useParams();
    const options = [
        {
            text: 'Подробнее',
            render: ({ item }) => <Link
                className="club-documents-status__dropdown-link"
                to={`/kennel/${route}/documents/${distinction}/${id}`}>{item.text}</Link>
        },
        {
            text: 'Вложенные заявки',
            disabled: distinction === 'pedigree' ? false : true,
            render: ({ item }) => <span onClick={() => setShowModal(id)}>{item.text}</span>
        },
        {
            text: 'Редактировать',
            disabled: status_id === 4 ? false : true,
            render: ({ item }) => <Link
                className="club-documents-status__dropdown-link"
                to={`/kennel/${route}/documents/${distinction}/${id}/form`}>{item.text}</Link>
        },
        {
            text: 'Ответить',
            disabled: status_id === 1 ? false : true,
            render: ({ item }) => <Link
                className="club-documents-status__dropdown-link"
                to={`/kennel/${route}/documents/${distinction}/${id}/edit`}>{item.text}</Link>
        },
        {
            text: 'Печать',
            render: ({ item }) => <Link
                className="club-documents-status__dropdown-link"
                to={`/kennel/${route}/documents/${distinction}/${id}/print`}>{item.text}</Link>
        },
        {
            text: 'Удалить черновик',
            disabled: status_id === 4 ? false : true,
            render: ({ item }) => <span onClick={() => deleteRow(id)}>{item.text}</span>
        }
    ].filter(o => !o.disabled);

    return <td><DropDownButton icon="more-horizontal" items={options} /></td>
};

const Table = ({ documents, distinction, rowClick, deleteRow, setShowModal, exporting, setExporting, fullScreen }) => {
    const gridPDFExport = useRef(null);
    const [gridData, setGridData] = useState({
        skip: 0, take: 50,
        sort: [
            { field: "date_create", dir: "asc" }
        ]
    });

    const handleGridDataChange = (e) => {
        setGridData(e.data);
    }

    const handleGridRowClick = ({ dataItem }) => {
        rowClick(dataItem.id);
    }

    useEffect(() => {
        if (exporting) {
            gridPDFExport.current.save(documents, () => setExporting(false));
        }
    }, [exporting]);

    const grid = <Grid
        data={process(documents, gridData)}
        pageable
        sortable
        resizable
        {...gridData}
        onDataStateChange={handleGridDataChange}
        onRowClick={handleGridRowClick}
        className="club-documents-status__pointer"
        style={{ height: "700px", maxWidth: `${fullScreen ? `1010px` : `630px`}`, margin: "0 auto" }}>
        <GridColumn field="date_create" title="Дата регистрации" width={fullScreen ? '110px' : '100px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
        <GridColumn field="federation_name" title="Федерация" width={fullScreen ? '110px' : '80px'} columnMenu={ColumnMenu} />
        <GridColumn field="status_name" title="Статус" width={fullScreen ? '100px' : '80px'} columnMenu={ColumnMenu} />
        <GridColumn field="count" title="Всего заявок" width={fullScreen ? '120px' : '50px'} columnMenu={ColumnMenu} />
        <GridColumn field="count_done" title="Изготовлено" width={fullScreen ? '120px' : '50px'} columnMenu={ColumnMenu} />
        <GridColumn field="count_in_work" title="В работе" width={fullScreen ? '120px' : '50px'} columnMenu={ColumnMenu} />
        <GridColumn field="id" title="№ документа" width={fullScreen ? '120px' : '50px'} columnMenu={ColumnMenu} />
        <GridColumn field="name" title="ФИО заявителя" width={fullScreen ? '130px' : '90px'} columnMenu={ColumnMenu} />
        <GridColumn width="70px" cell={(props) => OptionsCell(props, distinction, deleteRow, setShowModal)} />
    </Grid>;

    const gridForExport = <Grid
        data={process(documents, gridData)}
        pageable
        sortable
        resizable
        {...gridData}
        onDataStateChange={handleGridDataChange}
        onRowClick={handleGridRowClick}
        className="club-documents-status__pointer"
        style={{ height: "700px", maxWidth: "650px", margin: "0 auto" }}>
        <GridColumn field="date_create" title="Дата регистрации" width="80px" columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
        <GridColumn field="federation_name" title="Федерация" width="100px" columnMenu={ColumnMenu} />
        <GridColumn field="status_name" title="Статус" width="100px" columnMenu={ColumnMenu} />
        <GridColumn field="count" title="Всего заявок" width="80px" columnMenu={ColumnMenu} />
        <GridColumn field="count_done" title="Изготовлено" width="80px" columnMenu={ColumnMenu} />
        <GridColumn field="count_in_work" title="В работе" width="80px" columnMenu={ColumnMenu} />
        <GridColumn field="id" title="№ документа" width="80px" columnMenu={ColumnMenu} />
        <GridColumn field="name" title="ФИО заявителя" width="110px" columnMenu={ColumnMenu} />
    </Grid>;

    return (
        <LocalizationProvider language="ru-RU">
            <IntlProvider locale={'ru'}>
                {documents && grid}
                <GridPDFExport
                    ref={gridPDFExport}
                    scale={0.3}
                    margin="1cm"
                    paperSize="A4"
                >
                    {gridForExport}
                </GridPDFExport>
                
            </IntlProvider>
        </LocalizationProvider>
    )
};

export default Table;