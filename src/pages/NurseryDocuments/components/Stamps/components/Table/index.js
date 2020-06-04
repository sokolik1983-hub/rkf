import React, { PureComponent } from "react";
import { compose } from "redux";
import { orderBy } from "lodash";
import * as Table from "reactabular-table";
import * as sort from "sortabular";
import * as search from "searchtabular";
import * as resolve from "table-resolver";
import PrimaryControls from "../PrimaryControls";
import { paginate, Paginator } from "../Pagination";
import { getTableColumns } from "./config";
import "./index.scss";
import { Request } from "../../../../../../utils/request";


class StampsRegistry extends PureComponent {
    state = {
        searchQuery: {},
        searchColumn: 'all',
        sortingColumns: null,
        pagination: { page: 1, perPage: 5 },
        profile_id: this.props.profileId,
        rows: this.props.stamps,
        columns: null
    };

    componentDidMount() {
        this.setState({ columns: this.getColumns() });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ rows: nextProps.stamps });
    };

    getColumns = () => {
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

        return getTableColumns(
            this.state.sortingColumns,
            sortable,
            id => this.setDefaultStamp(id)
        );
    };

    onSelect = page => {
        const pages = Math.ceil(this.state.rows.length / this.state.pagination.perPage);

        this.setState({ pagination: { ...this.state.pagination, page: Math.min(Math.max(page, 1), pages) } });
    };

    onPerPage = value => this.setState({ pagination: { ...this.state.pagination, perPage: parseInt(value, 10) || 5 } });

    onColumnChange = searchColumn => this.setState({ searchColumn });

    onSearch = query => this.setState({ searchQuery: query });

    setDefaultStamp = async id => {
        await Request({
            url: '/api/nurseries/NurseryStampCode/default',
            method: 'PUT',
            data: JSON.stringify({ profile_id: this.state.profile_id, stamp_code_id: id })
        }, () => {
            let newDefaultStamp = this.state.rows.filter(row => row.stamp_code_id === id)[0];
            newDefaultStamp.is_default = true;
            const otherStamp = this.state.rows.filter(row => row.stamp_code_id !== id).map(row => {
                row.is_default = false;
                return row;
            });

            this.setState({ rows: [newDefaultStamp, ...otherStamp], pagination: { page: 1, perPage: 5 } });
        }, error => {
            console.log(error.response);
        });
    }

    render() {
        const { columns, rows, sortingColumns, pagination, searchQuery, searchColumn } = this.state;

        if (!columns) return null;

        const sortedRows = sort.sorter({
            columns: columns,
            sortingColumns: sortingColumns,
            sort: orderBy,
            strategy: sort.strategies.byProperty
        })(rows);

        const paginated = compose(
            paginate(pagination),
            search.highlighter({ columns: columns, matches: search.matches, query: searchQuery }),
            search.multipleColumns({ columns: columns, query: searchQuery }),
            resolve.resolve({
                columns: columns,
                method: (extra) => compose(
                    resolve.byFunction('cell.resolve')(extra),
                    resolve.nested(extra)
                )
            })
        )(sortedRows);

        return (
            <>
                <PrimaryControls
                    className="responsible-table__controls"
                    perPage={pagination.perPage}
                    column={searchColumn}
                    query={searchQuery}
                    columns={columns}
                    rows={paginated.rows}
                    onPerPage={this.onPerPage}
                    onColumnChange={this.onColumnChange}
                    onSearch={this.onSearch}
                />

                <Table.Provider className="responsible-table__table" columns={columns}>
                    <Table.Header headerRows={resolve.headerRows({ columns: columns })} />
                    <Table.Body rows={paginated.rows} rowKey="stamp_code_id" />
                </Table.Provider>

                <Paginator
                    className="responsible-table__pagination"
                    pagination={pagination}
                    pages={paginated.amount}
                    onSelect={this.onSelect}
                />
            </>
        )
    }
}

export default StampsRegistry;