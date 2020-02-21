import React, { useEffect, useState } from "react";
import ReportDetailsTable from "./components/ReportDetailsTable";
import Loading from "components/Loading";
import {
    endpointBreedsList,
    endpointCastesList,
    endpointGradesList,
    endpointGetFinalReport,
    endpointPutFinalReport
} from '../../config';
import { Request } from "utils/request";
import ls from 'local-storage';


const FinalReport = ({ reportHeader, getHeader }) => {
    const [breeds, setBreeds] = useState(null);
    const [castes, setCastes] = useState(null);
    const [grades, setGrades] = useState(null);
    const [loading, setLoading] = useState(true);
    const exhibitionDate = new Date(reportHeader.exhibition_date).toLocaleDateString();
    const defaultRows = [
        { id: 1, breed: '', class: '', score: '', date: exhibitionDate },
        { id: 2, breed: '', class: '', score: '', date: exhibitionDate },
        { id: 3, breed: '', class: '', score: '', date: exhibitionDate },
        { id: 4, breed: '', class: '', score: '', date: exhibitionDate },
        { id: 5, breed: '', class: '', score: '', date: exhibitionDate }
    ];
    const [rows, setRows] = useState(defaultRows);
    const [loaded, setLoaded] = useState(false);
    const [sendDisabled, setSendDisable] = useState(false);

    useEffect(() => {
        if (ls.get(`final_report_${reportHeader.id}`) && !loaded) { // Check for local storage cache
            setRows(ls.get(`final_report_${reportHeader.id}`).rows);
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        (() => Request({ url: endpointBreedsList }, data => setBreeds(data.filter(breed => breed.id !== 1))))(); // Remove 'Все породы'
        (() => Request({ url: endpointCastesList }, data => setCastes(data)))();
        (() => Request({ url: endpointGradesList }, data => setGrades(data)))();
    }, []);

    useEffect(() => {
        if (!reportHeader.total_report_accept && breeds && castes && grades && !loaded) {
            (() => Request({ url: `${endpointGetFinalReport}?id=${reportHeader.id}` }, data => {
                if (data.length) {
                    const rows = data.map(row => {
                        const breed = row.dog.breed_id ? breeds.find(breed => breed.id === row.dog.breed_id).name : '';
                        const caste = row.caste_id ? castes.find(caste => caste.id === row.caste_id).name : '';
                        const score = row.grade_id ? grades.find(grade => grade.id === row.grade_id).name : '';

                        const item = {
                            id: row.id,
                            breed,
                            'judge-surname': row.judge.judge_last_name || '',
                            'judge-name': row.judge.judge_first_name || '',
                            'judge-patronymic': row.judge.judge_second_name || '',
                            'catalog-number': row.catalog_number || '',
                            'dog-name': row.dog.dog_name || '',
                            'birthday': row.dog.dog_birth_date ? new Date(row.dog.dog_birth_date) : '',
                            'pedigree-number': row.dog.pedigree_number || '',
                            'class': caste,
                            score,
                            date: exhibitionDate
                        };

                        row.certificates.forEach(certificate => item[certificate] = true);

                        return item;
                    });

                    setRows(rows.sort((a, b) => a['catalog-number'] - b['catalog-number']));
                }
            }))();
        }
        if (breeds && castes && grades) setLoading(false);
    }, [breeds, castes, grades]);

    const onSubmit = (rows) => {
        setLoading(true);
        const reportRows = rows
            .filter(f => Object.keys(f).length >= 8) // Filter blank lines
            .map(row => {
                const breedId = row.breed ?
                    row.breed.label ?
                        breeds.find(item => item.name === row.breed.label).id :
                        breeds.find(item => item.name === row.breed).id :
                    null;
                const castId = row.class ?
                    row.class.label ?
                        castes.find(item => item.name === row.class.label).id :
                        castes.find(item => item.name === row.class).id :
                    null;
                const gradeId = row.score ?
                    row.score.label ?
                        grades.find(item => item.name === row.score.label).id :
                        grades.find(item => item.name === row.score).id :
                    null;
                const certificates = Object.keys(row).reduce((arr, key) => {
                    if (+key && row[key] === true) {
                        return [...arr, +key];
                    }

                    return arr;
                }, []);

                return {
                    "dog": {
                        "breed_id": breedId,
                        "dog_name": row['dog-name'] || null,
                        "dog_birth_date": row.birthday || null,
                        "pedigree_number": row['pedigree-number'] || null
                    },
                    "judge": {
                        "judge_first_name": row['judge-name'] || null,
                        "judge_second_name": row['judge-patronymic'] || '',
                        "judge_last_name": row['judge-surname'] || null
                    },
                    "catalog_number": row['catalog-number'] || null,
                    "caste_id": castId,
                    "grade_id": gradeId,
                    "certificates": certificates
                }
            });

        const dataToSend = {
            "report_header_id": reportHeader.id,
            "report_rows": reportRows
        };
        if (!reportRows.length) {
            setSendDisable(false);
            return alert('Необходимо заполнить хотя бы одну строку отчёта!');
        }
        (() => Request({
            url: endpointPutFinalReport,
            method: 'PUT',
            data: JSON.stringify(dataToSend)
        }, data => {
            setSendDisable(false);
            alert('Ваш отчёт был отправлен.');
            ls.remove(`final_report_${reportHeader.id}`); // Clear local storage cache
            getHeader();
        }, error => {
            setSendDisable(false);
            alert('Отчёт не был отправлен. Возможно Вы заполнили не всю таблицу.');
        })
        )();
    };

    return loading ?
        <Loading /> :
        !reportHeader.total_report_accept ?
            <>
                {reportHeader.total_report_comment &&
                    <h4 style={{ paddingBottom: '20px' }}>
                        Этот отчёт был отклонён с комментарием: <br />
                        <span style={{ color: 'red' }}>{reportHeader.total_report_comment}</span>
                    </h4>
                }
                <ReportDetailsTable
                    content="final-report"
                    reportName={`final_report_${reportHeader.id}`}
                    rows={rows}
                    breeds={breeds}
                    castes={castes}
                    grades={grades}
                    date={exhibitionDate}
                    rankType={reportHeader.rank_id}
                    onSubmit={onSubmit}
                    isSent={reportHeader.total_report_is_sent}
                    btnSendIsDisabled={sendDisabled}
                    btnSendChangeIsDisable={setSendDisable}
                />
            </> :
            <div className="report-details__default">
                <h3>Этот отчёт уже был принят</h3>
            </div>

};

export default FinalReport;