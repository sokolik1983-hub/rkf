import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { cloneDeep, findIndex } from 'lodash';
import * as Table from 'reactabular-table';
import * as edit from 'react-edit';
import * as resolve from 'table-resolver';
import { Request } from "../../../../utils/request";
import {
    endpointBreedsList,
    endpointArrangementsList,
    endpointPutMainRingStatement,
    endpointGetMainRingStatement
} from "../../config";
import { mainRingStatementColumns } from './components/config';
import Loading from "../../../../components/Loading";
import ls from 'local-storage';


class MainRingTable extends React.Component {
    initRows = [
        { arrangement_id: this.props.arrangementId, id: 1, position: 1, breed: '' },
        { arrangement_id: this.props.arrangementId, id: 2, position: 2, breed: '' },
        { arrangement_id: this.props.arrangementId, id: 3, position: 3, breed: '' }
    ];

    state = {
        query: {},
        searchColumn: 'all',
        rows: this.initRows,
        columns: null,
        updated: false
    };

    componentDidMount() {
        this.setState({
            columns: this.getColumns()
        })
    };

    componentDidUpdate() {
        if (this.props.rows.length && !this.state.updated) {
            this.setState({
                rows: this.props.rows,
                updated: true
            });
        }
    }

    getColumns = () => {
        const editable = edit.edit({
            isEditing: ({ columnIndex, rowData }) => columnIndex === rowData.editing,
            onActivate: ({ columnIndex, rowData }) => {
                const index = findIndex(this.state.rows, { id: rowData.id });
                const rows = cloneDeep(this.state.rows);
                rows[index].editing = columnIndex;
                this.setState({ rows });
            },
            onValue: ({ value, rowData, property }) => {
                const index = findIndex(this.state.rows, { id: rowData.id });
                const rows = cloneDeep(this.state.rows);
                rows[index][property] = value;
                delete rows[index].editing;
                this.setState({ rows });
                this.props.updateRows(rows, this.props.arrangementId);
            }
        });
        const breeds = this.props.breeds.map(item => ({ value: item.name, label: item.name }));

        return mainRingStatementColumns(editable, breeds);
    };

    render() {
        const { columns, rows } = this.state;

        if (!columns) return null;

        const resolvedRows = compose(
            resolve.resolve({
                columns: columns,
                method: (extra) => compose(
                    resolve.byFunction('cell.resolve')(extra),
                    resolve.nested(extra)
                )
            })
        )(rows);

        return (
            <>
                <Table.Provider
                    className="pure-table pure-table-striped"
                    columns={columns}
                >
                    <Table.Header />
                    <Table.Body rows={resolvedRows} rowKey="id" />
                </Table.Provider>
            </>
        )
    }
};

const MainRingStatementRow = ({ arrangementName, arrangementId, rows, updateRows, breeds }) => {
    return (
        <tr>
            <td style={{ textAlign: 'center' }}>{arrangementName}</td>
            <td colSpan="5" className="table-holder">
                <MainRingTable arrangementId={arrangementId} rows={rows} updateRows={updateRows} breeds={breeds} />
            </td>
        </tr>
    )
};

