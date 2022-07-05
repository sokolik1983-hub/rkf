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
import CustomCheckbox from "../../../../../components/Form/CustomCheckbox";
import declension from "../../../../../utils/declension";
import CardMessage from "../../../../../components/CardMessage";

import "./index.scss";

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
        text: 'Неотправленные',
        value: '4',
    }
];

const ColumnMenu = (props) => {
    return <div>
        <GridColumnMenuFilter {...props} expanded={true} />
    </div>
};

const ArchiveCell = ({ dataItem }) => {
    const { status_id, archive_days_left, date_change } = dataItem;
    const countStatus = status_id === 1 || status_id === 3;
    const draftStatus = status_id === 4;
    const isArchive = status_id === 8;

    return isArchive ? <td>{date_change}</td> : (countStatus && archive_days_left > 0) ? <td>{`До архивации ${archive_days_left} ${declension(archive_days_left, ['день', 'дня', 'дней'])}`}</td> : (countStatus && archive_days_left < 1) ? <td>{`В очереди на архивацию`}</td> : (draftStatus && archive_days_left > 0) ? <td>{`До удаления ${archive_days_left} ${declension(archive_days_left, ['день', 'дня', 'дней'])}`}</td> : (draftStatus && archive_days_left < 1) ? <td>{`В очереди на удаление`}</td> : <td></td>;
};

