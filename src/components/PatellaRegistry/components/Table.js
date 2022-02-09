import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { DropDownButton, ChipList } from '@progress/kendo-react-buttons';
import { getHeaders } from "utils/request";
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import { GridPDFExport } from "@progress/kendo-react-pdf";
import kendoMessages from 'kendoMessages.json';
import moment from "moment";
import PdfPageTemplate from "../../PdfPageTemplate";
import LightTooltip from "../../LightTooltip";
import CopyCell from '../../../pages/Docs/components/CopyCell';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { Fade } from '@progress/kendo-react-animation';
import CustomCheckbox from "../../Form/CustomCheckbox";
import declension from "../../../utils/declension";
import CardMessage from "../../../components/CardMessage";

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
    }
];

const ColumnMenu = (props) => {
    return <div>
        <GridColumnMenuFilter {...props} expanded={true} />
    </div>
};

const DateCell = ({ dataItem }, field) => {

    return (dataItem[field] === null ? <td></td> : <td>{moment(dataItem[field]).format('DD.MM.YY')}</td>);
};

const ArchiveCell = ({ dataItem }) => {
    const { status_id, archive_days_left, date_change } = dataItem;
    const countStatus = status_id === 1 || status_id === 3;
    const isArchive = status_id === 8;

    return isArchive ? <td>{date_change}</td> : (countStatus && archive_days_left > 0) ?
        <td>{`До архивации ${archive_days_left} ${declension(archive_days_left, ['день', 'дня', 'дней'])}`}</td> : (countStatus && archive_days_left < 1) ?
            <td>{`В очереди на архивацию`}</td> : <td></td>;
};

const LinkCell = ({ dataItem }, profileType) => {
    const { certificate_document_id } = dataItem;
    return <td>
        {certificate_document_id &&
            <LightTooltip title="Скачать файл" enterDelay={200} leaveDelay={200}>
                <span className="download-document"
                    onClick={e => handleClick(e, certificate_document_id, profileType)}></span>
            </LightTooltip>
        }
    </td>
};

const handleExtract = async (e, request_id, type_id, setNeedUpdateTable) => {
    e.preventDefault();
    await fetch(`/api/requests/commonrequest/dearchive_request`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            "request_id": request_id,
            "request_type": type_id === 1 ? 4 : 5,
        })
    })
        .then(data => alert('Заявка извлечена из архива'))
        .then(() => setNeedUpdateTable(true))
        .catch(error => console.log(error))
};

const OptionsCell = ({ dataItem }, profileType, setErrorReport, setNeedUpdateTable) => {
    const [open, setOpen] = useState(false);
    const { type_id, status_id, id, dearchiving_allowed, can_error_report } = dataItem;
    const { route } = useParams();
    const options = [{
        text: 'Подробнее',
        disabled: status_id === 8,
        render: ({ item }) => <Link
            to={`${profileType === "kennel" ? '/kennel' : ''}/${route}/documents/${type_id === 1 ? "dysplasia" : "patella"}/view/${id}`}
            className="row-control__link">{item.text}
        </Link>
    },
    {
        text: 'Ответить',
        disabled: status_id !== 1,
        render: ({ item }) => <Link
            to={`${profileType === "kennel" ? '/kennel' : ''}/${route}/documents/${type_id === 1 ? "dysplasia" : "patella"}/edit/${id}`}
            className="row-control__link">{item.text}
        </Link>
    },
    {
        text: 'Сообщить об ошибке',
        disabled: (status_id === 3) || can_error_report ? false : true,
        render: ({ item }) => <span className="row-control__link"
            onClick={() => setErrorReport(id)}>{item.text}
        </span>
    },
    {
        text: 'Восстановить',
        disabled: dearchiving_allowed ? false : true,
        render: ({ item }) => <span className="row-control__link"
            onClick={e => handleExtract(e, id, type_id, setNeedUpdateTable)}>{item.text}
        </span>
    }].filter(o => !o.disabled);

    return <td>
        <DropDownButton icon={`k-icon k-i-arrow-chevron-${open ? `up` : `down`}`} onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)} items={options} />
    </td>
};

