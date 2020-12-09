import React, { useState, useRef, useEffect } from 'react';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { ChipList } from '@progress/kendo-react-buttons';
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { GridPDFExport } from "@progress/kendo-react-pdf";
import kendoMessages from 'kendoMessages.json';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { Fade } from '@progress/kendo-react-animation';
import ShareCell from '../../ShareCell';
import moment from "moment";
import PdfPageTemplate from "../../../../../components/PdfPageTemplate";
import LightTooltip from "../../../../../components/LightTooltip";
import CopyCell from '../../../../Docs/components/CopyCell';

loadMessages(kendoMessages, 'ru-RU');

const categories = [
    {
        text: 'Отклоненные',
        value: '1',
    },
    {
        text: 'В работе',
        value: '2',
    },
    {
        text: 'Выполненные',
        value: '3',
    },
    {
        text: 'Не отправленные',
        value: '4',
    }
];

const ColumnMenu = (props) => {
    return <div>
        <GridColumnMenuFilter {...props} expanded={true} />
    </div>
};

const DateCell = ({ dataItem }, field) => <td>{moment(dataItem[field]).format('DD.MM.YY')}</td>;

const Table = ({ documents, distinction, height, exporting, setExporting, fullScreen }) => {
    const gridPDFExport = useRef(null);
    const [success, setSuccess] = useState(false);
    const [gridData, setGridData] = useState({
        skip: 0, take: 50,
        sort: [
            { field: "date_create", dir: "desc" }
        ]
    });

    const handleDropDownChange = (e) => {
        let newDataState = { ...gridData }
        if (e.value === "1" || e.value === "2" || e.value === "3" || e.value === "4") {
            newDataState.filter = {
                logic: 'and',
                filters: [{ field: 'status_id', operator: 'eq', value: e.value[0] }]
            }
            newDataState.skip = 0
        } else {
            newDataState.filter = {
                filters: []
            }
            newDataState.skip = 0
        }
        setGridData(newDataState);
    };

    const handleGridDataChange = (e) => {
        setGridData(e.data);
    }

    const handleSuccess = (message) => {
        setSuccess({ status: true, message: message });
        !success && setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    useEffect(() => {
        if (exporting) {
            gridPDFExport.current.save(process(documents, gridData).data, () => setExporting(false));
        }
    }, [exporting]);

    const rowRender = (trElement, props) => {
        const status = props.dataItem.status_id;
        const green = { backgroundColor: "#E9EDE9" };
        const red = { backgroundColor: "#FFD6D9" };
        const grey = { backgroundColor: "#D8FDE4" };
        const draft = { backgroundColor: "#D4DAED" };
        const trProps = { style: status === 1 ? red : status === 2 ? grey : status === 3 ? green : draft };
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

    const litterGridForExport = <Grid
        data={process(documents, gridData)}
        pageable
        sortable
        resizable
        {...gridData}
        onDataStateChange={handleGridDataChange}>
        <GridColumn field="status_name" title=" " />
        <GridColumn field="date_create" title="Дата создания" columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
        <GridColumn field="date_change" title="Изменение статуса" columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_change')} />
        <GridColumn field={`${distinction}_request_id`} title="№ пакета" columnMenu={ColumnMenu} />
        <GridColumn field="breeder_full_name" title="Заводчик" columnMenu={ColumnMenu} />
        <GridColumn field="nursery_name" title="Питомник" columnMenu={ColumnMenu} />
        <GridColumn field="date_of_birth_litter" title="Дата рождения помёта" columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_of_birth_litter')} />
        <GridColumn field="count_of_litter" title="Щенков" columnMenu={ColumnMenu} />
        <GridColumn field="breed" title="Порода" columnMenu={ColumnMenu} />
        <GridColumn field="stamp_code" title="Клеймо" columnMenu={ColumnMenu} />
        <GridColumn field="dog_father_name" title="Производитель (кличка)" columnMenu={ColumnMenu} />
        <GridColumn field="dog_mother_name" title="Производительница (кличка)" columnMenu={ColumnMenu} />
        <GridColumn field="count_of_documents" title="Док-в" columnMenu={ColumnMenu} />
        <GridColumn field="barcode" title="Трек-номер" columnMenu={ColumnMenu} />
    </Grid>;

    const breedGreedForExport = <Grid
        data={process(documents, gridData)}
        pageable
        sortable
        resizable
        {...gridData}
        onDataStateChange={handleGridDataChange}>
        <GridColumn field="status_name" title=" " />
        <GridColumn field="date_create" title="Дата создания" columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
        <GridColumn field={`${distinction}_request_id`} title="№ пакета" columnMenu={ColumnMenu} />
        <GridColumn field="owner_full_name" title="ФИО владельца" columnMenu={ColumnMenu} />
        <GridColumn field="breeder_full_name" title="Заводчик" columnMenu={ColumnMenu} />
        <GridColumn field="dog_name" title="Кличка" columnMenu={ColumnMenu} />
        <GridColumn field="breed" title="Порода" columnMenu={ColumnMenu} />
        <GridColumn field="stamp_number" title="Клеймо" columnMenu={ColumnMenu} />
        <GridColumn field="barcode" title="Трек-номер" columnMenu={ColumnMenu} />
        <GridColumn field="pedigree_link" title="Ссылка на эл. копию документа" columnMenu={ColumnMenu} cell={(props) => ShareCell(props, handleSuccess)} />
    </Grid>;

    return (
        <div className="App">
            <LocalizationProvider language="ru-RU">
                <IntlProvider locale={'ru'}>
                    <p>
                        <ChipList
                            selection="single"
                            defaultData={categories}
                            onChange={handleDropDownChange}
                        />
                    </p>
                    <span style={{ fontSize: '12px' }}>Для копирования трек-номера нажмите на него</span>
                    {
                        documents && distinction === 'litter'
                            ? <>
                                <Grid
                                    data={process(documents, gridData)}
                                    rowRender={rowRender}
                                    pageable
                                    sortable
                                    resizable
                                    {...gridData}
                                    onDataStateChange={handleGridDataChange}
                                    style={{ height: height ? height : "700px", maxWidth: `${fullScreen ? `1135px` : `1043px`}`, margin: "0 auto" }}>
                                    <GridColumn field="status_value" cell={StatusCell} title=" " width={fullScreen ? '32px' : '31px'} />
                                    <GridColumn field="date_create" title="Дата создания" width={fullScreen ? '100px' : '80px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
                                    <GridColumn field="date_change" title="Изменение статуса" width={fullScreen ? '100px' : '80px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_change')} />
                                    <GridColumn field={`${distinction}_request_id`} title="№ пакета" width={fullScreen ? '50px' : '50px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="breeder_full_name" title="Заводчик" width={fullScreen ? '90px' : '80px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="nursery_name" title="Питомник" width={fullScreen ? '100px' : '90px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="date_of_birth_litter" title="Дата рождения помёта" width={fullScreen ? '100px' : '80px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_of_birth_litter')} />
                                    <GridColumn field="count_of_litter" title="Щенков" width={fullScreen ? '60px' : '50px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="breed" title="Порода" width={fullScreen ? '90px' : '80px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="stamp_code" title="Клеймо" width="100px" columnMenu={ColumnMenu} />
                                    <GridColumn field="dog_father_name" title="Производитель (кличка)" width={fullScreen ? '60px' : '75px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="dog_mother_name" title="Производительница (кличка)" width={fullScreen ? '60px' : '75px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="count_of_documents" title="Док-в" width={fullScreen ? '60px' : '50px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="barcode" title="Трек-номер" width={fullScreen ? '130px' : '120px'} columnMenu={ColumnMenu} cell={(props) => CopyCell(props, handleSuccess)} />
                                </Grid>
                                <GridPDFExport
                                    fileName={`Реестр_помёт_${moment(new Date()).format(`DD_MM_YYYY`)}`}
                                    ref={gridPDFExport}
                                    scale={0.4}
                                    margin="1cm"
                                    paperSize={["297mm", "210mm"]}
                                    pageTemplate={() => <PdfPageTemplate
                                        title={distinction === 'litter' ? 'ЗАЯВЛЕНИЕ НА РЕГИСТРАЦИЮ ПОМЕТА' : 'ОФОРМЛЕНИЕ РОДОСЛОВНОЙ'}
                                    />}
                                >
                                    {litterGridForExport}
                                </GridPDFExport>
                            </>
                            : <>
                                <Grid
                                    data={process(documents, gridData)}
                                    rowRender={rowRender}
                                    pageable
                                    sortable
                                    resizable
                                    {...gridData}
                                    onDataStateChange={handleGridDataChange}
                                    style={{ height: height ? height : "700px", maxWidth: `${fullScreen ? `1135px` : `1043px`}`, margin: "0 auto" }}>
                                    <GridColumn field="status_value" cell={StatusCell} title=" " width={fullScreen ? '32px' : '31px'} />
                                    <GridColumn field="date_create" title="Дата создания" width={fullScreen ? '100px' : '80px'} columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
                                    <GridColumn field={`${distinction}_request_id`} title="№ пакета" width={fullScreen ? '100px' : '70px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="owner_full_name" title="ФИО владельца" width={fullScreen ? '190px' : '170px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="breeder_full_name" title="Заводчик" width={fullScreen ? '120px' : '120px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="dog_name" title="Кличка" width={fullScreen ? '120px' : '120px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="breed" title="Порода" width={fullScreen ? '120px' : '135px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="stamp_number" title="Клеймо" width={fullScreen ? '100px' : '95px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="barcode" title="Трек-номер" width={fullScreen ? '130px' : '120px'} columnMenu={ColumnMenu} cell={(props) => CopyCell(props, handleSuccess)} />
                                    <GridColumn field="pedigree_link" title="Ссылка на эл. копию документа" width={fullScreen ? '120px' : '100px'} columnMenu={ColumnMenu} cell={(props) => ShareCell(props, handleSuccess)} />
                                </Grid>
                                <GridPDFExport
                                    fileName={`Реестр_родословная_${moment(new Date()).format(`DD_MM_YYYY`)}`}
                                    ref={gridPDFExport}
                                    scale={0.4}
                                    margin="1cm"
                                    paperSize={["297mm", "210mm"]}
                                    pageTemplate={() => <PdfPageTemplate
                                        title={distinction === 'litter' ? 'ЗАЯВЛЕНИЕ НА РЕГИСТРАЦИЮ ПОМЕТА' : 'ОФОРМЛЕНИЕ РОДОСЛОВНОЙ'}
                                    />}
                                >
                                    {breedGreedForExport}
                                </GridPDFExport>
                            </>
                    }
                </IntlProvider>
            </LocalizationProvider>
            <NotificationGroup
                style={{
                    position: 'absolute',
                    right: '10px',
                    bottom: '40px',
                }}
            >
                <Fade enter={true} exit={true}>
                    {success.status && <Notification
                        type={{ style: 'success', icon: true }}
                        closable={true}
                        onClose={() => setSuccess(false)}
                    >
                        <span>{success.message ? success.message : 'Информация сохранена!'}</span>
                    </Notification>}
                </Fade>
            </NotificationGroup>
        </div>
    )
};

export default Table;