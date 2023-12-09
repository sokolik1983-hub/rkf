import React, {PureComponent} from "react";
import {compose} from "redux";
import {orderBy} from "lodash";
import * as Table from "reactabular-table";
import * as sort from "sortabular";
import * as search from "searchtabular";
import * as resolve from "table-resolver";
import PrimaryControls from "../PrimaryControls";
import {paginate, Paginator} from "../Pagination";
import Modal from "../../../../../../components/Modal";
import {getTableColumns} from "./config";
import "./index.scss";
import Declarants from "../Declarants";


class StatusTable extends PureComponent {
    state = {
        searchQuery: {},
        searchColumn: 'all',
        sortingColumns: null,
        pagination: {page: 1, perPage: 50},
        distinction: this.props.distinction,
        clubAlias: this.props.clubAlias,
        rows: this.props.documents,
        columns: null,
        showModal: false,
        docId: null
    };

    componentDidMount() {
        this.setState({columns: this.getColumns()});
    };

    componentWillReceiveProps(nextProps) {
        this.setState({rows: nextProps.documents});
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
            this.state.distinction,
            this.state.clubAlias,
            data => this.setState(data)
        );
    };

    onSelect = page => {
        const pages = Math.ceil(this.state.rows.length / this.state.pagination.perPage);

        this.setState({ pagination: { ...this.state.pagination, page: Math.min(Math.max(page, 1), pages) } });
    };

    onPerPage = value => this.setState({pagination: {...this.state.pagination, perPage: parseInt(value, 10) || 5}});

    onColumnChange = searchColumn => this.setState({searchColumn});

    onSearch = query => this.setState({searchQuery: query});

    render() {
        const {columns, rows, sortingColumns, pagination, searchQuery, searchColumn} = this.state;

        if (!columns) return null;

        const sortedRows = sort.sorter({
            columns: columns,
            sortingColumns: sortingColumns,
            sort: orderBy,
            strategy: sort.strategies.byProperty
        })(rows);

        const paginated = compose(
            paginate(pagination),
            search.highlighter({columns: columns, matches: search.matches, query: searchQuery}),
            search.multipleColumns({columns: columns, query: searchQuery}),
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
                    className="status-table__controls"
                    perPage={pagination.perPage}
                    column={searchColumn}
                    query={searchQuery}
                    columns={columns}
                    rows={paginated.rows}
                    onPerPage={this.onPerPage}
                    onColumnChange={this.onColumnChange}
                    onSearch={this.onSearch}
                />

                <Table.Provider className="request-registry-table__table" columns={columns}>
                    <Table.Header headerRows={resolve.headerRows({columns: columns})} />
                    <Table.Body rows={paginated.rows} rowKey="id" />
                </Table.Provider>

                <Paginator
                    className="status-table__pagination"
                    pagination={pagination}
                    pages={paginated.amount}
                    onSelect={this.onSelect}
                />

                {this.state.showModal &&
                    <Modal
                        showModal={this.state.showModal}
                        handleClose={() => this.setState({showModal: false})}
                        noBackdrop={true}
                        hideCloseButton={true}
                        className="status-table__modal"
                    >
                        <Declarants id={this.state.docId} />
                    </Modal>
                }
            </>
        )
    }
}

export default StatusTable;
