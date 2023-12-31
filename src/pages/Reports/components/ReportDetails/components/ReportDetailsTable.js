import React from 'react';
import { compose } from 'redux';
import { clone, findIndex, orderBy } from 'lodash';
import { Paginator, paginate } from './Pagination';
import PrimaryControls from './PrimaryControls';
import CustomFooter from "./CustomFooter";
import { finalReportColumns, judgeLoadReportColumns } from './config';
import * as Table from 'reactabular-table';
import * as edit from 'react-edit';
import * as sort from 'sortabular';
import * as search from 'searchtabular';
import * as resolve from 'table-resolver';
import ls from 'local-storage';
import './pure-css.css';
import './styles.scss';


class ReportDetailsTable extends React.Component {
    state = {
        query: {},
        searchColumn: 'all',
        sortingColumns: null,
        pagination: { page: 1, perPage: 5 },
        rows: this.props.rows,
        cols: null
    };

    async componentDidMount() {
        const cols = await this.getColumns();

        this.setState({ cols })
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ rows: nextProps.rows });
    }

    getColumns = async () => {
        const editable = edit.edit({
            isEditing: ({ columnIndex, rowData }) => columnIndex === rowData.editing && !this.props.isSent,
            onActivate: ({ columnIndex, rowData }) => {
                const index = findIndex(this.state.rows, { id: rowData.id });
                const rows = clone(this.state.rows);
                rows[index].editing = columnIndex;
                this.setState({ rows });
            },
            onValue: ({ value, rowData, property }) => {
                const index = findIndex(this.state.rows, { id: rowData.id });
                const rows = clone(this.state.rows);
                rows[index][property] = property === 'catalog-number' ? parseInt(value) || '' : value;
                delete rows[index].editing;
                this.setState({ rows });
                ls.set(this.props.reportName, { rows });
            }
        });

        const sortable = sort.sort({
            getSortingColumns: () => this.state.sortingColumns || [],
            onSort: selectedColumn => this.setState({
                sortingColumns: sort.byColumn({
                    sortingColumns: this.state.sortingColumns,
                    selectedColumn
                })
            }),
            strategy: sort.strategies.byProperty
        });

        if (this.props.content === 'final-report') {
            let { breeds, castes, grades, rankType } = this.props;

            breeds = breeds.map(item => ({ value: item.name, label: item.name }));
            castes = castes.map(item => ({ value: item.name, label: item.name }));
            grades = grades.map(item => ({ value: item.name, label: item.name }));

            return await finalReportColumns(
                this.onRemove,
                this.state.sortingColumns,
                sortable,
                editable,
                breeds,
                castes,
                grades,
                rankType,
                this.props.isSent
            );
        }
        if (this.props.content === 'judge-load-report') {
            let { breeds, groups, countries } = this.props;

            breeds = breeds.map(item => ({ value: item.name, label: item.name }));
            groups = groups.map(item => ({ value: item.name, label: `Группа ${item.number} - ${item.name}` }));
            countries = countries.map(item => ({ value: item.short_name, label: item.short_name }));

            return judgeLoadReportColumns(
                this.onRemove,
                this.state.sortingColumns,
                sortable,
                editable,
                breeds,
                groups,
                countries,
                this.props.isSent
            );
        }
    };

    onRemove = (rowId) => {
        if (window.confirm('Вы уверены, что хотите удалить эту строку?')) {
            const rows = clone(this.state.rows);
            const idx = findIndex(rows, { id: rowId });

            rows.splice(idx, 1);

            this.setState({ rows });
        }
    };

    onAdd = () => {
        const rows = clone(this.state.rows);
        let newRow = {};
        newRow.id = rows.length ? rows.concat().sort((a, b) => a['id'] - b['id'])[rows.length - 1].id + 1 : 1;
        const copyRow = prop => rows.length ? rows[rows.length - 1][prop] : '';

        if (this.props.content === 'judge-load-report') {
            newRow['judge-country'] = '';
            newRow.breed = [];
            newRow.group = [];
            newRow.group = [];
        } else if (this.props.content === 'final-report') {
            newRow.breed = rows.length ? rows[rows.length - 1].breed : '';
            newRow['judge-surname'] = copyRow('judge-surname');
            newRow['judge-name'] = copyRow('judge-name');
            newRow['judge-patronymic'] = copyRow('judge-patronymic');
            newRow.class = '';
            newRow.score = '';
            newRow.date = this.props.date;
        }

        rows.push(newRow);

        this.setState({ rows });
    };

    onSelect = (page) => {
        const pages = Math.ceil(this.state.rows.length / this.state.pagination.perPage);

        this.setState({ pagination: { ...this.state.pagination, page: Math.min(Math.max(page, 1), pages) } });
    };

    onPerPage = value => this.setState({ pagination: { ...this.state.pagination, perPage: parseInt(value, 10) || 10 } });

    onColumnChange = searchColumn => this.setState({ searchColumn });

    onSearch = query => this.setState({ query });

    onSubmit = () => {
        const { rows } = this.state;
        this.props.btnSendChangeIsDisable(true);
        rows.forEach(row => {
            if (row.editing) delete row.editing;
        });

        this.props.onSubmit(rows);
    };

    scrollEl = null;

    scrollRef = el => {
        this.scrollEl = el;
    }

    onScroll = ({nativeEvent:e}) => e.target === this.scrollEl && this.scrollEl.focus()

    render() {
        const { cols, rows, sortingColumns, pagination, query, searchColumn } = this.state;

        if (!cols) return null;

        const resolvedCols = resolve.columnChildren({ columns: cols });

        let colsForSearch = resolvedCols;
        if (this.props.content === 'final-report') {
            colsForSearch = colsForSearch.filter(col => !+col.property && col.property !== 'date');
        }

        const sortedRows = sort.sorter({
            columns: resolvedCols,
            sortingColumns,
            sort: orderBy,
            strategy: sort.strategies.byProperty
        })(rows);

        const paginated = compose(
            paginate(pagination),
            search.highlighter({ columns: resolvedCols, matches: search.matches, query }),
            search.multipleColumns({ columns: resolvedCols, query }),
            resolve.resolve({
                columns: resolvedCols,
                method: (extra) => compose(
                    resolve.byFunction('cell.resolve')(extra),
                    resolve.nested(extra)
                )
            })
        )(sortedRows);

        return (
            <>
                <PrimaryControls
                    perPage={pagination.perPage}
                    column={searchColumn}
                    query={query}
                    columns={colsForSearch}
                    rows={paginated.rows}
                    onPerPage={this.onPerPage}
                    onColumnChange={this.onColumnChange}
                    onSearch={this.onSearch}
                />
                
                <div className="ReportDetails__twrap">
                    <div ref={this.scrollRef} onScroll={this.onScroll} tabIndex="0">
                        <Table.Provider
                            className="ReportDetails__table pure-table pure-table-striped"
                            columns={resolvedCols}
                        >
                            <Table.Header headerRows={resolve.headerRows({ columns: cols })} />

                            <Table.Body rows={paginated.rows} rowKey="id" />

                            <CustomFooter columns={resolvedCols} rows={rows} />
                        </Table.Provider>
                    </div>
                </div>

                <Paginator
                    pagination={pagination}
                    pages={paginated.amount}
                    onSelect={this.onSelect}
                />
                {!this.props.isSent &&
                    <>
                        <button onClick={this.onSubmit} disabled={this.props.btnSendIsDisabled}>Отправить отчёт</button>
                        <button onClick={this.onAdd} className="ReportDetails__table--add">+ Добавить строку</button>
                    </>
                }

            </>
        )
    }
}

export default ReportDetailsTable;