const MainRingStatement = ({ reportHeader, getHeader, enableReport }) => {
    const [breeds, setBreeds] = useState(null);
    const [arrangements, setArrangements] = useState(null);
    const [rows, setRows] = useState([]);
    const loading = !arrangements;
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (ls.get('main_ring_statement') && !loaded) { // Check for local storage cache
            setRows(ls.get('main_ring_statement').lsReadyRows);
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        (() => Request({ url: endpointBreedsList }, data => setBreeds(data.filter(breed => breed.id !== 1))))(); // Remove 'Все породы'
        (() => Request({ url: endpointArrangementsList }, data => setArrangements(data)))();
    }, []);

    useEffect(() => {
        if (!reportHeader.statement_main_ring_accept && breeds && !loaded) {
            (() => Request({ url: `${endpointGetMainRingStatement}?id=${reportHeader.id}` }, data => {
                if (data.length) {
                    const rows = data.map(row => {
                        const breed = row.dog.breed_id ? breeds.find(breed => breed.id === row.dog.breed_id).name : '';

                        const item = {
                            'arrangement_id': row.arrangement_id,
                            'id': row.id,
                            'position': row.position || '',
                            breed,
                            'catalog_number': row.catalog_number || '',
                            'dog_name': row.dog.dog_name || '',
                            'pedigree_number': row.dog.pedigree_number || ''
                        };

                        return item;
                    });
                    setRows(rows);
                }
            }))();
        }
    }, [breeds]);

    const updateRows = (updatedRows, arrangementId) => {
        const filteredRows = rows.filter((row) => +row.arrangement_id !== +arrangementId);
        const reUpdatedRows = updatedRows.map((row) => ({ ...row, arrangement_id: +arrangementId }));
        const newRows = [
            ...filteredRows,
            ...reUpdatedRows
        ];
        setRows(newRows);

        const lsReadyRows = newRows.map(row => {
            const normalized = row;
            normalized.breed = row.breed.label ? row.breed.label : row.breed;
            return normalized;
        });

        ls.set('main_ring_statement', { lsReadyRows });
    };

    const onSubmit = () => {
        const reportRows = rows.map(row => {
            const breedId = row.breed ?
                row.breed.label ?
                    breeds.find(item => item.name === row.breed.label).id :
                    breeds.find(item => item.name === row.breed).id :
                null;

            return {
                "dog": {
                    "breed_id": breedId,
                    "dog_name": row.dog_name || null,
                    "pedigree_number": row.pedigree_number || null
                },
                "arrangement_id": row.arrangement_id,
                "position": row.position || null,
                "catalog_number": row.catalog_number || null
            }
        });

        const dataToSend = {
            "report_header_id": reportHeader.id,
            "report_rows": reportRows
        };

        (() => Request({
            url: endpointPutMainRingStatement,
            method: 'PUT',
            data: JSON.stringify(dataToSend)
        }, data => {
            alert('Ваш отчёт был отправлен.');
            ls.remove('main_ring_statement'); // Clear local storage cache
            getHeader();
            enableReport('judgeLoad');
        }, error => {
            alert('Отчёт не был отправлен. Возможно Вы заполнили не всю таблицу.');
        }))();
    };

    const getFilteredRows = (arrangementId) => {
        return rows.filter((row) => row.arrangement_id === +arrangementId)
    };

    return !reportHeader.statement_main_ring_accept ?
        loading ?
            <Loading /> :
            <>
                {reportHeader.statement_main_ring_comment &&
                    <h4 style={{ maxWidth: '33%', color: 'red' }}>
                        Этот отчёт был отклонён с комментарием: {reportHeader.statement_main_ring_comment}
                    </h4>
                }
                <table className="MainRingStatement">
                    <colgroup>
                        <col style={{ width: '200px' }} />
                        <col style={{ width: '100px' }} />
                        <col style={{ width: '200px' }} />
                        <col style={{ width: '200px' }} />
                        <col style={{ width: '200px' }} />
                        <col style={{ width: '200px' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>РАССТАНОВКИ</th>
                            <th>МЕСТА</th>
                            <th>ПОРОДА</th>
                            <th>НОМЕР ПО КАТАЛОГУ</th>
                            <th>КЛИЧКА СОБАКИ</th>
                            <th>НОМЕР РОДОСЛОВНОЙ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arrangements.map(item => {
                                return breeds && <MainRingStatementRow
                                    key={item.id}
                                    arrangementId={item.id}
                                    arrangementName={item.name}
                                    rows={getFilteredRows(item.id)}
                                    updateRows={updateRows}
                                    breeds={breeds}
                                />
                            })
                        }
                    </tbody>
                </table>
                <div style={{ width: '1100px', margin: '24px auto 0' }}>
                    <button onClick={onSubmit}>Отправить отчёт</button>
                </div>
            </> :
        <div className="report-details__default">
            <h3>Этот отчёт уже был принят</h3>
        </div>
};

export default MainRingStatement;