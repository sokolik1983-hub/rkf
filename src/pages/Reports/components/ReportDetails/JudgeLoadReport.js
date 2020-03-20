import React, { useEffect, useState } from "react";
import ReportDetailsTable from "./components/ReportDetailsTable";
import Loading from "components/Loading";
import {
    endpointBreedsList,
    endpointGroupsList,
    endpointCountriesList,
    endpointPutJudgesLoadReport,
    endpointGetJudgesLoadReport
} from "../../config";
import { Request } from "utils/request";
import ImportReport from './components/ImportReport';
import ls from 'local-storage';


const JudgeLoadReport = ({ reportHeader, getHeader }) => {
    const [breeds, setBreeds] = useState(null);
    const [groups, setGroups] = useState(null);
    const [countries, setCountries] = useState(null);
    const [loading, setLoading] = useState(true);
    const defaultRows = [{ id: 1, 'judge-country': '', breed: [], group: [] }];
    const [rows, setRows] = useState(defaultRows);
    const [loaded, setLoaded] = useState(false);
    const [sendDisabled, setSendDisable] = useState(false);
    const { id,
        judges_workload_accept,
        rank_id,
        judges_workload_comment,
        judges_workload_is_sent
    } = reportHeader;

    useEffect(() => {
        if (ls.get(`judge_load_report_${id}`) && !loaded) { // Check for local storage cache
            setRows(ls.get(`judge_load_report_${id}`).rows);
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        (() => Request({ url: endpointBreedsList }, data => setBreeds(data.filter(breed => breed.id !== 1))))(); // Remove 'Все породы'
        (() => Request({ url: endpointGroupsList }, data => setGroups(data)))();
        (() => Request({ url: endpointCountriesList }, data => setCountries(data)))();
    }, []);

    useEffect(() => {
        if (!judges_workload_accept && breeds && groups && countries && !loaded) {
            (() => Request({ url: `${endpointGetJudgesLoadReport}?id=${id}` }, data => { fillRows(data); }))();
        }
        if (breeds && groups && countries) setLoading(false);
    }, [breeds, groups, countries]);

    const fillRows = (data) => {
        if (data.lines.length) {
            const rows = data.lines.map((row, key) => {
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
                    const label = `Группа ${groups.find(item => item.id === group).number} - ${name}`

                    return {
                        value: name,
                        label: label
                    }
                }) : [];

                const item = {
                    'id': row.id || key,
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
    };

    const onSubmit = (rows) => {
        setLoading(true);
        const reportRows = rows
            .filter(f => Object.keys(f).length >= 5) // Filter blank lines
            .map(row => {
                const countryId = row['judge-country'] ?
                    row['judge-country'].label ?
                        countries.find(item => item.short_name === row['judge-country'].label).id :
                        countries.find(item => item.short_name === row['judge-country']).id :
                    null;
                const breedIds = row.breed.length ? row.breed.map(item => breeds.find(breed => breed.name === item.label).id) : [];
                const groupIds = row.group.length ? row.group.map(item => groups.find(group => group.name === item.value).id) : [];

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
            "header_id": id,
            "judges_load_report_rows": reportRows
        };
        if (!reportRows.length) {
            setSendDisable(false);
            alert('Необходимо заполнить хотя бы одну строку отчёта!');
            return getHeader();
        }
        (() => Request({
            url: endpointPutJudgesLoadReport,
            method: 'PUT',
            data: JSON.stringify(dataToSend)
        }, data => {
            setSendDisable(false);
            alert('Ваш отчёт был отправлен.');
            ls.remove(`judge_load_report_${id}`); // Clear local storage cache
            getHeader();
        }, error => {
            setSendDisable(false);
            alert('Отчёт не был отправлен. Возможно Вы заполнили не всю таблицу.');
            getHeader();
        })
        )();
    };

    return loading ?
        <Loading /> :
        !judges_workload_accept ?
            <>
                {!judges_workload_is_sent && <ImportReport type="judgeLoadReport" rankId={rank_id} handleImport={fillRows} />}
                {judges_workload_comment &&
                    <h4 style={{ paddingBottom: '20px' }}>
                        Этот отчёт был отклонён с комментарием: <br />
                        <span style={{ color: 'red' }}>{judges_workload_comment}</span>
                    </h4>
                }
                <ReportDetailsTable
                    content="judge-load-report"
                    reportName={`judge_load_report_${id}`}
                    rows={rows}
                    countries={countries}
                    breeds={breeds}
                    groups={groups}
                    onSubmit={onSubmit}
                    isSent={judges_workload_is_sent}
                    btnSendIsDisabled={sendDisabled}
                    btnSendChangeIsDisable={setSendDisable}
                />
            </> :
            <div className="report-details__default">
                <h3>Этот отчёт уже был принят</h3>
            </div>
};

export default JudgeLoadReport;