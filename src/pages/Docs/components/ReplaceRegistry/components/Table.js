import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DropDownButton } from '@progress/kendo-react-buttons';
import { Window } from '@progress/kendo-react-dialogs';
import { Checkbox } from '@progress/kendo-react-inputs';
import formatDate from 'utils/formatDate';
import { IntlProvider, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import kendoMessages from 'kendoMessages.json';
import StickyFilters from "components/StickyFilters";

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

const LinkCell = (props) => {
    const { dataItem } = props;
    return <td>
        {dataItem.pedigree_link &&
            <a className="pedigree-link" href={dataItem.pedigree_link} target="_blank" rel="noopener noreferrer">Ссылка</a>
        }
    </td>
};

const OptionsCell = ({ dataItem }, setErrorReport) => {
    const { status_id, type_id, id } = dataItem;
    const { route } = useParams();
    const options = [{
        text: 'Подробнее',
        render: ({ item }) => <Link
            className="club-documents-status__dropdown-link"
            to={`/${route}/documents/replace-pedigree/${type_id}/view/${id}`}>{item.text}</Link>
    }, {
        text: 'Ответить',
        disabled: status_id === 1 ? false : true,
        render: ({ item }) => <Link
            className="club-documents-status__dropdown-link"
            to={`/${route}/documents/replace-pedigree/${type_id}/edit/${id}`}>{item.text}</Link>
    }, {
        text: 'Сообщить об ошибке кинолога',
        disabled: status_id === 3 ? false : true,
        render: ({ item }) => <span onClick={() => setErrorReport(id)}>{item.text}</span>
    }].filter(o => !o.disabled);

    return <td><DropDownButton icon="more-horizontal" items={options} /></td>
};

const Table = ({ documents, reqTypes, checkedTypes, checkType, isOpenFilters, setErrorReport }) => {
    const [windowVisible, setWindowVisible] = useState(false);
    const [gridClickedRow, setGridClickedRow] = useState({});
    const [gridData, setGridData] = useState({
        skip: 0, take: 20,
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

    const handleGridRowClick = (e) => {
        setWindowVisible(true);
        setGridClickedRow(e.dataItem);
    }

    return (
        <LocalizationProvider language="ru-RU">
            <IntlProvider locale={'ru'}>
                <StickyFilters>
                    <div className={`club-documents-status__filters${isOpenFilters ? ' _open' : ''}`}>
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
                        <div className={'club-documents-status__checkbox-wrap'}>
                            {!!reqTypes.length && reqTypes.map(({ id, name }) =>
                                <Checkbox
                                    key={id}
                                    id={`custom-checkbox-reqtypes-${id}`}
                                    label={name}
                                    onChange={() => checkType(id)}
                                    checked={checkedTypes.includes(id)}
                                />
                            )}
                        </div>
                    </div>
                </StickyFilters>
                {
                    documents && <Grid
                        data={process(documents, gridData)}
                        pageable
                        sortable
                        resizable
                        {...gridData}
                        onDataStateChange={handleGridDataChange}
                        onRowClick={handleGridRowClick}
                        style={{ height: "700px" }}>
                        <GridColumn field="date_create" title="Дата создания" width="150px" columnMenu={ColumnMenu} cell={props => DateCell(props, 'date_create')} />
                        <GridColumn field="id" title="Номер заявки" width="150px" columnMenu={ColumnMenu} />
                        <GridColumn field="owner_name" title="ФИО владельца" width="150px" columnMenu={ColumnMenu} />
                        <GridColumn field="dog_name" title="Кличка" width="120px" columnMenu={ColumnMenu} />
                        <GridColumn field="breed_name" title="Порода" width="120px" columnMenu={ColumnMenu} />
                        <GridColumn field="stamp_code" title="Чип/Клеймо" width="130px" columnMenu={ColumnMenu} />
                        <GridColumn field="barcode" title="Трек-номер" width="130px" columnMenu={ColumnMenu} />
                        <GridColumn field="status_name" title="Статус" width="130px" columnMenu={ColumnMenu} />
                        <GridColumn field="pedigree_link" title="Ссылка на эл. копию документа" width="165px" columnMenu={ColumnMenu} cell={LinkCell} />
                        <GridColumn width="60px" cell={(props) => OptionsCell(props, setErrorReport)} />

                    </Grid>
                }


                {windowVisible &&
                    <Window
                        title="Подробности"
                        onClose={() => setWindowVisible(false)}
                        height={500}>
                        <dl style={{ textAlign: "left" }}>
                            <dt><strong>Дата создания</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.date_create}</dd>
                            <dt><strong>Номер заявки</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.id}</dd>
                            <dt><strong>ФИО владельца</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.owner_name}</dd>
                            <dt><strong>Кличка</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.dog_name}</dd>
                            <dt><strong>Порода</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.breed_name}</dd>
                            <dt><strong>Чип/Клеймо</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.stamp_code}</dd>
                            <dt><strong>Трек-номер</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.barcode}</dd>
                            <dt><strong>Документов</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.count_of_documents}</dd>
                            <dt><strong>Статус</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>{gridClickedRow.status_name}</dd>
                            <dt><strong>Ссылка на эл. копию документа</strong></dt>
                            <dd style={{ marginBottom: '10px' }}>
                                {
                                    gridClickedRow.pedigree_link &&
                                    <a className="pedigree-link" href={gridClickedRow.pedigree_link} target="_blank" rel="noopener noreferrer">Ссылка</a>
                                }

                            </dd>
                        </dl>
                    </Window>
                }
            </IntlProvider>
        </LocalizationProvider>
    )
};

export default Table;