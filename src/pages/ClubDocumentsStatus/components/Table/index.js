import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {orderBy} from "lodash";
import * as Table from "reactabular-table";
import * as sort from "sortabular";
import * as search from "searchtabular";
import * as resolve from "table-resolver";
import {getTableColumns} from "./config";
import "./index.scss";
import PrimaryControls from "../../../Reports/components/ReportDetails/components/PrimaryControls";
import CustomFooter from "../../../Reports/components/ReportDetails/components/CustomFooter";
import {paginate, Paginator} from "../../../Reports/components/ReportDetails/components/Pagination";


const StatusTable = ({documents}) => {
    const [columns, setColumns] = useState(null);
    const [sortingColumns, setSortingColumns] = useState(null);
    const [searchQuery, setSearchQuery] = useState({});
    const [searchColumn, setSearchColumn] = useState('all');
    const [pagination, setPagination] = useState({page: 1, perPage: 5});

    useEffect(() => {
        const sortable = sort.sort({
            getSortingColumns: () => sortingColumns || [],
            onSort: selectedColumn => {
                setSortingColumns(sort.byColumn({
                    sortingColumns,
                    selectedColumn
                }))
            },
            strategy: sort.strategies.byProperty
        });

        setColumns(getTableColumns(sortingColumns, sortable));
    }, []);

    const onSelect = page => {
        const pages = Math.ceil(documents.length / pagination.perPage);

        setPagination({...pagination, page: Math.min(Math.max(page, 1), pages)});
    };

    const onPerPage = value => setPagination({...pagination, perPage: parseInt(value, 10) || 5});

    const onColumnChange = searchColumn => setSearchColumn(searchColumn);

    const onSearch = query => setSearchQuery(query);

    if (!columns) return null;

    const sortedRows = sort.sorter({
        columns,
        sortingColumns,
        sort: orderBy,
        strategy: sort.strategies.byProperty
    })(documents);

    const paginated = compose(
        paginate(pagination),
        search.highlighter({columns, matches: search.matches, query: searchQuery}),
        search.multipleColumns({columns, query: searchQuery}),
        resolve.resolve({
            columns,
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
                query={searchQuery}
                columns={columns}
                rows={documents}
                onPerPage={onPerPage}
                onColumnChange={onColumnChange}
                onSearch={onSearch}
            />

            <div className="ReportDetails__twrap">
                <div>
                    <Table.Provider
                        className="ReportDetails__table pure-table pure-table-striped"
                        columns={columns}
                    >
                        <Table.Header headerRows={resolve.headerRows({ columns: columns })} />

                        <Table.Body rows={documents} rowKey="id" />

                        <CustomFooter columns={columns} rows={documents} />
                    </Table.Provider>
                </div>
            </div>

            <Paginator
                pagination={pagination}
                pages={paginated.amount}
                onSelect={onSelect}
            />
        </>
    )
};

export default React.memo(StatusTable);