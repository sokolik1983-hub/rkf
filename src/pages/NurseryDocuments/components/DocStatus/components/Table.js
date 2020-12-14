import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { DropDownButton } from '@progress/kendo-react-buttons';
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { GridPDFExport } from "@progress/kendo-react-pdf";
import kendoMessages from 'kendoMessages.json';
import moment from "moment";
import PdfPageTemplate from "../../../../../components/PdfPageTemplate";
import LightTooltip from "../../../../../components/LightTooltip";

loadMessages(kendoMessages, 'ru-RU');

const ColumnMenu = (props) => {
    return <div>
        <GridColumnMenuFilter {...props} expanded={true} />
    </div>
};

const DateCell = ({ dataItem }, field) => <td>{moment(dataItem[field]).format('DD.MM.YY')}</td>;

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
            { field: "date_create", dir: "desc" }
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
            gridPDFExport.current.save(process(documents, gridData).data, () => setExporting(false));
        }
    }, [exporting]);

    const gridForExport = <Grid
        data={process(documents, gridData)}
        pageable
        sortable
        resizable
        {...gridData}
        onDataStateChange={handleGridDataChange}
        onRowClick={handleGridRowClick}
        className="club-documents-status__pointer">
        <GridColumn field="status_name" title=" " />
        <GridColumn field="date_create" title="Дата регистрации" columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
        <GridColumn field="federation_name" title="Федерация" columnMenu={ColumnMenu} />
        <GridColumn field="count" title="Всего заявок" columnMenu={ColumnMenu} />
        <GridColumn field="count_done" title="Изготовлено" columnMenu={ColumnMenu} />
        <GridColumn field="count_in_work" title="В работе" columnMenu={ColumnMenu} />
        <GridColumn field="id" title="№ документа" columnMenu={ColumnMenu} />
        <GridColumn field="name" title="ФИО заявителя" columnMenu={ColumnMenu} />
    </Grid>;

const rowRender = (trElement, props) => {
    const status = props.dataItem.status_id;
    const done = { backgroundColor: "rgba(23, 162, 184, 0.15)" };
    const rejected = { backgroundColor: "rgba(220, 53, 69, 0.15)" };
    const in_work = { backgroundColor: "rgba(40, 167, 69, 0.15)" };
    const not_sent = { backgroundColor: "rgba(255, 193, 7, 0.15)" };
    const trProps = { style: status === 1 ? rejected : status === 2 ? in_work : status === 3 ? done : not_sent };
    return React.cloneElement(trElement, { ...trProps }, trElement.props.children);
};

    const StatusCell = (props) => {
        return (
            <LightTooltip title={props.dataItem.status_name} enterDelay={200} leaveDelay={200}>
                <td title={props.dataItem.status_name}>
                    {props.dataItem.status_value}
                </td>
            </LightTooltip>
        );
    };

    return (
        <LocalizationProvider language="ru-RU">
            <IntlProvider locale={'ru'}>
                {documents && <Grid
                    data={process(documents, gridData)}
                    rowRender={rowRender}
                    pageable
                    sortable
                    resizable
                    {...gridData}
                    onDataStateChange={handleGridDataChange}
                    onRowClick={handleGridRowClick}
                    className="club-documents-status__pointer"
                    style={{ height: "700px", maxWidth: `${fullScreen ? `934px` : `554px`}`, margin: "0 auto" }}>
                    <GridColumn field="status_value" cell={StatusCell} title=" " width={fullScreen ? '32px' : '31px'} />
                    <GridColumn field="date_create" title="Дата регистрации" width={fullScreen ? '110px' : '80px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
                    <GridColumn field="federation_name" title="Федерация" width={fullScreen ? '110px' : '80px'} columnMenu={ColumnMenu} />
                    <GridColumn field="count" title="Всего заявок" width={fullScreen ? '120px' : '50px'} columnMenu={ColumnMenu} />
                    <GridColumn field="count_done" title="Изготовлено" width={fullScreen ? '120px' : '50px'} columnMenu={ColumnMenu} />
                    <GridColumn field="count_in_work" title="В работе" width={fullScreen ? '120px' : '50px'} columnMenu={ColumnMenu} />
                    <GridColumn field="id" title="№ документа" width={fullScreen ? '120px' : '50px'} columnMenu={ColumnMenu} />
                    <GridColumn field="name" title="ФИО заявителя" width={fullScreen ? '130px' : '90px'} columnMenu={ColumnMenu} />
                    <GridColumn width="70px" cell={(props) => OptionsCell(props, distinction, deleteRow, setShowModal)} />
                </Grid>}
                <GridPDFExport
                    fileName={distinction === 'pedigree' ? `Статус_оформления_родословной_${moment(new Date()).format(`DD_MM_YYYY`)}` : `Статус_регистрации_помёта_${moment(new Date()).format(`DD_MM_YYYY`)}`}
                    ref={gridPDFExport}
                    scale={0.5}
                    margin="1cm"
                    paperSize={["297mm", "210mm"]}
                    pageTemplate={() => <PdfPageTemplate
                            title={distinction === "litter" ? "ЗАЯВЛЕНИЕ НА РЕГИСТРАЦИЮ ПОМЕТА" : "ОФОРМЛЕНИЕ РОДОСЛОВНОЙ"}
                        />}
                >
                    {gridForExport}
                </GridPDFExport>
            </IntlProvider>
        </LocalizationProvider>
    )
};

export default Table;