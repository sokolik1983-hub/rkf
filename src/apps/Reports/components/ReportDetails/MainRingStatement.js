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


class MainRingTable extends React.Component {
    state = {
        query: {},
        searchColumn: 'all',
        rows: this.props.rows.length ? this.props.rows : [
            { arrangement_id: this.props.arrangementId, id: 1, position: 1, breed: '' },
            { arrangement_id: this.props.arrangementId, id: 2, position: 2, breed: '' },
            { arrangement_id: this.props.arrangementId, id: 3, position: 3, breed: '' }
        ],
        columns: null
    };

    componentDidMount() {
        this.setState({ columns: this.getColumns() })
    };

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

        return mainRingStatementColumns(this.onRemove, editable, breeds);
    };

    onAdd = () => {
        if (this.state.rows.length < 4) {
            const rows = cloneDeep(this.state.rows);
            let newRow = {};
            newRow.arrangement_id = this.props.arrangementId;
            newRow.id = rows.length ? rows[rows.length - 1].id + 1 : 1;
            newRow.position = 4;
            newRow.breed = '';
            rows.push(newRow);
            this.setState({ rows });
        }
    };

    onRemove = (rowId) => {
        if (window.confirm('Вы уверены, что хотите удалить эту строку?')) {
            const rows = cloneDeep(this.state.rows);
            const idx = findIndex(rows, { id: rowId });

            rows.splice(idx, 1);

            this.setState({ rows });
        }
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
                {rows.length < 4 &&
                    <div className="add-button">
                        <button onClick={() => this.onAdd(this.props.arrangementId)}> + </button>
                    </div>
                }
            </>
        )
    }
};

const MainRingStatementRow = ({ arrangementName, arrangementId, rows, updateRows, breeds }) => {
    const getFilteredRows = (arrangementId) => {
        return rows.filter((row) => row.arrangement_id === +arrangementId)
    };

    return (
        <tr>
            <td>{arrangementName}</td>
            <td colSpan="5" className="table-holder">
                <MainRingTable arrangementId={arrangementId} rows={getFilteredRows(arrangementId)} updateRows={updateRows} breeds={breeds} />
            </td>
        </tr>
    )
};

const MainRingStatement = ({ reportHeader, getHeader }) => {
    const [breeds, setBreeds] = useState(null);
    const [arrangements, setArrangements] = useState(null);
    const [rows, setRows] = useState([]);
    const loading = !arrangements;

    useEffect(() => {
        (() => Request({ url: endpointBreedsList }, data => setBreeds(data.filter(breed => breed.id !== 1))))(); // Remove 'Все породы'
        (() => Request({ url: endpointArrangementsList }, data => setArrangements(data)))();
    }, []);

    useEffect(() => {
        if (!reportHeader.statement_main_ring_accept && breeds) {
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
        setRows([
            ...filteredRows,
            ...reUpdatedRows
        ]);
    };

    const Row = ({ name, id }) => breeds && <MainRingStatementRow arrangementName={name} arrangementId={id} updateRows={updateRows} rows={rows} breeds={breeds} />;

    const onSubmit = () => {
        const reportRows = rows.map(row => {
            const breedId = row.breed ? breeds.find(item => item.name === (row.breed.label ? row.breed.label : row.breed)).id : null;

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
            getHeader();
        }, error => {
            alert('Отчёт не был отправлен. Возможно Вы заполнили не все поля.');
        }))();
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
                        {arrangements.map(item => <Row key={item.id} name={item.name} id={item.id} />)}
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