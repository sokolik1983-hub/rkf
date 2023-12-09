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

const ArchiveCell = ({ dataItem }) => {
    const { date_archive, count_request_archive } = dataItem;

    return date_archive ? <td>{date_archive}</td> : count_request_archive ? <td>Есть заявки в архиве</td> : <td></td>;
};

const OptionsCell = ({ dataItem }, distinction, deleteRow, setShowModal, scrollClose) => {
    const [open, setOpen] = useState(false);
    const { id, status_id, date_archive } = dataItem;
    const { route } = useParams();
    const options = [
        {
            text: 'Подробнее',
            disabled: !!date_archive,
            render: ({ item }) => <Link
                className="club-documents-status__dropdown-link"
                to={`/kennel/${route}/documents/${distinction}/${id}`}>{item.text}</Link>
        },
        {
            text: 'Вложенные заявки',
            render: ({ item }) => <span onClick={() => setShowModal(id)}>{item.text}</span>
        },
        {
            text: 'Редактировать',
            disabled: (status_id === 4 && !date_archive) ? false : true,
            render: ({ item }) => <Link
                className="club-documents-status__dropdown-link"
                to={`/kennel/${route}/documents/${distinction}/${id}/form`}>{item.text}</Link>
        },
        {
            text: 'Ответить',
            disabled: (status_id === 1 && !date_archive) ? false : true,
            render: ({ item }) => <Link
                className="club-documents-status__dropdown-link"
                to={`/kennel/${route}/documents/${distinction}/${id}/edit`}>{item.text}</Link>
        },
        {
            text: 'Печать',
            disabled: !!date_archive,
            render: ({ item }) => <Link
                className="club-documents-status__dropdown-link"
                to={`/kennel/${route}/documents/${distinction}/${id}/print`}>{item.text}</Link>
        },
        {
            text: 'Удалить черновик',
            disabled: (status_id === 4 && !date_archive) ? false : true,
            render: ({ item }) => <span onClick={() => deleteRow(id)}>{item.text}</span>
        }
    ].filter(o => !o.disabled);

    return <td>
        <DropDownButton icon={`k-icon k-i-arrow-chevron-${open ? `up` : `down`}`} onOpen={() => setOpen(true)} onClose={() => setOpen(false)} items={options} />
    </td>
};

const Table = ({ documents, distinction, rowClick, deleteRow, setShowModal, exporting, setExporting, fullScreen }) => {
    const gridPDFExport = useRef(null);
    const [gridData, setGridData] = useState({
        skip: 0, take: 50,
        sort: []
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
    >
        <GridColumn field="status_name" title="Статус" />
        <GridColumn field="date_create" title="Дата регистрации" columnMenu={ColumnMenu} />
        <GridColumn field="federation_name" title="Федерация" columnMenu={ColumnMenu} />
        <GridColumn field="count" title="Всего заявок" columnMenu={ColumnMenu} />
        <GridColumn field="count_done" title="Изготовлено" columnMenu={ColumnMenu} />
        <GridColumn field="count_in_work" title="В работе" columnMenu={ColumnMenu} />
        <GridColumn field="id" title="№ пакета" columnMenu={ColumnMenu} />
        <GridColumn field="name" title="ФИО заявителя" columnMenu={ColumnMenu} />
        <GridColumn field="date_archive" title="Архивировано" columnMenu={ColumnMenu} cell={props => ArchiveCell(props)} />
    </Grid>;

    const rowRender = (trElement, props) => {
        const status = props.dataItem.status_id;
        const isArchive = props.dataItem.date_archive;
        const done = { backgroundColor: "rgba(23, 162, 184, 0.15)" };
        const rejected = { backgroundColor: "rgba(220, 53, 69, 0.15)" };
        const in_work = { backgroundColor: "rgba(40, 167, 69, 0.15)" };
        const not_sent = { backgroundColor: "rgba(255, 193, 7, 0.15)" };
        const archive = { backgroundColor: "rgb(210, 215, 218)" };
        const trProps = { style: isArchive ? archive : status === 1 ? rejected : status === 2 ? in_work : status === 3 ? done : not_sent };
        return React.cloneElement(trElement, { ...trProps }, trElement.props.children);
    };

    const StatusCell = (props) => {
        return (
            <LightTooltip title={props.dataItem.status_name} enterDelay={200} leaveDelay={200}>
                <td>
                    {props.dataItem.status_value}
                </td>
            </LightTooltip>
        );
    };

    const [scrollClose, setScrollClose] = useState(0);
    const scrollCunt = () => {
        let count = scrollClose;
        count++;
        setScrollClose(count);
    };

    return (
        <LocalizationProvider language="ru-RU">
            <IntlProvider locale="ru">
                {documents && <Grid
                    data={process(documents, gridData)}
                    rowRender={rowRender}
                    pageable
                    sortable
                    resizable
                    {...gridData}
                    onDataStateChange={handleGridDataChange}
                    onRowClick={handleGridRowClick}
                    onScroll={scrollCunt}
                    style={{ height: "700px", width: "auto", margin: "0 auto" }}>
                    <GridColumn width={fullScreen ? '100px' : '70px'} title="Опции" cell={(props) => OptionsCell(props, distinction, deleteRow, setShowModal, scrollClose)} />
                    <GridColumn field="status_value" cell={StatusCell} title="Статус" width={fullScreen ? '62px' : '61px'} />
                    <GridColumn field="date_create" title="Дата регистрации" width={fullScreen ? '130px' : '118px'} columnMenu={ColumnMenu} />
                    <GridColumn field="federation_name" title="Федерация" width={fullScreen ? '110px' : '110px'} columnMenu={ColumnMenu} />
                    <GridColumn field="count" title="Всего заявок" width={fullScreen ? '120px' : '110px'} columnMenu={ColumnMenu} />
                    <GridColumn field="count_done" title="Изготовлено" width={fullScreen ? '120px' : '110px'} columnMenu={ColumnMenu} />
                    <GridColumn field="count_in_work" title="В работе" width={fullScreen ? '120px' : '110px'} columnMenu={ColumnMenu} />
                    <GridColumn field="id" title="№ пакета" width={fullScreen ? '120px' : '120px'} columnMenu={ColumnMenu} />
                    <GridColumn field="name" title="ФИО заявителя" width={fullScreen ? 'auto' : '218px'} columnMenu={ColumnMenu} />
                    <GridColumn field="date_archive" width={fullScreen ? '130px' : '90px'} title="Архивировано" columnMenu={ColumnMenu} cell={props => ArchiveCell(props)} />
                </Grid>}
                <GridPDFExport
                    fileName={distinction === 'pedigree' ? `Статус_оформления_родословной_${moment(new Date()).format(`DD_MM_YYYY`)}` : `Статус_регистрации_помёта_${moment(new Date()).format(`DD_MM_YYYY`)}`}
                    ref={gridPDFExport}
                    scale={0.5}
                    margin="1cm"
                    paperSize={["297mm", "210mm"]}
                    pageTemplate={() => <PdfPageTemplate
                        title={distinction === 'litter' ? 'ЗАЯВЛЕНИЕ НА РЕГИСТРАЦИЮ ПОМЕТА' : distinction === 'metrics' ? 'Метрики щенка' : 'ОФОРМЛЕНИЕ РОДОСЛОВНОЙ'}
                    />}
                >
                    {gridForExport}
                </GridPDFExport>
            </IntlProvider>
        </LocalizationProvider>
    )
};

export default Table;