const handleClick = async (e, id, profileType) => {
    e.preventDefault();
    let el = e.target;
    el.className = 'stamp-loading';
    el.innerText = 'Загрузка...';
    await fetch(`/api/requests/dog_health_check_request/${profileType === 'kennel' ? 'kennel' : ''}doghealthcheckdocument?id=${id}`, {
        method: 'GET',
        headers: getHeaders()
    })
        .then(response => response.blob())
        .then(blob => {
            let url = window.URL.createObjectURL(blob),
                a = document.createElement('a');
            a.href = url;
            a.download = `Сертификат ${id}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
    el.innerText = '';
    el.className = 'download-document';
};

const Table = ({ documents, profileType, exporting, setExporting, fullScreen, distinction, setErrorReport, setNeedUpdateTable }) => {
    const [success, setSuccess] = useState(false);
    const gridPDFExport = useRef(null);
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
        if (e.value === "1" || e.value === "2" || e.value === "3") {
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

    useEffect(() => {
        if (exporting) {
            gridPDFExport.current.save(process(filteredDocuments, gridData).data, () => setExporting(false));
        }
    }, [exporting]);

    const gridForExport = <Grid
        data={process(filteredDocuments, gridData)}
        pageable
        sortable
        resizable
        {...gridData}
        onDataStateChange={handleGridDataChange}>
        <GridColumn field="status_name" title="Статус" />
        <GridColumn field="date_create" title="Дата создания" columnMenu={ColumnMenu} />
        <GridColumn field="date_change" title="Дата последнего изменения статуса" columnMenu={ColumnMenu} />
        <GridColumn field="declarant_full_name" title="ФИО ответственного лица" columnMenu={ColumnMenu} />
        <GridColumn field="pedigree_number" title="Номер родословной" columnMenu={ColumnMenu} />
        <GridColumn field="dog_name" title="Кличка" columnMenu={ColumnMenu} />
        <GridColumn field="barcode" title="Трек-номер" columnMenu={ColumnMenu} />
        <GridColumn field="certificate_document_id" title="Сертификат" columnMenu={ColumnMenu}
            cell={props => LinkCell(props, profileType)} />
        <GridColumn field="production_department_date" title="Дата передачи в производственный департамент"
            columnMenu={ColumnMenu} cell={props => DateCell(props, 'production_department_date')} />
        <GridColumn field="date_archive" title="Архивировано" columnMenu={ColumnMenu}
            cell={props => ArchiveCell(props)} />
    </Grid>;

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

    const handleSuccess = (message) => {
        setSuccess({ status: true, message: message });
        !success && setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    return (
        <>
            <LocalizationProvider language="ru-RU">
                <IntlProvider locale="ru">
                    <div className="club-documents-status__filters-wrap">
                        <div className="chip-list__wrap">
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
                    </div>
                    {filteredDocuments && <>
                        <CardMessage>
                            <h3>Уважаемые пользователи!</h3>
                            <p>Заявки в статусах "Выполнено" и "Отклонено", если в течение 60 дней с ними не
                            производилось никаких действий, будут перенесены в архив и станут недоступны для
                            просмотра вложений, редактирования и повторной отправки! Заявки в статусе "Не
                                отправлена" будут безвозвратно удалены по прошествии 60 дней с момента их создания!</p>
                        </CardMessage>
                        <Grid
                            data={process(filteredDocuments, gridData)}
                            rowRender={rowRender}
                            pageable
                            sortable
                            resizable
                            {...gridData}
                            onDataStateChange={handleGridDataChange}
                            style={{ height: "700px", width: "auto", margin: "0 auto" }}>
                            <GridColumn width={fullScreen ? '100px' : '70px'} title="Опции"
                                cell={props => OptionsCell(props, profileType, setErrorReport, setNeedUpdateTable)} />
                            <GridColumn field="status_value" cell={StatusCell} title="Статус"
                                width={fullScreen ? '62px' : '61px'} />
                            <GridColumn field="date_create" title="Дата создания" width={fullScreen ? '160px' : '80px'}
                                columnMenu={ColumnMenu} />
                            <GridColumn field="date_change" title="Дата последнего изменения статуса"
                                width={fullScreen ? '160px' : '80px'} columnMenu={ColumnMenu} />
                            <GridColumn field="declarant_full_name" title="ФИО ответственного лица"
                                width={fullScreen ? 'auto' : '220px'} columnMenu={ColumnMenu} />
                            <GridColumn field="pedigree_number" title="Номер родословной"
                                width={fullScreen ? '130px' : '100px'} columnMenu={ColumnMenu} />
                            <GridColumn field="dog_name" title="Кличка" width={fullScreen ? 'auto' : '189px'}
                                columnMenu={ColumnMenu} />
                            <GridColumn field="barcode" title="Трек-номер" width={fullScreen ? '130px' : '120px'}
                                columnMenu={ColumnMenu} cell={(props) => CopyCell(props, handleSuccess)} />
                            <GridColumn field="certificate_document_id" title="Сертификат"
                                width={fullScreen ? '150px' : '100px'} columnMenu={ColumnMenu}
                                cell={props => LinkCell(props, profileType)} />
                            <GridColumn field="date_archive" width={fullScreen ? '130px' : '98px'} title="Архивировано"
                                columnMenu={ColumnMenu} cell={props => ArchiveCell(props)} />
                        </Grid></>}
                    <GridPDFExport
                        fileName={distinction === "dysplasia" ? `Сертификат_дисплазия_${moment(new Date()).format(`DD_MM_YYYY`)}` : `Сертификат_пателла_${moment(new Date()).format(`DD_MM_YYYY`)}`}
                        ref={gridPDFExport}
                        scale={0.5}
                        margin="1cm"
                        paperSize={["297mm", "210mm"]}
                        pageTemplate={() => <PdfPageTemplate
                            title={distinction === "dysplasia" ? "СЕРТИФИКАТ О ПРОВЕРКЕ НА ДИСПЛАЗИЮ" : "СЕРТИФИКАТ КЛИНИЧЕСКОЙ ОЦЕНКИ КОЛЕННЫХ СУСТАВОВ (PL) (ПАТЕЛЛА)"}
                        />}
                    >
                        {gridForExport}
                    </GridPDFExport>
                </IntlProvider>
            </LocalizationProvider>
            <NotificationGroup
                style={{
                    position: 'absolute',
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
        </>
    )
};

export default Table;