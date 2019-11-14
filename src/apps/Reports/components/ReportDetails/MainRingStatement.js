import React, {useEffect, useState} from "react";
import {cloneDeep, findIndex} from 'lodash';
import * as Table from 'reactabular-table';
import * as edit from 'react-edit';
import {Request} from "../../../../utils/request";
import {endpointBreedsList, endpointPutMainRingStatement, endpointGetMainRingStatement} from "../../config";
import {mainRingStatementColumns} from './components/config';

class MainRingTable extends React.Component {
    state = {
        query: {},
        searchColumn: 'all',
        rows: this.props.rows.length ? this.props.rows : [
            {arrangement_id: this.props.arrangementId, id: 1, position: 1, breed: ''},
            {arrangement_id: this.props.arrangementId, id: 2, position: 2, breed: ''},
            {arrangement_id: this.props.arrangementId, id: 3, position: 3, breed: ''}
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
        const breeds = this.props.breeds.map(item => ({value: item.name, name: item.name}));

        return mainRingStatementColumns(this.onRemove, editable, breeds);
    };

    onAdd = () => {
        const rows = cloneDeep(this.state.rows);
        let newRow = {};
        newRow.arrangement_id = this.props.arrangementId;
        newRow.id = rows.length ? rows[rows.length - 1].id + 1 : 1;
        newRow.breed = '';
        rows.push(newRow);
        this.setState({ rows });
    };

    onRemove = (rowId) => {
        const rows = cloneDeep(this.state.rows);
        const idx = findIndex(rows, {id: rowId});

        rows.splice(idx, 1);

        this.setState({rows});
    };

    render() {
        const { columns, rows } = this.state;

        return (
            columns
                ? <>
                    <Table.Provider
                        className="pure-table pure-table-striped"
                        columns={columns}
                    >
                        <Table.Header />
                        <Table.Body rows={rows} rowKey="id" />
                    </Table.Provider>
                    <div className="add-button">
                        <button onClick={() => this.onAdd(this.props.arrangementId)}> + </button>
                    </div>
                </>
                : null
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
            <td colSpan="6" className="table-holder">
                <MainRingTable arrangementId={arrangementId} rows={getFilteredRows(arrangementId)} updateRows={updateRows} breeds={breeds} />
            </td>
        </tr>
    )
};

const MainRingStatement = ({ reportHeader }) => {
    const [breeds, setBreeds] = useState(null);
    const [rows, setRows] = useState([]);
    const [showButton, setShowButton] = useState(true);

    useEffect(() => {
        (() => {
            Request({url: endpointBreedsList}, data => setBreeds(data));
        })();
    }, []);

    useEffect(() => {
        if(reportHeader.statement_main_ring_is_sent && !reportHeader.statement_main_ring_accept && breeds) {
            (() => {
                Request({url: `${endpointGetMainRingStatement}?id=${reportHeader.id}`}, data => {
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
                });
            })();
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
            const breedId = row.breed ? breeds.find(item => item.name === row.breed).id : null;

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

        (() => {
            Request({
                url: endpointPutMainRingStatement,
                method: 'PUT',
                data: JSON.stringify(dataToSend)
            }, () => setShowButton(false))
        })();
    };

    return !reportHeader.statement_main_ring_accept ?
        <>
            <table className="MainRingStatement">
                <colgroup>
                    <col style={{ width: '200px' }} />
                    <col style={{ width: '100px' }} />
                    <col style={{ width: '200px' }} />
                    <col style={{ width: '200px' }} />
                    <col style={{ width: '200px' }} />
                    <col style={{ width: '200px' }} />
                    <col style={{ width: '50px' }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>РАССТАНОВКИ</th>
                        <th>МЕСТА</th>
                        <th>ПОРОДА</th>
                        <th>НОМЕР ПО КАТАЛОГУ</th>
                        <th>КЛИЧКА СОБАКИ</th>
                        <th>НОМЕР РОДОСЛОВНОЙ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <Row name="1 ГРУППА FCI / BEST IN GROUP 1 FCI" id="1" />
                    <Row name="2 ГРУППА FCI / BEST IN GROUP 2 FCI" id="2" />
                    <Row name="3 ГРУППА FCI / BEST IN GROUP 3 FCI" id="3" />
                    <Row name="4 ГРУППА FCI / BEST IN GROUP 4 FCI" id="4" />
                    <Row name="5 ГРУППА FCI / BEST IN GROUP 5 FCI" id="5" />
                    <Row name="6 ГРУППА FCI / BEST IN GROUP 6 FCI" id="6" />
                    <Row name="7 ГРУППА FCI / BEST IN GROUP 7 FCI" id="7" />
                    <Row name="8 ГРУППА FCI / BEST IN GROUP 8 FCI" id="8" />
                    <Row name="9 ГРУППА FCI / BEST IN GROUP 9 FCI" id="9" />
                    <Row name="10 ГРУППА FCI / BEST IN GROUP 10 FCI" id="10" />
                </tbody>
            </table>
            {showButton && <div style={{width: '1150px', margin: '24px auto 0'}}>
                <button onClick={onSubmit}>Отправить</button>
            </div>}
        </> :
        <div className="report-details__default">
            <h3>Этот отчёт уже был принят</h3>
        </div>
};

export default MainRingStatement;