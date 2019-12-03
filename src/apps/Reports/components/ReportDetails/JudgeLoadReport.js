import React, { useEffect, useState } from "react";
import ReportDetailsTable from "./components/ReportDetailsTable";
import Loading from "../../../../components/Loading";
import {
    endpointBreedsList,
    endpointGroupsList,
    endpointCountriesList,
    endpointPutJudgesLoadReport,
    endpointGetJudgesLoadReport
} from "../../config";
import { Request } from "../../../../utils/request";
import ls from 'local-storage';


const JudgeLoadReport = ({ reportHeader, getHeader, enableReport }) => {
    const [breeds, setBreeds] = useState(null);
    const [groups, setGroups] = useState(null);
    const [countries, setCountries] = useState(null);
    const loading = !breeds || !groups || !countries;
    const defaultRows = [{ id: 1, 'judge-country': '', breed: [], group: [] }];
    const [rows, setRows] = useState(defaultRows);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (ls.get('judge_load_report') && !loaded) { // Check for local storage cache
            setRows(ls.get('judge_load_report').rows);
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        (() => Request({ url: endpointBreedsList }, data => setBreeds(data.filter(breed => breed.id !== 1))))(); // Remove 'Все породы'
        (() => Request({ url: endpointGroupsList }, data => setGroups(data)))();
        (() => Request({ url: endpointCountriesList }, data => setCountries(data)))();
    }, []);

    useEffect(() => {
        if (!reportHeader.judges_workload_accept && breeds && groups && countries && !loaded) {
            (() => Request({ url: `${endpointGetJudgesLoadReport}?id=${reportHeader.id}` }, data => {
                if (data.lines.length) {
                    const rows = data.lines.map(row => {
                        const country = row.judge_country_id ? countries.find(country => country.id === row.judge_country_id).short_name : '';
                        const breed = row.breeds.length ? row.breeds.map(breed => {
                            const name = breeds.find(item => item.id === breed).name;

                            return {
                                value: name,
                                label: name
                            }
                        }) : [];
                        const group = row.fci_groups.length ? row.fci_groups.map(group => {
                            const name = groups.find(item => item.id === group).name;

                            return {
                                value: name,
                                label: name
                            }
                        }) : [];

                        const item = {
                            'id': row.id,
                            'judge-surname': row.judge_last_name || '',
                            'judge-name': row.judge_first_name || '',
                            'judge-patronymic': row.judge_second_name || '',
                            'judge-country': country,
                            'dogs-distributed': row.dogs_distributed || '',
                            'dogs-judged': row.dogs_condemned || '',
                            breed,
                            group
                        };

                        return item;
                    });

                    setRows(rows);
                }
            }))();
        }
    }, [breeds, groups, countries]);

    const onSubmit = (rows) => {
        const reportRows = rows.map(row => {
            const countryId = row['judge-country'] ?
                row['judge-country'].label ?
                    countries.find(item => item.short_name === row['judge-country'].label).id :
                    countries.find(item => item.short_name === row['judge-country']).id :
                null;
            const breedIds = row.breed.length ? row.breed.map(item => breeds.find(breed => breed.name === item.label).id) : [];
            const groupIds = row.group.length ? row.group.map(item => groups.find(group => group.name === item.label).id) : [];

            return {
                "judge": {
                    "judge_first_name": row['judge-name'] || null,
                    "judge_second_name": row['judge-patronymic'] || '',
                    "judge_last_name": row['judge-surname'] || null
                },
                "judge_country_id": countryId,
                "dogs_distributed": +row['dogs-distributed'] || null,
                "dogs_condemned": +row['dogs-judged'] || null,
                "breed_ids": breedIds,
                "fci_group_ids": groupIds
            }
        });

        const dataToSend = {
            "header_id": reportHeader.id,
            "judges_load_report_rows": reportRows
        };

        (() => Request({
            url: endpointPutJudgesLoadReport,
            method: 'PUT',
            data: JSON.stringify(dataToSend)
        }, data => {
            alert('Ваш отчёт был отправлен.');
            ls.remove('judge_load_report'); // Clear local storage cache
            getHeader();
            enableReport('documents');
        }, error => {
            alert('Отчёт не был отправлен. Возможно Вы заполнили не всю таблицу.');
        })
        )();
    };

    return loading ?
        <Loading /> :
        !reportHeader.judges_workload_accept ?
            <>
                {reportHeader.judges_workload_comment &&
                    <h4 style={{ maxWidth: '33%', color: 'red' }}>
                        Этот отчёт был отклонён с комментарием: {reportHeader.judges_workload_comment}
                    </h4>
                }
                <ReportDetailsTable
                    content="judge-load-report"
                    reportName="judge_load_report"
                    rows={rows}
                    countries={countries}
                    breeds={breeds}
                    groups={groups}
                    onSubmit={onSubmit}
                />
            </> :
            <div className="report-details__default">
                <h3>Этот отчёт уже был принят</h3>
            </div>
};

export default JudgeLoadReport;