const Table = ({ documents, distinction, height, exporting, setExporting, fullScreen }) => {
    const gridPDFExport = useRef(null);
    const [success, setSuccess] = useState(false);
    const [isArchive, setIsArchive] = useState(false);
    const [gridData, setGridData] = useState({
        skip: 0, take: 50,
        sort: []
    });

    let filteredDocuments = isArchive ? documents : documents?.filter(doc => doc.status_id !== 8);

    useEffect(() => {
        setSelectedDocument();
    }, []);

    const setSelectedDocument = () => {
        const document_id = window.location.href.split('=')[1];
        let newDataState = { ...gridData }
        if (document_id) {
            newDataState.filter = {
                logic: 'and',
                filters: [{ field: 'barcode', operator: 'eq', value: document_id }]
            }
            newDataState.skip = 0
        }
        setGridData(newDataState);
    };

    const handleDropDownChange = (e) => {
        let newDataState = { ...gridData }
        if (e.value === "1" || e.value === "2" || e.value === "3" || e.value === "4") {
            newDataState.filter = {
                logic: 'or',
                filters: [{ field: 'status_id', operator: 'eq', value: e.value[0] },
                { field: 'prev_status_id', operator: 'eq', value: e.value[0] }]
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
            gridPDFExport.current.save(process(filteredDocuments, gridData).data, () => setExporting(false));
        }
    }, [exporting]);

    const rowRender = (trElement, props) => {
        const status = props.dataItem.status_id;
        const isArchive = props.dataItem.status_id === 8;
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
    const TextCell = ({ dataItem }, field) => <td style={{ textAlign: 'left' }}>{dataItem[field]}</td>;

    const litterGridForExport = <Grid
        data={process(filteredDocuments, gridData)}
        pageable
        sortable
        resizable
        {...gridData}
        onDataStateChange={handleGridDataChange}>
        <GridColumn field="status_name" title="Статус" />
        <GridColumn field="date_create" title="Дата создания" columnMenu={ColumnMenu} />
        <GridColumn field="date_change" title="Изменение статуса" columnMenu={ColumnMenu} />
        <GridColumn field={`${distinction}_request_id`} title="№ пакета" columnMenu={ColumnMenu} />
        <GridColumn field="breeder_full_name" title="Заводчик" columnMenu={ColumnMenu} />
        <GridColumn field="nursery_name" title="Питомник" columnMenu={ColumnMenu} />
        <GridColumn field="date_of_birth_litter" title="Дата рождения помёта" columnMenu={ColumnMenu} />
        <GridColumn field="count_of_litter" title="Щенков" columnMenu={ColumnMenu} />
        <GridColumn field="breed" title="Порода" columnMenu={ColumnMenu} />
        <GridColumn field="stamp_code" title="Клеймо" columnMenu={ColumnMenu} />
        <GridColumn field="dog_father_name" title="Производитель (кличка)" columnMenu={ColumnMenu} />
        <GridColumn field="dog_mother_name" title="Производительница (кличка)" columnMenu={ColumnMenu} />
        <GridColumn field="count_of_documents" title="Док-в" columnMenu={ColumnMenu} />
        <GridColumn field="barcode" title="Трек-номер" columnMenu={ColumnMenu} />
        <GridColumn field="date_archive" title="Архивировано" columnMenu={ColumnMenu} cell={props => ArchiveCell(props)} />
    </Grid>;

    const breedGreedForExport = <Grid
        data={process(filteredDocuments, gridData)}
        pageable
        sortable
        resizable
        {...gridData}
        onDataStateChange={handleGridDataChange}>
        <GridColumn width="40px" field="status_value" headerClassName="custom-font-size" className="custom-font-size" title=" " />
        <GridColumn field="date_create" headerClassName="custom-font-size" className="custom-font-size" title="Дата создания" columnMenu={ColumnMenu} />
        <GridColumn field={`${distinction}_request_id`} headerClassName="custom-font-size" className="custom-font-size" title="№ пакета" columnMenu={ColumnMenu} />
        <GridColumn field="owner_full_name" headerClassName="custom-font-size" className="custom-font-size" title="ФИО владельца" columnMenu={ColumnMenu} />
        <GridColumn field="breeder_full_name" headerClassName="custom-font-size" className="custom-font-size" title="Заводчик" columnMenu={ColumnMenu} />
        <GridColumn field="dog_name" headerClassName="custom-font-size" className="custom-font-size" title="Кличка" columnMenu={ColumnMenu} />
        <GridColumn field="breed" headerClassName="custom-font-size" className="custom-font-size" title="Порода" columnMenu={ColumnMenu} />
        <GridColumn field="stamp_number" headerClassName="custom-font-size" className="custom-font-size" title="Клеймо" columnMenu={ColumnMenu} />
        <GridColumn field="barcode" headerClassName="custom-font-size" className="custom-font-size" title="Трек-номер" columnMenu={ColumnMenu} />
        {/*<GridColumn field="pedigree_link" title="Ссылка на эл. копию документа" columnMenu={ColumnMenu} cell={(props) => ShareCell(props, handleSuccess)} />*/}
        {/*<GridColumn field="date_archive" title="Архивировано" columnMenu={ColumnMenu} cell={props => ArchiveCell(props)} />*/}
    </Grid>;

    return (
        <div className="App">
            <LocalizationProvider language="ru-RU">
                <IntlProvider locale="ru">
                    <div className={`chip-list__wrap _registry-wrap ${fullScreen ? `_chips_full_screen` : ``}`}>
                        <ChipList
                            selection="single"
                            defaultData={categories}
                            onChange={handleDropDownChange}
                        />
                        <CustomCheckbox
                            id="is_archive"
                            label="Архивные заявки"
                            checked={isArchive}
                            onChange={() => setIsArchive(!isArchive)}
                        />
                    </div>
                    {
                        filteredDocuments && distinction === 'litter'
                            ? <>
                                <CardMessage>
                                    <h3>Уважаемые пользователи!</h3>
                                    <p>Заявки в статусах "Выполнено" и "Отклонено", если в течение 60 дней с ними не производилось никаких действий, будут перенесены в архив и станут недоступны для просмотра вложений, редактирования и повторной отправки! Заявки в статусе "Не отправлена" будут безвозвратно удалены по прошествии 60 дней с момента их создания!</p>
                                </CardMessage>
                                <Grid
                                    data={process(filteredDocuments, gridData)}
                                    rowRender={rowRender}
                                    pageable
                                    sortable
                                    resizable
                                    {...gridData}
                                    onDataStateChange={handleGridDataChange}
                                    style={{ height: height ? height : "700px", width: "auto", margin: "0 auto" }}>
                                    <GridColumn field="status_value" cell={StatusCell} title="Статус" width="60px" />
                                    <GridColumn field="date_create" title="Создана" width={fullScreen ? '99px' : '80px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="date_change" title="Изменение статуса" width={fullScreen ? '99px' : '80px'} columnMenu={ColumnMenu} />
                                    <GridColumn field={`${distinction}_request_id`} title="№ пакета" width={fullScreen ? '95px' : '50px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="breeder_full_name" title="Заводчик" width={fullScreen ? 'auto' : '87px'} columnMenu={ColumnMenu} cell={props => TextCell(props, 'breeder_full_name')} />
                                    <GridColumn field="nursery_name" title="Питомник" width={fullScreen ? 'auto' : '80px'} columnMenu={ColumnMenu} cell={props => TextCell(props, 'nursery_name')} />
                                    <GridColumn field="date_of_birth_litter" title="Дата рождения помёта" width={fullScreen ? '99px' : '80px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="count_of_litter" title="Щенков" width={fullScreen ? '85px' : '37px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="breed" title="Порода" width={fullScreen ? 'auto' : '80px'} columnMenu={ColumnMenu} cell={props => TextCell(props, 'breed')} />
                                    <GridColumn field="stamp_code" title="Клеймо" width={fullScreen ? '88px' : '55px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="dog_father_name" title="Производитель (кличка)" width={fullScreen ? 'auto' : '80px'} columnMenu={ColumnMenu} cell={props => TextCell(props, 'dog_father_name')} />
                                    <GridColumn field="dog_mother_name" title="Производительница (кличка)" width={fullScreen ? 'auto' : '80px'} columnMenu={ColumnMenu} cell={props => TextCell(props, 'dog_mother_name')} />
                                    <GridColumn field="count_of_documents" title="Док-в" width={fullScreen ? '67px' : '51px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="barcode" title="Трек-номер" width={fullScreen ? '130px' : '120px'} columnMenu={ColumnMenu} cell={(props) => CopyCell(props, handleSuccess)} />
                                    <GridColumn field="date_archive" width={fullScreen ? '130px' : '98px'} title="Архивировано" columnMenu={ColumnMenu} cell={props => ArchiveCell(props)} />
                                </Grid>
                                <GridPDFExport
                                    fileName={`Реестр_помёт_${moment(new Date()).format(`DD_MM_YYYY`)}`}
                                    ref={gridPDFExport}
                                    scale={0.4}
                                    margin="1cm"
                                    paperSize={["297mm", "210mm"]}
                                    pageTemplate={() => <PdfPageTemplate
                                        title={distinction === 'litter' ? 'ЗАЯВЛЕНИЕ НА РЕГИСТРАЦИЮ ПОМЕТА' : distinction === 'metrics' ? 'Метрики щенка' : 'ОФОРМЛЕНИЕ РОДОСЛОВНОЙ'}
                                    />}
                                >
                                    {litterGridForExport}
                                </GridPDFExport>
                            </>
                            : <>
                                <CardMessage>
                                    <h3>Уважаемые пользователи!</h3>
                                    <p>Заявки в статусах "Выполнено" и "Отклонено", если в течение 60 дней с ними не производилось никаких действий, будут перенесены в архив и станут недоступны для просмотра вложений, редактирования и повторной отправки! Заявки в статусе "Не отправлена" будут безвозвратно удалены по прошествии 60 дней с момента их создания!</p>
                                </CardMessage>
                                <Grid
                                    data={process(filteredDocuments, gridData)}
                                    rowRender={rowRender}
                                    pageable
                                    sortable
                                    resizable
                                    {...gridData}
                                    onDataStateChange={handleGridDataChange}
                                    style={{ height: height ? height : "700px", width: "auto", margin: "0 auto" }}>
                                    <GridColumn field="status_value" cell={StatusCell} title="Статус" width="60px" />
                                    <GridColumn field="date_create" title="Создана" width={fullScreen ? '99px' : '80px'} columnMenu={ColumnMenu} />
                                    <GridColumn field={`${distinction}_request_id`} title="№ пакета" width={fullScreen ? '95px' : '70px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="owner_full_name" title="ФИО владельца" width={fullScreen ? 'auto' : '138px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="breeder_full_name" title="Заводчик" width={fullScreen ? 'auto' : '130px'} columnMenu={ColumnMenu} cell={props => TextCell(props, 'breeder_full_name')} />
                                    <GridColumn field="dog_name" title="Кличка" width={fullScreen ? 'auto' : '120px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="breed" title="Порода" width={fullScreen ? 'auto' : '106px'} columnMenu={ColumnMenu} cell={props => TextCell(props, 'breed')} />
                                    <GridColumn field="stamp_number" title="Клеймо" width={fullScreen ? '100px' : '95px'} columnMenu={ColumnMenu} />
                                    <GridColumn field="barcode" title="Трек-номер" width={fullScreen ? '130px' : '120px'} columnMenu={ColumnMenu} cell={(props) => CopyCell(props, handleSuccess)} />
                                    <GridColumn field="pedigree_link" title="Ссылка на эл. копию документа" width={fullScreen ? '120px' : '100px'} columnMenu={ColumnMenu} cell={(props) => ShareCell(props, handleSuccess)} />
                                    <GridColumn field="date_archive" width={fullScreen ? '130px' : '98px'} title="Архивировано" columnMenu={ColumnMenu} cell={props => ArchiveCell(props)} />
                                </Grid>
                                <GridPDFExport
                                    fileName={`Реестр_родословная_${moment(new Date()).format(`DD_MM_YYYY`)}`}
                                    ref={gridPDFExport}
                                    scale={0.4}
                                    margin="1cm"
                                    paperSize={["297mm", "210mm"]}
                                    pageTemplate={() => <PdfPageTemplate
                                        title={distinction === 'litter' ? 'ЗАЯВЛЕНИЕ НА РЕГИСТРАЦИЮ ПОМЕТА' : distinction === 'metrics' ? 'Метрики щенка' : 'ОФОРМЛЕНИЕ РОДОСЛОВНОЙ'}
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
                    position: 'fixed',
                    right: '1vh',
                    top: '80vh',
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